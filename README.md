# 📌 SpotMe — AI Event Photo Discovery Platform

**SpotMe** is a web platform that helps event participants **find photos of themselves** using **Face Recognition & Vector Search**.

Hosts create events, photographers upload photos, and participants simply upload a selfie to discover matching pictures from the event.

---

## ✨ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + TypeScript + TailwindCSS + Vite |
| Backend | FastAPI (Python) |
| Database | PostgreSQL |
| Face Embeddings | InsightFace / OnnxRuntime |
| Vector Search | Qdrant Cloud |
| Auth | JWT (Role-based) |

---

## 🚀 Features

✔ Host creates events & gets **unique event code**  
✔ Photographer uploads photos linked to the event  
✔ Participant uploads a selfie → finds matching event photos  
✔ AI-powered **face recognition** using embeddings + Qdrant search  
✔ Users can **download** their matched photos  
✔ Secure JWT login (Host / Photographer / Participant)  
✔ Beautiful **Neon Gradient UI** 🎨

---

## 🤖 Face Recognition (How it Works)

1️⃣ Photo → Face detected using InsightFace  
2️⃣ Generate **embedding vector** (face representation)  
3️⃣ Save vector into **Qdrant**  
4️⃣ Participant uploads selfie → embedding generated  
5️⃣ Qdrant returns **closest matching results**  
6️⃣ UI displays matches + similarity score

---

## 🔧 Requirements

### Backend
- Python 3.10+
- PostgreSQL
- Qdrant Cloud (free)

### Frontend
- Node.js 18+
- npm or yarn

---

## ⚙ Backend Setup (FastAPI)

📍 Create `backend/.env`:

```env
DATABASE_URL=postgresql://postgres:YOURPASS@localhost:5432/spotme
JWT_SECRET=your_jwt_secret

QDRANT_URL=https://YOUR-CLUSTER.qdrant.io
QDRANT_API_KEY=YOUR-QDRANT-KEY
```

📍 Run backend:

```sh
cd backend
python -m venv venv
source venv/Scripts/activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at: http://localhost:8000

---

## 🎨 Frontend Setup (React + Vite)

📍 Confirm `frontend/src/api/axios.ts` contains:

```ts
export const API_BASE_URL = "http://localhost:8000";
```

📍 Run frontend:

```sh
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

---

## 🔑 User Roles

| Role | Actions |
|------|--------|
| Host | Create/manage events |
| Photographer | Upload event photos |
| Participant | Upload selfie & download images |

---

## 📸 File Storage Structure

```
backend/uploads/EVT-ABC123/filename.jpeg
```

Public access URL:

```
http://localhost:8000/uploads/EVT-ABC123/filename.jpeg
```

---

## 📚 API Docs

Swagger UI:  
➡ http://localhost:8000/docs

---

## 🧪 Testing Flow

| Step | User | Action |
|------|------|--------|
| 1 | Host | Create event → Copy event code |
| 2 | Photographer | Upload event photos |
| 3 | Participant | Upload selfie & search |
| 4 | Participant | Download photos |

---
