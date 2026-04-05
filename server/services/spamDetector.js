const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Detects spam in a review based on:
 * 1. Same user posting multiple reviews for the same hostel/PG
 * 2. Many posts about the same hostel in last 7 days (promo flooding)
 * 3. Brand new account with very first post
 * 4. AI content analysis via Gemini
 *
 * @param {Object} review  - The saved Review document
 * @param {Object} user    - req.user (from auth middleware)
 * @param {Model}  Review  - Mongoose Review model (passed in to avoid circular deps)
 */
async function detectSpam(review, user, Review) {
  let spamScore = 0;
  const spamReasons = [];

  try {
    // -----------------------------------------------------------
    // Signal 1: Same user already reviewed the same hostel/PG
    // -----------------------------------------------------------
    const duplicateCount = await Review.countDocuments({
      user: user.id || user._id,
      name: { $regex: new RegExp(review.name, "i") }, // 'name' = hostel/pg name in your schema
      _id: { $ne: review._id },
    });

    if (duplicateCount >= 1) {
      spamScore += 40;
      spamReasons.push(
        `Same user posted ${duplicateCount + 1} reviews for "${review.name}"`
      );
    }

    // -----------------------------------------------------------
    // Signal 2: 5+ posts about same hostel within last 7 days
    // -----------------------------------------------------------
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const hostelFloodCount = await Review.countDocuments({
      name: { $regex: new RegExp(review.name, "i") },
      createdAt: { $gte: sevenDaysAgo },
    });

    if (hostelFloodCount >= 5) {
      spamScore += 20;
      spamReasons.push(
        `${hostelFloodCount} posts about "${review.name}" in the last 7 days (possible promo flooding)`
      );
    }

    // -----------------------------------------------------------
    // Signal 3: Brand new account (< 3 days old) with very first post
    // -----------------------------------------------------------
    const accountAgeDays =
      (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    const userTotalPosts = await Review.countDocuments({
      user: user.id || user._id,
    });

    if (accountAgeDays < 3 && userTotalPosts <= 1) {
      spamScore += 25;
      spamReasons.push(
        `Account is only ${Math.floor(accountAgeDays)} day(s) old with a single post`
      );
    }

    // -----------------------------------------------------------
    // Signal 4: AI content analysis via Gemini (free)
    // -----------------------------------------------------------
    const aiResult = await analyzeWithGemini(review.name, review.reviewText);
    if (aiResult.isSpam) {
      spamScore += aiResult.confidence;
      spamReasons.push(`AI flagged: ${aiResult.reason}`);
    }
  } catch (err) {
    console.error("detectSpam error:", err.message);
  }

  return {
    isSpam: spamScore >= 60,
    spamScore,
    spamReasons,
  };
}

/**
 * Uses Google Gemini Flash (free tier) to analyse review content.
 */
async function analyzeWithGemini(hostelName, reviewText) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a spam detection system for a hostel/PG review platform.

Analyze this review and determine if it is spam or fake promotional content.

Hostel/PG Name: "${hostelName}"
Review Text: "${reviewText}"

Mark it as SPAM if it:
1. Sounds like an advertisement written by the owner, not a genuine tenant experience
2. Has no specific personal details (move-in date, room number, personal incidents)
3. Contains phone numbers, WhatsApp numbers, contact info, or external links
4. Is unrealistically all-positive (suspiciously perfect) or all-negative (targeted attack)
5. Uses repetitive keywords, SEO-style phrases, or feels keyword-stuffed
6. Is very short and generic with no real information

Respond ONLY with valid JSON. No extra text, no markdown fences:
{"isSpam": true or false, "confidence": a number from 0 to 40, "reason": "one short sentence explaining why"}`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim().replace(/```json|```/g, "");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Gemini analysis failed:", err.message);
    // If AI fails, don't block — just skip this signal
    return { isSpam: false, confidence: 0, reason: "AI check skipped" };
  }
}

module.exports = { detectSpam };