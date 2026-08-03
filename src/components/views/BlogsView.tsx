import React, { useState } from 'react';
import { BLOGS } from '../../data/mockData';
import { BlogPost } from '../../types';
import { 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  X, 
  Clock,
  Sparkles
} from 'lucide-react';

export const BlogsView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);

  const categories = ['All', 'Master Guides', 'Government Schemes', 'UK & Europe', 'USA & Americas', 'Asia & Oceania', 'Application Strategy'];

  const filtered = BLOGS.filter(b => {
    const matchesQuery = b.title.toLowerCase().includes(query.toLowerCase()) || b.excerpt.toLowerCase().includes(query.toLowerCase());
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16 pt-4">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-[#8B1E2D]/10 text-[#8B1E2D] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          TASA Global Knowledge & Insights Hub
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#222222]">
          Overseas Education & Scholarship Guides
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          In-depth master guides, country breakdown strategies, visa policy updates, and step-by-step scholarship blueprints tailored for Indian students.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#E8E8E8] shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          
          <div className="sm:col-span-8 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles by title, country, or topic..."
              className="w-full pl-10 pr-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
            >
              {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
            </select>
          </div>

        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((blog) => (
          <div
            key={blog.id}
            onClick={() => setActiveBlog(blog)}
            className="bg-white rounded-3xl border border-[#E8E8E8] shadow-soft shadow-soft-hover overflow-hidden flex flex-col justify-between cursor-pointer group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#8B1E2D] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                {blog.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-[11px] text-gray-400 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#8B1E2D]" />
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="font-heading font-bold text-base text-[#222222] group-hover:text-[#8B1E2D] transition-colors leading-snug">
                  {blog.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#8B1E2D]">
                <span>Read Full Guide</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Blog Full Reader Modal */}
      {activeBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#E8E8E8] relative p-6 sm:p-8 space-y-6">
            <button
              onClick={() => setActiveBlog(null)}
              className="absolute top-5 right-5 p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="bg-[#8B1E2D]/10 text-[#8B1E2D] text-xs font-bold px-3 py-1 rounded-full uppercase">
              {activeBlog.category}
            </span>

            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#222222]">
              {activeBlog.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-gray-500 border-y border-gray-100 py-3">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#8B1E2D]" /> {activeBlog.author}</span>
              <span>•</span>
              <span>{activeBlog.date}</span>
              <span>•</span>
              <span>{activeBlog.readTime}</span>
            </div>

            <img
              src={activeBlog.image}
              alt={activeBlog.title}
              className="w-full h-64 sm:h-80 object-cover rounded-2xl"
            />

            <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
              {activeBlog.content.map((p, idx) => {
                if (p.startsWith('SECTION: ') || p.startsWith('## ')) {
                  const title = p.replace(/^(SECTION: |## )/, '');
                  return (
                    <div key={idx} className="pt-6 pb-2 border-b-2 border-[#8B1E2D]/20">
                      <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#8B1E2D] flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#8B1E2D] shrink-0" />
                        {title}
                      </h3>
                    </div>
                  );
                }
                if (p.startsWith('SUBSECTION: ') || p.startsWith('### ')) {
                  const title = p.replace(/^(SUBSECTION: |### )/, '');
                  return (
                    <h4 key={idx} className="font-heading font-bold text-base sm:text-lg text-[#222222] pt-4">
                      {title}
                    </h4>
                  );
                }
                if (p.startsWith('HIGHLIGHT: ') || p.startsWith('CALLOUT: ')) {
                  const text = p.replace(/^(HIGHLIGHT: |CALLOUT: )/, '');
                  return (
                    <div key={idx} className="my-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900 font-medium text-xs sm:text-sm leading-relaxed shadow-sm">
                      <span className="font-bold uppercase tracking-wider block text-[10px] text-amber-700 mb-1">Key Insight / Pro-Tip</span>
                      {text}
                    </div>
                  );
                }
                if (p.startsWith('KEY_TAKEAWAY: ')) {
                  const text = p.replace('KEY_TAKEAWAY: ', '');
                  return (
                    <div key={idx} className="my-4 p-5 bg-[#8B1E2D]/5 border border-[#8B1E2D]/20 rounded-2xl text-gray-800 text-sm leading-relaxed">
                      <span className="font-bold text-[#8B1E2D] uppercase tracking-wider block text-xs mb-1">📌 Key Takeaway</span>
                      {text}
                    </div>
                  );
                }
                if (p.startsWith('TABLE:')) {
                  const lines = p.replace('TABLE:', '').trim().split('\n');
                  if (lines.length < 2) return null;
                  const headers = lines[0].split('|').map(h => h.trim());
                  const rows = lines.slice(1).map(row => row.split('|').map(c => c.trim()));
                  return (
                    <div key={idx} className="my-4 overflow-x-auto rounded-xl border border-gray-200 shadow-xs">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-[#8B1E2D] text-white font-semibold">
                          <tr>
                            {headers.map((h, i) => (
                              <th key={i} className="p-3 border-b border-red-800">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                          {rows.map((r, ri) => (
                            <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                              {r.map((cell, ci) => (
                                <td key={ci} className="p-3 text-gray-700 font-medium">{cell}</td>
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
                    <div key={idx} className="flex items-start gap-2.5 pl-2 text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E2D] mt-2 shrink-0"></span>
                      <span>{text}</span>
                    </div>
                  );
                }
                if (p.startsWith('Q: ')) {
                  return (
                    <div key={idx} className="mt-4 p-3.5 bg-gray-50 rounded-xl border-l-4 border-[#8B1E2D] font-bold text-gray-900 text-sm">
                      {p}
                    </div>
                  );
                }
                if (p.startsWith('A: ')) {
                  return (
                    <div key={idx} className="pl-4 text-gray-600 mb-3 text-sm leading-relaxed">
                      {p}
                    </div>
                  );
                }
                return <p key={idx} className="text-gray-700 leading-relaxed">{p}</p>;
              })}
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-2">
              {activeBlog.tags.map((t, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
