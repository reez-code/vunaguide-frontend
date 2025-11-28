import { Leaf } from "lucide-react";

export function Header() {
  return (
    <header className="bg-emerald-600 text-white p-4 shadow-lg sticky top-0 z-20">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">VunaGuide</h1>
            <p className="text-xs text-emerald-100 opacity-90">
              AI Crop Doctor
            </p>
          </div>
        </div>
        <div className="text-xs bg-black/20 px-2 py-1 rounded border border-white/10">
          Capstone v1
        </div>
      </div>
    </header>
  );
}
