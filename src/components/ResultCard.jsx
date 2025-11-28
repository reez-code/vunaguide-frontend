import { CheckCircle, AlertTriangle, Sprout, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export function ResultCard({ result, onReset }) {
  if (!result) return null;

  const isHealthy = result.status?.toLowerCase() === "healthy";
  const isChat = result.status?.toLowerCase() === "chat";
  const isNotPlant = result.status?.toLowerCase() === "not a plant";

  let theme = {
    bg: "bg-white",
    border: "border-l-red-500",
    badge: "bg-red-100 text-red-700",
  };

  if (isHealthy)
    theme = {
      bg: "bg-white",
      border: "border-l-green-500",
      badge: "bg-green-100 text-green-700",
    };
  if (isChat)
    theme = {
      bg: "bg-blue-50/50",
      border: "border-l-blue-500",
      badge: "bg-blue-100 text-blue-700",
    };
  if (isNotPlant)
    theme = {
      bg: "bg-gray-50",
      border: "border-l-gray-400",
      badge: "bg-gray-200 text-gray-700",
    };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 pb-20"
    >
      <div
        className={`p-5 rounded-2xl border-l-4 shadow-sm bg-white ${theme.border}`}
      >
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider opacity-60">
              Result
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {result.disease_name || result.status}
            </p>
          </div>
          {result.confidence_score > 0 && (
            <span
              className={`px-2 py-1 rounded-md text-xs font-bold ${theme.badge}`}
            >
              {result.confidence_score}% Match
            </span>
          )}
        </div>
        {result.plant_name !== "Unknown" &&
          result.plant_name !== "General Inquiry" && (
            <p className="text-sm text-gray-600">
              Plant Detected: <strong>{result.plant_name}</strong>
            </p>
          )}
      </div>

      {result.sentinel_flag && (
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-red-50 border border-red-200 p-4 rounded-xl flex gap-3 animate-pulse"
        >
          <ShieldAlert className="w-6 h-6 text-red-600 shrink-0" />
          <div className="text-sm text-red-800">
            <strong>Safety Warning:</strong> Dangerous condition detected.
            Handle with extreme caution.
          </div>
        </motion.div>
      )}

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 z-0" />
        <h3 className="font-bold text-emerald-800 mb-2 flex items-center gap-2 relative z-10">
          <Sprout className="w-5 h-5" />
          {isChat ? "Answer" : "Agronomist's Advice"}
        </h3>
        <p className="text-gray-700 leading-relaxed relative z-10 whitespace-pre-line text-sm">
          {result.local_advice}
        </p>
      </div>

      {result.remedies && result.remedies.length > 0 && (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            Action Plan
          </h3>
          <ul className="space-y-3">
            {result.remedies.map((remedy, idx) => (
              <li
                key={idx}
                className="flex gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100"
              >
                <span className="bg-emerald-100 text-emerald-700 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-sm">{remedy}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={onReset}
        className="w-full py-3 text-gray-500 font-medium hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
      >
        Start New Analysis
      </button>
    </motion.div>
  );
}
