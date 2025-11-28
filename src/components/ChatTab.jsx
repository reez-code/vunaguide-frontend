import { useState, useRef, useEffect } from "react";
import { Send, Loader2, User, Sprout, Search } from "lucide-react";
import { motion } from "framer-motion";

export function ChatTab({ history = [], onAsk, loading }) {
  const [text, setText] = useState("");
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, loading]);

  const handleSubmit = () => {
    if (text.trim() && !loading) {
      onAsk(text);
      setText("");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-[600px] flex flex-col overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50/80 backdrop-blur-sm flex justify-between items-center">
        <div>
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-600" />
            Agricultural Assistant
          </h3>
          <p className="text-xs text-emerald-600 flex items-center gap-1 mt-0.5">
            <Search className="w-3 h-3" />
            Powered by Google Search
          </p>
        </div>
        <div className="text-xs text-gray-400 font-medium">Online</div>
      </div>

      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/30"
      >
        {/* Empty State / Welcome Message */}
        {history.length === 0 && (
          <div className="text-center text-gray-400 mt-20 px-6">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-emerald-300" />
            </div>
            <p className="text-sm font-medium text-gray-600">
              Ask VunaGuide anything.
            </p>
            <p className="text-xs mt-2">
              Try: "What is the market price of Maize in Eldoret today?"
            </p>
          </div>
        )}

        {/* Message List */}
        {history.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                msg.role === "user"
                  ? "bg-emerald-100 border-emerald-200"
                  : "bg-white border-gray-200"
              }`}
            >
              {msg.role === "user" ? (
                <User className="w-4 h-4 text-emerald-700" />
              ) : (
                <Sprout className="w-4 h-4 text-emerald-600" />
              )}
            </div>

            {/* Bubble */}
            <div
              className={`p-3.5 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm ${
                msg.role === "user"
                  ? "bg-emerald-600 text-white rounded-tr-none"
                  : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
              <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
            </div>
            <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl rounded-tl-none text-gray-500 text-xs flex items-center gap-2 shadow-sm">
              Thinking...
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-100">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Type your question..."
            className="flex-1 bg-gray-100 text-gray-900 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm placeholder-gray-400"
          />
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || loading}
            className="bg-emerald-600 text-white p-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-700 active:scale-95 transition-all shadow-md shadow-emerald-200"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
