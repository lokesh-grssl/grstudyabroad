import React, { useState } from 'react';
import { EVENTS } from '../../data/mockData';
import { EventItem } from '../../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface EventsViewProps {
  onOpenBookModal: () => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ onOpenBookModal }) => {
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  const handleRsvp = (eventId: string) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents([...registeredEvents, eventId]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16 pt-4">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-[#8B1E2D]/10 text-[#8B1E2D] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Spot Admissions & Education Fairs
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#222222]">
          Upcoming Global Education Events
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Interact directly with university admissions officers from UK, Canada, Australia, and Europe. Free entry & spot offer letters.
        </p>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        {EVENTS.map((event) => {
          const isRegistered = registeredEvents.includes(event.id);
          return (
            <div
              key={event.id}
              className={`bg-white rounded-3xl border transition-all p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                event.isFeatured ? 'border-[#8B1E2D] shadow-xl ring-2 ring-[#8B1E2D]/20' : 'border-[#E8E8E8] shadow-soft'
              }`}
            >
              
              <div className="lg:col-span-4 relative rounded-2xl overflow-hidden h-56 lg:h-full min-h-[200px]">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#8B1E2D] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {event.type}
                </span>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#8B1E2D]">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {event.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {event.time}</span>
                  </div>

                  <h3 className="font-heading font-extrabold text-2xl text-[#222222]">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin className="w-4 h-4 text-[#8B1E2D] shrink-0" />
                    <span className="font-semibold">{event.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">
                    {event.description}
                  </p>

                  <div className="bg-[#FAFAFA] p-3 rounded-xl border border-gray-100 text-xs text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#8B1E2D]" />
                    <span>Keynote Speaker: <strong className="text-gray-900">{event.speaker}</strong> ({event.speakerRole})</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
                  <div className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <Sparkles className="w-4 h-4" /> Free Registration • Spot Evaluations Included
                  </div>

                  {isRegistered ? (
                    <div className="px-6 py-2.5 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Pass Reserved & Emailed!
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRsvp(event.id)}
                      className="w-full sm:w-auto px-8 py-3 bg-[#8B1E2D] hover:bg-[#111111] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all"
                    >
                      Reserve Free Pass
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
