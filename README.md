📱 VunaGuide Frontend (React + Vite)

The client-side application for VunaGuide, designed with a mobile-first approach to serve smallholder farmers in low-bandwidth environments. It provides a clean interface for diagnosing crop diseases via camera and chatting with the AI Agronomist.

✨ Features

Dual-Mode Interface: Seamlessly switch between Diagnose (Camera) and Chat (Text) tabs.

Mobile-Optimized: Large touch targets, native camera integration, and responsive grid layouts.

Real-Time Feedback: Animated loading states and clear result cards.

Google Search Integration: Displays real-time grounded responses from the backend.

🛠️ Tech Stack

Core: React 18, Vite

Styling: Tailwind CSS v4 (via @tailwindcss/vite)

Icons: Lucide React

Animations: Framer Motion

HTTP Client: Axios

🚀 Setup Guide

1. Prerequisites

Node.js 18+ installed.

The VunaGuide Backend running locally (or deployed).

2. Installation

# Install dependencies

npm install

3. Configuration

Create a .env file in the root directory (optional if using default localhost):

# Point this to your FastAPI backend URL

VITE_API_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000)

4. Running Development Server

npm run dev

The app will launch at: http://localhost:5173

📱 How to Use

Diagnose Mode: Click the Camera icon to snap a photo of a sick plant. The app will display the disease name, confidence score, and treatment options.

Chat Mode: Ask questions like "When is the rainy season?" to get answers grounded in Google Search data.

📜 License

MIT License.
