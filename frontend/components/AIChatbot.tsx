"use client";

import { useState, useRef, useEffect } from "react";

// You can replace this SVG with your exact Hugeicons import:
// import { HugeiconsIcon, Female02Icon } from "hugeicons-react";
// <HugeiconsIcon icon={Female02Icon} size={24} color="currentColor" />
const FemaleAvatarIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 14C14.7614 14 17 11.7614 17 9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9C7 11.7614 9.23858 14 12 14Z" />
    <path d="M12 14C14.7614 14 17 11.7614 17 9C17 7.5 16.5 6 15 5C14.5 4.5 13.5 4 12 4C10.5 4 9.5 4.5 9 5C7.5 6 7 7.5 7 9C7 11.7614 9.23858 14 12 14Z" fillOpacity="0.5" />
    <path d="M20.5 20C20.5 17.5 17.5 15.5 12 15.5C6.5 15.5 3.5 17.5 3.5 20C3.5 20.5 4 21 4.5 21H19.5C20 21 20.5 20.5 20.5 20Z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const SendIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

type Message = {
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
};

const suggestedQuestions = [
  "How can I volunteer with AVARTYA?",
  "What impact has AVARTYA made so far?",
  "How are donations used?",
  "What programmes do you run?",
];

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello! I'm the AVARTYA assistant.\n\nI can help you with volunteering, our impact, donations, and local initiatives. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, open]);

  const sendMessage = async (text?: string) => {
    const query = text || input.trim();
    if (!query || loading) return;

    const userMsg: Message = { role: "user", text: query, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      const answer = data.answer || data.message || "I'm unable to respond right now. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", text: answer, timestamp: new Date() }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Floating Button Ecosystem */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
        
        {/* Chat Window */}
        {open && (
          <div
            id="ai-chatbot-window"
            className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 w-[380px] max-w-[calc(100vw-2rem)] flex flex-col overflow-hidden transition-all duration-300 ease-in-out origin-bottom-right"
            style={{ height: "600px", maxHeight: "80vh" }}
          >
            {/* Header */}
            <div className="bg-emerald-600 px-5 py-4 flex items-center justify-between shadow-sm z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-sm border border-white/20 shadow-inner">
                  <FemaleAvatarIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm tracking-wide">AVARTYA Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
                    </span>
                    <p className="text-emerald-100 text-xs font-medium">Online</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-emerald-100 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all duration-200"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5 bg-slate-50/50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {/* Assistant Avatar */}
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm border border-emerald-50">
                      <FemaleAvatarIcon className="w-5 h-5" />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[75%] px-4 py-3 shadow-sm ${
                      msg.role === "user"
                        ? "bg-emerald-600 text-white rounded-2xl rounded-tr-sm"
                        : "bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-tl-sm"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
                    <p
                      className={`text-[10px] mt-1.5 font-medium ${
                        msg.role === "user" ? "text-emerald-200" : "text-slate-400"
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex justify-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm border border-emerald-50">
                    <FemaleAvatarIcon className="w-5 h-5" />
                  </div>
                  <div className="bg-white border border-slate-100 px-4 py-4 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-sm">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              {/* Suggested questions */}
              {messages.length === 1 && !loading && (
                <div className="pt-2">
                  <p className="text-xs text-slate-400 font-medium mb-3 ml-1">Suggested for you</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-left text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-full px-4 py-2 transition-all duration-200 ease-in-out hover:shadow-sm"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} className="h-px" />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="flex items-center gap-2 bg-slate-50 rounded-full border border-slate-200 pl-4 pr-1.5 py-1.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-50 focus-within:bg-white transition-all shadow-sm">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about AVARTYA..."
                  disabled={loading}
                  className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none disabled:opacity-50 py-1.5"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center shrink-0 hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                  aria-label="Send message"
                >
                  <SendIcon />
                </button>
              </div>
              <div className="flex justify-center items-center gap-1 mt-3">
                <FemaleAvatarIcon className="w-3 h-3 text-slate-300" />
                <p className="text-[10px] text-slate-400 font-medium">
                  Powered by AVARTYA AI
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <button
          id="ai-chatbot-toggle"
          onClick={() => setOpen((o) => !o)}
          className={`w-14 h-14 rounded-full shadow-[0_8px_20px_rgb(5,150,105,0.3)] flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 ${
            open ? "bg-slate-800 hover:bg-slate-900 text-white" : "bg-emerald-600 hover:bg-emerald-700 text-white"
          }`}
          aria-label={open ? "Close chatbot" : "Open chatbot"}
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <ChatIcon />
          )}
        </button>
      </div>
    </>
  );
}