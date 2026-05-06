# 🏠 StayStory – Your Stay, Your Story

**StayStory** is a MERN-based full-stack web application that enables users to share honest and real reviews of their stays in **hostels**, **PGs**, and **flats**. It helps others make informed decisions based on true experiences—not just photoshopped brochures or marketing pitches.

Explore here - https://stay-story-client.onrender.com/  

---

## 🌐 Live Demo

🔗 [Explore StayStory](https://www.linkedin.com/posts/stay-story-416730370_staystory-realstays-hostelreview-activity-7342958361568530433-Ol9N?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFvxyVIBBpo1V1vRF44_j72jGZZK66AX-0o)

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🎯 Use Cases](#-use-cases)
- [🧰 Tech Stack](#-tech-stack)
- [⚙️ Installation & Setup](#️-installation--setup)
- [🔐 Environment Variables](#-environment-variables)
- [▶️ Running the App](#️-running-the-app)
- [🌟 Core Functionalities](#-core-functionalities)

---

✨ Features
📝 Post detailed stay reviews (hostels, PGs, flats)
📸 Upload multiple real-life photos
🔍 Search stories by keywords or location
🔐 Google login with OAuth 2.0
🧰 Full CRUD (Create, Read, Update, Delete) for reviews
🌐 Language switch: English ↔ Hindi
📱 Responsive UI for mobile & desktop
🤖 AI-based story genuineness check to detect misleading, promotional, or low-quality content

---

## 🎯 Use Cases

- 🧑‍🎓 Students shifting to a new city for education
- 👩‍💼 Working professionals relocating for jobs
- 🧭 Anyone searching for verified stay insights from real people

---


## 🧰 Tech Stack – The MERN Power 💪

| Technology | Role                 |
|------------|----------------------|
| **MongoDB**| NoSQL Database       |
| **Express.js** | Web framework for backend |
| **React.js**   | Frontend library for UI |
| **Node.js**    | Runtime environment for backend |

---


## 🌟 Core Functionalities
| Feature            | Description                                    |
| ------------------ | ---------------------------------------------- |
| 🧾 Review System   | Users can create, edit, or delete stay reviews |
| 🖼 Photo Upload    | Multiple images per post via Cloudinary         |
| 🔍 Smart Search    | Find stories using keywords or location        |
| 🔐 Auth System     | Google OAuth login                             |
| 🌐 Language Toggle | English ↔ Hindi                                |
| 🎨 Responsive UI   | Works across all devices                       |

## ⚙️ Installation & Setup

### Clone the Repo

```bash
git clone https://github.com/SSrivastava18/Stay-Story.git
cd StayStory

# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

## 🔐 Environment Variables

MONGO_URI=your_mongodb_connection
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret


## ▶️ Running the App Locally

  -> Start Backend (Node + Express):
    cd server,
    npm start
    
  -> Start Frontend (React):
    cd client,
    npm start





    
  



