# Frontend - React + Vite

This is the frontend of the project, built with **React + Vite**.  
It allows users to upload and view PDFs, highlight text, and interact with the backend.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-link>
cd frontend
```

### 2. Install dependencies
```bash
Copy code
npm install
```
### 3. Setup environment variables
Create a .env file in the frontend root:
```
ini
Copy code
VITE_API_BASE_URL=http://localhost:3000
⚠️ All environment variables must start with VITE_ in Vite.
```
### 4. Run development server
```bash
Copy code
npm run dev
```
Your app will be available at https://pdf-anno.netlify.app/

## 📂 Folder Structure
```bash
Copy code
frontend/
│── src/
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom hooks (axios, fetch, etc.)
│   ├── pages/           # Page-level components (PDF viewer, auth, etc.)
│   ├── App.jsx
│   └── main.jsx
│── public/              # Static files
│── .env                 # Environment variables
│── vite.config.js
│── package.json
```

## 🛠️ Tech Stack
React 18
Vite
Axios
Tailwind CSS
react-pdf / pdfjs
React Router DOM
yaml
Copy code

---
