import React, { useState } from 'react';
import { ViewMode } from '../types';
import { Logo } from './Logo';
import { CountryFlag } from './CountryFlag';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Instagram, 
  Linkedin, 
  Send,
  Building2,
  Globe2
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  onOpenBookModal: () => void;
  showNewsletter?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBookModal, showNewsletter = true }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-200 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter CTA Card */}
        {showNewsletter && (
          <div className="bg-gradient-to-r from-red-950 via-rose-950 to-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-12 mb-10 sm:mb-16 text-white shadow-2xl border border-red-800/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="lg:col-span-7 space-y-2 sm:space-y-3 flex flex-col items-start">
                <span className="inline-flex items-center gap-1.5 bg-red-500/25 text-red-200 border border-red-400/40 text-[10px] sm:text-xs font-bold px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full uppercase tracking-wider">
                  Stay Ahead of Intakes & Scholarships
                </span>
                <h3 className="font-heading font-black text-xl sm:text-3xl text-white leading-tight">
                  Subscribe to Grassroots Study Abroad Updates
                </h3>
                <p className="text-slate-200 text-xs sm:text-sm max-w-xl font-normal">
                  Get monthly admission guides, fee waiver alerts, university spot offer dates, and country-specific visa policy updates directly to your inbox.
                </p>
              </div>
              
              <div className="lg:col-span-5">
                {subscribed ? (
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex items-center gap-3 text-white border border-white/20">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-bold text-sm">Subscription Confirmed!</div>
                      <div className="text-xs text-slate-200">Thank you for subscribing to Grassroots Solutions & Services updates.</div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                    <label htmlFor="newsletter-email" className="sr-only">Email address for updates</label>
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      required
                      aria-label="Email address for updates"
                      className="px-4 py-3 bg-white/10 text-white placeholder-slate-300 rounded-xl sm:rounded-2xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm flex-1 min-h-[44px]"
                    />
                    <button
                      type="submit"
                      aria-label="Subscribe to updates"
                      className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 active:from-red-700 active:to-rose-700 font-bold text-xs sm:text-sm text-white rounded-xl sm:rounded-2xl hover:from-red-500 hover:to-rose-500 transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg min-h-[44px]"
                    >
                      <span>Subscribe</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-slate-800">
          
          {/* Brand & Corporate Info Column */}
          <div className="sm:col-span-2 space-y-4 sm:space-y-5">
            <div className="bg-white p-2.5 sm:p-3 rounded-2xl inline-block shadow-md">
              <Logo size="md" />
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-white">
                Grassroots Solutions & Services Pvt Ltd
              </div>
              <div className="text-xs text-slate-300 font-medium">
                Premier Global Overseas Education Advisory & University Placement Partner
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-md">
              Bridging aspirations with world-class opportunities across 1,000+ universities in 30+ countries. Enabling students with expert counseling, pathway programs, test prep, SOP writing, and visa filing.
            </p>

            <div className="space-y-2.5 text-xs text-slate-200 pt-1">
              <div className="flex items-start gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <Building2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-xs mb-0.5">Corporate Office</div>
                  <div className="text-slate-200 leading-normal">
                    332/1, 1st Floor, Corporate Miller, Thimmaiah Road, Vasanth Nagar, Bangalore
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-200 font-medium">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>+91 84959 70819</span>
              </div>
              <div className="flex items-center gap-3 text-slate-200 font-medium">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a href="mailto:admissions@grstudyabroad.com" className="hover:text-white transition-colors truncate">
                  admissions@grstudyabroad.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <a 
                href="https://www.instagram.com/tasagrassroots/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow Grassroots Study Abroad on Instagram" 
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-[#E4405F] active:bg-[#C13584] text-slate-200 hover:text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/company/tasa-grassroots-global-education/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow Grassroots Study Abroad on LinkedIn" 
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-[#0A66C2] active:bg-[#004182] text-slate-200 hover:text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm sm:text-base mb-3 sm:mb-4 border-l-2 border-red-600 pl-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <a href="#/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-white transition-colors flex items-center gap-1.5 py-0.5">
                  <ArrowRight className="w-3 h-3 text-red-500 shrink-0" /> Home
                </a>
              </li>
              <li>
                <a href="/#/glimpse" onClick={(e) => { e.preventDefault(); onNavigate('glimpse'); }} className="hover:text-white transition-colors flex items-center gap-1.5 font-bold text-red-400 py-0.5">
                  <ArrowRight className="w-3 h-3 text-red-500 shrink-0" /> At a Glimpse
                </a>
              </li>
              <li>
                <a href="/#/destinations" onClick={(e) => { e.preventDefault(); onNavigate('destinations'); }} className="hover:text-white transition-colors flex items-center gap-1.5 py-0.5">
                  <ArrowRight className="w-3 h-3 text-red-500 shrink-0" /> Study Destinations
                </a>
              </li>
              <li>
                <a href="/#/universities" onClick={(e) => { e.preventDefault(); onNavigate('universities'); }} className="hover:text-white transition-colors flex items-center gap-1.5 py-0.5">
                  <ArrowRight className="w-3 h-3 text-red-500 shrink-0" /> Partner Universities
                </a>
              </li>
              <li>
                <a href="/#/programs" onClick={(e) => { e.preventDefault(); onNavigate('programs'); }} className="hover:text-white transition-colors flex items-center gap-1.5 py-0.5">
                  <ArrowRight className="w-3 h-3 text-red-500 shrink-0" /> Search Programs
                </a>
              </li>
              <li>
                <a href="/#/pathways" onClick={(e) => { e.preventDefault(); onNavigate('pathways'); }} className="hover:text-white transition-colors flex items-center gap-1.5 py-0.5">
                  <ArrowRight className="w-3 h-3 text-red-500 shrink-0" /> 1+2 Pathway Options
                </a>
              </li>
              <li>
                <a href="/#/scholarships" onClick={(e) => { e.preventDefault(); onNavigate('scholarships'); }} className="hover:text-white transition-colors flex items-center gap-1.5 py-0.5">
                  <ArrowRight className="w-3 h-3 text-red-500 shrink-0" /> Scholarships
                </a>
              </li>
              <li>
                <a href="/#/blogs" onClick={(e) => { e.preventDefault(); onNavigate('blogs'); }} className="hover:text-white transition-colors flex items-center gap-1.5 py-0.5">
                  <ArrowRight className="w-3 h-3 text-red-500 shrink-0" /> Master Guides & Blogs
                </a>
              </li>
              <li>
                <a href="/#/contact" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="hover:text-white transition-colors flex items-center gap-1.5 py-0.5">
                  <ArrowRight className="w-3 h-3 text-red-500 shrink-0" /> Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Top Destinations Column */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm sm:text-base mb-3 sm:mb-4 border-l-2 border-red-600 pl-3">
              Top Destinations
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs text-slate-300 font-medium">
              <li><a href="/#/destinations" onClick={(e) => { e.preventDefault(); onNavigate('destinations'); }} className="hover:text-white transition-colors flex items-center gap-2 py-0.5">Study in UK <CountryFlag country="United Kingdom" size="xs" /></a></li>
              <li><a href="/#/destinations" onClick={(e) => { e.preventDefault(); onNavigate('destinations'); }} className="hover:text-white transition-colors flex items-center gap-2 py-0.5">Study in USA <CountryFlag country="USA" size="xs" /></a></li>
              <li><a href="/#/destinations" onClick={(e) => { e.preventDefault(); onNavigate('destinations'); }} className="hover:text-white transition-colors flex items-center gap-2 py-0.5">Study in Canada <CountryFlag country="Canada" size="xs" /></a></li>
              <li><a href="/#/destinations" onClick={(e) => { e.preventDefault(); onNavigate('destinations'); }} className="hover:text-white transition-colors flex items-center gap-2 py-0.5">Study in Australia <CountryFlag country="Australia" size="xs" /></a></li>
              <li><a href="/#/destinations" onClick={(e) => { e.preventDefault(); onNavigate('destinations'); }} className="hover:text-white transition-colors flex items-center gap-2 py-0.5">Study in Germany <CountryFlag country="Germany" size="xs" /></a></li>
              <li><a href="/#/destinations" onClick={(e) => { e.preventDefault(); onNavigate('destinations'); }} className="hover:text-white transition-colors flex items-center gap-2 py-0.5">Study in Ireland <CountryFlag country="Ireland" size="xs" /></a></li>
              <li><a href="/#/destinations" onClick={(e) => { e.preventDefault(); onNavigate('destinations'); }} className="hover:text-white transition-colors flex items-center gap-2 py-0.5">Study in France <CountryFlag country="France" size="xs" /></a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm sm:text-base mb-3 sm:mb-4 border-l-2 border-red-600 pl-3">
              Our Services
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs text-slate-300 font-medium">
              <li><a href="/#/services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="hover:text-white transition-colors block py-0.5">Career Counselling</a></li>
              <li><a href="/#/services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="hover:text-white transition-colors block py-0.5">University Selection</a></li>
              <li><a href="/#/services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="hover:text-white transition-colors block py-0.5">SOP & LOR Writing</a></li>
              <li><a href="/#/services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="hover:text-white transition-colors block py-0.5">Student Visa Filing</a></li>
              <li><a href="/#/services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="hover:text-white transition-colors block py-0.5">Education Loans</a></li>
              <li><a href="/#/services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="hover:text-white transition-colors block py-0.5">Accommodation Assistance</a></li>
              <li>
                <a 
                  href="/#/book-counselling"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenBookModal();
                  }} 
                  className="mt-3 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 px-3.5 py-2.5 rounded-xl shadow-md hover:from-red-500 hover:to-rose-500 active:from-red-700 active:to-rose-700 transition-colors block text-center w-full min-h-[40px] flex items-center justify-center"
                >
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 font-medium gap-4">
          <div className="text-slate-300">
            © {new Date().getFullYear()} Grassroots Solutions & Services Pvt Ltd. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a 
              href="/#/privacy" 
              onClick={(e) => { e.preventDefault(); onNavigate('privacy'); }} 
              className="text-slate-300 hover:text-white underline underline-offset-4 decoration-slate-600 hover:decoration-white transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="/#/terms" 
              onClick={(e) => { e.preventDefault(); onNavigate('terms'); }} 
              className="text-slate-300 hover:text-white underline underline-offset-4 decoration-slate-600 hover:decoration-white transition-colors"
            >
              Terms & Conditions
            </a>
            <a 
              href="/#/disclaimer" 
              onClick={(e) => { e.preventDefault(); onNavigate('disclaimer'); }} 
              className="text-slate-300 hover:text-white underline underline-offset-4 decoration-slate-600 hover:decoration-white transition-colors"
            >
              Disclaimer
            </a>
            <a 
              href="/#/cookies" 
              onClick={(e) => { e.preventDefault(); onNavigate('cookies'); }} 
              className="text-slate-300 hover:text-white underline underline-offset-4 decoration-slate-600 hover:decoration-white transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
