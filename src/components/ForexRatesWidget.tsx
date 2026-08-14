import React, { useEffect, useState } from 'react';
import { 
  RefreshCw, 
  TrendingUp, 
  IndianRupee, 
  Globe2, 
  Check, 
  Sparkles,
  Info
} from 'lucide-react';
import { fetchLiveForexRates, ForexRatesMap, DEFAULT_INR_RATES } from '../utils/currencyUtils';

interface ForexRatesWidgetProps {
  currencyMode: 'native' | 'inr' | 'dual';
  onCurrencyModeChange: (mode: 'native' | 'inr' | 'dual') => void;
  onRatesUpdated?: (rates: ForexRatesMap) => void;
}

export const ForexRatesWidget: React.FC<ForexRatesWidgetProps> = ({
  currencyMode,
  onCurrencyModeChange,
  onRatesUpdated
}) => {
  const [rates, setRates] = useState<ForexRatesMap>(DEFAULT_INR_RATES);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLive, setIsLive] = useState<boolean>(true);
  const [updatedDate, setUpdatedDate] = useState<string>('Daily Sync');
  const [showRatesBar, setShowRatesBar] = useState<boolean>(true);

  const loadRates = async () => {
    setLoading(true);
    const data = await fetchLiveForexRates();
    setRates(data.rates);
    setIsLive(data.isLive);
    setUpdatedDate(data.updatedDate);
    if (onRatesUpdated) onRatesUpdated(data.rates);
    setLoading(false);
  };

  useEffect(() => {
    loadRates();
  }, []);

  // Featured currencies for ticker
  const featured = [
    { code: 'USD', name: 'US Dollar', symbol: '$', rate: rates.USD || 86.80 },
    { code: 'GBP', name: 'British Pound', symbol: '£', rate: rates.GBP || 109.80 },
    { code: 'EUR', name: 'Euro', symbol: '€', rate: rates.EUR || 94.30 },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'CAD', rate: rates.CAD || 61.50 },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'AUD', rate: rates.AUD || 55.60 },
    { code: 'AED', name: 'UAE Dirham', symbol: 'AED', rate: rates.AED || 23.63 },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'SGD', rate: rates.SGD || 64.20 },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-[#1E293B] to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-700/60 my-4 space-y-4">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/50">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold shadow-2xs">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-heading font-extrabold text-sm sm:text-base text-white flex items-center gap-1.5">
                Live Forex Exchange Rates (INR ₹)
              </h4>
            </div>
            <p className="text-[11px] text-slate-300">
              Auto-converting tuition & cost estimates for all 1,274 universities to Indian Rupees (₹)
            </p>
          </div>
        </div>

        {/* Currency Display Selector */}
        <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700 shrink-0 self-stretch sm:self-auto justify-center">
          <button
            onClick={() => onCurrencyModeChange('dual')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              currencyMode === 'dual'
                ? 'bg-[#E31B23] text-white shadow-xs font-black shadow-red-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Dual (Local + ₹)</span>
          </button>
          <button
            onClick={() => onCurrencyModeChange('inr')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              currencyMode === 'inr'
                ? 'bg-[#E31B23] text-white shadow-xs font-black shadow-red-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
            <span>INR (₹ Lakhs)</span>
          </button>
          <button
            onClick={() => onCurrencyModeChange('native')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              currencyMode === 'native'
                ? 'bg-[#E31B23] text-white shadow-xs font-black shadow-red-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Native Currency</span>
          </button>
        </div>
      </div>

      {/* Ticker Grid of Exchange Rates */}
      {showRatesBar && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {featured.map((item) => (
            <div 
              key={item.code}
              className="bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 rounded-xl p-2.5 text-center transition-all group"
            >
              <div className="text-[10px] font-bold text-slate-400 group-hover:text-amber-300 transition-colors uppercase tracking-wider">
                1 {item.code} ({item.symbol})
              </div>
              <div className="font-extrabold text-sm text-emerald-400 mt-0.5 flex items-center justify-center gap-0.5">
                <span>₹{item.rate.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Meta & Manual Refresh */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Rates sourced automatically daily via live Forex feeds. Last update: <strong className="text-white">{updatedDate}</strong></span>
        </div>
        <button
          onClick={loadRates}
          disabled={loading}
          className="flex items-center gap-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-700 transition-all font-bold disabled:opacity-50"
          title="Refresh Exchange Rates"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-400' : ''}`} />
          <span>{loading ? 'Updating...' : 'Sync Rates'}</span>
        </button>
      </div>
    </div>
  );
};
