import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  GraduationCap, 
  Globe, 
  User, 
  Mail, 
  Phone, 
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { CounsellingBooking } from '../types';

interface BookCounsellingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
}

export const BookCounsellingModal: React.FC<BookCounsellingModalProps> = ({
  isOpen,
  onClose,
  initialDestination = 'United Kingdom'
}) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<CounsellingBooking>({
    fullName: '',
    email: '',
    phone: '',
    preferredDestination: initialDestination,
    studyLevel: 'Postgraduate (Master’s)',
    preferredIntake: 'Fall 2026',
    counsellingMode: 'Online Video',
    preferredBranch: 'Mumbai - BKC Head Office',
    preferredDate: '2026-08-10',
    preferredTime: '11:00 AM',
    notes: ''
  });

  if (!isOpen) return null;

  const destinations = [
    'United Kingdom',
    'United States',
    'Canada',
    'Australia',
    'Ireland',
    'Germany',
    'France',
    'New Zealand',
    'Pathway Programs (1+2 Transfer)'
  ];

  const levels = [
    'Undergraduate (Bachelor’s)',
    'Postgraduate (Master’s)',
    'MBA / Executive',
    'Diploma / Pathway',
    'PhD / Doctorate'
  ];

  const intakes = [
    'Fall 2026 (Aug/Sep)',
    'Spring 2027 (Jan/Feb)',
    'Summer 2027 (May/Jun)',
    'Immediate Intake'
  ];

  const branches = [
    'Mumbai - BKC Head Office',
    'New Delhi - Connaught Place',
    'Bangalore - MG Road',
    'Hyderabad - Jubilee Hills',
    'Pune - FC Road',
    'Online / Virtual (Zoom / Google Meet)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E8E8E8] relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B1E2D] to-[#6C1521] text-white p-6 rounded-t-3xl relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full w-fit mb-2">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Free 1-on-1 Profile Assessment
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-white">
            Book Free Study Abroad Counselling
          </h2>
          <p className="text-white/80 text-xs sm:text-sm mt-1">
            Connect with our certified senior advisors for personalized university shortlisting, loan, and visa guidance.
          </p>

          {/* Progress Indicator */}
          {!submitted && (
            <div className="mt-4 pt-4 border-t border-white/20 space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-white/90">
                <span>{step === 1 ? 'Step 1: Study Goals' : 'Step 2: Contact Information'}</span>
                <span>Step {step} of 2</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-white' : 'bg-white/30'}`} />
                <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-white' : 'bg-white/30'}`} />
              </div>
            </div>
          )}
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#222222]">
                Counselling Session Reserved!
              </h3>
              <p className="text-gray-600 text-sm max-w-md mx-auto">
                Thank you, <span className="font-semibold text-[#8B1E2D]">{formData.fullName}</span>! Our senior study abroad counsellor will contact you at <span className="font-semibold">{formData.phone}</span> within 2 hours.
              </p>
              
              <div className="bg-[#FAFAFA] p-4 rounded-2xl border border-gray-200 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-gray-500">Target Destination:</span>
                  <span className="font-semibold text-gray-800">{formData.preferredDestination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Study Level:</span>
                  <span className="font-semibold text-gray-800">{formData.studyLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Target Intake:</span>
                  <span className="font-semibold text-gray-800">{formData.preferredIntake}</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="mt-6 px-8 py-3 bg-[#8B1E2D] hover:bg-[#111111] text-white font-bold text-sm rounded-xl shadow-lg transition-all"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Study Goals */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="font-heading font-bold text-lg text-[#222222] flex items-center gap-2 pb-2 border-b border-gray-100">
                    <Globe className="w-5 h-5 text-[#8B1E2D]" /> Step 1: Study Goals
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Preferred Study Destination *
                      </label>
                      <select
                        value={formData.preferredDestination}
                        onChange={(e) => setFormData({ ...formData, preferredDestination: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#8B1E2D] focus:outline-none"
                      >
                        {destinations.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Level of Study *
                      </label>
                      <select
                        value={formData.studyLevel}
                        onChange={(e) => setFormData({ ...formData, studyLevel: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#8B1E2D] focus:outline-none"
                      >
                        {levels.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Target Intake *
                    </label>
                    <select
                      value={formData.preferredIntake}
                      onChange={(e) => setFormData({ ...formData, preferredIntake: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#8B1E2D] focus:outline-none"
                    >
                      {intakes.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 bg-[#8B1E2D] hover:bg-[#111111] text-white font-bold text-sm rounded-xl flex items-center gap-2 transition-all shadow-md"
                    >
                      <span>Next: Contact Information</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="font-heading font-bold text-lg text-[#222222] flex items-center gap-2 pb-2 border-b border-gray-100">
                    <User className="w-5 h-5 text-[#8B1E2D]" /> Step 2: Contact Information
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#FAFAFA] border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#8B1E2D] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          required
                          placeholder="rahul@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-[#FAFAFA] border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#8B1E2D] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          required
                          placeholder="+91 84959 70819"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-[#FAFAFA] border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#8B1E2D] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Study Goals
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-[#8B1E2D] hover:bg-[#111111] text-white font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-xl"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
