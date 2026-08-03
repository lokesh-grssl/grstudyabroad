import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  GraduationCap, 
  Cpu, 
  BookOpen, 
  Award, 
  Globe2, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { ViewMode } from '../types';

interface GlimpseSectionProps {
  onNavigate?: (view: ViewMode) => void;
  onOpenBookModal?: () => void;
}

export const GlimpseSection: React.FC<GlimpseSectionProps> = ({ 
  onNavigate,
  onOpenBookModal 
}) => {
  const glimpseStats = [
    {
      id: 'universities',
      stat: '1,274+',
      subtext: 'International Partner Universities',
      detail: 'Across 44 Top Worldwide Countries',
      badge: 'Global Footprint',
      icon: Globe2,
      gradient: 'from-blue-600 to-indigo-600',
      lightBg: 'bg-blue-50/80 border-blue-200/80 text-blue-900',
      accentColor: '#1d4ed8',
      linkView: 'universities' as ViewMode
    },
    {
      id: 'stem',
      stat: '5,000+',
      subtext: 'STEM & Management Programs',
      detail: 'Accredited UG & PG Degrees with Post-Study Work Visa',
      badge: 'High Employment Impact',
      icon: GraduationCap,
      gradient: 'from-red-600 to-rose-600',
      lightBg: 'bg-red-50/80 border-red-200/80 text-red-900',
      accentColor: '#dc2626',
      linkView: 'programs' as ViewMode
    },
    {
      id: 'tech',
      stat: '3,000+',
      subtext: 'Program Options in Technology, IT & Computers',
      detail: 'AI, Data Science, Cybersecurity, Software & Cloud Computing',
      badge: 'In-Demand Tech Skills',
      icon: Cpu,
      gradient: 'from-amber-500 to-orange-600',
      lightBg: 'bg-amber-50/80 border-amber-200/80 text-amber-900',
      accentColor: '#d97706',
      linkView: 'programs' as ViewMode
    },
    {
      id: 'non-stem',
      stat: '12,000+',
      subtext: 'Non-STEM / Non-Management Programs',
      detail: 'Humanities, Design, Health Sciences, Law & Creative Arts',
      badge: 'Diverse Disciplines',
      icon: BookOpen,
      gradient: 'from-emerald-600 to-teal-600',
      lightBg: 'bg-emerald-50/80 border-emerald-200/80 text-emerald-900',
      accentColor: '#059669',
      linkView: 'programs' as ViewMode
    },
    {
      id: 'ranked',
      stat: '300+',
      subtext: 'QS & Times Ranked Institutions',
      detail: 'Top 1% Global Tier Universities & Ivy League Equivalents',
      badge: 'Academic Prestige',
      icon: Award,
      gradient: 'from-purple-600 to-violet-600',
      lightBg: 'bg-purple-50/80 border-purple-200/80 text-purple-900',
      accentColor: '#7c3aed',
      linkView: 'universities' as ViewMode
    },
    {
      id: 'english-taught',
      stat: '3,500+',
      subtext: 'English-Taught Options in Non-English Countries',
      detail: 'Germany, France, Netherlands, Italy, Japan, Finland & Beyond',
      badge: 'Zero Language Barrier',
      icon: Building2,
      gradient: 'from-cyan-600 to-blue-600',
      lightBg: 'bg-cyan-50/80 border-cyan-200/80 text-cyan-900',
      accentColor: '#0891b2',
      linkView: 'destinations' as ViewMode
    }
  ];

  return (
    <section id="glimpse" className="relative py-16 sm:py-24 bg-slate-900 text-white overflow-hidden rounded-3xl my-8 mx-2 sm:mx-4 lg:mx-8 shadow-2xl">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-blue-500/20 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-gray-200">
              TASA | Grassroots At a Glimpse
            </span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Unrivaled Scale in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-blue-400">Global Education</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
            We bridge aspirations with world-class opportunities through an unmatched network of accredited universities, diverse programs, and personalized counselling.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {glimpseStats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => onNavigate && onNavigate(item.linkView)}
                className="group relative bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 hover:border-slate-500 p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-2xl cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                {/* Top Colored Accent Stripe */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`} />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/10 group-hover:bg-white/20 transition-colors">
                      {item.badge}
                    </span>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div>
                    <div className="font-heading font-black text-4xl sm:text-5xl tracking-tight text-white group-hover:text-red-400 transition-colors">
                      {item.stat}
                    </div>
                    <div className="font-semibold text-lg sm:text-xl text-slate-100 mt-1 leading-snug">
                      {item.subtext}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-700/60 pt-3">
                    {item.detail}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1 text-xs font-bold text-red-400 group-hover:text-red-300 transition-colors">
                  <span>Explore Programs</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner Callout */}
        <div className="bg-gradient-to-r from-red-950/80 via-slate-800 to-blue-950/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" /> 100% End-to-End Admission & Visa Guidance
            </div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
              Ready to find your ideal program among 20,000+ choices?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Get free personalized course shortlisting based on your academic profile, budget, and post-study career goals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            {onOpenBookModal && (
              <button
                onClick={onOpenBookModal}
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-red-900/40 transition-all text-center"
              >
                Book Free Consultation
              </button>
            )}
            {onNavigate && (
              <button
                onClick={() => onNavigate('programs')}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-700/80 hover:bg-slate-600 text-white font-bold text-sm rounded-xl border border-slate-600 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Search All Programs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
