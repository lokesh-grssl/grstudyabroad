import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  User, 
  Bot, 
  Loader2, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';

interface AiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBookModal: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export const AiAdvisorModal: React.FC<AiAdvisorModalProps> = ({
  isOpen,
  onClose,
  onOpenBookModal
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am your Grassroots Study Abroad AI Counselor. Ask me anything about study abroad destinations, intake deadlines, Royal Roads / Wittenborg pathway transfers, scholarships, or visa rules!',
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [countryFilter, setCountryFilter] = useState('All Destinations');

  if (!isOpen) return null;

  const quickPrompts = [
    'Which country offers 3-year post-study work visa?',
    'Tell me about Royal Roads 1+2 pathway program',
    'Low tuition universities in Germany or UK for MBA',
    'How to apply for Think Big Scholarship?'
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          country: countryFilter !== 'All Destinations' ? countryFilter : undefined
        })
      });

      const data = await res.json();
      const aiResponse = data.response || data.fallback || "I am glad to help! Please book a free counselling session with our advisors.";

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: "I am ready to help! For exact profile assessment and fee structures, please click 'Book Free Counselling' below to speak with our senior team.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full h-[85vh] flex flex-col border border-[#E8E8E8] overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B1E2D] to-[#6C1521] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-yellow-300 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                Grassroots AI Study Counselor
              </h3>
              <p className="text-white/80 text-xs">
                Instant answers powered by Gemini & Grassroots Knowledge Base
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Destination Filter Bar */}
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <span className="text-gray-500 font-medium shrink-0">Focus Country:</span>
          {['All Destinations', 'United Kingdom', 'Canada', 'United States', 'Germany', 'Australia'].map((c) => (
            <button
              key={c}
              onClick={() => setCountryFilter(c)}
              className={`px-2.5 py-1 rounded-full shrink-0 transition-colors ${
                countryFilter === c
                  ? 'bg-[#8B1E2D] text-white font-semibold'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#FAFAFA]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 max-w-[85%] ${
                m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                m.sender === 'user' ? 'bg-gray-800' : 'bg-[#8B1E2D]'
              }`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-[#8B1E2D] text-white rounded-tr-none shadow-md'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'
              }`}>
                <div className="whitespace-pre-line">{m.text}</div>
                <div className={`text-[10px] mt-2 font-light ${
                  m.sender === 'user' ? 'text-white/70 text-right' : 'text-gray-400'
                }`}>
                  {m.time}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-gray-500 text-xs p-3 bg-white rounded-xl border border-gray-200 w-fit">
              <Loader2 className="w-4 h-4 animate-spin text-[#8B1E2D]" />
              <span>Analyzing global university database...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts Bar */}
        <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 overflow-x-auto shrink-0">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              className="px-3 py-1.5 bg-gray-100 hover:bg-[#8B1E2D]/10 hover:text-[#8B1E2D] text-gray-700 rounded-lg text-xs font-medium whitespace-nowrap transition-colors shrink-0"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Footer */}
        <div className="p-4 bg-white border-t border-gray-200 shrink-0 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AI Study Advisor anything..."
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3 bg-[#8B1E2D] hover:bg-[#111111] disabled:opacity-50 text-white rounded-xl transition-all shadow-md shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
            <span>Need human guidance?</span>
            <button
              onClick={() => {
                onClose();
                onOpenBookModal();
              }}
              className="text-[#8B1E2D] font-bold hover:underline flex items-center gap-1"
            >
              <span>Book 1-on-1 Human Counsellor</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
