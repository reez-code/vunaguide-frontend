import React, { useState } from "react";
import axios from "axios";
import { Camera, Search, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Header } from "./components/Header";
import { DiagnoseTab } from "./components/DiagnoseTab";
import { ChatTab } from "./components/ChatTab";
import { ResultCard } from "./components/ResultCard";
import { ErrorMessage } from "./components/ui/ErrorMessage";

const API_URL = "http://127.0.0.1:8000/api/v1/analyze";

export default function App() {
  const [activeTab, setActiveTab] = useState("diagnose");

  // Diagnosis State
  const [result, setResult] = useState(null);

  // Chat State
  const [chatHistory, setChatHistory] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Handle Camera Diagnosis
  const handleDiagnosis = async (file) => {
    setLoading(true);
    setError(null);
    setResult(null);

    // Clear old chat if switching context (optional)
    if (window.innerWidth < 768) setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Chat Message
  const handleChat = async (text) => {
    // Add User Message immediately
    const userMsg = { role: "user", text: text };
    setChatHistory((prev) => [...prev, userMsg]);

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("question", text);

    try {
      const response = await axios.post(API_URL, formData);

      // Add AI Response
      const aiMsg = {
        role: "ai",
        text: response.data.local_advice,
      };
      setChatHistory((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg = {
        role: "ai",
        text: "⚠️ Connection Error. Please try again.",
      };
      setChatHistory((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header />

      <main className="flex-1 w-full max-w-5xl mx-auto p-4 lg:p-8">
        <div
          className={`grid gap-8 transition-all duration-500 ${
            result && activeTab === "diagnose"
              ? "lg:grid-cols-2"
              : "lg:grid-cols-1 lg:max-w-2xl lg:mx-auto"
          }`}
        >
          {/* LEFT COLUMN: Input Section */}
          <div className="space-y-6">
            {/* Tab Switcher */}
            <div className="bg-white p-1.5 rounded-xl shadow-sm border border-gray-200 flex">
              <button
                onClick={() => setActiveTab("diagnose")}
                className={`flex-1 py-3 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
                  activeTab === "diagnose"
                    ? "bg-emerald-100 text-emerald-800 shadow-sm"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Camera className="w-4 h-4" />
                <span className="hidden sm:inline">Diagnose Crop</span>
                <span className="sm:hidden">Diagnose</span>
              </button>
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 py-3 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
                  activeTab === "chat"
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Ask Expert</span>
                <span className="sm:hidden">Ask</span>
              </button>
            </div>

            <ErrorMessage message={error} />

            {/* Input Forms */}
            <AnimatePresence mode="wait">
              {activeTab === "diagnose" ? (
                <motion.div
                  key="diagnose"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-6">
                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-gray-900">
                        Upload Photo
                      </h2>
                      <p className="text-gray-500 text-sm">
                        Take a clear picture of the affected leaf or plant.
                      </p>
                    </div>
                    <DiagnoseTab
                      onAnalyze={handleDiagnosis}
                      loading={loading}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Chat Component handles its own UI */}
                  <ChatTab
                    history={chatHistory}
                    onAsk={handleChat}
                    loading={loading}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Diagnosis Results (Only shows in Diagnose Mode) */}
          <AnimatePresence>
            {result && activeTab === "diagnose" && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 text-emerald-700 font-semibold lg:hidden">
                  <ArrowRight className="w-5 h-5" /> Analysis Result
                </div>

                <ResultCard result={result} onReset={() => setResult(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
