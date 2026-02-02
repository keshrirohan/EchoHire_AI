# EchoHire AI – Smart Interview Preparation Platform

EchoHire AI is a web-based AI-powered interview preparation platform that simulates real interview experiences using live camera, microphone, and AI-driven feedback. It helps candidates practice interviews in a structured, realistic, and stress-free environment.

---

## 🚀 Project Overview

Many candidates struggle with:

- Interview anxiety  
- Lack of real interview practice  
- No structured feedback  
- Difficulty preparing for role-specific questions  

EchoHire AI solves this by providing a **real-time AI interviewer** that asks personalized questions based on the Job Description (JD) and evaluates answers just like a human interviewer.

---

## 🎯 Key Features

### 🔹 Core Functionalities

- JD-based personalized interview flow  
- Live camera preview for realistic experience  
- Real-time voice recording  
- Speech-to-text transcription  
- AI-generated follow-up questions  
- Multi-round interview simulation  
- Salary negotiation round  
- AI-generated final interview report  

### 🔹 Interview Rounds

1. **HR Round** – Communication and personality-based questions  
2. **Technical Round** – Skill-based technical questions  
3. **Managerial Round** – Behavioral and situational questions  
4. **Salary Round** – HR-style salary negotiation  

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- React.js
- Tailwind CSS
- Web Speech API
- WebRTC (getUserMedia)

### Backend
- Node.js
- Express.js
- Google Gemini AI (Generative AI)
- REST API

---

## 🧩 How It Works

1. User pastes a Job Description  
2. AI generates role-specific interview questions  
3. User answers using microphone and camera  
4. Speech is converted to text in real time  
5. AI asks intelligent follow-up questions  
6. System conducts multiple interview rounds  
7. Final AI-generated interview report is displayed  

---

## 📂 Project Structure

EchoHire
│
├── frontend
│ ├── app
│ │ ├── interview
│ │ │ └── page.jsx
│ │ ├── report
│ │ │ └── page.jsx
│ │ └── page.jsx
│ ├── components
│ │ ├── CameraPreview.jsx
│ │ ├── InterviewerPanel.jsx
│ │ ├── TranscriptBox.jsx
│ │ └── Controls.jsx
│ └── lib
│ ├── speak.js
│ └── speech.js
│
└── backend
├── index.js
├── .env
└── package.json


---

## ⚙️ Installation Guide

### 1. Clone the Repository

```bash
## ⚙️ Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/echohire-ai.git
2. Setup Backend
cd backend
npm install
Create a .env file:

GEMINI_API_KEY=your_google_gemini_api_key
Start backend:

npm start
3. Setup Frontend
cd frontend
npm install
npm run dev
Open:

http://localhost:3000

---

## 💡 What This README Covers

✔ Full project explanation  
✔ Setup instructions  
✔ Features  
✔ Tech stack  
✔ Folder structure  
✔ API details  
✔ Usage guide  
✔ Future scope  

---

### If you want, I can also help you:

- Create a **GitHub repository description**
- Write a **project report PDF**
- Generate a **portfolio case study**

Just tell me:

👉 **“create GitHub description next”**


