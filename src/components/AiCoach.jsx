import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, Sparkles, Dumbbell, Utensils, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { generateChatResponse } from '../services/geminiService';

const AiCoach = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: `Welcome back, ${user?.name.split(' ')[0] || 'Athlete'}. I'm ForgeBot. What's our mission today?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const handleClose = () => {
    setIsOpen(false);
    setMessages([
      { role: 'bot', text: `Welcome back, ${user?.name.split(' ')[0] || 'Athlete'}. I'm ForgeBot. What's our mission today?` }
    ]);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await generateChatResponse(userMsg, user);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Systems are heavy today. Try again in a minute, Athlete." }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    { text: 'Meal ideas', icon: Utensils },
    { text: 'Chest workout', icon: Dumbbell },
    { text: 'More energy', icon: Zap },
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(211,165,35,0.4)] z-[60] group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <MessageSquare className="w-7 h-7" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
          <Sparkles className="w-2.5 h-2.5 text-primary animate-pulse" />
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-end md:p-8 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="relative w-full max-w-md h-[600px] bg-[#0a0a0a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:rounded-[3rem] overflow-hidden flex flex-col pointer-events-auto"
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-primary/20 to-transparent border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-black">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg tracking-widest text-white">FORGEBOT AI</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[8px] font-bold uppercase tracking-widest text-white/50 text-green-500">Online & Ready</span>
                    </div>
                  </div>
                </div>
                <button onClick={handleClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X className="w-5 h-5 text-white/40" />
                </button>
              </div>

              {/* Messages Area */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: msg.role === 'bot' ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-2xl text-xs font-medium leading-relaxed ${
                      msg.role === 'bot' 
                        ? 'bg-white/5 text-white/80 border border-white/5' 
                        : 'bg-primary text-black font-bold border border-primary/20'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-1">
                      <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-primary/80 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions */}
              {!loading && messages.length < 3 && (
                <div className="px-6 pb-4 flex gap-2 overflow-x-auto scrollbar-hide">
                  {suggestions.map((s, i) => (
                    <button 
                      key={i} 
                      onClick={() => setInput(s.text)}
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-full text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:border-white/20 transition-all whitespace-nowrap"
                    >
                      <s.icon className="w-3 h-3" /> {s.text}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Area */}
              <div className="p-6 pt-0">
                <div className="relative">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask ForgeBot..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pr-14 text-xs text-white placeholder-white/20 focus:outline-none focus:border-primary transition-all"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-black hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiCoach;
