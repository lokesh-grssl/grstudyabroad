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
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube,
  Send,
  Building2,
  Globe2
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  onOpenBookModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBookModal }) => {
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
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter CTA Card */}
        <div className="bg-gradient-to-r from-red-900 via-rose-950 to-slate-900 rounded-3xl p-8 sm:p-12 mb-16 text-white shadow-2xl border border-red-900/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3 flex flex-col items-start">
              <span className="inline-flex items-center gap-1.5 bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                Stay Ahead of Intakes & Scholarships
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Subscribe to TASA | Grassroots Updates
              </h3>
              <p className="text-slate-300 text-sm max-w-xl">
                Get monthly admission guides, fee waiver alerts, university spot offer dates, and country-specific visa policy updates directly to your inbox.
              </p>
            </div>
            
            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex items-center gap-3 text-white border border-white/20">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-sm">Subscription Confirmed!</div>
                    <div className="text-xs text-slate-300">Thank you for subscribing to Grassroots Solutions & Services updates.</div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="px-4 py-3 bg-white/10 text-white placeholder-slate-400 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm flex-1"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 font-bold text-sm text-white rounded-2xl hover:from-red-500 hover:to-rose-500 transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg"
                  >
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Corporate Info Column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white p-3 rounded-2xl inline-block shadow-md">
              <Logo size="md" />
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-white">
                Grassroots Solutions & Services Pvt Ltd
              </div>
              <div className="text-xs text-slate-400">
                Premier Global Overseas Education Advisory & University Placement Partner
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Bridging aspirations with world-class opportunities across 1,000+ universities in 30+ countries. Enabling students with expert counseling, pathway programs, test prep, SOP writing, and visa filing.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 pt-1">
              <div className="flex items-start gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <Building2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-xs mb-0.5">Corporate Office</div>
                  <div className="text-slate-300 leading-normal">
                    332/1, 1st Floor, Corporate Miller, Thimmaiah Road, Vasanth Nagar, Bangalore
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>+91 98765 43210 / +91 80 6789 1111</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <span>admissions@tasagrassroots.com</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 border-l-2 border-red-600 pl-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-red-500" /> Home
                </a>
              </li>
              <li>
                <a href="/#/glimpse" onClick={(e) => { e.preventDefault(); onNavigate('glimpse'); }} className="hover:text-white transition-colors flex items-center gap-1.5 font-bold text-red-400">
                  <ArrowRight className="w-3 h-3 text-red-500" /> At a Glimpse
                </a>
              </li>
              <li>
                <a href="/#/destinations" onClick={(e) => { e.preventDefault(); onNavigate('destinations'); }} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-red-500" /> Study Destinations
                </a>
              </li>
              <li>
                <a href="/#/universities" onClick={(e) => { e.preventDefault(); onNavigate('universities'); }} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-red-500" /> Partner Universities
                </a>
              </li>
              <li>
                <a href="/#/programs" onClick={(e) => { e.preventDefault(); onNavigate('programs'); }} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-red-500" /> Search Programs
                </a>
              </li>
              <li>
                <a href="/#/pathways" onClick={(e) => { e.preventDefault(); onNavigate('pathways'); }} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-red-500" /> 1+2 Pathway Options
                </a>
              </li>
              <li>
                <a href="/#/scholarships" onClick={(e) => { e.preventDefault(); onNavigate('scholarships'); }} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-red-500" /> Scholarships
                </a>
              </li>
              <li>
                <a href="/#/blogs" onClick={(e) => { e.preventDefault(); onNavigate('blogs'); }} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-red-500" /> Master Guides & Blogs
                </a>
              </li>
              <li>
                <a href="/#/contact" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-red-500" /> Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Top Destinations Column */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 border-l-2 border-red-600 pl-3">
              Top Destinations
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="/#/destinations" onClick={(e) => { e.preventDefault(); onNavigate('destinations'); }} className="hover:text-white transition-colors flex items-center gap-2">Study in UK <CountryFlag code="UK" size="xs" /></a></li>
              <li><a href="/#/destinations" onClick={(e) => { e.preventDefault(); onNavigate('destinations'); }} className="hover:text-white transition-colors flex items-center gap-2">Study in USA <CountryFlag code="US" size="xs" /></a></li>
              <li><a href="/#/destinations" onClick={(e) => { e.preventDefault(); onNavigate('destinations'); }} className="hover:text-white transition-colors flex items-center gap-2">Study in Canada <CountryFlag code="CA" size="xs" /></a></li>
              <li><a href="/#/destinations" onClick={(e) => { e.preventDefault(); onNavigate('destinations'); }} className="hover:text-white transition-colors flex items-center gap-2">Study in Australia <CountryFlag code="AU" size="xs" /></a></li>
              <li><a href="/#/destinations" onClick={(e) => { e.preventDefault(); onNavigate('destinations'); }} className="hover:text-white transition-colors flex items-center gap-2">Study in Germany <CountryFlag code="DE" size="xs" /></a></li>
              <li><a href="/#/destinations" onClick={(e) => { e.preventDefault(); onNavigate('destinations'); }} className="hover:text-white transition-colors flex items-center gap-2">Study in Ireland <CountryFlag code="IE" size="xs" /></a></li>
              <li><a href="/#/destinations" onClick={(e) => { e.preventDefault(); onNavigate('destinations'); }} className="hover:text-white transition-colors flex items-center gap-2">Study in France <CountryFlag code="FR" size="xs" /></a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 border-l-2 border-red-600 pl-3">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="/#/services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="hover:text-white transition-colors block">Career Counselling</a></li>
              <li><a href="/#/services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="hover:text-white transition-colors block">University Selection</a></li>
              <li><a href="/#/services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="hover:text-white transition-colors block">SOP & LOR Writing</a></li>
              <li><a href="/#/services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="hover:text-white transition-colors block">Student Visa Filing</a></li>
              <li><a href="/#/services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="hover:text-white transition-colors block">Education Loans</a></li>
              <li><a href="/#/services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="hover:text-white transition-colors block">Accommodation Assistance</a></li>
              <li>
                <a 
                  href="/#/book-counselling"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenBookModal();
                  }} 
                  className="mt-3 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 px-3.5 py-2 rounded-xl shadow-md hover:from-red-500 hover:to-rose-500 transition-colors block text-center w-full"
                >
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Grassroots Solutions & Services Pvt Ltd. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a 
              href="/#/privacy" 
              onClick={(e) => { e.preventDefault(); onNavigate('privacy'); }} 
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="/#/terms" 
              onClick={(e) => { e.preventDefault(); onNavigate('terms'); }} 
              className="hover:text-slate-300 transition-colors"
            >
              Terms & Conditions
            </a>
            <a 
              href="/#/disclaimer" 
              onClick={(e) => { e.preventDefault(); onNavigate('disclaimer'); }} 
              className="hover:text-slate-300 transition-colors"
            >
              Disclaimer
            </a>
            <a 
              href="/#/cookies" 
              onClick={(e) => { e.preventDefault(); onNavigate('cookies'); }} 
              className="hover:text-slate-300 transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
