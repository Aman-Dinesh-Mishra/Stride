import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

export default function Chatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Stride AI. Ask about resumes, ATS tips, pricing, or career advice!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isOpen) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hi! I'm Stride AI. Ask about resumes, ATS tips, pricing, or career advice!",
        },
      ]);
      setInput("");
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setInput("");
    const API_BASE =
      window.location.hostname === "localhost"
        ? "http://localhost:8000"
        : "https://stride-l0ln.onrender.com";

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          max_tokens: 800,
          temperature: 0.7,
          messages: [
            {
              role: "system",
              content:
                "You are Stride AI, a resume assistant. Help with ATS optimization, resume writing, pricing ($9/$19/$49 plans), career advice. Be concise and professional. Format lists with • bullets. Use **bold** for emphasis.",
            },
            ...messages,
            userMsg,
          ],
        }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error?.message || "Unknown API error");

      const reply =
        data.choices?.[0]?.message?.content?.trim() || "No response from AI.";

      const formatted = reply
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/•/g, "• ")
        .replace(/\n\n/g, "<br><br>")
        .replace(/\n/g, "<br>");

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: formatted },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-6">
      <div className="w-full max-w-sm h-[450px] bg-white dark:bg-slate-900 border rounded-xl shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <h3 className="font-semibold text-sm">Stride AI</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 group"
          >
            <X
              size={16}
              className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors duration-200"
            />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-50 dark:bg-slate-800"
                }`}
                dangerouslySetInnerHTML={{ __html: msg.content }}
              />
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl text-sm flex items-center gap-2 shadow-sm">
                <div className="w-4 h-4 border-2 border-slate-400 border-t-indigo-500 rounded-full animate-spin" />
                <span className="text-slate-500">AI is typing...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about resumes, pricing, ATS..."
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="px-6 py-2 bg-indigo-500 text-white rounded-xl text-sm"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
