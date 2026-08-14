import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Building2,
  Globe2,
  Sparkles
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'United Kingdom',
    studyLevel: 'Postgraduate (Master’s)',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16 pt-6">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3 flex flex-col items-center">
        <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-red-200">
          Grassroots Solutions & Services Pvt Ltd
        </span>
        <h1 className="font-heading font-black text-2xl xs:text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
          Get in Touch with Our Global Education Team
        </h1>
        <p className="text-slate-600 text-xs sm:text-base">
          Visit our Corporate Office in Bangalore or reach out online for instant admissions, program selection, and visa guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
        
        {/* Contact Form Column */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl space-y-5 sm:space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-slate-900">
                Send Us an Enquiry
              </h2>
              <p className="text-xs text-slate-500">
                Free initial consultation with a senior study abroad counselor
              </p>
            </div>
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 shrink-0" />
          </div>

          {/* Step Indicator Header */}
          {!submitted && (
            <div className="bg-slate-50 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                  {step === 1 ? 'Step 1: Study Goals' : 'Step 2: Contact Information'}
                </span>
                <span className="text-slate-500">Step {step} of 2</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-red-600' : 'bg-slate-200'}`} />
                <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-red-600' : 'bg-slate-200'}`} />
              </div>
            </div>
          )}

          {submitted ? (
            <div className="p-6 sm:p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-heading font-bold text-xl text-emerald-900">Enquiry Received!</h3>
              <p className="text-xs text-emerald-800">
                Thank you, {formData.name}. Our senior advisor at Grassroots Solutions & Services will reach out to you within 2 hours at {formData.phone}.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                }}
                className="mt-4 px-6 py-3 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700 active:bg-red-800 transition-colors min-h-[44px]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Step 1: Study Goals */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                    <Globe2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" /> Step 1: Study Goals
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Destination *</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-600 font-medium min-h-[44px]"
                    >
                      <option value="United Kingdom">United Kingdom (1000+ Programs)</option>
                      <option value="Canada">Canada (PGWP & Co-op Options)</option>
                      <option value="United States">United States (STEM OPT 3 Years)</option>
                      <option value="Australia">Australia (Post-Study Work)</option>
                      <option value="Germany">Germany (Low Tuition / Free Options)</option>
                      <option value="Ireland">Ireland (Critical Skills Visa)</option>
                      <option value="Pathway Program">1+2 Pathway Program (Save 50% Tuition)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Level of Study *</label>
                    <select
                      value={formData.studyLevel}
                      onChange={(e) => setFormData({ ...formData, studyLevel: e.target.value })}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-600 font-medium min-h-[44px]"
                    >
                      <option value="Undergraduate (Bachelor’s)">Undergraduate (Bachelor’s)</option>
                      <option value="Postgraduate (Master’s)">Postgraduate (Master’s)</option>
                      <option value="MBA / Executive">MBA / Executive</option>
                      <option value="Diploma / Pathway">Diploma / Pathway</option>
                      <option value="PhD / Doctorate">PhD / Doctorate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Questions or Academic Background *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Mention your target degree, current GPA or stream, preferred intake..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 min-h-[44px]"
                    >
                      <span>Next: Contact Information</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" /> Step 2: Contact Information
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-600 min-h-[44px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-600 min-h-[44px]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 84959 70819"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-600 min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-colors min-h-[44px] flex items-center justify-center text-center"
                    >
                      Back to Study Goals
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 active:from-red-800 active:to-rose-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 min-h-[44px]"
                    >
                      <span>Submit Enquiry</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}
        </div>

        {/* Corporate Office Info & WhatsApp Column */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          
          {/* Corporate Office Highlight Card */}
          <div className="bg-slate-900 text-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-800 space-y-4 sm:space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400">
              <Building2 className="w-4 h-4 shrink-0" /> Corporate Office
            </div>

            <div>
              <h3 className="font-heading font-black text-lg sm:text-xl text-white">
                Grassroots Solutions & Services Pvt Ltd
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 sm:mt-1">
                Bangalore Headquarters
              </p>
            </div>
            
            <div className="space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-3.5 sm:pt-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed text-slate-200">
                  332/1, 1st Floor, Corporate Miller, Thimmaiah Road, Vasanth Nagar, Bangalore
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>+91 84959 70819</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a href="mailto:admissions@grstudyabroad.com" className="hover:text-red-400 transition-colors truncate">
                  admissions@grstudyabroad.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-red-500 shrink-0" />
                <span>Monday - Saturday: 9:30 AM - 7:00 PM IST</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Quick Chat */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl space-y-3">
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 shrink-0" /> Instant WhatsApp Connect
            </h3>
            <p className="text-emerald-50 text-xs leading-relaxed">
              Connect directly with our Bangalore corporate counseling team for immediate assistance on program requirements, fee waivers, or visa queries.
            </p>
            <a
              href="https://wa.me/918495970819?text=Hi%20Grassroots%20Solutions,%20I%20want%20to%20enquire%20about%20study%20abroad!"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-emerald-900 hover:bg-emerald-50 active:bg-emerald-100 font-bold text-xs rounded-xl shadow-md transition-all mt-1 w-full sm:w-auto min-h-[44px]"
            >
              <span>Chat with Bangalore Desk</span>
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

      {/* Embedded Map Section */}
      <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-lg">
        <div className="p-3.5 sm:p-4 bg-slate-50 border-b border-slate-200 font-heading font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-600 shrink-0" />
          <span>Corporate Office Map — Vasanth Nagar, Bangalore</span>
        </div>
        <iframe
          title="Google Map Vasanth Nagar Bangalore"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.822830847952!2d77.5878!3d12.9877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167a50000000%3A0x1000000000000000!2sThimmaiah%20Rd%2C%20Vasanth%20Nagar%2C%20Bengaluru%2C%20Karnataka%20560052!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
          width="100%"
          height="300"
          className="sm:h-[350px]"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
        />
      </section>

    </div>
  );
};
