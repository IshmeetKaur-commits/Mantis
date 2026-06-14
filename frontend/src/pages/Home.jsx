import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  FileText,
  Wrench,
  Activity,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home({ darkMode = true }) {
  return (
    <div
      className={`min-h-screen overflow-hidden relative ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

      <div className="relative z-10 px-8 py-10">

        {/* Hero Section */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center py-16">

            <span className="bg-emerald-500/20 text-emerald-400 px-5 py-2 rounded-full text-sm font-semibold">
              AI Technician Platform
            </span>

            <h1 className="text-7xl md:text-8xl font-black mt-8 leading-none">

              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                MANTIS
              </span>

            </h1>

            <p className="text-2xl md:text-3xl mt-6 font-medium max-w-4xl mx-auto">
              Diagnose products intelligently using manuals,
              retrieval systems, and technician-style reasoning.
            </p>

            <div className="flex justify-center gap-5 mt-10 flex-wrap">

              <Link
                to="/product/1"
                className="bg-emerald-500 hover:bg-emerald-600 px-8 py-4 rounded-2xl font-semibold flex items-center gap-2"
              >
                Start Diagnosis
                <ArrowRight size={20} />
              </Link>

              <Link
                to="/upload"
                className="border border-white/20 hover:border-cyan-400 px-8 py-4 rounded-2xl font-semibold"
              >
                Upload Manuals
              </Link>

            </div>
          </div>
        </motion.div>

        {/* Stats */}

        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <Wrench className="text-emerald-400" size={36} />
            <h2 className="text-4xl font-bold mt-4">1</h2>
            <p className="opacity-70 mt-1">Products</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <FileText className="text-cyan-400" size={36} />
            <h2 className="text-4xl font-bold mt-4">2</h2>
            <p className="opacity-70 mt-1">Manuals</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <Bot className="text-purple-400" size={36} />
            <h2 className="text-4xl font-bold mt-4">Live</h2>
            <p className="opacity-70 mt-1">AI Assistant</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <Activity className="text-orange-400" size={36} />
            <h2 className="text-4xl font-bold mt-4">Ready</h2>
            <p className="opacity-70 mt-1">Diagnostics</p>
          </div>

        </div>

        {/* Product Showcase */}

        <div className="max-w-7xl mx-auto mt-12">

          <Link to="/product/1">

            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              className="
              bg-white/5
              backdrop-blur-xl
              border
              border-white/10
              rounded-[32px]
              p-10
              cursor-pointer
              overflow-hidden
              "
            >
              <div className="grid lg:grid-cols-2 gap-10 items-center">

                <div>

                  <div className="text-[120px]">
                    🛵
                  </div>

                  <h2 className="text-5xl font-black mt-4">
                    Honda Activa 6G
                  </h2>

                  <p className="text-lg opacity-70 mt-4">
                    Intelligent scooter troubleshooting platform
                    powered by AI diagnostics and manual retrieval.
                  </p>

                  <div className="flex flex-wrap gap-3 mt-6">

                    <span className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full">
                      Manuals Loaded
                    </span>

                    <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full">
                      MOSS Connected
                    </span>

                    <span className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full">
                      AI Ready
                    </span>

                  </div>

                </div>

                <div className="space-y-4">

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <ShieldCheck className="text-emerald-400 mb-3" />
                    <h3 className="font-bold text-xl">
                      Technician Mode
                    </h3>

                    <p className="opacity-70 mt-2">
                      AI asks follow-up questions like a real mechanic.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <Cpu className="text-cyan-400 mb-3" />
                    <h3 className="font-bold text-xl">
                      Intelligent Retrieval
                    </h3>

                    <p className="opacity-70 mt-2">
                      Finds answers directly from uploaded manuals.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <Bot className="text-purple-400 mb-3" />
                    <h3 className="font-bold text-xl">
                      Guided Diagnosis
                    </h3>

                    <p className="opacity-70 mt-2">
                      Generates probable causes and repair actions.
                    </p>
                  </div>

                </div>

              </div>
            </motion.div>

          </Link>

        </div>

      </div>
    </div>
  );
}