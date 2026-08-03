import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ViewMode, University, Course } from '../../types';
import { GlimpseSection } from '../GlimpseSection';
import { CountryFlag } from '../CountryFlag';
import { 
  DESTINATIONS, 
  UNIVERSITIES, 
  COURSES, 
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
  ChevronRight, 
  Star, 
  Calendar, 
  Building2, 
  Briefcase, 
  BarChart3, 
  Code, 
  Cpu, 
  Database, 
  Wrench, 
  DollarSign, 
  Activity, 
  ChevronLeft
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenBookModal: () => void;
  onSelectUniversity: (uni: University) => void;
  onSelectCourse: (course: Course) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenBookModal,
  onSelectUniversity,
  onSelectCourse
}) => {
  const getCourseIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-[#8B1E2D]" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-[#8B1E2D]" />;
      case 'Code': return <Code className="w-6 h-6 text-[#8B1E2D]" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-[#8B1E2D]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#8B1E2D]" />;
      case 'Database': return <Database className="w-6 h-6 text-[#8B1E2D]" />;
      case 'Wrench': return <Wrench className="w-6 h-6 text-[#8B1E2D]" />;
      case 'DollarSign': return <DollarSign className="w-6 h-6 text-[#8B1E2D]" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-[#8B1E2D]" />;
      case 'Activity': return <Activity className="w-6 h-6 text-[#8B1E2D]" />;
      default: return <Building2 className="w-6 h-6 text-[#8B1E2D]" />;
    }
  };

  const getWhyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-6 h-6 text-[#8B1E2D]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#8B1E2D]" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-[#8B1E2D]" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-[#8B1E2D]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#8B1E2D]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-[#8B1E2D]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#8B1E2D]" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-[#8B1E2D]" />;
      default: return <Award className="w-6 h-6 text-[#8B1E2D]" />;
    }
  };

  return (
    <div className="space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-16 overflow-hidden bg-gradient-to-b from-white via-[#FAFAFA] to-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            
            <div className="inline-flex items-center gap-2 bg-[#8B1E2D]/10 text-[#8B1E2D] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-[#8B1E2D]/20 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#8B1E2D]" />
              <span>Premier Overseas Education Advisory • 36 Years Excellence</span>
            </div>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#222222] tracking-tight leading-[1.1]">
              Study Abroad <br />
              <span className="text-[#8B1E2D] relative inline-block">
                Made Simple.
                <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#8B1E2D]/30" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 15 Q 50 0, 100 15" stroke="currentColor" strokeWidth="6" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto font-normal">
              Admissions, Scholarships, Visa Assistance, Education Loans, Accommodation, Career Guidance and Post-arrival Support.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={onOpenBookModal}
                className="w-full sm:w-auto px-8 py-4 bg-[#8B1E2D] hover:bg-[#111111] text-white font-heading font-semibold text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <span>Book Free Counselling</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigate('universities')}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 font-heading font-semibold text-base rounded-2xl border border-gray-300 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-5 h-5 text-[#8B1E2D]" />
                <span>Explore Universities</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-gray-200 grid grid-cols-3 gap-4 text-center max-w-2xl mx-auto">
              <div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#8B1E2D]">3,51,000+</div>
                <div className="text-xs text-gray-600 font-medium">Students advised</div>
              </div>
              <div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#8B1E2D]">1,274+</div>
                <div className="text-xs text-gray-600 font-medium">Partner Universities (44 Countries)</div>
              </div>
              <div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#8B1E2D]">1,00,000+</div>
                <div className="text-xs text-gray-600 font-medium">Students placed</div>
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
            <div className="text-xs font-bold text-[#8B1E2D] uppercase tracking-widest">Global Opportunities</div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#222222]">
              Popular Study Destinations
            </h2>
          </div>
          <button
            onClick={() => onNavigate('destinations')}
            className="text-[#8B1E2D] font-heading font-bold text-sm hover:underline flex items-center gap-1"
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
                    className="px-3 py-1.5 bg-[#8B1E2D]/10 hover:bg-[#8B1E2D] text-[#8B1E2D] hover:text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1"
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


      {/* 4. POPULAR COURSES */}
      <section className="bg-white py-16 border-y border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#8B1E2D] uppercase tracking-widest">In-Demand Specializations</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#222222]">
              Popular Worldwide Programs
            </h2>
            <p className="text-gray-600 text-sm">
              Discover programs curated for high salary outcomes, STEM OPT extensions, and global graduate employability.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {COURSES.map((course, idx) => (
              <motion.button
                key={course.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -3 }}
                onClick={() => onSelectCourse(course)}
                className="bg-[#FAFAFA] hover:bg-white p-5 rounded-2xl border border-[#E8E8E8] hover:border-[#8B1E2D] shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-xl w-fit shadow-xs group-hover:bg-[#8B1E2D]/10 transition-colors">
                    {getCourseIcon(course.iconName)}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-[#222222] group-hover:text-[#8B1E2D] transition-colors">
                      {course.title}
                    </h3>
                    <div className="text-[11px] text-gray-500 font-medium mt-1">{course.category}</div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-gray-200 text-xs font-semibold text-emerald-700 flex items-center justify-between">
                  <span>{course.duration}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#8B1E2D] group-hover:translate-x-1 transition-all" />
                </div>
              </motion.button>
            ))}
          </div>

        </div>
      </section>


      {/* 5. WHY CHOOSE TASA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#8B1E2D] uppercase tracking-widest">Proven Track Record</span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#222222]">
            Why Students Trust TASA Global
          </h2>
          <p className="text-gray-700 text-base font-semibold max-w-2xl mx-auto">
            36 years of getting students to campus — not a new promise, a long track record.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { stat: '96%', text: 'Eligible students receive an offer within 4 weeks*' },
            { stat: '36 yrs', text: 'Advising students on global careers' },
            { stat: '3,51,000+', text: 'Students advised' },
            { stat: '1,00,000+', text: 'Students placed' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white p-7 rounded-2xl border border-[#E8E8E8] shadow-soft shadow-soft-hover text-center space-y-3 flex flex-col justify-between"
            >
              <div className="font-heading font-black text-4xl sm:text-5xl text-[#8B1E2D] tracking-tight">
                {item.stat}
              </div>
              <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* 6. PATHWAY PROGRAMS (DEDICATED PREMIUM SECTION) */}
      <section className="bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#2B0910] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#8B1E2D] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Save Up to 50% Tuition Fees
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
                TASA Global Pathway Programs
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Study first in India with synchronized curriculum, transfer seamlessly to global partner universities, and graduate with full international degrees & post-study work permits.
              </p>
            </div>

            <button
              onClick={() => onNavigate('pathways')}
              className="px-6 py-3.5 bg-[#8B1E2D] hover:bg-white hover:text-[#8B1E2D] text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 shrink-0"
            >
              <span>Explore All Pathway Programs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Step Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative">
              <div className="w-8 h-8 rounded-full bg-[#8B1E2D] text-white font-bold text-xs flex items-center justify-center mb-4">
                01
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">1. Study First in India</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Complete Year 1 credits at TASA Grassroots India Center (Mumbai / Delhi) with global faculty and low tuition costs.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative">
              <div className="w-8 h-8 rounded-full bg-[#8B1E2D] text-white font-bold text-xs flex items-center justify-center mb-4">
                02
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">2. Transfer Internationally</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Guaranteed credit transfer to Royal Roads University (UAE Campus), Wittenborg University (Netherlands), or Varna University of Management (Bulgaria).
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative">
              <div className="w-8 h-8 rounded-full bg-[#8B1E2D] text-white font-bold text-xs flex items-center justify-center mb-4">
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
              <div className="text-xs font-bold text-[#8B1E2D] uppercase tracking-widest">Financial Aid</div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#222222]">
                Global Scholarships & Bursaries
              </h2>
            </div>
            <button
              onClick={() => onNavigate('scholarships')}
              className="text-[#8B1E2D] font-heading font-bold text-sm hover:underline flex items-center gap-1"
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
                  <span className="text-[10px] font-bold text-[#8B1E2D] bg-[#8B1E2D]/10 px-2.5 py-0.5 rounded-full">
                    {sch.type}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-[#222222]">{sch.title}</h3>
                  <div className="font-heading font-extrabold text-xl text-[#8B1E2D]">{sch.amount}</div>
                  <p className="text-xs text-gray-600 leading-relaxed">{sch.description}</p>
                </div>

                <div className="pt-3 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
                  <span>Deadline: <strong className="text-gray-800">{sch.deadline}</strong></span>
                  <button
                    onClick={() => onNavigate('scholarships')}
                    className="font-bold text-[#8B1E2D] hover:underline"
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
            <div className="text-xs font-bold text-[#8B1E2D] uppercase tracking-widest">Articles & Guides</div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#222222]">
              Latest Overseas Education Blogs
            </h2>
          </div>
          <button
            onClick={() => onNavigate('blogs')}
            className="text-[#8B1E2D] font-heading font-bold text-sm hover:underline flex items-center gap-1"
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
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#8B1E2D] text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                  {blog.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="text-[11px] text-gray-400 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#8B1E2D]" />
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#222222] group-hover:text-[#8B1E2D] transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <button
                  onClick={() => onNavigate('blogs')}
                  className="pt-2 text-xs font-bold text-[#8B1E2D] hover:underline flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* 10. BOOK COUNSELLING CTA (LARGE BANNER SECTION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#8B1E2D] to-[#6C1521] rounded-3xl p-8 sm:p-14 text-white text-center sm:text-left shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Start Your Global Career Today
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                Ready to Begin Your Global Journey?
              </h2>
              <p className="text-white/80 text-sm sm:text-base max-w-2xl leading-relaxed">
                Book a free 1-on-1 personalized counselling session with our senior advisors. Get university shortlisting, loan assistance, and visa guidance at zero cost!
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <button
                onClick={onOpenBookModal}
                className="px-8 py-4 bg-white text-[#8B1E2D] hover:bg-[#111111] hover:text-white font-heading font-extrabold text-base rounded-2xl shadow-xl transition-all transform hover:scale-105"
              >
                Book Free Counselling
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
