import React, { useState, useEffect } from 'react';
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
  ExternalLink,
  Download,
  Share2,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  PhoneCall,
  MessageCircle,
  Printer,
  Sparkle
} from 'lucide-react';
import { University, Course } from '../../types';
import { CountryFlag } from '../CountryFlag';
import { getUniversityCrestTheme, getUniversityInitials } from '../../utils/universityLogos';
import { formatTuitionInINR, getCountryCurrencyInfo, getCachedRates } from '../../utils/currencyUtils';

interface UniversityDetailViewProps {
  university: University;
  onBack: () => void;
  onOpenBookModal: () => void;
  onSelectCourse?: (course: Course) => void;
  onNavigate?: (view: any) => void;
}

type TabType = 'overview' | 'programs' | 'requirements' | 'scholarships' | 'campus';

export const UniversityDetailView: React.FC<UniversityDetailViewProps> = ({
  university,
  onBack,
  onOpenBookModal,
  onSelectCourse,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedProgramLevel, setSelectedProgramLevel] = useState<string>('All');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Scroll to top when university page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [university.id]);

  const theme = getUniversityCrestTheme(university.name);
  const initials = getUniversityInitials(university.name);
  
  const currencyInfo = getCountryCurrencyInfo(university.countryCode || university.country);
  const inrEstimate = formatTuitionInINR(university.tuitionRange, university.countryCode || university.country);
  const rates = getCachedRates();
  const currentRate = rates[currencyInfo.code] || 86.8;

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
    <div className="min-h-screen bg-slate-50/80 pb-16 animate-in fade-in duration-200">
      
      {/* 1. TOP BREADCRUMB & BACK NAVIGATION STRIP */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 overflow-x-auto no-scrollbar py-1">
            <button 
              onClick={onBack}
              className="hover:text-[#8B1E2D] font-bold flex items-center gap-1 shrink-0 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#8B1E2D]" />
              <span>Back to Universities</span>
            </button>
            <span className="text-gray-300 shrink-0">/</span>
            <span className="text-gray-400 shrink-0">{university.country}</span>
            <span className="text-gray-300 shrink-0">/</span>
            <span className="text-gray-900 font-black truncate">{university.name}</span>
          </div>

          {/* Quick Utility Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyLink}
              title="Share Link"
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs rounded-xl transition-all flex items-center gap-1.5 border border-gray-200"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={handlePrintPage}
              title="Print Prospectus"
              className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all border border-gray-200 hidden sm:flex items-center justify-center"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenBookModal}
              className="px-4 py-1.5 bg-[#8B1E2D] hover:bg-gray-950 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>Apply Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* 2. FULL-PAGE HERO BANNER */}
      <div className="relative w-full bg-slate-950 text-white overflow-hidden border-b border-gray-800">
        
        {/* Background Image Overlay */}
        {university.bannerImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 transition-transform duration-1000"
            style={{ backgroundImage: `url(${university.bannerImage})` }}
          />
        )}

        <div className={`absolute inset-0 bg-gradient-to-r ${theme.bg} opacity-90`} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-6">
          
          {/* Top Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-black/50 backdrop-blur-md text-white text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-xl border border-white/20 flex items-center gap-2 shadow-xs">
              <CountryFlag code={university.countryCode} country={university.country} size="xs" />
              <span>{university.country}</span>
            </span>

            <span className="bg-white/95 backdrop-blur-md text-gray-950 text-xs sm:text-sm font-black px-3 py-1.5 rounded-xl shadow-xs uppercase tracking-wider">
              {university.isPartner ? 'Direct Partner Institution' : 'Accredited University'}
            </span>

            {university.isPathwayPartner && (
              <span className="bg-amber-400 text-gray-950 text-xs sm:text-sm font-black px-3 py-1.5 rounded-xl shadow-xs uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-gray-950 shrink-0" />
                Pathway Partner
              </span>
            )}

            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-black px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>0% TASA Agency Fees</span>
            </span>
          </div>

          {/* Title & Crest Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
            <div className="flex items-start sm:items-center gap-5 flex-1">
              
              {/* Crest Logo */}
              <div className={`w-16 h-16 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br ${theme.bg} text-white font-black flex flex-col items-center justify-center shrink-0 shadow-2xl border-2 border-white/90 relative overflow-hidden`}>
                <GraduationCap className="w-7 h-7 sm:w-10 sm:h-10 text-amber-300 mb-0.5" />
                <span className="font-heading font-black tracking-widest text-xs sm:text-base text-amber-100">
                  {initials}
                </span>
              </div>

              {/* Title Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="bg-amber-400 text-gray-950 text-xs font-black px-3 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                    <Award className="w-4 h-4 text-gray-950 shrink-0" />
                    {university.qsRanking || 'World Ranked'}
                  </span>
                  <span className="text-amber-200/90 text-xs sm:text-sm font-extrabold">
                    QS World University Ranking
                  </span>
                </div>

                <h1 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl text-white leading-tight drop-shadow-md">
                  {university.name}
                </h1>

                <div className="text-sm sm:text-base text-gray-200 flex items-center gap-2 font-bold">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 shrink-0" />
                  <span>{university.location || `${university.country}`}</span>
                </div>
              </div>
            </div>

            {/* Direct CTA Header Buttons */}
            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenBookModal}
                className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-sm sm:text-base rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2.5 hover:scale-102"
              >
                <span>Apply to {university.name.split(' ')[0]}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. HIGH-IMPACT QUICK METRICS STRIP */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
          
          <div className="bg-slate-800/90 p-3 rounded-2xl border border-slate-700/80">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Est. Tuition (INR ₹)</span>
            <span className="font-extrabold text-amber-400 text-xs sm:text-sm block truncate mt-0.5" title={`${university.tuitionRange} (${inrEstimate.inrText})`}>
              {university.tuitionRange} <span className="text-emerald-400">({inrEstimate.lakhsRange})</span>
            </span>
          </div>

          <div className="bg-slate-800/90 p-3 rounded-2xl border border-slate-700/80">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Acceptance Rate</span>
            <span className="font-extrabold text-slate-100 text-sm block truncate mt-0.5">{university.acceptanceRate || '78%'}</span>
          </div>

          <div className="bg-slate-800/90 p-3 rounded-2xl border border-slate-700/80">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">IELTS / Language</span>
            <span className="font-extrabold text-emerald-400 text-sm block truncate mt-0.5">
              {hasIeltsWaiver ? 'Waiver Available' : 'IELTS / PTE Required'}
            </span>
          </div>

          <div className="bg-slate-800/90 p-3 rounded-2xl border border-slate-700/80">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Scholarships</span>
            <span className="font-extrabold text-purple-300 text-sm block truncate mt-0.5">
              {hasScholarship ? 'Merit Grants' : 'Standard Rate'}
            </span>
          </div>

          <div className="bg-slate-800/90 p-3 rounded-2xl border border-slate-700/80">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Post-Study Work</span>
            <span className="font-extrabold text-blue-300 text-sm block truncate mt-0.5">2 - 3 Years PSW</span>
          </div>

          <div className="bg-slate-800/90 p-3 rounded-2xl border border-slate-700/80">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Offer SLA</span>
            <span className="font-extrabold text-emerald-300 text-sm block truncate mt-0.5">3 - 7 Days</span>
          </div>

        </div>
      </div>

      {/* 4. MAIN LAYOUT: TABBED NAVIGATION & TWO-COLUMN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Sticky Tab Navigation Bar */}
        <div className="border-b border-gray-200 bg-white rounded-2xl p-1.5 shadow-xs mb-8 flex items-center gap-2 overflow-x-auto no-scrollbar">
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
                className={`py-3 px-5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2.5 shrink-0 ${
                  isActive 
                    ? 'bg-[#8B1E2D] text-white font-black shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Grid: Main Content + Sticky Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* MAIN CONTENT COLUMN (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* TAB 1: OVERVIEW & PROFILE */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                
                {/* Institutional Overview Card */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-2xs space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <h2 className="font-heading font-black text-xl sm:text-2xl text-gray-900 flex items-center gap-2.5">
                      <Building2 className="w-6 h-6 text-[#8B1E2D]" />
                      <span>About {university.name}</span>
                    </h2>
                    <span className="text-xs font-extrabold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-xl">
                      {university.country} Higher Education
                    </span>
                  </div>

                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-normal">
                    {university.overview}
                  </p>
                </div>

                {/* Grid: Advantages & Profile Specs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Advantages */}
                  <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
                    <div className="font-extrabold text-xs uppercase text-[#8B1E2D] tracking-wider flex items-center gap-2 pb-3 border-b border-gray-100">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Key Student Advantages</span>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-700 font-medium">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Eligible for full Post-Study Work Permit (PSW) upon degree completion</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Industry Co-op placements with Fortune 500 partner corporations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Fast-track offer letters issued within 3 to 7 business days</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Dedicated international student welfare, housing, and career placement team</span>
                      </li>
                    </ul>
                  </div>

                  {/* Campus Specs */}
                  <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
                    <div className="font-extrabold text-xs uppercase text-[#8B1E2D] tracking-wider flex items-center gap-2 pb-3 border-b border-gray-100">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <span>Academic & Campus Profile</span>
                    </div>
                    <div className="space-y-3 text-sm text-gray-700">
                      <div className="flex justify-between py-1.5 border-b border-gray-100">
                        <span className="text-gray-500 font-medium">Location & Region:</span>
                        <strong className="text-gray-900">{university.location}</strong>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-gray-100">
                        <span className="text-gray-500 font-medium">Primary Intakes:</span>
                        <strong className="text-emerald-700">Fall (Sept) & Spring (Jan)</strong>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-gray-100">
                        <span className="text-gray-500 font-medium">International Diversity:</span>
                        <strong className="text-gray-900">80+ Nations Represented</strong>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-gray-500 font-medium">TASA Application Fee:</span>
                        <strong className="text-emerald-700">$0 (100% Fee Waived via TASA)</strong>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Popular Disciplines Grid */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
                  <h3 className="font-heading font-extrabold text-base text-gray-900 uppercase tracking-wider">
                    Featured Academic Disciplines
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {university.popularCourses.map((c, i) => (
                      <div key={i} className="p-3.5 bg-slate-50 rounded-2xl border border-gray-200 text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-3">
                        <GraduationCap className="w-5 h-5 text-[#8B1E2D] shrink-0" />
                        <span className="truncate">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: DEGREE PROGRAMS */}
            {activeTab === 'programs' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* Header Filter Bar */}
                <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading font-black text-xl text-gray-900">
                      Degree Programs & Disciplines
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Explore career-focused undergraduate and postgraduate degrees offered at {university.name}
                    </p>
                  </div>

                  {/* Level Filter Pills */}
                  <div className="flex items-center gap-1.5 bg-gray-100 p-1.5 rounded-2xl shrink-0 text-xs font-bold">
                    {['All', 'Undergraduate', 'Postgraduate'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedProgramLevel(level)}
                        className={`px-4 py-2 rounded-xl transition-all ${
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
                <div className="grid grid-cols-1 gap-4">
                  {filteredPrograms.map((prog) => (
                    <div key={prog.id} className="bg-white p-6 rounded-3xl border border-gray-200 hover:border-[#8B1E2D]/60 transition-all shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5">
                      
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="bg-rose-50 text-[#8B1E2D] font-black text-xs px-3 py-1 rounded-lg border border-rose-200 uppercase tracking-wider">
                            {prog.level}
                          </span>
                          <span className="text-gray-500 text-xs font-bold flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-gray-400" /> {prog.duration}
                          </span>
                          <span className="text-emerald-700 text-xs font-bold flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" /> Intakes: {prog.intakes}
                          </span>
                        </div>

                        <h3 className="font-heading font-extrabold text-lg sm:text-xl text-gray-900">
                          {prog.name}
                        </h3>

                        <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-6 flex-wrap pt-1">
                          <span>Tuition: <strong className="text-gray-900 font-extrabold">{prog.fee}</strong></span>
                          <span>Career Pathway: <strong className="text-gray-800 font-bold">{prog.career}</strong></span>
                        </div>
                      </div>

                      <button
                        onClick={onOpenBookModal}
                        className="px-6 py-3 bg-gray-900 hover:bg-[#8B1E2D] text-white font-extrabold text-xs sm:text-sm rounded-2xl transition-colors shrink-0 flex items-center justify-center gap-2 shadow-xs"
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
                
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-1">
                  <h2 className="font-heading font-black text-xl text-gray-900">
                    Admission Criteria & Entry Requirements
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Standard academic and language proficiency criteria for international admission at {university.name}
                  </p>
                </div>

                {/* Requirement Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  
                  <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-3">
                    <div className="text-xs font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#8B1E2D]" />
                      <span>Undergraduate (UG)</span>
                    </div>
                    <div className="font-extrabold text-base text-gray-900 leading-snug">
                      {university.entryRequirements.ug}
                    </div>
                    <p className="text-xs text-gray-500 pt-2 border-t border-gray-100 leading-relaxed">
                      High school diploma / Grade 12 completion with minimum aggregate in core academic subjects.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-3">
                    <div className="text-xs font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#8B1E2D]" />
                      <span>Postgraduate (PG)</span>
                    </div>
                    <div className="font-extrabold text-base text-gray-900 leading-snug">
                      {university.entryRequirements.pg}
                    </div>
                    <p className="text-xs text-gray-500 pt-2 border-t border-gray-100 leading-relaxed">
                      Recognized 3 or 4 year Bachelor degree with minimum passing GPA / percentage.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-3">
                    <div className="text-xs font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#8B1E2D]" />
                      <span>English Proficiency</span>
                    </div>
                    <div className="font-extrabold text-base text-[#8B1E2D] leading-snug">
                      {university.entryRequirements.english}
                    </div>
                    <p className="text-xs text-gray-500 pt-2 border-t border-gray-100 leading-relaxed">
                      IELTS, PTE, TOEFL, Duolingo, or Medium of Instruction (MOI) English Medium Certificate.
                    </p>
                  </div>

                </div>

                {/* IELTS Waiver Callout */}
                {hasIeltsWaiver && (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-3xl flex items-start gap-4 shadow-2xs">
                    <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h3 className="font-heading font-black text-base text-emerald-950">
                        IELTS Test Waiver Available
                      </h3>
                      <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                        Applicants who completed Grade 12 or a Bachelor degree in English (MOI certificate), or scored 70%+ in Grade 12 English, can qualify for a complete IELTS test waiver.
                      </p>
                    </div>
                  </div>
                )}

                {/* Document Checklist */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
                  <h3 className="font-heading font-extrabold text-sm text-gray-900 uppercase tracking-wider">
                    Required Application Documents Checklist
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs sm:text-sm font-semibold text-gray-700">
                    {[
                      'Academic Transcripts & Marksheets',
                      'Graduation Certificate / Degree',
                      'Passport Copy (Valid min 6 months)',
                      'Statement of Purpose (SOP)',
                      '2 Letters of Recommendation (LOR)',
                      'English Test Score OR MOI Letter'
                    ].map((doc, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-gray-200 flex items-center gap-3">
                        <FileCheck className="w-5 h-5 text-[#8B1E2D] shrink-0" />
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
                
                <div className="p-8 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-300 rounded-3xl flex items-start gap-5 shadow-2xs">
                  <div className="p-4 bg-amber-500 text-white rounded-2xl shrink-0 shadow-md">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-heading font-black text-xl text-gray-900">
                      International Merit Scholarship & Fee Concession
                    </h3>
                    <div className="font-black text-lg text-[#8B1E2D]">
                      {university.scholarshipsAvailable}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Evaluated automatically upon submission of academic transcripts. TASA Grassroots applicants receive priority evaluation for tuition waivers and institutional grants.
                    </p>
                  </div>
                </div>

                {/* Cost Breakdown Calculator with Forex Conversion */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                    <h3 className="font-heading font-extrabold text-sm text-gray-900 uppercase tracking-wider flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                      <span>Estimated Annual Cost Breakdown & Forex (₹ INR)</span>
                    </h3>
                    <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1">
                      <span>1 {currencyInfo.code} = ₹{currentRate.toFixed(2)} INR</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200 space-y-1">
                      <span className="text-gray-500 font-medium block">Tuition Fee</span>
                      <strong className="text-gray-900 text-base block">{university.tuitionRange}</strong>
                      <span className="text-emerald-700 font-bold text-xs block">Approx. {inrEstimate.inrText}</span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200 space-y-1">
                      <span className="text-gray-500 font-medium block">Living Expenses (Est.)</span>
                      <strong className="text-gray-900 text-base block">~{currencyInfo.symbol}8,000 - {currencyInfo.symbol}12,000 / yr</strong>
                      <span className="text-emerald-700 font-bold text-xs block">
                        Approx. ₹{((8000 * currentRate) / 100000).toFixed(1)}L - ₹{((12000 * currentRate) / 100000).toFixed(1)}L / yr
                      </span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200 space-y-1">
                      <span className="text-gray-500 font-medium block">Health Insurance & Fees</span>
                      <strong className="text-gray-900 text-base block">~{currencyInfo.symbol}800 - {currencyInfo.symbol}1,200 / yr</strong>
                      <span className="text-emerald-700 font-bold text-xs block">
                        Approx. ₹{((800 * currentRate) / 1000).toFixed(0)}k - ₹{((1200 * currentRate) / 1000).toFixed(0)}k / yr
                      </span>
                    </div>

                    <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-1">
                      <span className="text-emerald-800 font-medium block">Scholarship Potential</span>
                      <strong className="text-emerald-700 text-base block">Up to 30% Waiver</strong>
                      <span className="text-emerald-900 font-extrabold text-xs block">TASA Priority Evaluation</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 5: CAMPUS & PSW VISA */}
            {activeTab === 'campus' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-3">
                    <div className="flex items-center gap-2.5 font-extrabold text-base text-gray-900">
                      <Building2 className="w-5 h-5 text-[#8B1E2D]" />
                      <span>On-Campus & Student Housing</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Modern on-campus dormitories and verified student residences equipped with high-speed Wi-Fi, 24/7 security, study lounges, and dining facilities within walking distance of academic buildings.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-3">
                    <div className="flex items-center gap-2.5 font-extrabold text-base text-gray-900">
                      <Briefcase className="w-5 h-5 text-emerald-700" />
                      <span>Post-Study Work Permit (PSW)</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Graduates qualify for full post-study work visas (2 to 3 years PSW depending on host country regulations) allowing open full-time employment with global corporations.
                    </p>
                  </div>

                </div>

                {/* FAQs Accordion */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-5">
                  <h3 className="font-heading font-extrabold text-sm text-gray-900 uppercase tracking-wider flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#8B1E2D]" />
                    <span>Frequently Asked Questions ({university.name})</span>
                  </h3>

                  <div className="space-y-3">
                    {faqs.map((faq, idx) => (
                      <div 
                        key={idx}
                        className="border border-gray-200 rounded-2xl overflow-hidden bg-slate-50/50"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                          className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-gray-900 flex items-center justify-between gap-4 hover:bg-gray-100/80 transition-colors"
                        >
                          <span>{faq.q}</span>
                          {openFaqIndex === idx ? (
                            <ChevronUp className="w-5 h-5 text-[#8B1E2D] shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                          )}
                        </button>
                        
                        {openFaqIndex === idx && (
                          <div className="p-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-200/60 bg-white">
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

          {/* STICKY RIGHT SIDEBAR (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            
            {/* Primary Action Box */}
            <div className="bg-gradient-to-br from-slate-900 to-gray-950 text-white p-6 rounded-3xl shadow-xl border border-slate-800 space-y-5">
              
              <div className="space-y-2">
                <span className="bg-amber-400 text-gray-950 font-black text-[10px] px-2.5 py-1 rounded uppercase tracking-wider inline-block">
                  Direct Admission Channel
                </span>
                <h3 className="font-heading font-black text-xl text-white">
                  Apply to {university.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Submit your application through TASA Grassroots with <strong className="text-emerald-400 font-bold">$0 processing fees</strong> and priority offer letter evaluation.
                </p>
              </div>

              {/* Bullet Features */}
              <div className="space-y-2.5 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free Application & Document Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Automatic Scholarship Assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Visa Guidance & Interview Prep</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={onOpenBookModal}
                  className="w-full py-3.5 px-5 bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Start Free Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/919876543210?text=Hello%20TASA,%20I%20am%20interested%20in%20applying%20to%20" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Quick Facts Sidebar Card */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
              <h4 className="font-heading font-extrabold text-xs uppercase text-gray-500 tracking-wider">
                Quick University Summary
              </h4>

              <div className="space-y-3 text-xs sm:text-sm text-gray-700">
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Host Country:</span>
                  <strong className="text-gray-900 font-bold">{university.country}</strong>
                </div>

                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">QS World Rank:</span>
                  <strong className="text-amber-700 font-bold">{university.qsRanking || 'Top Ranked'}</strong>
                </div>

                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Est. Tuition:</span>
                  <div className="text-right">
                    <strong className="text-gray-900 font-bold block">{university.tuitionRange}</strong>
                    <span className="text-emerald-700 font-bold text-[11px] block">({inrEstimate.lakhsRange})</span>
                  </div>
                </div>

                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Post-Study Work:</span>
                  <strong className="text-blue-700 font-bold">2 - 3 Years PSW</strong>
                </div>

                <div className="flex justify-between py-1.5">
                  <span className="text-gray-500">Language Test:</span>
                  <strong className="text-emerald-700 font-bold">
                    {hasIeltsWaiver ? 'Waiver Available' : 'IELTS / PTE Required'}
                  </strong>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
