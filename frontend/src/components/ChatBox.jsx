import { useState } from "react";
import { Bot, Send } from "lucide-react";
import axios from "axios";

export default function ChatBox({ darkMode }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to Mantis AI. Describe the issue with your Honda Activa 6G.",
    },
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/chat",
        {
          product_id: 1,
          session_id: "demo-session",
          message: userMessage,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Backend not connected. Demo response: Is the headlight working normally?",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div
      className={`rounded-3xl p-6 h-full flex flex-col border ${
        darkMode
          ? "bg-white/5 border-white/10 backdrop-blur-xl"
          : "bg-white border-slate-200 shadow-sm"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Bot className="text-emerald-400" />

          <div>
            <h2 className="text-2xl font-bold">
              Diagnostic Engine
            </h2>

            <p className="text-sm opacity-60">
              Technician Mode Active
            </p>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
          AI LIVE
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                msg.role === "user"
                  ? "bg-emerald-500 text-black"
                  : darkMode
                  ? "bg-slate-800 text-white"
                  : "bg-slate-200 text-slate-900"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div
              className={`px-4 py-3 rounded-2xl text-sm ${
                darkMode
                  ? "bg-slate-800 text-white"
                  : "bg-slate-200 text-slate-900"
              }`}
            >
              Technician is thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Describe the issue..."
          className={`flex-1 rounded-xl px-4 py-3 border outline-none ${
            darkMode
              ? "bg-slate-900 border-slate-700 text-white"
              : "bg-white border-slate-300 text-slate-900"
          }`}
        />

        <button
          onClick={sendMessage}
          className="bg-emerald-500 hover:bg-emerald-600 px-5 rounded-xl flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}