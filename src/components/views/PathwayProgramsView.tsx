import React from 'react';
import { motion } from 'motion/react';
import { PATHWAY_PROGRAMS } from '../../data/mockData';
import { CountryFlag } from '../CountryFlag';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  Globe2, 
  Building2,
  DollarSign,
  Clock,
  BookOpen,
  Award,
  BadgeDollarSign,
  FileCheck2
} from 'lucide-react';

interface PathwayProgramsViewProps {
  onOpenBookModal: () => void;
}

export const PathwayProgramsView: React.FC<PathwayProgramsViewProps> = ({ onOpenBookModal }) => {
  const igMbaPrograms = PATHWAY_PROGRAMS.filter(p => p.category === 'Integrated Global BBA + MBA (igMBA)');
  const mbaPathways = PATHWAY_PROGRAMS.filter(p => p.category === 'MBA Pathways (uMBA / gMBA)');

  return (
    <div className="space-y-16 pb-16 pt-4">
      
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#111111] via-[#1A1A1A] to-[#2B0910] text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-[#8B1E2D]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#8B1E2D] text-white px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Grassroots Study Abroad Academic Pathways
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              International Transfer Pathway Options & Fee Structure
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Start your degree program at Grassroots Study Abroad India campus with synchronized curriculum, transfer seamlessly to global partner university campuses in UAE, Netherlands, or Bulgaria, and save significantly on tuition fees.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBookModal}
                className="px-8 py-3.5 bg-[#8B1E2D] hover:bg-white hover:text-[#8B1E2D] text-white font-bold text-sm rounded-2xl shadow-xl transition-all flex items-center gap-2"
              >
                <span>Apply for Pathway Counselling</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Summary Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#E8E8E8] shadow-soft space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center font-bold text-lg shadow-2xs">
            <BadgeDollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="font-heading font-bold text-base text-[#222222]">Transparent Fee Structure</h3>
          <p className="text-xs text-gray-600">Fixed India & International tuition costs with clear total fee breakdowns in USD.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E8E8E8] shadow-soft space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/80 flex items-center justify-center font-bold text-lg shadow-2xs">
            <FileCheck2 className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-heading font-bold text-base text-[#222222]">Synchronized Credit Transfer</h3>
          <p className="text-xs text-gray-600">Guaranteed credit transfer approval from Grassroots Study Abroad India campus to global partners.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E8E8E8] shadow-soft space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 border border-purple-200/80 flex items-center justify-center font-bold text-lg shadow-2xs">
            <GraduationCap className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="font-heading font-bold text-base text-[#222222]">International Degrees</h3>
          <p className="text-xs text-gray-600">Earn official degrees directly from Royal Roads, Wittenborg, or Varna University.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E8E8E8] shadow-soft space-y-2">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#8B1E2D] border border-red-200/80 flex items-center justify-center font-bold text-lg shadow-2xs">
            <Globe2 className="w-5 h-5 text-[#8B1E2D]" />
          </div>
          <h3 className="font-heading font-bold text-base text-[#222222]">Global Career & Work Rights</h3>
          <p className="text-xs text-gray-600">Post-study work eligibility and international career opportunities in UAE, EU & Europe.</p>
        </div>
      </section>

      {/* CATEGORY 1: INTEGRATED GLOBAL BBA + MBA (igMBA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-gray-200 pb-4 space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#8B1E2D]/10 text-[#8B1E2D] px-3 py-1 rounded-full text-xs font-bold">
            <GraduationCap className="w-4 h-4" /> Category 1
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#222222]">
            Integrated Global BBA + MBA (igMBA)
          </h2>
          <p className="text-gray-600 text-sm">
            For students after Class 12 • 5 Years Duration (4 Semesters in India + remaining International)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {igMbaPrograms.map((pw, idx) => (
            <motion.div
              key={pw.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-3xl border border-[#E8E8E8] shadow-soft hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={pw.partnerImage}
                  alt={pw.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <span className="absolute top-3 left-3 bg-[#8B1E2D] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <CountryFlag country={pw.country} size="xs" />
                  <span>{pw.country}</span>
                </span>
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#222222] text-[10px] font-bold px-3 py-1 rounded-full">
                  {pw.targetAudience}
                </span>
                <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                  <h3 className="font-heading font-bold text-xl text-white">{pw.title}</h3>
                  <div className="text-xs text-amber-300 font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{pw.durationStructure}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{pw.overview}</p>

                  {/* Detailed Fee Structure Card */}
                  <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2 border border-slate-800">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider pb-1 border-b border-slate-800 flex items-center justify-between">
                      <span>Official Costing & Fee Breakdown</span>
                      <Award className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px]">India Campus Fee</span>
                        <strong className="text-white text-sm">{pw.indiaFeeUSD}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">International Campus Fee</span>
                        <strong className="text-white text-sm">{pw.internationalFeeUSD}</strong>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Total Program Fee:</span>
                      <span className="text-lg font-extrabold text-emerald-400">{pw.totalCostUSD}</span>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-gray-800">Program Features:</div>
                    {pw.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={onOpenBookModal}
                    className="w-full py-3.5 bg-[#8B1E2D] hover:bg-[#111111] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all text-center flex items-center justify-center gap-2"
                  >
                    <span>Apply for igMBA Pathway Intake</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CATEGORY 2: MBA PATHWAYS (uMBA / gMBA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-gray-200 pb-4 space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#8B1E2D]/10 text-[#8B1E2D] px-3 py-1 rounded-full text-xs font-bold">
            <BookOpen className="w-4 h-4" /> Category 2
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#222222]">
            MBA Pathways (uMBA / gMBA)
          </h2>
          <p className="text-gray-600 text-sm">
            For graduates planning an international MBA. Final pathway depends on eligibility and academic profile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {mbaPathways.map((pw, idx) => (
            <motion.div
              key={pw.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-3xl border border-[#E8E8E8] shadow-soft hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pw.partnerImage}
                  alt={pw.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <span className="absolute top-3 left-3 bg-[#8B1E2D] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <CountryFlag country={pw.country} size="xs" />
                  <span>{pw.country}</span>
                </span>
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#222222] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {pw.targetAudience.includes('experience') ? 'gMBA (Exp.)' : 'uMBA'}
                </span>
                <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                  <h3 className="font-heading font-bold text-lg text-white">{pw.title}</h3>
                  <div className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{pw.durationStructure}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-xs text-gray-600 leading-relaxed">{pw.overview}</p>

                  {/* Detailed Fee Structure Card */}
                  <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2 border border-slate-800">
                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider pb-1 border-b border-slate-800">
                      Costing Breakdown
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">India Fee</span>
                        <strong className="text-white text-xs">{pw.indiaFeeUSD}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">International Fee</span>
                        <strong className="text-white text-xs">{pw.internationalFeeUSD}</strong>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Total Program Fee:</span>
                      <span className="text-base font-extrabold text-emerald-400">{pw.totalCostUSD}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-xs font-bold text-gray-800">Highlights:</div>
                    {pw.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <button
                    onClick={onOpenBookModal}
                    className="w-full py-3 bg-[#8B1E2D] hover:bg-[#111111] text-white font-bold text-xs rounded-xl shadow-md transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Enquire for MBA Pathway</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#8B1E2D] to-[#6C1521] rounded-3xl p-8 sm:p-12 text-white text-center sm:text-left shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Need Assistance Choosing the Right Pathway?
            </h3>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              Our Senior Academic Pathway Advisors evaluate your academic background, career goals, and budget to recommend the ideal igMBA, gMBA, or uMBA option.
            </p>
          </div>
          <button
            onClick={onOpenBookModal}
            className="px-8 py-4 bg-white text-[#8B1E2D] hover:bg-[#111111] hover:text-white font-bold text-sm rounded-2xl shadow-xl transition-all shrink-0"
          >
            Schedule Pathway Eligibility Call
          </button>
        </div>
      </section>

    </div>
  );
};

