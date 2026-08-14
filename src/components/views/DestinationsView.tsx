import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DESTINATIONS, UNIVERSITIES } from '../../data/mockData';
import { CountryFlag } from '../CountryFlag';
import { Destination, University } from '../../types';
import { 
  MapPin, 
  CheckCircle2, 
  GraduationCap, 
  DollarSign, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  HelpCircle,
  Building2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface DestinationsViewProps {
  onOpenBookModal: () => void;
  onSelectUniversity: (uni: University) => void;
}

export const DestinationsView: React.FC<DestinationsViewProps> = ({
  onOpenBookModal,
  onSelectUniversity
}) => {
  const [selectedDestId, setSelectedDestId] = useState('uk');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const currentDest = DESTINATIONS.find(d => d.id === selectedDestId) || DESTINATIONS[0];
  const destUniversities = UNIVERSITIES.filter(u => u.country.toLowerCase().includes(currentDest.name.toLowerCase()) || (currentDest.code === 'UK' && u.countryCode === 'UK') || (currentDest.code === 'CA' && u.countryCode === 'CA'));

  return (
    <div className="space-y-12 pb-16">
      
      {/* Country Selection Tab Bar */}
      <div className="bg-white border-b border-[#E8E8E8] sticky top-[64px] sm:top-[73px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto no-scrollbar py-2.5 sm:py-3">
          {DESTINATIONS.map((d) => (
            <button
              key={d.id}
              onClick={() => {
                setSelectedDestId(d.id);
                setOpenFaqIndex(0);
              }}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all flex items-center gap-2 min-h-[40px] ${
                selectedDestId === d.id
                  ? 'bg-[#8B1E2D] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <CountryFlag code={d.code} country={d.name} size="sm" />
              <span className="whitespace-nowrap">{d.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Country Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl h-[360px] sm:h-[420px]">
          <img 
            src={currentDest.heroImage} 
            alt={currentDest.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />

          <div className="absolute bottom-5 sm:bottom-8 left-4 sm:left-6 right-4 sm:right-6 text-white space-y-2.5 sm:space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <CountryFlag code={currentDest.code} country={currentDest.name} size="xs" />
              <span>Study Destination Guide</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl xs:text-3xl sm:text-5xl text-white leading-tight">
              Study in {currentDest.name}
            </h1>
            <p className="text-white/90 text-xs sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-none">
              {currentDest.longDescription}
            </p>
            <div className="pt-1 sm:pt-2 flex items-center gap-4">
              <button
                onClick={onOpenBookModal}
                className="w-full sm:w-auto px-6 py-3 bg-[#8B1E2D] hover:bg-white hover:text-[#8B1E2D] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all min-h-[44px] flex items-center justify-center"
              >
                Book Counselling for {currentDest.name}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Financials & Work Rights Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E8E8E8] shadow-sm space-y-1">
          <div className="text-[10px] font-bold text-gray-400 uppercase">Avg UG Tuition</div>
          <div className="font-heading font-extrabold text-sm sm:text-base text-[#8B1E2D]">{currentDest.avgTuitionUG}</div>
        </div>
        <div className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E8E8E8] shadow-sm space-y-1">
          <div className="text-[10px] font-bold text-gray-400 uppercase">Avg PG Tuition</div>
          <div className="font-heading font-extrabold text-sm sm:text-base text-[#8B1E2D]">{currentDest.avgTuitionPG}</div>
        </div>
        <div className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E8E8E8] shadow-sm space-y-1">
          <div className="text-[10px] font-bold text-gray-400 uppercase">Avg Living Cost</div>
          <div className="font-heading font-extrabold text-sm sm:text-base text-gray-800">{currentDest.avgLivingCost}</div>
        </div>
        <div className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E8E8E8] shadow-sm space-y-1 col-span-2 sm:col-span-1">
          <div className="text-[10px] font-bold text-gray-400 uppercase">Top Student Cities</div>
          <div className="font-heading font-bold text-xs text-gray-800">{currentDest.topCities.join(', ')}</div>
        </div>
      </section>

      {/* Why Study Here & Work / Visa Rights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Why Study Here */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E8] shadow-soft space-y-6">
          <h2 className="font-heading font-bold text-2xl text-[#222222]">
            Why Study in {currentDest.name}?
          </h2>
          <div className="space-y-3">
            {currentDest.whyStudyHere.map((reason, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-[#FAFAFA] rounded-xl border border-gray-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-700 font-medium">{reason}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h3 className="font-heading font-bold text-base text-[#222222] mb-2">Popular Courses</h3>
            <div className="flex flex-wrap gap-2">
              {currentDest.popularCourses.map((c, i) => (
                <span key={i} className="px-3 py-1 bg-[#8B1E2D]/10 text-[#8B1E2D] font-bold text-xs rounded-lg">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Work Rights & PR Opportunities */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 rounded-3xl border border-[#E8E8E8] shadow-soft space-y-3">
            <div className="flex items-center gap-2 text-[#8B1E2D]">
              <Briefcase className="w-5 h-5" />
              <h3 className="font-heading font-bold text-lg text-[#222222]">Part-time & Post-Study Work Rights</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{currentDest.workRights}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E8E8E8] shadow-soft space-y-3">
            <div className="flex items-center gap-2 text-[#8B1E2D]">
              <TrendingUp className="w-5 h-5" />
              <h3 className="font-heading font-bold text-lg text-[#222222]">PR & Settlement Opportunities</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{currentDest.prOpportunity}</p>
          </div>

          <div className="bg-[#FAFAFA] p-6 rounded-3xl border border-gray-200 space-y-3">
            <h3 className="font-heading font-bold text-sm text-[#222222] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#8B1E2D]" /> Student Visa Requirements
            </h3>
            <ul className="space-y-1.5 text-xs text-gray-600">
              {currentDest.visaRequirements.map((req, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8B1E2D] rounded-full" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </section>

      {/* Top Universities in Country */}
      {destUniversities.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-heading font-bold text-2xl text-[#222222]">
            Top Universities in {currentDest.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destUniversities.map((uni, idx) => (
              <motion.div
                key={uni.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                onClick={() => onSelectUniversity(uni)}
                className="bg-white rounded-2xl border border-[#E8E8E8] shadow-soft shadow-soft-hover p-6 space-y-4 cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#8B1E2D] bg-[#8B1E2D]/10 px-2.5 py-0.5 rounded-full">
                    {uni.qsRanking}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-[#222222]">{uni.name}</h3>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8B1E2D]" />
                    <span>{uni.location}</span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">{uni.overview}</p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-800">{uni.tuitionRange}</span>
                  <span className="font-bold text-[#8B1E2D]">View Profile →</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Country Specific FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <h2 className="font-heading font-bold text-2xl text-[#222222] text-center">
          Frequently Asked Questions ({currentDest.name})
        </h2>

        <div className="space-y-3">
          {currentDest.faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                className="w-full p-5 text-left font-heading font-bold text-sm text-[#222222] flex items-center justify-between gap-4"
              >
                <span>{faq.question}</span>
                {openFaqIndex === i ? <ChevronUp className="w-4 h-4 text-[#8B1E2D]" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {openFaqIndex === i && (
                <div className="px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
