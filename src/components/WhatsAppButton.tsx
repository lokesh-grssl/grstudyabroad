import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const phone = '918495970819';

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(message || 'Hi Grassroots Study Abroad, I am interested in studying abroad and would like free counselling!');
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Expandable Quick Chat Box */}
      {isOpen && (
        <div className="mb-3 bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 p-4 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                <MessageSquare className="w-4 h-4 text-white fill-white" />
              </div>
              <div>
                <div className="font-heading font-bold text-sm text-gray-900">Grassroots WhatsApp Support</div>
                <div className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Online Now
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
              aria-label="Close WhatsApp Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-gray-700 bg-emerald-50/70 rounded-xl p-3 my-3 border border-emerald-100 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Hello! Ask us about country options, intake deadlines, Royal Roads & Wittenborg pathways, or scholarship limits!</span>
          </div>

          <form onSubmit={handleSend} className="space-y-2">
            <label htmlFor="whatsapp-input" className="sr-only">Type your question for WhatsApp</label>
            <input
              id="whatsapp-input"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your study abroad question..."
              aria-label="Type your study abroad question"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              aria-label="Start WhatsApp Chat"
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-colors"
            >
              <span>Start WhatsApp Chat</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 group relative"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp support"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-bounce">
          1
        </span>
        <MessageSquare className="w-7 h-7 fill-white" />
      </button>

    </div>
  );
};
