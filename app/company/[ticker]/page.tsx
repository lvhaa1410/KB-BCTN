'use client';

import { useState, use } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, FileText, Calendar, MessageSquare, 
  TrendingUp, TrendingDown, AlertCircle, Sparkles,
  Download, Maximize2, Table as TableIcon, ChevronRight,
  Send, Bot
} from 'lucide-react';
import Link from 'next/link';
import { mockCompanies } from '@/lib/mock-data';

// Mock data for the report
const years = Array.from({ length: 10 }, (_, i) => 2023 - i);

const mockHighlights = [
  { type: 'positive', text: 'Revenue grew by 15% YoY, reaching record highs.' },
  { type: 'positive', text: 'Successfully expanded into 3 new international markets.' },
  { type: 'negative', text: 'Operating margins slightly compressed due to supply chain costs.' },
  { type: 'neutral', text: 'R&D spending maintained at 5% of total revenue.' }
];

const mockTables = [
  {
    title: 'Consolidated Income Statement (Summary)',
    headers: ['Indicator', '2023 (VND bn)', '2022 (VND bn)', 'YoY Change'],
    rows: [
      ['Net Revenue', '120,500', '104,800', '+15.0%'],
      ['Cost of Goods Sold', '85,200', '75,100', '+13.4%'],
      ['Gross Profit', '35,300', '29,700', '+18.8%'],
      ['Operating Expenses', '15,400', '12,800', '+20.3%'],
      ['Net Profit After Tax', '16,200', '14,100', '+14.9%']
    ]
  },
  {
    title: 'Key Operating Metrics',
    headers: ['Metric', '2023', '2022', 'Status'],
    rows: [
      ['Total Stores Active', '3,450', '3,120', 'Growing'],
      ['Active Customers (M)', '12.5', '10.8', 'Growing'],
      ['Average Order Value (VND)', '450,000', '420,000', 'Stable'],
      ['Employee Count', '45,000', '42,500', 'Growing']
    ]
  }
];

export default function CompanyPage({ params }: { params: Promise<{ ticker: string }> }) {
  const resolvedParams = use(params);
  const ticker = resolvedParams.ticker;
  const company = mockCompanies.find(c => c.ticker === ticker) || mockCompanies[0];
  
  const [selectedYears, setSelectedYears] = useState<number[]>([2023]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'tables'>('chat');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'agent', content: `Hello! I'm your AI analyst for ${company.ticker}'s ${selectedYears.join(' & ')} Annual Report(s). What would you like to know?` }
  ]);

  const handleYearToggle = (year: number) => {
    if (selectedYears.includes(year)) {
      if (selectedYears.length > 1) {
        setSelectedYears(selectedYears.filter(y => y !== year));
        setErrorMsg(null);
      }
      return;
    }

    if (selectedYears.length === 2) {
      setErrorMsg("Please unselect a year first. You can only compare up to 2 years.");
      return;
    }

    if (selectedYears.length === 1) {
      const diff = Math.abs(selectedYears[0] - year);
      if (diff === 1) {
        setSelectedYears([...selectedYears, year].sort((a, b) => b - a)); // Keep sorted descending
        setErrorMsg(null);
      } else {
        setErrorMsg("You can only select two consecutive years.");
      }
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setChatHistory([...chatHistory, { role: 'user', content: chatInput }]);
    setChatInput('');
    
    // Mock agent response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: 'agent', 
        content: `Based on the ${selectedYears.join(' and ')} report(s), I can see that ${company.ticker} focused heavily on digital transformation. The specific details regarding your query are mentioned on page 42 of the management discussion.` 
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col overflow-hidden relative z-10">
      {/* Background decorative elements */}
      <div className="stars-bg"></div>
      <div className="horizon-layer"></div>
      {/* Top Navigation Bar */}
      <header className="h-20 border-b border-white/10 glass-panel rounded-none flex items-center px-6 shrink-0 z-20 sticky top-0">
        <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors mr-6">
          <ArrowLeft className="w-6 h-6" />
          <span className="text-base font-medium">Back to Search</span>
        </Link>
        
        <div className="flex items-center gap-4 border-l border-white/10 pl-6">
          <div>
            <h1 className="text-2xl font-semibold text-white leading-tight tracking-tight">{company.ticker}</h1>
            <p className="text-sm font-medium text-slate-300 uppercase tracking-widest">{company.name}</p>
          </div>
        </div>
        
        <div className="ml-auto flex items-center gap-3">
          <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
            {company.sector}
          </span>
          <button className="p-2.5 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            <Download className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel: Years Navigation (Narrow) */}
        <aside className="w-24 lg:w-72 border-r border-white/10 glass-panel rounded-none flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
          <div className="p-6 hidden lg:block">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-[0.2em] mb-4">Annual Reports</h2>
          </div>
          <div className="flex flex-col gap-2 p-2 lg:p-4 pt-4 lg:pt-0">
            {years.map(year => (
              <button
                key={year}
                onClick={() => handleYearToggle(year)}
                className={`flex items-center justify-center lg:justify-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                  selectedYears.includes(year) 
                    ? 'bg-violet-600 text-white shadow-[0_4px_15px_rgba(124,58,237,0.5)] border-t border-white/20' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <Calendar className="w-6 h-6 shrink-0" />
                <span className="font-medium text-lg hidden lg:block">{year} Report</span>
                {selectedYears.includes(year) && <ChevronRight className="w-5 h-5 ml-auto hidden lg:block text-white/50" />}
              </button>
            ))}
          </div>
          {errorMsg && (
            <div className="p-4 mx-4 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium">
              {errorMsg}
            </div>
          )}
        </aside>

        {/* Middle Panel: Document Viewer & Tables (Wide) */}
        <main className="flex-1 flex flex-col min-w-0 border-r border-white/10 relative">
          {/* View Toggle */}
          <div className="h-16 border-b border-white/10 flex items-center px-4 gap-3 shrink-0 bg-slate-900/50">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-base font-medium transition-all duration-300 ${
                activeTab === 'chat' ? 'bg-white/15 text-white shadow-lg' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              AI Chat Analysis
            </button>
            <button 
              onClick={() => setActiveTab('tables')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-base font-medium transition-all duration-300 ${
                activeTab === 'tables' ? 'bg-white/15 text-white shadow-lg' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <TableIcon className="w-5 h-5" />
              Extracted Data & Tables
            </button>
            <div className="ml-auto">
              <button className="p-2.5 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Viewer Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-[#070314]/50 backdrop-blur-md">
            <AnimatePresence mode="wait">
              {activeTab === 'chat' ? (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-4xl mx-auto h-full flex flex-col pt-8"
                >
                  <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                    {chatHistory.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-5 rounded-2xl text-[1.1rem] leading-relaxed font-medium shadow-md ${
                          msg.role === 'user' 
                            ? 'bg-violet-600 text-white rounded-tr-sm' 
                            : 'bg-slate-800/80 text-slate-100 border border-white/10 rounded-tl-sm'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6">
                    <form onSubmit={handleSendMessage} className="relative">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask AI for detailed analysis about the selected reports..."
                        className="w-full bg-slate-900 border-2 border-slate-700 rounded-3xl py-4 pl-6 pr-14 text-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition-all shadow-inner"
                      />
                      <button 
                        type="submit"
                        disabled={!chatInput.trim()}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-violet-600 text-white rounded-2xl disabled:bg-slate-700 disabled:text-slate-500 transition-all hover:scale-105 active:scale-95"
                      >
                        <Send className="w-6 h-6" />
                      </button>
                    </form>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="tables"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-5xl mx-auto space-y-8"
                >
                  <div className="glass-panel p-8 border-violet-500/20 bg-violet-500/5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                    <h3 className="text-xl font-semibold text-violet-400 mb-6 flex items-center gap-3">
                      <Sparkles className="w-6 h-6" />
                      Key Attributes
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/10">
                        <div className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Total Revenue</div>
                        <div className="text-2xl font-semibold text-white">120.5T VND</div>
                      </div>
                      <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/10">
                        <div className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Net Profit</div>
                        <div className="text-2xl font-semibold text-green-400">16.2T VND</div>
                      </div>
                      <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/10">
                        <div className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Branches/Stores</div>
                        <div className="text-2xl font-semibold text-white">3,450</div>
                      </div>
                      <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/10">
                        <div className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Total Employees</div>
                        <div className="text-2xl font-semibold text-white">45,000</div>
                      </div>
                    </div>
                  </div>

                  {mockTables.map((table, idx) => (
                    <div key={idx} className="glass-panel overflow-hidden border-white/10 shadow-xl">
                      <div className="px-8 py-5 border-b border-white/10 bg-slate-900/50">
                        <h3 className="text-lg font-medium text-white tracking-tight">{table.title}</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-base text-left">
                          <thead className="text-sm text-slate-300 font-semibold uppercase bg-slate-900/80 border-b border-white/10 tracking-widest">
                            <tr>
                              {table.headers.map((header, i) => (
                                <th key={i} className="px-8 py-5">{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {table.rows.map((row, i) => (
                              <tr key={i} className="hover:bg-white/5 transition-colors group">
                                {row.map((cell, j) => (
                                  <td key={j} className={`px-8 py-5 ${j === 0 ? 'font-bold text-slate-100' : 'text-slate-300 font-medium'}`}>
                                    {cell.includes('+') ? <span className="text-green-400 font-bold">{cell}</span> : 
                                     cell.includes('-') ? <span className="text-red-400 font-bold">{cell}</span> : cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
