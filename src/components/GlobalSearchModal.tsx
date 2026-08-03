import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Globe, 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { DESTINATIONS, UNIVERSITIES, COURSES, SCHOLARSHIPS } from '../data/mockData';
import { CountryFlag } from './CountryFlag';
import { UniversityLogo } from './UniversityLogo';
import { ViewMode, University, Course, Destination } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewMode) => void;
  onSelectUniversity: (uni: University) => void;
  onSelectCourse: (course: Course) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectUniversity,
  onSelectCourse
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredDestinations = query.trim()
    ? DESTINATIONS.filter(d => d.name.toLowerCase().includes(query.toLowerCase()) || d.code.toLowerCase().includes(query.toLowerCase()))
    : DESTINATIONS.slice(0, 4);

  const filteredUniversities = query.trim()
    ? UNIVERSITIES.filter(u => u.name.toLowerCase().includes(query.toLowerCase()) || u.country.toLowerCase().includes(query.toLowerCase()))
    : UNIVERSITIES.slice(0, 4);

  const filteredCourses = query.trim()
    ? COURSES.filter(c => c.title.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase()))
    : COURSES.slice(0, 4);

  const filteredScholarships = query.trim()
    ? SCHOLARSHIPS.filter(s => s.title.toLowerCase().includes(query.toLowerCase()) || s.country.toLowerCase().includes(query.toLowerCase()))
    : SCHOLARSHIPS.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col border border-[#E8E8E8] overflow-hidden">
        
        {/* Search Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center gap-3 bg-[#FAFAFA]">
          <Search className="w-6 h-6 text-[#8B1E2D] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search universities, courses, destinations, or scholarships (e.g. Royal Roads, MBA, Canada)..."
            className="w-full bg-transparent text-gray-900 placeholder-gray-400 font-medium text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600 text-xs bg-gray-200 rounded-full"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-xl transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-6 overflow-y-auto space-y-8 divide-y divide-gray-100">
          
          {/* Section: Destinations */}
          {filteredDestinations.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-[#8B1E2D]" /> Study Destinations</span>
                <button 
                  onClick={() => { onNavigate('destinations'); onClose(); }}
                  className="text-[#8B1E2D] hover:underline"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredDestinations.map(d => (
                  <button
                    key={d.id}
                    onClick={() => {
                      onNavigate('destinations');
                      onClose();
                    }}
                    className="p-3 bg-[#FAFAFA] hover:bg-[#8B1E2D]/5 rounded-xl border border-gray-200 hover:border-[#8B1E2D]/30 transition-all flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <CountryFlag code={d.code} country={d.name} size="md" />
                      <div>
                        <div className="font-heading font-bold text-sm text-gray-900 group-hover:text-[#8B1E2D]">{d.name}</div>
                        <div className="text-xs text-gray-500">{d.avgTuitionPG}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#8B1E2D] transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section: Universities */}
          {filteredUniversities.length > 0 && (
            <div className="pt-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-[#8B1E2D]" /> Top Universities</span>
                <button 
                  onClick={() => { onNavigate('universities'); onClose(); }}
                  className="text-[#8B1E2D] hover:underline"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {filteredUniversities.map(u => (
                  <button
                    key={u.id}
                    onClick={() => {
                      onSelectUniversity(u);
                      onClose();
                    }}
                    className="p-3 bg-[#FAFAFA] hover:bg-[#8B1E2D]/5 rounded-xl border border-gray-200 hover:border-[#8B1E2D]/30 transition-all flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <UniversityLogo name={u.name} countryCode={u.countryCode} customLogoUrl={u.logo} size="sm" />
                      <div>
                        <div className="font-heading font-bold text-sm text-gray-900 group-hover:text-[#8B1E2D]">
                          {u.name} <span className="text-xs font-normal text-gray-500">({u.country})</span>
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                          <span className="bg-[#8B1E2D]/10 text-[#8B1E2D] px-2 py-0.5 rounded text-[10px] font-medium">{u.qsRanking}</span>
                          <span>{u.tuitionRange}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#8B1E2D] transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section: Popular Courses */}
          {filteredCourses.length > 0 && (
            <div className="pt-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-[#8B1E2D]" /> Programs & Specializations</span>
                <button 
                  onClick={() => { onNavigate('programs'); onClose(); }}
                  className="text-[#8B1E2D] hover:underline"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredCourses.map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectCourse(c);
                      onClose();
                    }}
                    className="p-3 bg-[#FAFAFA] hover:bg-[#8B1E2D]/5 rounded-xl border border-gray-200 hover:border-[#8B1E2D]/30 transition-all text-left group"
                  >
                    <div className="font-heading font-bold text-sm text-gray-900 group-hover:text-[#8B1E2D]">{c.title}</div>
                    <div className="text-xs text-gray-500 flex items-center justify-between mt-1">
                      <span>{c.level}</span>
                      <span className="text-emerald-700 font-medium">{c.avgSalary}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section: Scholarships */}
          {filteredScholarships.length > 0 && (
            <div className="pt-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#8B1E2D]" /> Scholarships & Funding</span>
                <button 
                  onClick={() => { onNavigate('scholarships'); onClose(); }}
                  className="text-[#8B1E2D] hover:underline"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {filteredScholarships.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onNavigate('scholarships');
                      onClose();
                    }}
                    className="p-3 bg-[#FAFAFA] hover:bg-[#8B1E2D]/5 rounded-xl border border-gray-200 hover:border-[#8B1E2D]/30 transition-all text-left group flex items-center justify-between"
                  >
                    <div>
                      <div className="font-heading font-bold text-sm text-gray-900 group-hover:text-[#8B1E2D]">{s.title}</div>
                      <div className="text-xs text-gray-500">{s.provider} • {s.country}</div>
                    </div>
                    <span className="text-xs font-bold text-[#8B1E2D] bg-[#8B1E2D]/10 px-2.5 py-1 rounded-lg">
                      {s.amount}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
