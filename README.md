# VunaGuide Frontend

<p align="center">
  <strong>AI-Powered Crop Doctor for Smallholder Farmers in Kenya 🇰🇪</strong>
</p>

<p align="center">
  <a href="https://github.com/reez-code/vunaguide-backend">View Backend Repository</a> · 
  <a href="https://github.com/reez-code/vunaguide-frontend/issues/new?labels=bug">Report Bug</a> · 
  <a href="https://github.com/reez-code/vunaguide-frontend/issues/new?labels=enhancement">Request Feature</a>
</p>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Setup Guide](#-setup-guide)
- [How to Use](#-how-to-use)
- [Project Structure](#-project-structure)
- [License](#-license)

---

## 📖 Overview

VunaGuide bridges the gap between expert agronomy and smallholder farmers. This mobile-first web application provides an intuitive interface for farmers to:

- **Diagnose Crop Diseases**: Instantly identify issues like Maize Lethal Necrosis or Tomato Blight using computer vision.
- **Get Localized Advice**: Receive actionable, locally relevant treatment plans (e.g., specific Kenyan fungicides or organic remedies).
- **Chat with an Expert**: Ask questions about planting seasons, market prices, and soil health, powered by real-time Google Search grounding.

Built for the **Unstacked Labs / Google AI Hackathon**, this frontend is optimized for performance in low-bandwidth environments common in rural Africa.

---

## ✨ Key Features

### 📸 Visual Diagnosis (Computer Vision)

- **Native Camera Integration**: Seamlessly captures photos directly from the device camera.
- **Smart Analysis**: Uploads images to the backend Agent for instant disease identification.
- **Actionable Results**: Displays clear, color-coded cards showing the disease name, confidence score, and a step-by-step treatment plan.
- **Safety First**: Prominently displays "Sentinel Warnings" if the AI detects high-risk conditions or potentially harmful advice.

### 💬 AI Agronomist Chat

- **Natural Language Interface**: Farmers can ask questions in plain English (or Swahili mixed).
- **Real-Time Grounding**: Answers are not just hallucinations; they are grounded in real-time data via Google Search (e.g., "Current fertilizer prices in Eldoret").
- **Context Aware**: Remembers the conversation history for a natural back-and-forth flow.

### ⚡ Mobile-Optimized UX

- **Responsive Design**: A grid layout that adapts beautifully from small phones to large desktop screens.
- **Touch-Friendly**: Large buttons and clear typography designed for ease of use in the field.
- **Visual Feedback**: Animated loading states (spinners, pulse effects) assure the user the app is working even on slow connections.

---

## 🛠️ Tech Stack

| Category        | Technology      | Why we chose it                                                                                             |
| --------------- | --------------- | ----------------------------------------------------------------------------------------------------------- |
| **Core**        | React 18        | Component-based architecture for modular UI development.                                                    |
| **Build Tool**  | Vite            | Extremely fast development server and optimized production builds.                                          |
| **Styling**     | Tailwind CSS v4 | Utility-first CSS for rapid, consistent, and responsive styling (using the new `@tailwindcss/vite` plugin). |
| **Icons**       | Lucide React    | Lightweight, clean, and consistent icon set.                                                                |
| **Animations**  | Framer Motion   | Smooth, hardware-accelerated animations for a polished feel.                                                |
| **HTTP Client** | Axios           | Robust handling of API requests and multipart form data (image uploads).                                    |

---

## 🚀 Setup Guide

Follow these steps to run the frontend locally.

### 1. Prerequisites

- **Node.js 18+** installed on your machine.
- The [VunaGuide Backend](https://github.com/reez-code/vunaguide-backend) running locally (port 8000) or deployed.

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/reez-code/vunaguide-frontend.git
cd vunaguide-frontend
npm install
```

### 3. Configuration

Create a `.env` file in the root directory to point to your backend. If running locally, you can skip this as it defaults to localhost.

```env
# .env
# Point this to your FastAPI backend URL (e.g., Cloud Run URL or localhost)
VITE_API_URL=http://127.0.0.1:8000
```

### 4. Running Development Server

Start the Vite development server:

```bash
npm run dev
```

The application will launch at: **http://localhost:5173**

> **Tip**: Open this URL on your mobile phone (connected to the same WiFi) to test the camera integration!

---

## 📱 How to Use

| **Mode 1: Diagnose 📸**                                                                                     | **Mode 2: Chat 💬**                                                                             |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Click the Camera icon to snap a photo of a sick leaf. Review the result card for disease status and advice. | Ask questions like _"When is the rainy season?"_ to get answers grounded in Google Search data. |

---

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/         # Modular UI Components
│   │   ├── ui/             # Reusable primitives (Button, ErrorMessage)
│   │   ├── ChatTab.jsx     # Chat interface logic
│   │   ├── DiagnoseTab.jsx # Camera/Upload logic
│   │   ├── Header.jsx      # App navigation bar
│   │   └── ResultCard.jsx  # Diagnosis display component
│   ├── utils/              # Configuration & Helpers
│   ├── App.jsx             # Main Application Layout
│   └── main.jsx            # Entry Point
├── public/                 # Static assets
└── index.html              # HTML template
```

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

<p align="center">
  <sub>Built with ❤️ for Kenyan Farmers using Google Vertex AI & Agentic Design Kit (ADK)</sub>
</p>
