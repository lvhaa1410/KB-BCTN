'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Building2, TrendingUp, BookOpen, ChevronRight, Filter, Briefcase,
  Monitor, ShoppingCart, CircleDollarSign, ShoppingBag, 
  Layers, Building, Zap, Factory
} from 'lucide-react';

const getSectorIcon = (sector: string, props: any) => {
  switch (sector) {
    case 'Technology': return <Monitor {...props} />;
    case 'Retail': return <ShoppingCart {...props} />;
    case 'Financials': return <CircleDollarSign {...props} />;
    case 'Consumer Goods': return <ShoppingBag {...props} />;
    case 'Materials': return <Layers {...props} />;
    case 'Real Estate': return <Building {...props} />;
    case 'Energy': return <Zap {...props} />;
    case 'Industrials': return <Factory {...props} />;
    default: return <Briefcase {...props} />;
  }
};
import Link from 'next/link';
import { mockCompanies, sectors } from '@/lib/mock-data';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [activeSection, setActiveSection] = useState<'company' | 'sector'>('company');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = 
      company.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === 'All' || company.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const filteredSectors = sectors.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <main className="min-h-screen flex flex-col items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="stars-bg"></div>
      <div className="horizon-layer"></div>

      <div className="w-full max-w-5xl z-30 flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-sm text-blue-400 mb-6 border-blue-500/30"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          AI-Powered Financial Intelligence
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-gradient">TC Eyes</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12"
        >
          Deep dive into 10+ years of Annual Reports from Vietnamese listed companies with agentic analysis and tabular data extraction.
        </motion.p>

        {/* Toggle Sections */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="glass-panel p-1 flex gap-1 rounded-2xl mb-8 border-white/5"
        >
          <button 
            onClick={() => setActiveSection('company')}
            className={`px-8 py-2.5 rounded-xl text-base font-bold transition-all duration-300 ${activeSection === 'company' ? 'bg-violet-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] border-t border-white/20 box-border' : 'text-slate-300 hover:text-white hover:bg-white/5 bg-slate-800/40 border border-transparent'}`}
          >
            Companies
          </button>
          <button 
            onClick={() => setActiveSection('sector')}
             className={`px-8 py-2.5 rounded-xl text-base font-bold transition-all duration-300 ${activeSection === 'sector' ? 'bg-violet-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] border-t border-white/20 box-border' : 'text-slate-300 hover:text-white hover:bg-white/5 bg-slate-800/40 border border-transparent'}`}
          >
            Sectors
          </button>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-3xl relative z-50"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl opacity-50" />
            <div className="relative glass-panel rounded-2xl flex items-center p-2 focus-within:border-blue-500/50 transition-colors border-white/10 bg-slate-900/60">
              <div className="pl-4 pr-2 text-slate-300">
                <Search className="w-6 h-6" />
              </div>
              <input
                type="text"
                placeholder={activeSection === 'company' ? "Search by company name, ticker (e.g., FPT, MWG)..." : "Search sectors..."}
                className="w-full bg-transparent border-none outline-none text-xl py-4 px-2 text-white placeholder:text-slate-400 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              />
              <div className="pr-2 flex gap-2">
              </div>
            </div>

            <AnimatePresence>
              {activeSection === 'company' && isSearchFocused && !searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-4 glass-panel p-6 z-50 flex flex-wrap gap-3 shadow-2xl"
                >
                  <div className="w-full text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-violet-500" /> Suggested Companies
                  </div>
                  {mockCompanies.slice(0, 6).map(company => (
                    <button
                      key={company.id}
                      onClick={() => setSearchQuery(company.ticker)}
                      className="px-5 py-2.5 rounded-full bg-slate-800/80 border border-slate-600 hover:bg-slate-700 hover:border-violet-500/50 hover:shadow-[0_0_10px_rgba(124,58,237,0.4)] hover:text-white text-base text-slate-200 font-medium transition-all duration-200 flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                      <span className="font-bold text-white">{company.ticker}</span>
                      <span className="text-slate-400 text-sm">| {company.sector}</span>
                    </button>
                  ))}
                </motion.div>
              )}

              {activeSection === 'sector' && isSearchFocused && !searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-4 glass-panel p-6 z-50 flex flex-wrap gap-3 shadow-2xl"
                >
                  <div className="w-full text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-violet-500" /> Suggested Sectors
                  </div>
                  {sectors.slice(0, 7).map(sector => (
                    <button
                      key={sector}
                      onClick={() => setSearchQuery(sector)}
                      className="px-5 py-2.5 rounded-full bg-slate-800/80 border border-slate-600 hover:bg-slate-700 hover:border-violet-500/50 hover:shadow-[0_0_10px_rgba(124,58,237,0.4)] hover:text-white text-base text-slate-200 font-medium transition-all duration-200 flex items-center gap-2"
                    >
                      {getSectorIcon(sector, { className: "w-5 h-5 text-violet-500" })}
                      {sector}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Results Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10"
      >
        {activeSection === 'company' ? (
          <>
            {filteredCompanies.map((company, index) => (
              <Link href={`/company/${company.ticker}`} key={company.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * (index % 10) }}
                  whileTap={{ scale: 0.98 }}
                  className="glass-panel glass-panel-hover hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:border-violet-700/50 active:scale-95 transition-all duration-300 p-6 h-full flex flex-col group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="text-2xl font-extrabold text-white group-hover:text-violet-400 transition-colors">{company.ticker}</h3>
                        <span className="text-sm font-mono text-slate-300 bg-slate-800 px-2.5 py-1 rounded-md">{company.exchange}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-violet-400 transition-colors transform group-hover:translate-x-1" />
                  </div>
                  
                  <p className="text-slate-200 text-base leading-relaxed mb-6 flex-grow line-clamp-2">
                    {company.name}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-2">
                      {getSectorIcon(company.sector, { className: "w-4 h-4" })}
                      {company.sector}
                    </span>

                  </div>
                </motion.div>
              </Link>
            ))}
            
            {filteredCompanies.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-300 font-medium text-lg">
                <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-70 text-slate-400" />
                <p>No companies found matching your criteria.</p>
              </div>
            )}
          </>
        ) : (
          <>
            {filteredSectors.map((sectorStr, index) => {
              const companyCount = mockCompanies.filter(c => c.sector === sectorStr).length;
              
              return (
                <Link href={`/sector/${encodeURIComponent(sectorStr.toLowerCase().replace(/\s+/g, '-'))}`} key={sectorStr}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * (index % 10) }}
                    whileTap={{ scale: 0.98 }}
                    className="glass-panel glass-panel-hover hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:border-violet-700/50 active:scale-95 transition-all duration-300 p-6 h-full flex flex-col group cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {getSectorIcon(sectorStr, { className: "w-6 h-6 text-violet-500" })}
                          <h3 className="text-2xl font-extrabold text-white group-hover:text-violet-400 transition-colors">{sectorStr}</h3>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-teal-400 transition-colors transform group-hover:translate-x-1" />
                    </div>
                    
                    <p className="text-slate-200 text-base leading-relaxed mb-6 flex-grow">
                      Explore detailed reports, filings, and trends for {companyCount} {companyCount === 1 ? 'company' : 'companies'} operating in the {sectorStr} sector.
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        {companyCount} {companyCount === 1 ? 'Company' : 'Companies'}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
            
            {filteredSectors.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-300 font-medium text-lg">
                <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-70 text-slate-400" />
                <p>No sectors found matching your criteria.</p>
              </div>
            )}
          </>
        )}
      </motion.div>
    </main>
  );
}
