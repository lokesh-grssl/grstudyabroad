import React, { useState } from 'react';
import { BlogPost } from '../../types';
import { BLOGS } from '../../data/mockData';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Bookmark, 
  Check, 
  Sparkles, 
  BookOpen, 
  ArrowRight,
  GraduationCap,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface BlogDetailViewProps {
  blog: BlogPost;
  onBack: () => void;
  onSelectBlog: (blog: BlogPost) => void;
  onOpenBookModal?: () => void;
}

export const BlogDetailView: React.FC<BlogDetailViewProps> = ({
  blog,
  onBack,
  onSelectBlog,
  onOpenBookModal
}) => {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // Extract section titles for Table of Contents
  const sections = blog.content
    .filter(p => p.startsWith('SECTION: ') || p.startsWith('## '))
    .map(p => p.replace(/^(SECTION: |## )/, ''));

  // Find related articles in the same category or overall list
  const relatedArticles = BLOGS.filter(b => b.id !== blog.id)
    .sort((a, b) => (a.category === blog.category ? -1 : 1))
    .slice(0, 3);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Navigation Bar & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 font-semibold text-xs sm:text-sm rounded-xl border border-gray-200 shadow-xs transition-all flex items-center gap-2 group"
          >
            <ArrowLeft className="w-4 h-4 text-[#8B1E2D] group-hover:-translate-x-1 transition-transform" />
            <span>Back to Knowledge Hub</span>
          </button>
          <nav className="hidden md:flex items-center gap-2 text-xs text-gray-500 font-medium">
            <span>Knowledge Hub</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-gray-700">{blog.category}</span>
          </nav>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all"
            title="Share Article Link"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#8B1E2D]" />
                <span>Share</span>
              </>
            )}
          </button>

          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`px-3.5 py-2 border rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all ${
              bookmarked 
                ? 'bg-amber-50 text-amber-800 border-amber-300' 
                : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-600 text-amber-600' : 'text-gray-400'}`} />
            <span>{bookmarked ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Main Hero Header */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E8E8E8] shadow-sm space-y-6 relative overflow-hidden">
        <div className="space-y-4 max-w-4xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#8B1E2D] text-white text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
              {blog.category}
            </span>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold px-3 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Guide (2026/2027)
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#222222] leading-tight">
            {blog.title}
          </h1>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {blog.excerpt}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500 border-t border-gray-100">
            <div className="flex items-center gap-2 font-medium text-gray-800">
              <div className="w-7 h-7 rounded-full bg-[#8B1E2D]/10 text-[#8B1E2D] flex items-center justify-center font-bold text-xs">
                {blog.author.charAt(0)}
              </div>
              <span>{blog.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#8B1E2D]" />
              <span>{blog.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#8B1E2D]" />
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>

        {/* Featured Banner Image */}
        <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm mt-4 bg-gray-100">
          <img
            src={blog.image}
            alt={blog.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80';
            }}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column - Main Content (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Executive Overview Highlight */}
          <div className="bg-gradient-to-br from-red-50/70 via-rose-50/40 to-white p-6 rounded-3xl border border-red-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-[#8B1E2D] font-heading font-extrabold text-sm uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Guide Highlights & Coverage</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm font-semibold text-gray-800">
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-red-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Tuition Fee Waivers</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-red-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Monthly Tax-Free Living Stipends</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-red-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Roundtrip Airfare & Health Insurance</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-red-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>2027 Intake Deadlines & Application Portals</span>
              </div>
            </div>
          </div>

          {/* Article Full Content Parser */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E8E8E8] shadow-sm space-y-6">
            <div className="space-y-5 text-gray-700 text-base leading-relaxed">
              {blog.content.map((p, idx) => {
                if (p.startsWith('SECTION: ') || p.startsWith('## ')) {
                  const title = p.replace(/^(SECTION: |## )/, '');
                  const id = `section-${idx}`;
                  return (
                    <div id={id} key={idx} className="pt-8 pb-3 border-b-2 border-[#8B1E2D]/20 scroll-mt-24">
                      <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#8B1E2D] flex items-center gap-2.5">
                        <BookOpen className="w-6 h-6 text-[#8B1E2D] shrink-0" />
                        <span>{title}</span>
                      </h2>
                    </div>
                  );
                }

                if (p.startsWith('SUBSECTION: ') || p.startsWith('### ')) {
                  const title = p.replace(/^(SUBSECTION: |### )/, '');
                  return (
                    <h3 key={idx} className="font-heading font-bold text-lg text-[#222222] pt-4 leading-snug">
                      {title}
                    </h3>
                  );
                }

                if (p.startsWith('HIGHLIGHT: ') || p.startsWith('CALLOUT: ')) {
                  const text = p.replace(/^(HIGHLIGHT: |CALLOUT: )/, '');
                  return (
                    <div key={idx} className="my-6 p-5 bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl text-amber-950 font-medium text-sm leading-relaxed shadow-2xs space-y-1">
                      <span className="font-bold uppercase tracking-wider block text-xs text-amber-800 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Key Expert Insight
                      </span>
                      <p>{text}</p>
                    </div>
                  );
                }

                if (p.startsWith('KEY_TAKEAWAY: ')) {
                  const text = p.replace('KEY_TAKEAWAY: ', '');
                  return (
                    <div key={idx} className="my-6 p-6 bg-[#8B1E2D]/5 border border-[#8B1E2D]/20 rounded-2xl text-gray-900 text-sm leading-relaxed space-y-1 shadow-2xs">
                      <span className="font-heading font-bold text-[#8B1E2D] uppercase tracking-wider block text-xs flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#8B1E2D]" /> Key Takeaway
                      </span>
                      <p className="font-medium text-gray-800">{text}</p>
                    </div>
                  );
                }

                if (p.startsWith('TABLE:')) {
                  const lines = p.replace('TABLE:', '').trim().split('\n');
                  if (lines.length < 2) return null;
                  const headers = lines[0].split('|').map(h => h.trim());
                  const rows = lines.slice(1).map(row => row.split('|').map(c => c.trim()));
                  return (
                    <div key={idx} className="my-6 overflow-x-auto rounded-2xl border border-gray-200 shadow-2xs">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-[#8B1E2D] text-white font-semibold">
                          <tr>
                            {headers.map((h, i) => (
                              <th key={i} className="p-3.5 border-b border-red-900">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                          {rows.map((r, ri) => (
                            <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                              {r.map((cell, ci) => (
                                <td key={ci} className="p-3.5 text-gray-700 font-medium">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                if (p.startsWith('- ') || p.startsWith('• ')) {
                  const text = p.substring(2);
                  return (
                    <div key={idx} className="flex items-start gap-3 pl-2 text-gray-700 my-2">
                      <span className="w-2 h-2 rounded-full bg-[#8B1E2D] mt-2 shrink-0" />
                      <span className="text-sm sm:text-base leading-relaxed">{text}</span>
                    </div>
                  );
                }

                if (p.startsWith('Q: ')) {
                  return (
                    <div key={idx} className="mt-6 p-4 bg-gray-50 rounded-xl border-l-4 border-[#8B1E2D] font-bold text-gray-900 text-sm sm:text-base">
                      {p}
                    </div>
                  );
                }

                if (p.startsWith('A: ')) {
                  return (
                    <div key={idx} className="pl-4 text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
                      {p}
                    </div>
                  );
                }

                return (
                  <p key={idx} className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {p}
                  </p>
                );
              })}
            </div>

            {/* Article Footer Tags */}
            <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">Tags:</span>
              {blog.tags.map((t, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Author Cell / Verification Card */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#8B1E2D] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md">
              {blog.author.charAt(0)}
            </div>
            <div className="space-y-1">
              <div className="font-heading font-extrabold text-base text-gray-900">
                {blog.author}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Grassroots Study Abroad Senior Overseas Education Specialist & Global Admissions Advisor. Specialized in UK, USA, Australia, and European university placements.
              </p>
            </div>
          </div>

          {/* Embedded Counselling Banner */}
          <div className="bg-gradient-to-r from-[#8B1E2D] to-[#5C131E] p-8 rounded-3xl text-white shadow-xl space-y-4 relative overflow-hidden">
            <div className="space-y-2 relative z-10 max-w-xl">
              <span className="bg-white/20 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                1-on-1 Personalized Session
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                Ready to Apply to your Dream University?
              </h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                Get a free profile evaluation, application fee waivers, scholarship application assistance, and visa guidance with Grassroots Study Abroad.
              </p>
            </div>
            {onOpenBookModal && (
              <button
                onClick={onOpenBookModal}
                className="relative z-10 px-8 py-3.5 bg-white hover:bg-gray-100 text-[#8B1E2D] font-bold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <span>Book Free Counselling</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Related Articles Carousel / Grid */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-extrabold text-xl text-gray-900">
                Related Master Guides & Articles
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onSelectBlog(rel);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="h-32 overflow-hidden relative">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 bg-[#8B1E2D] text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                      {rel.category}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-gray-900 group-hover:text-[#8B1E2D] transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                    <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium pt-2 border-t border-gray-100">
                      <span>{rel.readTime}</span>
                      <span className="text-[#8B1E2D] font-bold flex items-center gap-1">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column - Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          
          {/* Table of Contents Box */}
          {sections.length > 0 && (
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-gray-900 font-heading font-extrabold text-sm uppercase tracking-wider pb-2 border-b border-gray-100">
                <BookOpen className="w-4 h-4 text-[#8B1E2D]" />
                <span>Table of Contents</span>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-gray-600">
                {sections.map((sec, idx) => (
                  <li key={idx}>
                    <a
                      href={`#section-${idx}`}
                      className="hover:text-[#8B1E2D] flex items-center gap-2 py-1 transition-colors leading-snug"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E2D] shrink-0" />
                      <span>{sec}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Book Counselling Card */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="space-y-2">
              <span className="bg-red-50 text-[#8B1E2D] text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase">
                Free Guidance
              </span>
              <h3 className="font-heading font-extrabold text-lg text-gray-900">
                Speak with a Senior Education Counselor
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Have questions about admission requirements, SOP editing, or visa success rates? Get step-by-step assistance.
              </p>
            </div>

            <ul className="space-y-2 text-xs text-gray-700 font-medium">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero service fees & direct university offers</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Scholarship evaluation up to 100% tuition</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Visa filing & financial documentation help</span>
              </li>
            </ul>

            {onOpenBookModal && (
              <button
                onClick={onOpenBookModal}
                className="w-full py-3.5 bg-[#8B1E2D] hover:bg-[#111111] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Book 1-on-1 Counselling</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Popular Categories */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-3">
            <h4 className="font-heading font-extrabold text-xs text-gray-900 uppercase tracking-wider">
              Explore Topics
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {['Master Guides', 'Government Schemes', 'UK & Europe', 'USA & Americas', 'Asia & Oceania', 'Application Strategy'].map((cat, i) => (
                <span
                  key={i}
                  onClick={onBack}
                  className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
