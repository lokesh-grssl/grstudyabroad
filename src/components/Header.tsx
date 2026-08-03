import React, { useState, useEffect } from 'react';
import { ViewMode } from '../types';
import { Logo } from './Logo';
import { 
  Search, 
  Menu, 
  X, 
  Phone, 
  Sparkles, 
  Compass,
  ArrowRight,
  Home,
  Globe,
  GraduationCap,
  Award,
  Briefcase,
  GitMerge,
  BookOpen,
  PhoneCall,
  Bot,
  ChevronRight
} from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenBookModal: () => void;
  onOpenSearchModal: () => void;
  onOpenAiModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenBookModal,
  onOpenSearchModal,
  onOpenAiModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; view: ViewMode; icon: React.ElementType; badge?: string }[] = [
    { label: 'Home', view: 'home', icon: Home },
    { label: 'Destinations', view: 'destinations', icon: Globe },
    { label: 'Universities', view: 'universities', icon: GraduationCap },
    { label: 'Scholarships', view: 'scholarships', icon: Award, badge: 'Grants' },
    { label: 'Services', view: 'services', icon: Briefcase },
    { label: 'Pathways', view: 'pathways', icon: GitMerge, badge: '1+2' },
    { label: 'Blogs & Guides', view: 'blogs', icon: BookOpen },
    { label: 'Contact Us', view: 'contact', icon: PhoneCall }
  ];

  return (
    <>
      {/* Main Curved Floating Navbar Header */}
      <header className="sticky top-2 z-50 px-3 sm:px-6 transition-all duration-300">
        <div className={`max-w-7xl mx-auto rounded-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl shadow-slate-900/10 py-2.5 px-4 sm:px-6' 
            : 'bg-white/85 backdrop-blur-lg border border-slate-200/80 shadow-lg shadow-slate-900/5 py-3 px-4 sm:px-6'
        }`}>
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <a 
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="flex items-center gap-2 group text-left hover:opacity-95 transition-opacity shrink-0 cursor-pointer"
            >
              <Logo size="md" />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60">
              {navItems.map((item) => {
                const isActive = currentView === item.view;
                const path = item.view === 'home' ? '#/' : `/#/${item.view}`;
                return (
                  <a
                    key={item.view}
                    href={path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.view);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md' 
                        : 'text-slate-700 hover:text-red-600 hover:bg-white/80'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={onOpenSearchModal}
                className="p-2.5 text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-full transition-colors"
                title="Global Search"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBookModal}
                className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-bold rounded-full shadow-md hover:shadow-red-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5"
              >
                <span>Book Counselling</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={onOpenSearchModal}
                className="p-2 text-slate-700 hover:bg-slate-100 rounded-full"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-2 bg-white/98 backdrop-blur-2xl border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-2xl shadow-slate-900/15 space-y-3.5 animate-in fade-in slide-in-from-top-2 duration-200 max-w-7xl mx-auto overflow-hidden">
            
            {/* Navigation List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.view;
                const path = item.view === 'home' ? '#/' : `/#/${item.view}`;
                return (
                  <a
                    key={item.view}
                    href={path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.view);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
                      isActive
                        ? 'bg-red-50/90 text-red-600 border-l-4 border-red-600 font-extrabold shadow-2xs'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-red-600 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive 
                          ? 'bg-red-600 text-white shadow-sm' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-red-600 translate-x-0.5' : 'text-slate-300'}`} />
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-2.5 border-t border-slate-100">
              <button
                onClick={() => {
                  onOpenBookModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-2xl font-bold text-xs shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <span>Book Free Counselling</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}
      </header>
    </>
  );
};
