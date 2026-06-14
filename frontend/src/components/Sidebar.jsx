import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Bot,
  Upload,
  Sun,
  Moon
} from "lucide-react";

export default function Sidebar({
  darkMode,
  setDarkMode,
}) {
  return (
    <div
      className={`fixed left-0 top-0 h-screen w-72 border-r z-50
      ${
        darkMode
          ? "bg-slate-950 border-slate-800 text-white"
          : "bg-white border-slate-200 text-slate-900"
      }`}
    >
      <div className="p-8">

        <h1 className="text-4xl font-black">
          MANTIS
        </h1>

        <p className="opacity-70">
          AI Technician
        </p>

      </div>

      <div className="px-4 space-y-2">

        <Link
          to="/"
          className="flex items-center gap-3 p-4 rounded-xl hover:bg-emerald-500/20"
        >
          <LayoutDashboard />
          Dashboard
        </Link>

        <Link
          to="/product/1"
          className="flex items-center gap-3 p-4 rounded-xl hover:bg-cyan-500/20"
        >
          <Bot />
          Diagnostics
        </Link>

        <Link
          to="/upload"
          className="flex items-center gap-3 p-4 rounded-xl hover:bg-purple-500/20"
        >
          <Upload />
          Upload
        </Link>

      </div>

      <button
        onClick={() =>
          setDarkMode(!darkMode)
        }
        className="absolute bottom-8 left-6 flex gap-3"
      >
        {darkMode ? <Sun /> : <Moon />}
        Theme
      </button>
    </div>
  );
}