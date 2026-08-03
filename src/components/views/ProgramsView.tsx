import React, { useState } from 'react';
import { COURSES } from '../../data/mockData';
import { Course } from '../../types';
import { 
  Search, 
  Briefcase, 
  TrendingUp, 
  CheckCircle2, 
  GraduationCap, 
  ArrowRight,
  Clock,
  DollarSign
} from 'lucide-react';

interface ProgramsViewProps {
  onSelectCourse: (course: Course) => void;
  onOpenBookModal: () => void;
}

export const ProgramsView: React.FC<ProgramsViewProps> = ({
  onSelectCourse,
  onOpenBookModal
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Data & Tech', 'Management', 'Engineering & Tech', 'Finance', 'Healthcare'];

  const filtered = COURSES.filter(c => {
    const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase()) || c.overview.toLowerCase().includes(query.toLowerCase());
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16 pt-4">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-[#8B1E2D]/10 text-[#8B1E2D] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Global Academic Directory
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#222222]">
          Popular Overseas Courses & Degrees
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Find top-ranked undergraduate and postgraduate degrees with high salary potential, STEM OPT extension, and global career pathways.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#E8E8E8] shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          
          <div className="sm:col-span-8 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search course title (e.g. MBA, Artificial Intelligence, Cyber Security)..."
              className="w-full pl-10 pr-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>)}
            </select>
          </div>

        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course) => (
          <div
            key={course.id}
            onClick={() => onSelectCourse(course)}
            className="bg-white rounded-3xl border border-[#E8E8E8] shadow-soft shadow-soft-hover p-6 space-y-4 cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#8B1E2D] bg-[#8B1E2D]/10 px-2.5 py-0.5 rounded-full">
                  {course.category}
                </span>
                <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {course.duration}
                </span>
              </div>

              <h3 className="font-heading font-bold text-lg text-[#222222] group-hover:text-[#8B1E2D] transition-colors leading-snug">
                {course.title}
              </h3>

              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                {course.overview}
              </p>

              <div className="bg-[#FAFAFA] p-3 rounded-xl border border-gray-100 text-xs space-y-1">
                <div className="text-gray-500">Average Post-Grad Salary:</div>
                <div className="font-heading font-extrabold text-sm text-emerald-700">{course.avgSalary}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenBookModal();
                }}
                className="text-xs font-bold text-gray-700 hover:text-[#8B1E2D]"
              >
                Check Eligibility
              </button>
              <span className="text-xs font-bold text-[#8B1E2D] flex items-center gap-1">
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
