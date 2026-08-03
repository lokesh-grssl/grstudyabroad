import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../../data/mockData';
import { ServiceItem } from '../../types';
import { 
  Compass, 
  GraduationCap, 
  FileCheck, 
  FileText, 
  ShieldCheck, 
  Landmark, 
  Home, 
  PlaneTakeoff, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ServicesViewProps {
  onOpenBookModal: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onOpenBookModal }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(SERVICES[0]);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return <Compass className="w-6 h-6 text-[#8B1E2D]" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-[#8B1E2D]" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6 text-[#8B1E2D]" />;
      case 'FileText': return <FileText className="w-6 h-6 text-[#8B1E2D]" />;
      case 'Passport': return <ShieldCheck className="w-6 h-6 text-[#8B1E2D]" />;
      case 'Landmark': return <Landmark className="w-6 h-6 text-[#8B1E2D]" />;
      case 'Home': return <Home className="w-6 h-6 text-[#8B1E2D]" />;
      case 'PlaneTakeoff': return <PlaneTakeoff className="w-6 h-6 text-[#8B1E2D]" />;
      default: return <Sparkles className="w-6 h-6 text-[#8B1E2D]" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16 pt-4">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-[#8B1E2D]/10 text-[#8B1E2D] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Comprehensive Overseas Advisory
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#222222]">
          End-to-End Study Abroad Services
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          From profile evaluation and SOP drafting to education loans, visa interview prep, housing, and post-arrival support.
        </p>
      </div>

      {/* Grid of 8 Services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((srv, idx) => (
          <motion.div
            key={srv.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: idx * 0.06 }}
            onClick={() => setSelectedService(srv)}
            className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
              selectedService?.id === srv.id
                ? 'bg-[#8B1E2D] text-white border-[#8B1E2D] shadow-xl scale-[1.02]'
                : 'bg-white text-gray-900 border-[#E8E8E8] shadow-soft shadow-soft-hover'
            }`}
          >
            <div className="space-y-3">
              <div className={`p-3 rounded-2xl w-fit ${
                selectedService?.id === srv.id ? 'bg-white/20 text-white' : 'bg-[#8B1E2D]/10 text-[#8B1E2D]'
              }`}>
                {getServiceIcon(srv.icon)}
              </div>

              <h3 className={`font-heading font-bold text-lg ${
                selectedService?.id === srv.id ? 'text-white' : 'text-[#222222]'
              }`}>
                {srv.title}
              </h3>

              <p className={`text-xs leading-relaxed ${
                selectedService?.id === srv.id ? 'text-white/80' : 'text-gray-600'
              }`}>
                {srv.shortDesc}
              </p>
            </div>

            <div className={`pt-3 border-t text-xs font-bold flex items-center justify-between ${
              selectedService?.id === srv.id ? 'border-white/20 text-white' : 'border-gray-100 text-[#8B1E2D]'
            }`}>
              <span>View Key Deliverables</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Active Service Detailed View */}
      {selectedService && (
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E8E8] shadow-soft space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-[#8B1E2D]/10 text-[#8B1E2D] rounded-2xl">
                {getServiceIcon(selectedService.icon)}
              </div>
              <div>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#222222]">
                  {selectedService.title}
                </h2>
                <div className="text-xs text-gray-500 font-medium">TASA Grassroots Service Spec</div>
              </div>
            </div>

            <button
              onClick={onOpenBookModal}
              className="px-8 py-3.5 bg-[#8B1E2D] hover:bg-[#111111] text-white font-bold text-sm rounded-xl shadow-lg transition-all shrink-0"
            >
              Request {selectedService.title.split(' ')[0]} Service
            </button>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed max-w-4xl">
            {selectedService.fullDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-gray-200 space-y-3">
              <h3 className="font-heading font-bold text-base text-[#222222] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Key Student Benefits
              </h3>
              <ul className="space-y-2 text-xs text-gray-700">
                {selectedService.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#8B1E2D] rounded-full" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-gray-200 space-y-3">
              <h3 className="font-heading font-bold text-base text-[#222222] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#8B1E2D]" /> Deliverables Included
              </h3>
              <ul className="space-y-2 text-xs text-gray-700">
                {selectedService.deliverables.map((d, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#8B1E2D] rounded-full" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
