import React, { useState } from 'react';
import { BLOGS } from '../../data/mockData';
import { BlogPost } from '../../types';
import { BlogDetailView } from './BlogDetailView';
import { 
  Search, 
  Calendar, 
  ArrowRight
} from 'lucide-react';

interface BlogsViewProps {
  onOpenBookModal?: () => void;
}

export const BlogsView: React.FC<BlogsViewProps> = ({ onOpenBookModal }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);

  const categories = ['All', 'Master Guides', 'Government Schemes', 'UK & Europe', 'USA & Americas', 'Asia & Oceania', 'Application Strategy'];

  const filtered = BLOGS.filter(b => {
    const matchesQuery = b.title.toLowerCase().includes(query.toLowerCase()) || b.excerpt.toLowerCase().includes(query.toLowerCase());
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
    return matchesQuery && matchesCat;
  });

  // If a blog is selected, render the dedicated full-page BlogDetailView!
  if (activeBlog) {
    return (
      <BlogDetailView
        blog={activeBlog}
        onBack={() => {
          setActiveBlog(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectBlog={(blog) => setActiveBlog(blog)}
        onOpenBookModal={onOpenBookModal}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16 pt-4">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-[#8B1E2D]/10 text-[#8B1E2D] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Grassroots Study Abroad Knowledge & Insights Hub
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
            onClick={() => {
              setActiveBlog(blog);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-white rounded-3xl border border-[#E8E8E8] shadow-soft shadow-soft-hover overflow-hidden flex flex-col justify-between cursor-pointer group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80';
                }}
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

    </div>
  );
};
