import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UNIVERSITIES } from '../../data/mockData';
import { 
  ALL_MASTER_UNIVERSITIES, 
  COUNTRY_STATS, 
  MasterUniversity, 
  getUniversityCardBranding,
  getUniversityCampusImage,
  masterToUniversity
} from '../../data/masterUniversities';
import { UniversityLogo } from '../UniversityLogo';
import { CountryFlag } from '../CountryFlag';
import { getUniversityCrestTheme } from '../../utils/universityLogos';
import { getCountryTuitionRange, formatTuitionInINR, ForexRatesMap, DEFAULT_INR_RATES } from '../../utils/currencyUtils';
import { ForexRatesWidget } from '../ForexRatesWidget';
import { University } from '../../types';
import { 
  Search, 
  MapPin, 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  Filter,
  Globe2,
  Building2,
  BookOpen,
  ArrowRight,
  X,
  Award,
  ChevronLeft,
  SlidersHorizontal,
  RotateCcw,
  LayoutGrid,
  List,
  DollarSign,
  FileCheck,
  Percent,
  Check,
  ChevronDown,
  Trophy,
  Landmark,
  Zap,
  Gift,
  Sprout
} from 'lucide-react';

interface UniversitiesViewProps {
  onSelectUniversity: (uni: University) => void;
  onOpenBookModal: () => void;
}

const REGIONS = [
  'All Regions',
  'North America',
  'Europe',
  'Asia-Pacific',
  'Middle East',
  'Latin America'
];

const INSTITUTION_TYPES = [
  'All Types',
  'University',
  'College',
  'Business School',
  'Tech Institute',
  'Pathway Center'
];

const SECTORS = [
  'All Sectors',
  'Public',
  'Private'
];

const TUITION_TIERS = [
  { label: 'All Budgets', value: 'All Budgets' },
  { label: 'Budget Tier (Affordable)', value: 'Budget' },
  { label: 'Moderate Tier (Mid-Range)', value: 'Moderate' },
  { label: 'Premium Tier (Global Elite)', value: 'Premium' }
];

const SORT_OPTIONS = [
  { label: 'Featured & Top Partners', value: 'featured' },
  { label: 'Name (A to Z)', value: 'name-asc' },
  { label: 'Name (Z to A)', value: 'name-desc' },
  { label: 'Country (A to Z)', value: 'country-asc' }
];

export const UniversitiesView: React.FC<UniversitiesViewProps> = ({
  onSelectUniversity,
  onOpenBookModal
}) => {
  // Filter States
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [countrySearch, setCountrySearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [selectedTuition, setSelectedTuition] = useState('All Budgets');
  const [selectedPreset, setSelectedPreset] = useState<'all' | 'top' | 'public' | 'private' | 'pathway' | 'business' | 'tech' | 'budget' | 'ielts' | 'scholarship'>('all');
  
  // Boolean Toggles
  const [pathwayOnly, setPathwayOnly] = useState(false);
  const [ieltsWaiverOnly, setIeltsWaiverOnly] = useState(false);
  const [scholarshipOnly, setScholarshipOnly] = useState(false);
  
  // Mobile Filter Drawer Toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sorting & Layout Mode
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Forex Currency Exchange State
  const [currencyMode, setCurrencyMode] = useState<'dual' | 'inr' | 'native'>('dual');
  const [forexRates, setForexRates] = useState<ForexRatesMap>(DEFAULT_INR_RATES);

  // Infinite Scroll / Visible Count State
  const [visibleCount, setVisibleCount] = useState(24);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Map of detailed mock university data
  const detailedMap = useMemo(() => {
    const map = new Map<string, University>();
    UNIVERSITIES.forEach(u => map.set(u.name.toLowerCase(), u));
    return map;
  }, []);

  // Filter Logic over all 1,274 Universities
  const filteredList = useMemo(() => {
    let result = ALL_MASTER_UNIVERSITIES.filter(uni => {
      // Search query filter
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || 
        uni.name.toLowerCase().includes(q) || 
        uni.country.toLowerCase().includes(q) || 
        uni.region.toLowerCase().includes(q) ||
        uni.institutionType.toLowerCase().includes(q) ||
        uni.sector.toLowerCase().includes(q);

      // Country filter
      const matchesCountry = selectedCountry === 'All' || 
        uni.country.toLowerCase() === selectedCountry.toLowerCase();

      // Region filter
      const matchesRegion = selectedRegion === 'All Regions' || uni.region === selectedRegion;

      // Type filter
      const matchesType = selectedType === 'All Types' || uni.institutionType === selectedType;

      // Sector filter (Public / Private)
      const matchesSector = selectedSector === 'All Sectors' || uni.sector === selectedSector;

      // Tuition tier filter
      const matchesTuition = selectedTuition === 'All Budgets' || uni.tuitionTier === selectedTuition;

      // Pathway filter
      const matchesPathway = !pathwayOnly || uni.isPathwayPartner;

      // IELTS Waiver filter
      const matchesIelts = !ieltsWaiverOnly || uni.hasIeltsWaiver;

      // Scholarship filter
      const matchesScholarship = !scholarshipOnly || uni.hasScholarship;

      // Preset Quick Category Filter
      let matchesPreset = true;
      if (selectedPreset === 'top') matchesPreset = !!uni.qsRanking;
      if (selectedPreset === 'public') matchesPreset = uni.sector === 'Public';
      if (selectedPreset === 'private') matchesPreset = uni.sector === 'Private';
      if (selectedPreset === 'pathway') matchesPreset = !!uni.isPathwayPartner;
      if (selectedPreset === 'business') matchesPreset = uni.institutionType === 'Business School';
      if (selectedPreset === 'tech') matchesPreset = uni.institutionType === 'Tech Institute';
      if (selectedPreset === 'budget') matchesPreset = uni.tuitionTier === 'Budget';
      if (selectedPreset === 'ielts') matchesPreset = uni.hasIeltsWaiver;
      if (selectedPreset === 'scholarship') matchesPreset = uni.hasScholarship;

      return matchesQuery && matchesCountry && matchesRegion && matchesType && 
             matchesSector && matchesTuition && matchesPathway && matchesIelts && 
             matchesScholarship && matchesPreset;
    });

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'country-asc') return a.country.localeCompare(b.country);
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [
    query, selectedCountry, selectedRegion, selectedType, selectedSector, selectedTuition, 
    pathwayOnly, ieltsWaiverOnly, scholarshipOnly, selectedPreset, sortBy
  ]);

  // Total items count & visible items calculation
  const totalItems = filteredList.length;

  const displayedList = useMemo(() => {
    return filteredList.slice(0, visibleCount);
  }, [filteredList, visibleCount]);

  const hasMore = visibleCount < totalItems;

  // IntersectionObserver for continuous infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          setVisibleCount(prev => Math.min(prev + 24, totalItems));
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, totalItems]);

  // Helper to change filters and reset count
  const handleFilterChange = (setter: Function, value: any) => {
    setter(value);
    setVisibleCount(24);
  };

  const handleResetFilters = () => {
    setQuery('');
    setSelectedCountry('All');
    setCountrySearch('');
    setSelectedRegion('All Regions');
    setSelectedType('All Types');
    setSelectedSector('All Sectors');
    setSelectedTuition('All Budgets');
    setSelectedPreset('all');
    setPathwayOnly(false);
    setIeltsWaiverOnly(false);
    setScholarshipOnly(false);
    setSortBy('featured');
    setVisibleCount(24);
  };

  // Helper to trigger university selection modal
  const handleCardClick = (mUni: MasterUniversity) => {
    const detailed = detailedMap.get(mUni.name.toLowerCase());
    if (detailed) {
      onSelectUniversity(detailed);
    } else {
      onSelectUniversity(masterToUniversity(mUni));
    }
  };

  // Active filter count calculation
  const activeFiltersCount = (query ? 1 : 0) + 
    (selectedCountry !== 'All' ? 1 : 0) + 
    (selectedRegion !== 'All Regions' ? 1 : 0) + 
    (selectedType !== 'All Types' ? 1 : 0) + 
    (selectedSector !== 'All Sectors' ? 1 : 0) + 
    (selectedTuition !== 'All Budgets' ? 1 : 0) + 
    (selectedPreset !== 'all' ? 1 : 0) + 
    (pathwayOnly ? 1 : 0) + 
    (ieltsWaiverOnly ? 1 : 0) + 
    (scholarshipOnly ? 1 : 0);

  // Filtered Country Stats list for sidebar search
  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return COUNTRY_STATS;
    return COUNTRY_STATS.filter(c => c.country.toLowerCase().includes(countrySearch.toLowerCase()));
  }, [countrySearch]);

  // Render Sidebar Content (Shared between desktop sticky column & mobile drawer)
  const renderSidebarFilters = () => (
    <div className="space-y-6 text-xs text-gray-700">
      
      {/* Sidebar Header & Clear */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#8B1E2D]" />
          <h3 className="font-heading font-extrabold text-sm text-gray-900 uppercase tracking-wider">
            Filter Universities
          </h3>
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={handleResetFilters}
            className="text-[11px] font-bold text-[#8B1E2D] hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Clear ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* 1. Quick Keyword Search */}
      <div className="space-y-1.5">
        <label className="font-bold text-gray-900 uppercase text-[10px] tracking-wider block">
          Search University
        </label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleFilterChange(setQuery, e.target.value)}
            placeholder="Name, city, degree..."
            className="w-full pl-8 pr-7 py-2 bg-[#FAFAFA] border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
          />
          {query && (
            <button 
              onClick={() => handleFilterChange(setQuery, '')}
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Quick Category Presets */}
      <div className="space-y-2">
        <label className="font-bold text-gray-900 uppercase text-[10px] tracking-wider block">
          Quick Filters
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'all', label: 'All 1,274', icon: GraduationCap },
            { id: 'top', label: 'Top Ranked', icon: Trophy },
            { id: 'public', label: 'Public Unis', icon: Landmark },
            { id: 'private', label: 'Private Unis', icon: Building2 },
            { id: 'ielts', label: 'IELTS Waiver', icon: Zap },
            { id: 'scholarship', label: 'Scholarships', icon: Gift },
            { id: 'budget', label: 'Budget Friendly', icon: DollarSign },
            { id: 'pathway', label: 'Pathway Colleges', icon: Sprout },
          ].map(p => {
            const Icon = p.icon;
            const isSelected = selectedPreset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleFilterChange(setSelectedPreset, p.id)}
                className={`px-2.5 py-2 rounded-xl font-bold text-[11px] text-left transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#8B1E2D] text-white shadow-xs'
                    : 'bg-gray-50/90 border border-gray-200/80 text-gray-700 hover:bg-gray-100/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-[#8B1E2D]'}`} />
                <span className="truncate">{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Destination Country Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-bold text-gray-900 uppercase text-[10px] tracking-wider block">
            Destination Country ({COUNTRY_STATS.length})
          </label>
          {selectedCountry !== 'All' && (
            <button 
              onClick={() => handleFilterChange(setSelectedCountry, 'All')}
              className="text-[10px] text-[#8B1E2D] font-bold"
            >
              Show All
            </button>
          )}
        </div>

        {/* Country Quick Search Box */}
        <input
          type="text"
          value={countrySearch}
          onChange={(e) => setCountrySearch(e.target.value)}
          placeholder="Filter country list..."
          className="w-full px-2.5 py-1.5 bg-[#FAFAFA] border border-gray-200 rounded-lg text-[11px] font-medium"
        />

        <div className="max-h-48 overflow-y-auto space-y-1 pr-1 scrollbar-thin border border-gray-100 rounded-xl p-1.5 bg-[#FAFAFA]">
          <button
            onClick={() => handleFilterChange(setSelectedCountry, 'All')}
            className={`w-full px-2.5 py-1.5 rounded-lg font-bold text-xs flex items-center justify-between transition-colors ${
              selectedCountry === 'All' ? 'bg-[#8B1E2D] text-white' : 'hover:bg-gray-200/60 text-gray-800'
            }`}
          >
            <span>All 44 Countries</span>
            <span className="text-[10px] opacity-80">1,274</span>
          </button>
          {filteredCountries.map(cs => (
            <button
              key={cs.country}
              onClick={() => handleFilterChange(setSelectedCountry, cs.country)}
              className={`w-full px-2.5 py-1.5 rounded-lg font-semibold text-xs flex items-center justify-between transition-colors ${
                selectedCountry === cs.country
                  ? 'bg-[#8B1E2D] text-white font-bold'
                  : 'hover:bg-gray-200/60 text-gray-700'
              }`}
            >
              <span className="truncate pr-2">{cs.country}</span>
              <span className="text-[10px] opacity-75 shrink-0 bg-black/10 px-1.5 py-0.5 rounded-md">
                {cs.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Global Region */}
      <div className="space-y-1.5">
        <label className="font-bold text-gray-900 uppercase text-[10px] tracking-wider block">
          Global Region
        </label>
        <select
          value={selectedRegion}
          onChange={(e) => handleFilterChange(setSelectedRegion, e.target.value)}
          className="w-full px-3 py-2 bg-[#FAFAFA] border border-gray-200 rounded-xl font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
        >
          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {/* 5. Institution Type */}
      <div className="space-y-1.5">
        <label className="font-bold text-gray-900 uppercase text-[10px] tracking-wider block">
          Institution Type
        </label>
        <select
          value={selectedType}
          onChange={(e) => handleFilterChange(setSelectedType, e.target.value)}
          className="w-full px-3 py-2 bg-[#FAFAFA] border border-gray-200 rounded-xl font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
        >
          {INSTITUTION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* 6. Tuition Fee Budget */}
      <div className="space-y-1.5">
        <label className="font-bold text-gray-900 uppercase text-[10px] tracking-wider block">
          Tuition Fee Range
        </label>
        <select
          value={selectedTuition}
          onChange={(e) => handleFilterChange(setSelectedTuition, e.target.value)}
          className="w-full px-3 py-2 bg-[#FAFAFA] border border-gray-200 rounded-xl font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
        >
          {TUITION_TIERS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>

      {/* 7. Admission Perks Checkboxes */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <label className="font-bold text-gray-900 uppercase text-[10px] tracking-wider block">
          Special Admission Flags
        </label>

        <label className="flex items-center gap-2 p-2 rounded-xl bg-[#FAFAFA] border border-gray-200 cursor-pointer hover:border-gray-300">
          <input
            type="checkbox"
            checked={ieltsWaiverOnly}
            onChange={(e) => handleFilterChange(setIeltsWaiverOnly, e.target.checked)}
            className="w-3.5 h-3.5 text-[#8B1E2D] rounded focus:ring-[#8B1E2D]"
          />
          <span className="font-semibold text-gray-800">IELTS / English Waiver</span>
        </label>

        <label className="flex items-center gap-2 p-2 rounded-xl bg-[#FAFAFA] border border-gray-200 cursor-pointer hover:border-gray-300">
          <input
            type="checkbox"
            checked={scholarshipOnly}
            onChange={(e) => handleFilterChange(setScholarshipOnly, e.target.checked)}
            className="w-3.5 h-3.5 text-[#8B1E2D] rounded focus:ring-[#8B1E2D]"
          />
          <span className="font-semibold text-gray-800">Scholarships & Bursaries</span>
        </label>

        <label className="flex items-center gap-2 p-2 rounded-xl bg-[#FAFAFA] border border-gray-200 cursor-pointer hover:border-gray-300">
          <input
            type="checkbox"
            checked={pathwayOnly}
            onChange={(e) => handleFilterChange(setPathwayOnly, e.target.checked)}
            className="w-3.5 h-3.5 text-[#8B1E2D] rounded focus:ring-[#8B1E2D]"
          />
          <span className="font-semibold text-gray-800">Pathway Colleges Only</span>
        </label>
      </div>

      {/* 8. Institution Sector (Public vs Private) */}
      <div className="space-y-1.5 pt-2 border-t border-gray-100">
        <label className="font-bold text-gray-900 uppercase text-[10px] tracking-wider block">
          Institution Sector
        </label>
        <div className="grid grid-cols-3 gap-1 bg-[#FAFAFA] border border-gray-200 p-1 rounded-xl">
          {SECTORS.map(sec => (
            <button
              key={sec}
              onClick={() => handleFilterChange(setSelectedSector, sec)}
              className={`py-1.5 px-1.5 rounded-lg font-bold text-[11px] transition-all text-center ${
                selectedSector === sec
                  ? 'bg-[#8B1E2D] text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-200/60'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-20 pt-4">
      
      {/* Page Banner Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#8B1E2D] via-[#A3283B] to-[#1E293B] p-6 sm:p-10 text-white overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-amber-200">
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>Master Global Directory • 1,274 Partner Institutions</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white leading-tight">
            Explore 1,274 Partner Universities across 44 Countries
          </h1>

          <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
            Search direct tie-up institutions with fast-track conditional offer letters, scholarship evaluations, and English proficiency waivers through TASA Grassroots.
          </p>

          <div className="pt-2 flex flex-wrap gap-3 items-center text-xs text-white/90 font-medium">
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Application Fee Waivers Eligible
            </span>
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Fast-Track Offer Letters
            </span>
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> IELTS Waiver Accepted
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Filter Drawer Button */}
      <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
          <SlidersHorizontal className="w-4 h-4 text-[#8B1E2D]" />
          <span>Showing {totalItems} Universities</span>
          {activeFiltersCount > 0 && (
            <span className="bg-[#8B1E2D] text-white text-[10px] px-2 py-0.5 rounded-full">
              {activeFiltersCount} active
            </span>
          )}
        </div>
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="px-4 py-2 bg-[#8B1E2D] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Filter Sidebar</span>
        </button>
      </div>

      {/* MAIN TWO-COLUMN SIDEBAR LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* DESKTOP LEFT SIDEBAR FILTERS (Column 1-3) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-20 bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-6 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin">
          {renderSidebarFilters()}
        </div>

        {/* RIGHT CONTENT AREA (Column 4-12) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Live Forex Exchange Rates Banner & Currency Selector */}
          <ForexRatesWidget 
            currencyMode={currencyMode}
            onCurrencyModeChange={setCurrencyMode}
            onRatesUpdated={setForexRates}
          />

          {/* Top Results Toolbar (Sort, View Mode, Active Tags) */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div>
                Showing <strong className="text-[#8B1E2D] text-sm font-extrabold">{displayedList.length}</strong> of{' '}
                <strong className="text-gray-900">{totalItems}</strong> institutions
                {selectedCountry !== 'All' && <span> in <strong className="text-gray-900">{selectedCountry}</strong></span>}
                {selectedRegion !== 'All Regions' && <span> ({selectedRegion})</span>}
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {/* Sort By Dropdown */}
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-gray-500">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#FAFAFA] border border-gray-200 px-2.5 py-1.5 rounded-xl font-bold text-xs focus:outline-none focus:ring-1 focus:ring-[#8B1E2D]"
                  >
                    {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>

                {/* View Mode Switcher */}
                <div className="flex items-center gap-1 bg-[#FAFAFA] border border-gray-200 p-1 rounded-xl">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-all ${
                      viewMode === 'grid' ? 'bg-[#8B1E2D] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'
                    }`}
                    title="Grid View Cards"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-all ${
                      viewMode === 'list' ? 'bg-[#8B1E2D] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'
                    }`}
                    title="Compact List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Count Indicator */}
                <div className="bg-[#FAFAFA] border border-gray-200 px-2.5 py-1.5 rounded-xl font-bold text-xs text-gray-600">
                  Showing <span className="text-[#8B1E2D] font-extrabold">{displayedList.length}</span> / {filteredList.length}
                </div>
              </div>
            </div>

            {/* Active Filters Tag Pills (if any) */}
            {activeFiltersCount > 0 && (
              <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-gray-400 text-[10px] uppercase tracking-wider">Active:</span>
                {query && (
                  <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-lg font-bold text-[11px] flex items-center gap-1">
                    "{query}" <X className="w-3 h-3 cursor-pointer" onClick={() => setQuery('')} />
                  </span>
                )}
                {selectedCountry !== 'All' && (
                  <span className="bg-red-50 text-[#8B1E2D] border border-red-200 px-2 py-0.5 rounded-lg font-bold text-[11px] flex items-center gap-1">
                    {selectedCountry} <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCountry('All')} />
                  </span>
                )}
                {selectedRegion !== 'All Regions' && (
                  <span className="bg-blue-50 text-blue-900 border border-blue-200 px-2 py-0.5 rounded-lg font-bold text-[11px] flex items-center gap-1">
                    {selectedRegion} <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedRegion('All Regions')} />
                  </span>
                )}
                {selectedType !== 'All Types' && (
                  <span className="bg-purple-50 text-purple-900 border border-purple-200 px-2 py-0.5 rounded-lg font-bold text-[11px] flex items-center gap-1">
                    {selectedType} <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedType('All Types')} />
                  </span>
                )}
                {selectedTuition !== 'All Budgets' && (
                  <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded-lg font-bold text-[11px] flex items-center gap-1">
                    {selectedTuition} <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedTuition('All Budgets')} />
                  </span>
                )}
                {selectedSector !== 'All Sectors' && (
                  <span className="bg-indigo-50 text-indigo-900 border border-indigo-200 px-2 py-0.5 rounded-lg font-bold text-[11px] flex items-center gap-1">
                    {selectedSector} <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSector('All Sectors')} />
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-[#8B1E2D] hover:underline font-bold text-[11px] ml-1"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>

          {/* DISPLAY UNIVERSITIES GRID / LIST */}
          {displayedList.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-4 shadow-sm">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="font-heading font-bold text-lg text-gray-800">
                No universities found matching your sidebar criteria
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Try clearing search terms or selecting "All 44 Countries".
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-[#8B1E2D] text-white font-bold rounded-xl text-xs hover:bg-[#721824] transition-all"
              >
                Reset Sidebar Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* GRID VIEW CARDS */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedList.map((uni, idx) => {
                const detailed = detailedMap.get(uni.name.toLowerCase());
                const ranking = detailed?.qsRanking || uni.qsRanking;
                const rawTuition = detailed?.tuitionRange || uni.tuitionRange || getCountryTuitionRange(uni.countryCode || uni.country, uni.tuitionTier);
                const acceptance = detailed?.acceptanceRate || 'Competitive';
                const theme = getUniversityCrestTheme(uni.name);

                // Convert tuition according to selected Forex currency mode
                const inrInfo = formatTuitionInINR(rawTuition, uni.countryCode || uni.country, forexRates);
                let tuitionDisplay = rawTuition;
                if (currencyMode === 'inr') {
                  tuitionDisplay = inrInfo.inrText;
                } else if (currencyMode === 'dual') {
                  tuitionDisplay = `${rawTuition} (${inrInfo.lakhsRange})`;
                }

                return (
                  <motion.div
                    key={uni.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.2, delay: (idx % 24) * 0.015 }}
                    onClick={() => handleCardClick(uni)}
                    className="bg-white rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between group relative"
                  >
                    {/* 1. Clean Brand Color Gradient Header */}
                    <div className={`relative h-20 sm:h-24 w-full overflow-hidden bg-gradient-to-br ${theme.bg} p-3.5 flex flex-col justify-between select-none`}>
                      {/* Subtle background pattern */}
                      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:10px_10px] opacity-15 pointer-events-none" />
                      <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-white/10 rounded-full blur-lg pointer-events-none" />

                      {/* Top Badges Bar */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="bg-black/35 backdrop-blur-md text-white text-[11px] font-extrabold px-2.5 py-1 rounded-xl border border-white/20 flex items-center gap-1.5 shadow-xs">
                          <CountryFlag code={uni.countryCode} country={uni.country} size="xs" />
                          <span>{uni.country}</span>
                        </span>

                        <span className="bg-white/95 backdrop-blur-md text-gray-900 text-[10px] font-black px-2.5 py-1 rounded-xl shadow-xs border border-white/80 uppercase tracking-wider">
                          {uni.sector === 'Public' ? 'Public' : 'Private'}
                        </span>
                      </div>

                      {/* Header Bottom Details */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-white/90 font-extrabold text-[11px] uppercase tracking-wider">
                          {uni.institutionType}
                        </span>
                      </div>
                    </div>

                    {/* 2. Card Content & Bold University Title */}
                    <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        {/* Bold University Name */}
                        <h3 className="font-heading font-black text-lg sm:text-xl text-gray-900 leading-snug tracking-tight group-hover:text-[#8B1E2D] transition-colors">
                          {uni.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#8B1E2D] shrink-0" />
                          <span>{detailed?.location || `${uni.country}`}</span>
                        </p>
                      </div>

                      {/* Perks & Feature Badges */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {ranking && (
                          <span className="bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-2xs">
                            <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            {ranking}
                          </span>
                        )}
                        {uni.hasIeltsWaiver && (
                          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-2xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            IELTS Waiver Available
                          </span>
                        )}
                        {uni.hasScholarship && (
                          <span className="bg-blue-50 text-blue-900 border border-blue-200 text-[11px] font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-2xs">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            Scholarships
                          </span>
                        )}
                        {uni.isPathwayPartner && (
                          <span className="bg-purple-50 text-purple-900 border border-purple-200 text-[11px] font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-2xs">
                            <GraduationCap className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                            Partner Institution
                          </span>
                        )}
                      </div>

                      {/* 3. Metrics Grid */}
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-xs grid grid-cols-2 gap-3">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Est. Tuition</span>
                          <span className="font-black text-[#8B1E2D] text-xs block truncate" title={tuitionDisplay}>{tuitionDisplay}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Acceptance</span>
                          <span className="font-extrabold text-gray-800 text-xs block truncate">{acceptance}</span>
                        </div>
                        <div className="space-y-0.5 border-t border-slate-200/80 pt-2">
                          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Sector</span>
                          <span className="font-bold text-gray-700 text-xs block truncate">{uni.sector}</span>
                        </div>
                        <div className="space-y-0.5 border-t border-slate-200/80 pt-2">
                          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Intakes</span>
                          <span className="font-extrabold text-emerald-700 text-xs block truncate">Fall & Spring</span>
                        </div>
                      </div>

                      {/* 4. Action Footer */}
                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-black text-gray-700 group-hover:text-[#8B1E2D] transition-colors flex items-center gap-1">
                          View Programs & Admissions
                        </span>
                        <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#8B1E2D] text-gray-700 group-hover:text-white transition-colors flex items-center justify-center shrink-0 shadow-2xs">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* COMPACT LIST VIEW */
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
              {displayedList.map((uni, idx) => {
                const branding = getUniversityCardBranding(uni.name, uni.countryCode, uni.institutionType, idx);
                const rawTuition = uni.tuitionRange || getCountryTuitionRange(uni.countryCode || uni.country, uni.tuitionTier);
                const inrInfo = formatTuitionInINR(rawTuition, uni.countryCode || uni.country, forexRates);
                let tuitionListDisplay = rawTuition;
                if (currencyMode === 'inr') {
                  tuitionListDisplay = inrInfo.inrText;
                } else if (currencyMode === 'dual') {
                  tuitionListDisplay = `${rawTuition} (${inrInfo.lakhsRange})`;
                }

                return (
                  <div 
                    key={uni.id}
                    onClick={() => handleCardClick(uni)}
                    className="p-4 hover:bg-[#FAFAFA] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <UniversityLogo 
                        name={uni.name} 
                        countryCode={uni.countryCode} 
                        size="md" 
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading font-bold text-sm text-gray-900 group-hover:text-[#8B1E2D] transition-colors">
                            {uni.name}
                          </h4>
                          {uni.hasIeltsWaiver && (
                            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded">
                              IELTS Waiver
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                          <span className="font-bold text-[#8B1E2D]">{uni.country}</span> • {uni.region} • {uni.institutionType} • <span className="font-semibold text-gray-700">{uni.sector}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs shrink-0 self-end sm:self-center">
                      <span className="text-[#8B1E2D] font-bold bg-amber-50/80 border border-amber-200/60 px-2.5 py-1 rounded-lg">
                        Est. {tuitionListDisplay}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenBookModal();
                        }}
                        className="px-3.5 py-1.5 bg-[#8B1E2D] text-white rounded-xl font-bold text-xs hover:bg-[#721824] transition-all"
                      >
                        Apply Now
                      </button>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Infinite Scroll & Load More Controls */}
          <div className="pt-8 pb-4 flex flex-col items-center justify-center space-y-4 border-t border-gray-200">
            <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
              <span>Showing <strong className="text-gray-900 font-extrabold">{displayedList.length}</strong> of <strong className="text-gray-900 font-extrabold">{filteredList.length}</strong> Universities</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md bg-gray-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-[#8B1E2D] h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (displayedList.length / (filteredList.length || 1)) * 100)}%` }}
              />
            </div>

            {hasMore ? (
              <div ref={observerTarget} className="flex flex-col items-center space-y-2 pt-2">
                <button
                  onClick={() => setVisibleCount(prev => Math.min(prev + 24, filteredList.length))}
                  className="px-6 py-3 bg-[#8B1E2D] hover:bg-[#721824] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span>Load More Universities ({filteredList.length - displayedList.length} remaining)</span>
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </button>
                <span className="text-[11px] text-gray-400 font-medium">Or simply scroll down to load automatically</span>
              </div>
            ) : (
              <div className="text-xs font-bold text-gray-400 py-2">
                You have reached the end of the university directory ({filteredList.length} total)
              </div>
            )}
          </div>

        </div>

      </div>

      {/* MOBILE FILTER SIDEBAR SLIDE-OVER DRAWER MODAL */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200">
                <h2 className="font-heading font-extrabold text-base text-gray-900">
                  University Filters
                </h2>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {renderSidebarFilters()}

              <div className="pt-6">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 bg-[#8B1E2D] text-white rounded-xl font-bold text-xs"
                >
                  View {totalItems} Results
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
