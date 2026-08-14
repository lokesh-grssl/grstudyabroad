import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ViewMode, University, Course } from '../../types';
import { GlimpseSection } from '../GlimpseSection';
import { CountryFlag } from '../CountryFlag';
import { StudentPortraitIllustration } from '../StudentPortraitIllustration';
import { 
  DESTINATIONS, 
  UNIVERSITIES, 
  SCHOLARSHIPS, 
  PATHWAY_PROGRAMS, 
  BLOGS, 
  WHY_CHOOSE_US 
} from '../../data/mockData';
import { 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Award, 
  Users, 
  Sparkles, 
  HeartHandshake, 
  ShieldCheck, 
  TrendingUp, 
  Globe, 
  Building2,
  Cpu,
  ChevronRight, 
  Star, 
  Calendar, 
  ChevronLeft
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenBookModal: () => void;
  onSelectUniversity: (uni: University) => void;
  onSelectCourse?: (course: Course) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenBookModal,
  onSelectUniversity,
  onSelectCourse
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy deferred autoplay, retry on user interaction
          const handleFirstInteraction = () => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
          };
          window.addEventListener('click', handleFirstInteraction, { once: true });
          window.addEventListener('touchstart', handleFirstInteraction, { once: true });
        });
      }
    }
  }, []);

  const getWhyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-6 h-6 text-[#E31B23]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#E31B23]" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-[#E31B23]" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-[#E31B23]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#E31B23]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-[#E31B23]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#E31B23]" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-[#E31B23]" />;
      default: return <Award className="w-6 h-6 text-[#E31B23]" />;
    }
  };

  return (
    <div className="space-y-8 sm:space-y-12 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="px-2 sm:px-4 lg:px-8 pt-4 pb-0">
        <div className="relative rounded-3xl overflow-hidden min-h-[520px] sm:min-h-[580px] flex items-center justify-center p-6 sm:p-12 lg:p-16 border border-gray-200/80 shadow-2xl">
          {/* Background Video - Faststart Web-Optimized */}
          <video
            ref={videoRef}
            src="/hero-bg.mp4"
            poster="/hero-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover bg-slate-900 pointer-events-none"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
            <source src="/api/hero-video" type="video/mp4" />
          </video>
          
          {/* Natural dark overlay to maintain crisp text contrast on the video */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/50" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center">
            
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15] drop-shadow-md">
              Discover the Right <br />
              <span className="font-playfair italic font-medium tracking-normal text-amber-300 relative inline-block px-1 drop-shadow-sm">
                Country, Course & University
                <svg className="absolute w-full h-2.5 -bottom-1.5 left-0 text-amber-400/70" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 15 Q 50 2, 100 15" stroke="currentColor" strokeWidth="5" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-gray-100 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto font-medium drop-shadow-xs">
              Admissions, Scholarships, Visa Assistance, Education Loans, Accommodation, Career Guidance and Post-arrival Support.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={onOpenBookModal}
                className="w-full sm:w-auto px-8 py-4 bg-[#E31B23] hover:bg-[#C9141B] active:bg-[#B31016] text-white font-heading font-bold text-base rounded-2xl shadow-xl hover:shadow-2xl shadow-red-600/30 hover:shadow-red-600/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <span>Book Free Counselling</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigate('universities')}
                className="w-full sm:w-auto px-8 py-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-heading font-semibold text-base rounded-2xl border border-white/40 shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-5 h-5 text-amber-300" />
                <span>Explore Universities</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 sm:pt-6 border-t border-white/20 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center max-w-3xl mx-auto bg-black/40 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 shadow-lg divide-y sm:divide-y-0 sm:divide-x divide-white/15">
              <div className="pb-3 sm:pb-0 sm:px-3 flex flex-col justify-center">
                <div className="font-heading font-extrabold text-2xl sm:text-3xl text-amber-300">1,500+</div>
                <div className="text-xs sm:text-sm text-gray-200 font-medium mt-0.5">Partner Universities</div>
              </div>
              <div className="py-3 sm:py-0 sm:px-3 flex flex-col justify-center">
                <div className="font-heading font-extrabold text-2xl sm:text-3xl text-amber-300">1,00,000+</div>
                <div className="text-xs sm:text-sm text-gray-200 font-medium mt-0.5">Course Options</div>
              </div>
              <div className="pt-3 sm:pt-0 sm:px-3 flex flex-col justify-center">
                <div className="font-heading font-extrabold text-2xl sm:text-3xl text-amber-300">45+</div>
                <div className="text-xs sm:text-sm text-gray-200 font-medium mt-0.5">Countries with Partner Institutions</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* GLIMPSE SECTION */}
      <GlimpseSection onNavigate={onNavigate} onOpenBookModal={onOpenBookModal} />


      {/* 3. POPULAR STUDY DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-[#E31B23] uppercase tracking-widest">Global Opportunities</div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#222222]">
              Popular Study Destinations
            </h2>
          </div>
          <button
            onClick={() => onNavigate('destinations')}
            className="text-[#E31B23] font-heading font-bold text-sm hover:underline flex items-center gap-1"
          >
            <span>Explore All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATIONS.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white rounded-2xl overflow-hidden border border-[#E8E8E8] shadow-soft shadow-soft-hover flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm flex items-center gap-1.5">
                  <CountryFlag code={dest.code} country={dest.name} size="md" />
                  <span className="text-xs font-bold text-slate-800">{dest.code}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-heading font-bold text-xl text-white">{dest.name}</h3>
                  <div className="text-xs text-white/80">{dest.avgTuitionPG}</div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {dest.shortDescription}
                </p>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-500">
                    Work Visa: {dest.code === 'UK' ? '2 Years' : dest.code === 'CA' ? '3 Years' : 'Available'}
                  </span>
                  <button
                    onClick={() => onNavigate('destinations')}
                    className="px-3 py-1.5 bg-[#E31B23]/10 hover:bg-[#E31B23] text-[#E31B23] hover:text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1"
                  >
                    <span>Explore</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* 4. WHY CHOOSE GRASSROOTS STUDY ABROAD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#222222]">
            Why Students Trust Grassroots Study Abroad
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              stat: '1500+', 
              badge: 'Partner Network',
              title: 'Massive University Network', 
              desc: 'Direct representations and partnerships with top-tier accredited institutions worldwide.',
              icon: Building2
            },
            { 
              stat: '45+ countries', 
              badge: 'Global Footprint',
              title: 'Global Footprint', 
              desc: 'including popular destinations like the US, UK, Canada, Australia, and Europe.',
              icon: Globe
            },
            { 
              stat: '66 in Top 300', 
              badge: 'QS World Ranked',
              title: 'Elite Partnerships', 
              desc: "We represent 66 of the world's top 300 universities listed in the QS World Rankings.",
              icon: Award
            },
            { 
              stat: 'AI Matching', 
              badge: 'Digital Platform',
              title: 'Advanced EdTech Ecosystem', 
              desc: 'Profile-Based Digital Matching to specific profile, grades, and budget with optimal global programs.',
              icon: Cpu
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white p-7 rounded-2xl border border-[#E8E8E8] shadow-soft shadow-soft-hover space-y-4 flex flex-col justify-between group hover:border-[#E31B23]/40 transition-all text-left"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-red-50 text-[#E31B23] border border-red-100">
                      {item.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E31B23] flex items-center justify-center group-hover:bg-[#E31B23] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <div className="font-heading font-black text-3xl sm:text-4xl text-[#E31B23] tracking-tight">
                      {item.stat}
                    </div>
                    <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#222222] mt-1 group-hover:text-[#E31B23] transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed pt-2 border-t border-gray-100">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>


      {/* 6. PATHWAY PROGRAMS (DEDICATED PREMIUM SECTION) */}
      <section className="bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#2B0910] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#E31B23] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Save Up to 50% Tuition Fees
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
                Grassroots Study Abroad Pathway Programs
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Study first in India with synchronized curriculum, transfer seamlessly to global partner universities, and graduate with full international degrees & post-study work permits.
              </p>
            </div>

            <button
              onClick={() => onNavigate('pathways')}
              className="px-6 py-3.5 bg-[#E31B23] hover:bg-[#C9141B] active:bg-[#B31016] text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-red-600/30 hover:shadow-red-600/50 flex items-center justify-center gap-2 shrink-0"
            >
              <span>Explore All Pathway Programs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Step Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative">
              <div className="w-8 h-8 rounded-full bg-[#E31B23] text-white font-bold text-xs flex items-center justify-center mb-4">
                01
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">1. Study First in India</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Complete Year 1 credits at Grassroots Study Abroad India Center (Mumbai / Delhi) with global faculty and low tuition costs.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative">
              <div className="w-8 h-8 rounded-full bg-[#E31B23] text-white font-bold text-xs flex items-center justify-center mb-4">
                02
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">2. Transfer Internationally</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Guaranteed credit transfer to Royal Roads University (UAE Campus), Wittenborg University (Netherlands), or Varna University of Management (Bulgaria).
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative">
              <div className="w-8 h-8 rounded-full bg-[#E31B23] text-white font-bold text-xs flex items-center justify-center mb-4">
                03
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">3. Graduate & Work Abroad</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Receive official global degree with post-study work & career opportunities in UAE, Netherlands, or Bulgaria.
              </p>
            </div>
          </div>

          {/* Featured Pathway Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {PATHWAY_PROGRAMS.slice(0, 3).map((pw, idx) => (
              <motion.div 
                key={pw.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-[#8B1E2D] transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      {pw.country}
                    </span>
                    <span className="text-[10px] text-gray-300 font-medium">
                      {pw.targetAudience}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-white leading-snug">{pw.title}</h3>
                  
                  <div className="text-xs text-gray-300 space-y-1">
                    <div><span className="text-gray-400">Partner:</span> <strong className="text-white">{pw.globalPartner}</strong></div>
                    <div><span className="text-gray-400">Duration:</span> <span className="text-gray-200">{pw.durationStructure}</span></div>
                  </div>

                  {/* Fee Breakdown Box */}
                  <div className="bg-black/30 p-3 rounded-xl border border-white/10 space-y-1 text-xs">
                    <div className="flex justify-between items-center text-gray-300">
                      <span>India Fee:</span>
                      <span className="font-bold text-white">{pw.indiaFeeUSD}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-300">
                      <span>International Fee:</span>
                      <span className="font-bold text-white">{pw.internationalFeeUSD}</span>
                    </div>
                    <div className="pt-1 border-t border-white/10 flex justify-between items-center text-amber-300 font-bold">
                      <span>Total Cost:</span>
                      <span className="text-sm">{pw.totalCostUSD}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-bold">{pw.degreesAwarded}</span>
                  <button 
                    onClick={() => onNavigate('pathways')}
                    className="text-white hover:text-amber-300 font-semibold flex items-center gap-1"
                  >
                    <span>View All Pathways</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* 8. SCHOLARSHIPS SECTION */}
      <section className="bg-white py-16 border-y border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#E31B23] uppercase tracking-widest">Financial Aid</div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#222222]">
                Global Scholarships & Bursaries
              </h2>
            </div>
            <button
              onClick={() => onNavigate('scholarships')}
              className="text-[#E31B23] font-heading font-bold text-sm hover:underline flex items-center gap-1"
            >
              <span>View All Scholarships</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCHOLARSHIPS.slice(0, 3).map((sch, idx) => (
              <motion.div
                key={sch.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#FAFAFA] p-6 rounded-2xl border border-[#E8E8E8] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#E31B23] bg-[#E31B23]/10 px-2.5 py-0.5 rounded-full">
                    {sch.type}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-[#222222]">{sch.title}</h3>
                  <div className="font-heading font-extrabold text-xl text-[#E31B23]">{sch.amount}</div>
                  <p className="text-xs text-gray-600 leading-relaxed">{sch.description}</p>
                </div>

                <div className="pt-3 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
                  <span>Deadline: <strong className="text-gray-800">{sch.deadline}</strong></span>
                  <button
                    onClick={() => onNavigate('scholarships')}
                    className="font-bold text-[#E31B23] hover:underline"
                  >
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* 9. LATEST BLOGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-[#E31B23] uppercase tracking-widest">Articles & Guides</div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#222222]">
              Latest Overseas Education Blogs
            </h2>
          </div>
          <button
            onClick={() => onNavigate('blogs')}
            className="text-[#E31B23] font-heading font-bold text-sm hover:underline flex items-center gap-1"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOGS.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-[#E8E8E8] shadow-soft shadow-soft-hover flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#E31B23] text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                  {blog.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="text-[11px] text-gray-400 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#E31B23]" />
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#222222] group-hover:text-[#E31B23] transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <button
                  onClick={() => onNavigate('blogs')}
                  className="pt-2 text-xs font-bold text-[#E31B23] hover:underline flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* 10. BOOK COUNSELLING CTA (MODERN SAAS LANDING PAGE HERO WITH OVERFLOWING STUDENT PORTRAIT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-6">
        <div className="relative overflow-visible bg-gradient-to-br from-[#D81820] via-[#C4131A] to-[#990D13] rounded-3xl sm:rounded-[36px] p-8 sm:p-12 lg:p-14 text-white shadow-[0_25px_60px_rgba(180,16,24,0.35)] border border-white/20">
          
          {/* Subtle Ambient Background Mesh & Lighting */}
          <div className="absolute top-0 right-1/4 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 -mb-16 w-96 h-96 bg-black/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column with generous whitespace */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-6 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider border border-white/25 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Start Your Global Career Today</span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.12]">
                Ready to Begin Your <br className="hidden sm:inline" />Global Journey?
              </h2>

              <p className="text-white/90 text-base sm:text-lg max-w-xl leading-relaxed font-normal">
                Book a free 1-on-1 personalized counselling session with our senior advisors. Get university shortlisting, loan assistance, and visa guidance at zero cost!
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
                <button
                  onClick={onOpenBookModal}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-[#D81820] hover:bg-[#111111] hover:text-white font-heading font-extrabold text-base rounded-2xl shadow-xl shadow-red-950/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>Book Free Counselling</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('universities')}
                  className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-base rounded-2xl transition-all duration-300 border border-white/25 backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Browse Universities</span>
                </button>
              </div>

              {/* Trust highlights below CTA button */}
              <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-y-2.5 gap-x-6 text-xs sm:text-sm text-white/85 font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>100% Free Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Verified Advisors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Spot Offer Guidance</span>
                </div>
              </div>
            </div>

            {/* Right Column Spacer on Desktop */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-5 h-[340px]" aria-hidden="true" />
          </div>

          {/* Student Portrait (Absolute positioning overflowing the top edge by 80-110px on desktop) */}
          <div className="mt-8 lg:mt-0 lg:absolute lg:right-4 xl:right-10 lg:-top-24 xl:-top-28 lg:bottom-0 lg:w-[410px] xl:w-[460px] flex items-end justify-center z-20 pointer-events-none">
            <StudentPortraitIllustration className="w-full max-w-[320px] sm:max-w-[380px] lg:max-w-none" />
          </div>

        </div>
      </section>

    </div>
  );
};
