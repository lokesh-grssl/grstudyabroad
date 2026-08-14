import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SCHOLARSHIPS } from '../../data/mockData';
import { CountryFlag } from '../CountryFlag';
import { 
  Search, 
  ExternalLink,
  GraduationCap,
  Calendar, 
  Award, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';

interface ScholarshipsViewProps {
  onOpenBookModal: () => void;
}

export const ScholarshipsView: React.FC<ScholarshipsViewProps> = ({ onOpenBookModal }) => {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const types = ['All', 'Government Scholarships', 'University Scholarships', 'Merit Scholarships', 'Need-based Scholarships'];
  const countries = ['All', 'United Kingdom', 'USA', 'Canada', 'Australia', 'Germany', 'Ireland', 'France', 'Netherlands', 'Switzerland', 'Japan', 'South Korea', 'Singapore', 'India', 'Global'];
  const levels = ['All', "Master's", 'PhD', 'UG', 'UG / PG', 'Research', 'Graduate', 'Pre-college'];

  const filtered = SCHOLARSHIPS.filter(s => {
    const q = query.toLowerCase();
    const matchesQuery = 
      s.title.toLowerCase().includes(q) || 
      s.description.toLowerCase().includes(q) ||
      s.provider.toLowerCase().includes(q) ||
      (s.notes && s.notes.toLowerCase().includes(q));
    const matchesType = selectedType === 'All' || s.type === selectedType;
    const matchesCountry = selectedCountry === 'All' || s.country.toLowerCase().includes(selectedCountry.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || (s.degreeLevel && s.degreeLevel.toLowerCase().includes(selectedLevel.toLowerCase()));
    return matchesQuery && matchesType && matchesCountry && matchesLevel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16 pt-4">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-[#E31B23]/10 text-[#E31B23] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {SCHOLARSHIPS.length} Verified Scholarships & Fellowships
        </span>
        <h1 className="font-heading font-extrabold text-2xl xs:text-3xl sm:text-5xl text-[#222222]">
          Overseas Scholarships & Grants
        </h1>
        <p className="text-gray-600 text-xs sm:text-base">
          Browse fully funded government awards, top university fellowships, merit discounts, and need-based financial aid with application support.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E8E8E8] shadow-sm space-y-3 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3 items-center">
          
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search scholarship name or provider..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAFA] border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E31B23]"
            />
          </div>

          <div className="grid grid-cols-3 sm:contents gap-2">
            <div className="sm:col-span-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 bg-[#FAFAFA] border border-gray-200 rounded-xl text-[11px] sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E31B23]"
              >
                {types.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>)}
              </select>
            </div>

            <div className="sm:col-span-2">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 bg-[#FAFAFA] border border-gray-200 rounded-xl text-[11px] sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E31B23]"
              >
                {countries.map(c => <option key={c} value={c}>{c === 'All' ? 'All Countries' : c}</option>)}
              </select>
            </div>

            <div className="sm:col-span-2">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 bg-[#FAFAFA] border border-gray-200 rounded-xl text-[11px] sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E31B23]"
              >
                {levels.map(l => <option key={l} value={l}>{l === 'All' ? 'All Levels' : l}</option>)}
              </select>
            </div>
          </div>

        </div>
        <div className="text-xs text-gray-500 font-medium px-1 flex items-center justify-between">
          <span>Showing <strong>{filtered.length}</strong> of <strong>{SCHOLARSHIPS.length}</strong> scholarships</span>
          {(query || selectedType !== 'All' || selectedCountry !== 'All' || selectedLevel !== 'All') && (
            <button
              onClick={() => {
                setQuery('');
                setSelectedType('All');
                setSelectedCountry('All');
                setSelectedLevel('All');
              }}
              className="text-[#E31B23] hover:underline font-bold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filtered.map((sch, idx) => (
          <motion.div
            key={sch.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.3) }}
            className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E8E8] shadow-soft p-4 sm:p-7 space-y-3.5 sm:space-y-4 flex flex-col justify-between hover:border-[#E31B23]/30 transition-all group"
          >
            <div className="space-y-3.5">
              
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-bold text-[#E31B23] bg-[#E31B23]/10 px-2.5 py-0.5 rounded-full uppercase">
                    {sch.type}
                  </span>
                  {sch.degreeLevel && (
                    <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-slate-500" />
                      {sch.degreeLevel}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                  <CountryFlag country={sch.country} size="xs" />
                  <span>{sch.country}</span>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-extrabold text-base sm:text-xl text-[#222222] group-hover:text-[#E31B23] transition-colors leading-snug">
                  {sch.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{sch.provider}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-xl sm:rounded-2xl text-emerald-900 font-heading font-black text-sm sm:text-lg flex items-center justify-between">
                <span className="text-emerald-950">{sch.amount}</span>
                {sch.notes && (
                  <span className="text-[10px] font-bold bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {sch.notes}
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">{sch.description}</p>

              <div className="bg-[#FAFAFA] p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-gray-100 text-xs space-y-2">
                <div className="text-gray-600">
                  <strong className="text-gray-800 font-bold">Eligibility:</strong> {sch.eligibility}
                </div>
                <div className="text-gray-600 flex items-center gap-1">
                  <strong className="text-gray-800 font-bold">Coverage:</strong> {sch.coverage}
                </div>
                {sch.eligibleForIndian && (
                  <div className="text-emerald-700 font-semibold flex items-center gap-1 pt-1 border-t border-gray-200/60 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Eligible for Indian Students: <strong>{sch.eligibleForIndian}</strong></span>
                  </div>
                )}
              </div>

            </div>

            <div className="pt-3 sm:pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs">
              <div className="text-gray-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#E31B23] shrink-0" />
                <span>Deadline: <strong className="text-[#E31B23] font-bold">{sch.deadline}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                {sch.website && (
                  <a
                    href={sch.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] rounded-xl transition-all min-h-[40px]"
                  >
                    <span>Official Site</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                )}
                <button
                  onClick={onOpenBookModal}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-[#E31B23] hover:bg-[#C9141B] active:bg-[#B31016] text-white font-bold text-xs rounded-xl shadow-md shadow-red-600/30 hover:shadow-red-600/50 transition-all min-h-[40px] flex items-center justify-center text-center"
                >
                  Apply via Grassroots
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

