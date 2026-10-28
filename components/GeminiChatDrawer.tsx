'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopifyProduct } from '@/lib/shopify';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface GeminiChatDrawerProps {
  products: ShopifyProduct[];
}

export default function GeminiChatDrawer({ products }: GeminiChatDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: 'Hi! 👋 Need help picking safe oral care or teethers for your little one?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, catalog: products }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', text: `⚠️ ${data.error || 'API Error'}` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', text: data.reply || 'Sorry, try asking again!' },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Connection issue. Please try again!' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-extrabold px-5 py-3.5 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2 border-2 border-white cursor-pointer"
      >
        <span>✨ Ask Babyblu AI</span>
      </button>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden flex flex-col h-[480px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-400 to-sky-400 p-4 text-white font-extrabold flex justify-between items-center">
              <span className="flex items-center gap-2">✨ Babyblu AI Concierge</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-slate-200 font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`max-w-[82%] p-3 rounded-2xl text-xs font-medium leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-sky-500 text-white ml-auto rounded-br-xs'
                      : 'bg-white text-slate-800 border border-pink-100 mr-auto rounded-bl-xs shadow-2xs'
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {loading && (
                <div className="text-xs text-slate-400 italic">Gemini is thinking...</div>
              )}
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input
                type="text"
                placeholder="Ask e.g. best teether for sore gums..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 text-xs border border-slate-200 rounded-full px-4 py-2 focus:outline-hidden focus:border-sky-400"
              />
              <button
                onClick={sendMessage}
                className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold px-4 py-2 rounded-full cursor-pointer"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}