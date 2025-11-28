import { useState, useRef } from "react";
import { Camera, XCircle, Loader2, Sprout } from "lucide-react";
import { Button } from "./ui/Button";

export function DiagnoseTab({ onAnalyze, loading }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = () => {
    if (file) onAnalyze(file);
  };

  if (preview) {
    return (
      <div className="space-y-4">
        <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white aspect-4/3 bg-black">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain"
          />

          {!loading && (
            <button
              onClick={handleClear}
              className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full backdrop-blur-md hover:bg-red-500 transition-colors cursor-pointer"
            >
              <XCircle className="w-5 h-5" />
            </button>
          )}

          {loading && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white backdrop-blur-sm">
              <Loader2 className="w-10 h-10 animate-spin mb-3" />
              <p className="font-medium animate-pulse">
                Consulting Agronomist...
              </p>
            </div>
          )}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 text-lg"
        >
          <Sprout className="w-5 h-5" /> Identify Disease
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => inputRef.current?.click()}
        className="w-full aspect-4/3 bg-white border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-emerald-500 hover:bg-emerald-50 transition-all group active:scale-95 cursor-pointer"
      >
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <Camera className="w-8 h-8 text-emerald-600" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-gray-700">Take a Photo</p>
          <p className="text-xs text-gray-400">or upload from gallery</p>
        </div>
      </button>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={handleFile}
      />
    </div>
  );
}
