'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopifyProduct } from '@/lib/shopify';
import { useCart } from '@/app/context/CartContext';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  recommendedProducts?: ShopifyProduct[];
}

interface GeminiChatDrawerProps {
  products: ShopifyProduct[];
}

const SUGGESTED_QUESTIONS = [
  '🍼 Best teether for sore gums?',
  '🌿 Purest wipes for sensitive skin?',
  '🪥 Toothbrush for 8-month baby',
];

function parseReplyText(rawText: string): string {
  if (!rawText) return '';
  let text = rawText.trim();
  
  if (text.startsWith('{')) {
    try {
      const parsed = JSON.parse(text);
      if (parsed.reply) return parsed.reply;
    } catch {
      const match = text.match(/"reply"\s*:\s*"([^"]*)/);
      if (match && match[1]) {
        text = match[1];
      }
    }
  }
  return text.replace(/^"|"$/g, '');
}

// Formats **text** into styled bold elements
function renderFormattedMessage(rawText: string) {
  const cleaned = parseReplyText(rawText);
  const parts = cleaned.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-extrabold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function GeminiChatDrawer({ products }: GeminiChatDrawerProps) {
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Hi there! 👋 I’m your Babyblu Pediatric Concierge. How can I help you choose safe essentials today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleAddProduct = (product: ShopifyProduct) => {
    addToCart(product);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const sendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    if (!textToSend) setInput('');
    
    const updatedMessages: Message[] = [...messages, { sender: 'user', text: query }];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          messages: updatedMessages, // Pass full chat history for conversation memory
          catalog: products,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', text: `⚠️ ${data.error || 'Connection issue'}` },
        ]);
      } else {
        const recommended = (data.productIds || [])
          .map((id: string) => products.find((p) => p.id === id))
          .filter(Boolean) as ShopifyProduct[];

        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: data.reply || 'Here are some gentle options:',
            recommendedProducts: recommended,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Network connection issue. Please try again!' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Assistant Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white border-2 border-sky-300 shadow-2xl p-1 cursor-pointer flex items-center justify-center group"
          aria-label="Open AI Assistant"
        >
          <span className="absolute inset-0 rounded-full bg-sky-400/20 animate-ping -z-10 pointer-events-none"></span>

          <div className="relative w-full h-full rounded-full overflow-hidden border border-sky-100">
            <Image
              src="/assistant.png"
              alt="Babyblu AI Assistant"
              fill
              sizes="72px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>

          <span className="absolute top-0 right-0 flex h-4 w-4 z-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white shadow-xs"></span>
          </span>
        </motion.button>
      </div>

      {/* Slide-out Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed bottom-24 right-6 z-50 w-88 sm:w-96 bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden flex flex-col h-[520px] max-h-[calc(100vh-120px)]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-600 p-4 text-white font-extrabold flex justify-between items-center shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-white/20 p-0.5 border border-white/40 shadow-xs shrink-0 overflow-hidden">
                  <Image
                    src="/assistant.png"
                    alt="Babyblu AI"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-black leading-tight flex items-center gap-1.5">
                    Babyblu Concierge
                    <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                      AI
                    </span>
                  </h4>
                  <span className="text-[10px] text-sky-100 font-medium flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online • Pediatric Guidance
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-sm flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick Prompt Suggestions */}
            {messages.length <= 2 && (
              <div className="bg-sky-50/80 p-3 border-b border-sky-100 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(q)}
                    className="text-[11px] font-bold bg-white text-sky-700 border border-sky-200/80 rounded-full px-3 py-1.5 whitespace-nowrap hover:bg-sky-100/80 hover:scale-102 active:scale-98 transition-all cursor-pointer shadow-2xs"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/70">
              {messages.map((m, idx) => (
                <div key={idx} className="space-y-2">
                  <div className={`flex items-end gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {m.sender === 'ai' && (
                      <div className="relative w-6 h-6 rounded-full overflow-hidden border border-sky-200 shrink-0 mb-1">
                        <Image
                          src="/assistant.png"
                          alt="AI"
                          fill
                          sizes="24px"
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] p-3.5 rounded-2xl text-xs font-medium leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-br-xs shadow-xs'
                          : 'bg-white text-slate-800 border border-slate-100/90 rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      {renderFormattedMessage(m.text)}
                    </div>
                  </div>

                  {/* Slurrp Farm Visual Product Recommendation Cards */}
                  {m.recommendedProducts && m.recommendedProducts.length > 0 && (
                    <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 no-scrollbar pl-8">
                      {m.recommendedProducts.map((prod) => {
                        const price = parseFloat(
                          prod.priceRange?.minVariantPrice?.amount || '0'
                        ).toFixed(0);
                        const imageUrl = prod.images?.edges[0]?.node?.url;
                        const isAdded = addedIds[prod.id];

                        return (
                          <div
                            key={prod.id}
                            className="bg-white border border-slate-200/80 rounded-2xl p-2.5 w-44 shrink-0 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                          >
                            <div>
                              <div className="w-full h-28 bg-gradient-to-b from-sky-50/60 to-slate-50 rounded-xl overflow-hidden relative mb-2 flex items-center justify-center p-1">
                                {imageUrl ? (
                                  <img
                                    src={imageUrl}
                                    alt={prod.title}
                                    className="w-full h-full object-contain"
                                  />
                                ) : (
                                  <span className="text-2xl">🍼</span>
                                )}
                              </div>
                              <h5 className="font-bold text-slate-900 text-xs line-clamp-2 leading-snug">
                                {prod.title}
                              </h5>
                            </div>

                            <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-50">
                              <span className="font-black text-slate-900 text-xs">
                                ₹{price}
                              </span>
                              <button
                                onClick={() => handleAddProduct(prod)}
                                className={`text-[10px] font-black px-2.5 py-1.5 rounded-full transition-all cursor-pointer ${
                                  isAdded
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-amber-400 hover:bg-amber-500 text-slate-950'
                                }`}
                              >
                                {isAdded ? 'Added ✓' : '+ Add'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 bg-white border border-slate-100 text-slate-400 p-3 rounded-2xl rounded-bl-xs text-xs italic w-fit ml-8 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                  Babyblu AI is reviewing pediatric guidelines...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-3.5 bg-white border-t border-slate-100 flex gap-2 items-center shrink-0">
              <input
                type="text"
                placeholder="Ask about teethers, wipes, oral care..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 text-xs border border-slate-200 rounded-full px-4 py-2.5 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 font-medium transition-all"
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="bg-sky-500 hover:bg-sky-600 disabled:opacity-40 text-white font-extrabold text-xs px-4 py-2.5 rounded-full cursor-pointer transition-all shadow-2xs active:scale-95 flex items-center gap-1 shrink-0"
              >
                <span>Send</span>
                <span>✨</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}