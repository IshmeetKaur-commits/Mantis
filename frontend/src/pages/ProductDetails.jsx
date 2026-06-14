import {
  CheckCircle,
  FileText,
} from "lucide-react";

import ChatBox from "../components/ChatBox";

export default function ProductDetails({
  darkMode,
}) {
  const cardClass = darkMode
    ? "bg-white/5 border border-white/10 backdrop-blur-xl"
    : "bg-white border border-slate-200 shadow-sm";

  return (
    <div
      className={`min-h-screen p-6 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* LEFT PANEL */}
        <div className="space-y-6">

          {/* Product Card */}
          <div
            className={`${cardClass} rounded-3xl p-6`}
          >
            <div className="text-[100px]">
              🛵
            </div>

            <h1 className="text-4xl font-black">
              Honda Activa 6G
            </h1>

            <p className="opacity-70 mt-2">
              AI-powered diagnostic system
              for scooter troubleshooting
            </p>
          </div>

          {/* System Status */}
          <div
            className={`${cardClass} rounded-3xl p-6`}
          >
            <h2 className="text-xl font-bold mb-4">
              System Status
            </h2>

            <div className="space-y-3 text-sm">

              <div className="flex items-center gap-2">
                <CheckCircle className="text-emerald-400" />
                Manuals Loaded
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle className="text-emerald-400" />
                MOSS Retrieval Active
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle className="text-emerald-400" />
                AI Diagnostic Engine Ready
              </div>

            </div>
          </div>

          {/* Workflow */}
          <div
            className={`${cardClass} rounded-3xl p-6`}
          >
            <h2 className="text-xl font-bold mb-4">
              Diagnostic Flow
            </h2>

            <div className="space-y-3 text-sm">
              <div>✓ Issue Reported</div>
              <div>✓ Questioning Phase</div>
              <div>✓ Manual Retrieval</div>
              <div>✓ Root Cause Detection</div>
              <div>✓ Repair Suggestion</div>
            </div>
          </div>

          {/* Documents */}
          <div
            className={`${cardClass} rounded-3xl p-6`}
          >
            <h2 className="text-xl font-bold mb-4">
              Documents
            </h2>

            <div className="space-y-3 text-sm">

              <div className="flex items-center gap-2">
                <FileText />
                Service Manual.pdf
              </div>

              <div className="flex items-center gap-2">
                <FileText />
                Troubleshooting Guide.pdf
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-2">
          <ChatBox darkMode={darkMode} />
        </div>

      </div>
    </div>
  );
}