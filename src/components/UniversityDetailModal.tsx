import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Award, 
  CheckCircle2, 
  GraduationCap, 
  DollarSign, 
  Globe, 
  Sparkles, 
  Calendar,
  Building2,
  BookOpen,
  FileText,
  Clock,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Info,
  Users,
  Check,
  FileCheck,
  HelpCircle,
  Maximize2,
  Minimize2,
  ExternalLink,
  Download,
  Share2,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Printer,
  Compass,
  CheckCircle
} from 'lucide-react';
import { University } from '../types';
import { CountryFlag } from './CountryFlag';
import { getUniversityCrestTheme, getUniversityInitials } from '../utils/universityLogos';

interface UniversityDetailModalProps {
  university: University | null;
  onClose: () => void;
  onOpenBookModal: () => void;
}

type TabType = 'overview' | 'programs' | 'requirements' | 'scholarships' | 'campus';

export const UniversityDetailModal: React.FC<UniversityDetailModalProps> = ({
  university,
  onClose,
  onOpenBookModal
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedProgramLevel, setSelectedProgramLevel] = useState<string>('All');
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!university) return null;

  const theme = getUniversityCrestTheme(university.name);
  const initials = getUniversityInitials(university.name);

  // Feature flags
  const hasIeltsWaiver = Boolean(
    university.entryRequirements?.english?.toLowerCase().includes('moi') || 
    university.entryRequirements?.english?.toLowerCase().includes('waiver') ||
    university.entryRequirements?.english?.toLowerCase().includes('12th') ||
    university.entryRequirements?.english?.toLowerCase().includes('accepted')
  );
  
  const hasScholarship = Boolean(
    university.scholarshipsAvailable && 
    !university.scholarshipsAvailable.toLowerCase().includes('none')
  );

  const handleOpenNewTab = () => {
    const directUrl = `${window.location.origin}${window.location.pathname}#/universities?id=${encodeURIComponent(university.id)}`;
    window.open(directUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = () => {
    const directUrl = `${window.location.origin}${window.location.pathname}#/universities?id=${encodeURIComponent(university.id)}`;
    navigator.clipboard.writeText(directUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrintPage = () => {
    window.print();
  };

  // Dynamic programs list generator
  const programCategories = [
    { 
      id: 'cs-ai',
      name: 'BSc / MSc Computer Science, AI & Software Engineering', 
      level: 'Undergraduate & PG', 
      duration: '3 - 4 Years (UG) / 1 - 2 Years (PG)', 
      fee: university.tuitionRange,
      intakes: 'September & January',
      career: 'Software Engineer, AI Developer, Systems Architect',
      code: 'CS-101'
    },
    { 
      id: 'bba-mba',
      name: 'BBA / MBA International Business Administration & Leadership', 
      level: 'Undergraduate & PG', 
      duration: '3 - 4 Years (UG) / 1 - 2 Years (PG)', 
      fee: university.tuitionRange,
      intakes: 'September, January & May',
      career: 'Management Consultant, Business Development Lead, Analyst',
      code: 'BUS-202'
    },
    { 
      id: 'data-analytics',
      name: 'MSc Data Science, AI Analytics & Business Intelligence', 
      level: 'Postgraduate', 
      duration: '1 - 2 Years', 
      fee: university.tuitionRange,
      intakes: 'September & January',
      career: 'Data Scientist, Machine Learning Engineer, BI Strategist',
      code: 'DS-303'
    },
    { 
      id: 'engineering',
      name: 'BEng / MEng Mechanical, Civil & Electrical Engineering', 
      level: 'Undergraduate & PG', 
      duration: '3 - 4 Years', 
      fee: university.tuitionRange,
      intakes: 'September',
      career: 'Project Engineer, Design Lead, Systems Specialist',
      code: 'ENG-404'
    },
    { 
      id: 'healthcare',
      name: 'BSc / MSc Healthcare Management & Global Public Health', 
      level: 'Undergraduate & PG', 
      duration: '2 - 4 Years', 
      fee: university.tuitionRange,
      intakes: 'September & January',
      career: 'Health Administrator, Clinical Analyst, NGO Director',
      code: 'HLT-505'
    },
    { 
      id: 'finance-fintech',
      name: 'BSc / MSc International Finance, FinTech & Banking', 
      level: 'Undergraduate & PG', 
      duration: '3 - 4 Years (UG) / 1 - 2 Years (PG)', 
      fee: university.tuitionRange,
      intakes: 'September & January',
      career: 'Investment Banker, Financial Analyst, Risk Manager',
      code: 'FIN-606'
    },
    { 
      id: 'digital-marketing',
      name: 'BA / MA Digital Marketing, Media & Brand Communications', 
      level: 'Undergraduate & PG', 
      duration: '3 Years (UG) / 1 Year (PG)', 
      fee: university.tuitionRange,
      intakes: 'September & January',
      career: 'Brand Strategist, Digital Growth Lead, Content Director',
      code: 'MKT-707'
    },
    { 
      id: 'biotech',
      name: 'MSc Biotechnology, Applied Life Sciences & Research', 
      level: 'Postgraduate', 
      duration: '1 - 2 Years', 
      fee: university.tuitionRange,
      intakes: 'September',
      career: 'Research Scientist, Clinical Specialist, Lab Director',
      code: 'BIO-808'
    }
  ];

  const filteredPrograms = selectedProgramLevel === 'All' 
    ? programCategories 
    : selectedProgramLevel === 'Undergraduate' 
      ? programCategories.filter(p => p.level.includes('Undergraduate') || p.level.includes('UG'))
      : programCategories.filter(p => p.level.includes('Postgraduate') || p.level.includes('PG'));

  const faqs = [
    {
      q: `What is the application deadline for international students at ${university.name}?`,
      a: `For Fall (September) intake, the recommended application submission deadline is June 30th. For Spring (January) intake, the deadline is October 31st. Priority evaluation is given to applications submitted via TASA Grassroots.`
    },
    {
      q: `Can I apply to ${university.name} without an IELTS score?`,
      a: hasIeltsWaiver 
        ? `Yes! ${university.name} accepts Medium of Instruction (MOI) certificates from accredited English-medium high schools and universities, or Grade 12 English scores of 70%+ in lieu of IELTS.`
        : `An official IELTS academic score (minimum 6.0 - 6.5) or equivalent PTE/TOEFL score is required. TASA counselors can provide guidance on English test preparation and pre-sessional language options.`
    },
    {
      q: `What are the post-study work visa rights for graduates in ${university.country}?`,
      a: `Graduates from accredited programs at ${university.name} qualify for full post-study work permits (2 to 3 years PSW) allowing open employment with top employers in ${university.country}.`
    },
    {
      q: `Are international scholarships available at ${university.name}?`,
      a: `Yes, ${university.scholarshipsAvailable}. Scholarships are automatically assessed upon submission of your academic transcripts and Statement of Purpose through TASA Grassroots.`
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-hidden">
      
      {/* MAIN MODAL CONTAINER */}
      <div 
        className={`bg-white shadow-2xl flex flex-col overflow-hidden border border-gray-200 relative transition-all duration-300 ${
          isMaximized 
            ? 'w-full h-full max-w-none max-h-none rounded-none' 
            : 'rounded-3xl max-w-5xl w-full max-h-[94vh]'
        }`}
      >
        
        {/* 1. HERO HEADER BANNER WITH BACKGROUND IMAGE OVERLAY */}
        <div className="relative w-full bg-slate-900 text-white shrink-0 overflow-hidden border-b border-gray-800">
          
          {/* Background image preview if available */}
          {university.bannerImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-25 scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url(${university.bannerImage})` }}
            />
          )}

          {/* Gradient overlay for high legibility */}
          <div className={`absolute inset-0 bg-gradient-to-r ${theme.bg} opacity-90`} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

          <div className="relative z-10 p-4 sm:p-6 space-y-4">
            
            {/* Top Control Bar */}
            <div className="flex items-center justify-between gap-3">
              
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-black/50 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-xl border border-white/20 flex items-center gap-1.5 shadow-xs">
                  <CountryFlag code={university.countryCode} country={university.country} size="xs" />
                  <span>{university.country}</span>
                </span>
                
                <span className="bg-white/95 backdrop-blur-md text-gray-950 text-xs font-black px-2.5 py-1 rounded-xl shadow-xs uppercase tracking-wider">
                  {university.isPartner ? 'Direct Partner Institution' : 'Accredited University'}
                </span>

                {university.isPathwayPartner && (
                  <span className="bg-amber-400 text-gray-950 text-xs font-black px-2.5 py-1 rounded-xl shadow-xs uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-gray-950 shrink-0" />
                    Pathway Partner
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 z-20">
                
                {/* Explicit Open in New Tab Button */}
                <button
                  onClick={handleOpenNewTab}
                  title="Open in New Tab"
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/25 text-white rounded-xl backdrop-blur-md transition-all border border-white/20 flex items-center gap-1.5 text-xs font-extrabold shadow-xs hover:scale-105"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span className="hidden sm:inline">Open in New Tab ↗</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  title="Share / Copy Direct Link"
                  className="p-2 bg-black/40 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-all hover:scale-105 flex items-center justify-center border border-white/10"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  title={isMaximized ? "Restore Window Size" : "Maximize Fullscreen View"}
                  className="p-2 bg-black/40 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-all hover:scale-105 flex items-center justify-center border border-white/10"
                >
                  {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={onClose}
                  title="Close Window"
                  className="p-2 bg-black/60 hover:bg-rose-600 text-white rounded-full backdrop-blur-md transition-all hover:scale-105 flex items-center justify-center ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* University Crest & Title Info Block */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="flex items-start sm:items-center gap-4 flex-1">
                
                {/* Crest Emblem */}
                <div className={`w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br ${theme.bg} text-white font-black flex flex-col items-center justify-center shrink-0 shadow-2xl border-2 border-white/90 relative overflow-hidden`}>
                  <GraduationCap className="w-6 h-6 text-amber-300 mb-0.5" />
                  <span className="font-heading font-black tracking-widest text-xs sm:text-sm text-amber-100">
                    {initials}
                  </span>
                </div>

                {/* Info Text */}
                <div className="text-left space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-amber-400 text-gray-950 text-xs font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                      <Award className="w-3.5 h-3.5 text-gray-950 shrink-0" />
                      {university.qsRanking || 'World Ranked'}
                    </span>
                    <span className="text-amber-200/90 text-xs font-bold">
                      QS World Ranking
                    </span>
                  </div>

                  <h1 className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-white leading-tight drop-shadow-md">
                    {university.name}
                  </h1>

                  <div className="text-xs sm:text-sm text-gray-200 flex items-center gap-2 font-bold">
                    <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>{university.location || `${university.country}`}</span>
                  </div>
                </div>
              </div>

              {/* Direct CTA Header Button */}
              <div className="shrink-0 pt-2 sm:pt-0">
                <button
                  onClick={() => {
                    onClose();
                    onOpenBookModal();
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-xs sm:text-sm rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-102"
                >
                  <span>Apply to {university.name.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 2. HIGH-IMPACT QUICK METRICS STRIP */}
        <div className="bg-slate-950 text-white px-4 sm:px-8 py-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 text-xs shrink-0 border-b border-slate-800">
          
          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Est. Tuition</span>
            <span className="font-extrabold text-amber-400 text-xs block truncate mt-0.5">{university.tuitionRange}</span>
          </div>

          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Acceptance Rate</span>
            <span className="font-extrabold text-slate-100 text-xs block truncate mt-0.5">{university.acceptanceRate || '78%'}</span>
          </div>

          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">IELTS / Language</span>
            <span className="font-extrabold text-emerald-400 text-xs block truncate mt-0.5">
              {hasIeltsWaiver ? 'Waiver Available' : 'IELTS / PTE Required'}
            </span>
          </div>

          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Scholarships</span>
            <span className="font-extrabold text-purple-300 text-xs block truncate mt-0.5">
              {hasScholarship ? 'Merit Grants' : 'Standard Rate'}
            </span>
          </div>

          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Post-Study Work</span>
            <span className="font-extrabold text-blue-300 text-xs block truncate mt-0.5">2 - 3 Years PSW</span>
          </div>

          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Offer Letter SLA</span>
            <span className="font-extrabold text-emerald-300 text-xs block truncate mt-0.5">3 - 7 Days</span>
          </div>

        </div>

        {/* 3. STICKY TAB NAVIGATION HEADER */}
        <div className="border-b border-gray-200 bg-white px-4 sm:px-8 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar shrink-0 pt-2 shadow-2xs">
          {[
            { id: 'overview', label: 'Overview & Profile', icon: Building2 },
            { id: 'programs', label: 'Degree Programs (8)', icon: BookOpen },
            { id: 'requirements', label: 'Entry Requirements', icon: FileCheck },
            { id: 'scholarships', label: 'Scholarships & Fees', icon: Sparkles },
            { id: 'campus', label: 'Campus & PSW Visa', icon: Briefcase }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-3 px-3.5 sm:px-5 border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                  isActive 
                    ? 'border-[#8B1E2D] text-[#8B1E2D] font-black bg-rose-50/70 rounded-t-xl' 
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#8B1E2D]' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 4. MODAL BODY CONTENT */}
        <div className="p-4 sm:p-8 space-y-6 overflow-y-auto flex-1 bg-slate-50/60">
          
          {/* TAB 1: OVERVIEW & PROFILE */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Institution Overview Card */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-gray-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#8B1E2D]" />
                    <span>Institutional Overview & Excellence</span>
                  </h3>
                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">
                    {university.country} Higher Education
                  </span>
                </div>

                <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-normal">
                  {university.overview}
                </p>
              </div>

              {/* Grid: Institutional Strengths & Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Strengths */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                  <div className="font-extrabold text-xs uppercase text-[#8B1E2D] tracking-wider flex items-center gap-2 pb-2 border-b border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Key International Student Advantages</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 font-medium">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Eligible for full Post-Study Work Permit (PSW) upon degree completion</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Industry Co-op placements with Fortune 500 partner corporations</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Fast-track offer letters issued within 3 to 7 business days</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Dedicated international student welfare, housing, and career placement team</span>
                    </li>
                  </ul>
                </div>

                {/* Profile Specs */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                  <div className="font-extrabold text-xs uppercase text-[#8B1E2D] tracking-wider flex items-center gap-2 pb-2 border-b border-gray-100">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span>Academic & Campus Specifications</span>
                  </div>
                  <div className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500 font-medium">Location & Region:</span>
                      <strong className="text-gray-900">{university.location}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500 font-medium">Primary Intakes:</span>
                      <strong className="text-emerald-700">Fall (Sept) & Spring (Jan)</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500 font-medium">International Student Diversity:</span>
                      <strong className="text-gray-900">80+ Nations Represented</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-500 font-medium">TASA Application Fee:</span>
                      <strong className="text-emerald-700">$0 (100% Fee Waived via TASA)</strong>
                    </div>
                  </div>
                </div>

              </div>

              {/* Popular Disciplines Grid */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                <h4 className="font-heading font-extrabold text-xs sm:text-sm text-gray-900 uppercase tracking-wider">
                  Featured Academic Disciplines
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {university.popularCourses.map((c, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 flex items-center gap-2.5">
                      <GraduationCap className="w-4 h-4 text-[#8B1E2D] shrink-0" />
                      <span className="truncate">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo Gallery Grid */}
              {university.gallery && university.gallery.length > 0 && (
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                  <h4 className="font-heading font-extrabold text-xs sm:text-sm text-gray-900 uppercase tracking-wider">
                    Campus Gallery & Facilities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {university.gallery.map((img, idx) => (
                      <div key={idx} className="h-36 rounded-xl overflow-hidden border border-gray-200 group relative">
                        <img 
                          src={img} 
                          alt={`${university.name} campus view ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: DEGREE PROGRAMS */}
          {activeTab === 'programs' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Header Filter Bar */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-gray-900">
                    Degree Programs & Courses
                  </h3>
                  <p className="text-xs text-gray-500">
                    Explore undergraduate and postgraduate degrees offered at {university.name}
                  </p>
                </div>

                {/* Level Filter Pills */}
                <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl shrink-0 text-xs font-bold">
                  {['All', 'Undergraduate', 'Postgraduate'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedProgramLevel(level)}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        selectedProgramLevel === level 
                          ? 'bg-[#8B1E2D] text-white shadow-xs font-black' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Program List Cards */}
              <div className="grid grid-cols-1 gap-3">
                {filteredPrograms.map((prog) => (
                  <div key={prog.id} className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-[#8B1E2D]/50 transition-all shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="bg-rose-50 text-[#8B1E2D] font-black text-[10px] px-2.5 py-0.5 rounded border border-rose-200 uppercase tracking-wider">
                          {prog.level}
                        </span>
                        <span className="text-gray-500 text-xs font-bold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" /> {prog.duration}
                        </span>
                        <span className="text-emerald-700 text-xs font-bold flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> Intakes: {prog.intakes}
                        </span>
                      </div>

                      <h4 className="font-heading font-extrabold text-base sm:text-lg text-gray-900">
                        {prog.name}
                      </h4>

                      <div className="text-xs text-gray-600 flex items-center gap-4 flex-wrap pt-1">
                        <span>Tuition: <strong className="text-gray-900 font-extrabold">{prog.fee}</strong></span>
                        <span>Career Pathway: <strong className="text-gray-800 font-bold">{prog.career}</strong></span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onOpenBookModal();
                      }}
                      className="px-5 py-2.5 bg-gray-900 hover:bg-[#8B1E2D] text-white font-extrabold text-xs rounded-xl transition-colors shrink-0 flex items-center justify-center gap-2 shadow-xs"
                    >
                      <span>Check Eligibility</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 3: ENTRY REQUIREMENTS */}
          {activeTab === 'requirements' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-gray-900">
                  Admission Criteria & Entry Requirements
                </h3>
                <p className="text-xs text-gray-500">
                  Standard academic and language proficiency requirements for international applicants at {university.name}
                </p>
              </div>

              {/* Requirement Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                  <div className="text-xs font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#8B1E2D]" />
                    <span>Undergraduate (UG)</span>
                  </div>
                  <div className="font-extrabold text-sm text-gray-900 leading-snug">
                    {university.entryRequirements.ug}
                  </div>
                  <p className="text-xs text-gray-500 pt-2 border-t border-gray-100 leading-relaxed">
                    High school diploma / Grade 12 completion with minimum aggregate in core academic subjects.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                  <div className="text-xs font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#8B1E2D]" />
                    <span>Postgraduate (PG)</span>
                  </div>
                  <div className="font-extrabold text-sm text-gray-900 leading-snug">
                    {university.entryRequirements.pg}
                  </div>
                  <p className="text-xs text-gray-500 pt-2 border-t border-gray-100 leading-relaxed">
                    Recognized 3 or 4 year Bachelor degree with minimum passing GPA / percentage.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                  <div className="text-xs font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-[#8B1E2D]" />
                    <span>English Proficiency</span>
                  </div>
                  <div className="font-extrabold text-sm text-[#8B1E2D] leading-snug">
                    {university.entryRequirements.english}
                  </div>
                  <p className="text-xs text-gray-500 pt-2 border-t border-gray-100 leading-relaxed">
                    IELTS, PTE, TOEFL, Duolingo, or Medium of Instruction (MOI) English Medium Certificate.
                  </p>
                </div>

              </div>

              {/* IELTS Waiver Callout */}
              {hasIeltsWaiver && (
                <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3.5 shadow-2xs">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-heading font-extrabold text-sm text-emerald-950">
                      IELTS Test Waiver Available
                    </h4>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      Applicants who completed Grade 12 or a Bachelor degree in English (MOI certificate), or scored 70%+ in Grade 12 English, can qualify for a complete IELTS test waiver.
                    </p>
                  </div>
                </div>
              )}

              {/* Document Checklist */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                <h4 className="font-heading font-extrabold text-xs sm:text-sm text-gray-900 uppercase tracking-wider">
                  Required Application Documents Checklist
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs font-semibold text-gray-700">
                  {[
                    'Academic Transcripts & Marksheets',
                    'Graduation Certificate / Degree',
                    'Passport Copy (Valid min 6 months)',
                    'Statement of Purpose (SOP)',
                    '2 Letters of Recommendation (LOR)',
                    'English Test Score OR MOI Letter'
                  ].map((doc, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-gray-200 flex items-center gap-2.5">
                      <FileCheck className="w-4 h-4 text-[#8B1E2D] shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: SCHOLARSHIPS & FEES */}
          {activeTab === 'scholarships' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="p-6 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-300 rounded-2xl flex items-start gap-4 shadow-2xs">
                <div className="p-3 bg-amber-500 text-white rounded-xl shrink-0 shadow-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-heading font-extrabold text-base text-gray-900">
                    International Merit Scholarship & Fee Concession
                  </h4>
                  <div className="font-black text-base text-[#8B1E2D]">
                    {university.scholarshipsAvailable}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Evaluated automatically upon submission of academic transcripts. TASA Grassroots applicants receive priority evaluation for tuition waivers and institutional grants.
                  </p>
                </div>
              </div>

              {/* Estimated Investment Calculator Widget */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
                <h4 className="font-heading font-extrabold text-xs sm:text-sm text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>Estimated Annual Study & Living Cost Breakdown</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-gray-200 space-y-1">
                    <span className="text-gray-500 font-medium block">Tuition Fee</span>
                    <strong className="text-gray-900 text-sm block">{university.tuitionRange}</strong>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-gray-200 space-y-1">
                    <span className="text-gray-500 font-medium block">Living Expenses (Est.)</span>
                    <strong className="text-gray-900 text-sm block">$8,000 - $12,000 / year</strong>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-gray-200 space-y-1">
                    <span className="text-gray-500 font-medium block">Health Insurance & Fees</span>
                    <strong className="text-gray-900 text-sm block">$800 - $1,200 / year</strong>
                  </div>

                  <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 space-y-1">
                    <span className="text-emerald-800 font-medium block">Scholarship Potential</span>
                    <strong className="text-emerald-700 text-sm block">Up to 30% Waiver</strong>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: CAMPUS & PSW VISA */}
          {activeTab === 'campus' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-gray-900">
                    <Building2 className="w-4 h-4 text-[#8B1E2D]" />
                    <span>On-Campus & Student Accommodation</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Modern on-campus dormitories and verified student residences equipped with high-speed Wi-Fi, 24/7 security, study lounges, and dining facilities within walking distance of academic buildings.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-gray-900">
                    <Briefcase className="w-4 h-4 text-emerald-700" />
                    <span>Post-Study Work Permit (PSW)</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Graduates qualify for full post-study work visas (2 to 3 years PSW depending on host country regulations) allowing open full-time employment with global corporations.
                  </p>
                </div>

              </div>

              {/* Student FAQs Accordion */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
                <h4 className="font-heading font-extrabold text-xs sm:text-sm text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#8B1E2D]" />
                  <span>Frequently Asked Questions ({university.name})</span>
                </h4>

                <div className="space-y-2.5">
                  {faqs.map((faq, idx) => (
                    <div 
                      key={idx}
                      className="border border-gray-200 rounded-xl overflow-hidden bg-slate-50/50"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                        className="w-full p-4 text-left font-bold text-xs sm:text-sm text-gray-900 flex items-center justify-between gap-3 hover:bg-gray-100/80 transition-colors"
                      >
                        <span>{faq.q}</span>
                        {openFaqIndex === idx ? (
                          <ChevronUp className="w-4 h-4 text-[#8B1E2D] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                        )}
                      </button>
                      
                      {openFaqIndex === idx && (
                        <div className="p-4 pt-0 text-xs text-gray-600 leading-relaxed border-t border-gray-200/60 bg-white">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* 5. MODAL FOOTER BAR */}
        <div className="p-4 sm:p-6 bg-white border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 shadow-xs">
          
          <div className="text-xs text-gray-600 font-medium text-center sm:text-left flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 hidden sm:block" />
            <span>
              Official Partner Portal • <strong className="text-gray-900">0 Service Fees</strong> via TASA Grassroots
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            
            {/* Open in New Tab Button in Footer */}
            <button
              onClick={handleOpenNewTab}
              className="px-4 py-3 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 rounded-xl font-extrabold text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-2xs"
            >
              <ExternalLink className="w-4 h-4 text-[#8B1E2D]" />
              <span>Open in New Tab</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-extrabold text-xs transition-colors shrink-0"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenBookModal();
              }}
              className="flex-1 sm:flex-initial px-6 py-3 bg-[#8B1E2D] hover:bg-gray-950 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Apply to {university.name.split(' ')[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
