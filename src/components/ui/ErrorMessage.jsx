import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 flex items-start gap-3"
    >
      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold text-sm">Error</p>
        <p className="text-sm opacity-90">{message}</p>
      </div>
    </motion.div>
  );
}
