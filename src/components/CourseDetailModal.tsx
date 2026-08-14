import React from 'react';
import { 
  X, 
  Briefcase, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  GraduationCap, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';
import { Course } from '../types';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onOpenBookModal: () => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onOpenBookModal
}) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E8E8E8] relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#E31B23] to-[#C9141B] text-white p-6 rounded-t-3xl relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {course.level} • {course.category}
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-2">
            {course.title}
          </h2>
          <div className="flex items-center gap-4 text-xs text-white/80 mt-2">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
            <span>•</span>
            <span className="text-yellow-300 font-semibold">{course.avgSalary}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="space-y-2">
            <h3 className="font-heading font-bold text-base text-[#222222]">Program Overview</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{course.overview}</p>
          </div>

          <div className="bg-[#FAFAFA] p-4 rounded-2xl border border-gray-200 space-y-2">
            <div className="text-xs font-bold text-gray-500 uppercase">Average Tuition Fee</div>
            <div className="font-heading font-extrabold text-lg text-[#E31B23]">{course.avgFee}</div>
            <div className="text-xs text-gray-500 pt-1 border-t border-gray-200">
              <span className="font-semibold text-gray-700">Eligibility:</span> {course.eligibility}
            </div>
          </div>

          {/* Career Outcomes */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-base text-[#222222] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#E31B23]" /> High-Demand Career Outcomes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {course.careerOutcomes.map((co, i) => (
                <div key={i} className="p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{co}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Offering Universities */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-base text-[#222222] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#E31B23]" /> Recommended Universities
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.topUniversities.map((uni, i) => (
                <span key={i} className="px-3 py-1.5 bg-[#E31B23]/10 text-[#E31B23] font-bold text-xs rounded-lg border border-[#E31B23]/20">
                  {uni}
                </span>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 text-xs font-semibold"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenBookModal();
              }}
              className="px-6 py-3 bg-[#E31B23] hover:bg-[#C9141B] active:bg-[#B31016] text-white font-bold text-sm rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all"
            >
              Enquire for This Program
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
