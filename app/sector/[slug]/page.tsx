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
import { mockCompanies, sectors } from '@/lib/mock-data';

// Mock data for the report
const years = Array.from({ length: 10 }, (_, i) => 2023 - i);

const mockHighlights = [
  { type: 'positive', text: 'Aggregate sector revenue grew by 12% YoY, indicating strong industry momentum.' },
  { type: 'positive', text: 'Significant capital inflow to top-tier companies in this segment.' },
  { type: 'negative', text: 'Sector-wide operating margins slightly compressed due to rising input costs.' },
  { type: 'neutral', text: 'Average R&D spending maintained at 4% of total sector revenue.' }
];

const mockTables = [
  {
    title: 'Aggregated Sector Income (Summary)',
    headers: ['Indicator', '2023 (VND bn)', '2022 (VND bn)', 'YoY Change'],
    rows: [
      ['Total Net Revenue', '452,500', '404,800', '+11.8%'],
      ['Total Cost of Goods', '315,200', '285,100', '+10.5%'],
      ['Gross Profit', '137,300', '119,700', '+14.7%'],
      ['Operating Expenses', '55,400', '48,800', '+13.5%'],
      ['Net Profit After Tax', '61,200', '54,100', '+13.1%']
    ]
  },
  {
    title: 'Sector Performance Metrics',
    headers: ['Metric', '2023', '2022', 'Status'],
    rows: [
      ['Total Active Companies', '125', '118', 'Growing'],
      ['Total Employment', '345,000', '332,500', 'Growing'],
      ['Average PE Ratio', '14.5x', '13.2x', 'Expanded'],
      ['Average Profit Margin', '13.5%', '13.3%', 'Stable']
    ]
  }
];

export default function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const sectorSlug = resolvedParams.slug;
  const sectorStr = sectors.find(s => encodeURIComponent(s.toLowerCase().replace(/\s+/g, '-')) === sectorSlug) || sectors[0];
  const sectorCompanies = mockCompanies.filter(c => c.sector === sectorStr);
  
  const [selectedYear, setSelectedYear] = useState(2023);
  const [activeTab, setActiveTab] = useState<'document' | 'tables'>('document');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'agent', content: `Hello! I'm your AI analyst for the ${sectorStr} sector's ${selectedYear} Aggregated Report. What would you like to know?` }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setChatHistory([...chatHistory, { role: 'user', content: chatInput }]);
    setChatInput('');
    
    // Mock agent response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: 'agent', 
        content: `Based on the ${selectedYear} aggregated sector data, the ${sectorStr} industry heavily prioritized scalability. The specific details regarding your query are summarized on page 12 of the industry macroeconomic factors section.` 
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
          <span className="text-base font-bold">Quay lại tìm kiếm</span>
        </Link>
        
        <div className="flex items-center gap-4 border-l border-white/10 pl-6">
          <div>
            <h1 className="text-2xl font-extrabold text-white leading-tight tracking-tight">{sectorStr}</h1>
            <p className="text-sm font-medium text-slate-300 uppercase tracking-widest">{sectorCompanies.length} Công ty niêm yết</p>
          </div>
        </div>
        
        <div className="ml-auto flex items-center gap-3">
          <span className="text-sm font-bold px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/30">
            Tổng quan ngành
          </span>
          <button className="p-2.5 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            <Download className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative z-20">
        
        {/* Left Panel: Years Navigation (Narrow) */}
        <aside className="w-24 lg:w-72 border-r border-white/10 glass-panel rounded-none flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
          <div className="p-6 hidden lg:block">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Báo cáo ngành</h2>
          </div>
          <div className="flex flex-col gap-2 p-2 lg:p-4 pt-4 lg:pt-0">
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`flex items-center justify-center lg:justify-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                  selectedYear === year 
                    ? 'bg-violet-600 text-white shadow-[0_4px_15px_rgba(124,58,237,0.5)] border-t border-white/20' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <Calendar className="w-6 h-6 shrink-0" />
                <span className="font-bold text-lg hidden lg:block">Báo cáo {year}</span>
                {selectedYear === year && <ChevronRight className="w-5 h-5 ml-auto hidden lg:block text-white/50" />}
              </button>
            ))}
          </div>
        </aside>

        {/* Middle Panel: Document Viewer & Tables (Wide) */}
        <main className="flex-1 flex flex-col min-w-0 border-r border-white/10 relative">
          {/* View Toggle */}
          <div className="h-16 border-b border-white/10 flex items-center px-4 gap-3 shrink-0 bg-slate-900/50">
            <button 
              onClick={() => setActiveTab('document')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-base font-bold transition-all duration-300 ${
                activeTab === 'document' ? 'bg-white/15 text-white shadow-lg' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-5 h-5" />
              Tài liệu tổng hợp
            </button>
            <button 
              onClick={() => setActiveTab('tables')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-base font-bold transition-all duration-300 ${
                activeTab === 'tables' ? 'bg-white/15 text-white shadow-lg' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <TableIcon className="w-5 h-5" />
              Dữ liệu & Bảng biểu
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
              {activeTab === 'document' ? (
                <motion.div
                  key="document"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-4xl mx-auto"
                >
                  {/* Mock PDF Viewer */}
                  <div className="aspect-[1/1.4] w-full bg-slate-100 rounded-lg shadow-2xl overflow-hidden relative">
                    <div className="absolute inset-0 p-12 text-slate-800 flex flex-col">
                      <div className="text-center mb-16">
                        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">{sectorStr} Sector</h1>
                        <h2 className="text-2xl font-serif text-slate-600">Aggregated Industry Report {selectedYear}</h2>
                      </div>
                      
                      <div className="space-y-6 text-sm leading-relaxed font-serif text-slate-700 flex-1">
                        <p>
                          <strong>Macroeconomic Overview</strong><br/><br/>
                          Dear Stakeholders,<br/><br/>
                          The year {selectedYear} marked a significant milestone for the {sectorStr} sector as our constituent companies navigated through a complex global economic landscape. Despite the headwinds, aggregate business resilience and dedicated workforces across the industry enabled us to deliver strong collective outcomes.
                        </p>
                        <p>
                          The sector's strategic focus on modernization and sustainable structural growth has yielded positive macro-level trends. We have seen widespread adoption of improved operational efficiencies, positioning the entirety of the {sectorStr} market well for future investment opportunities.
                        </p>
                        <div className="w-full h-48 bg-slate-200 rounded-md flex items-center justify-center text-slate-400 border border-slate-300 mt-8">
                          [Sector Growth Chart Placeholder]
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-8 border-t border-slate-300 text-center text-xs text-slate-500">
                        Page 1 of 65
                      </div>
                    </div>
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
                    <h3 className="text-xl font-black text-violet-400 mb-6 flex items-center gap-3">
                      <Sparkles className="w-6 h-6" />
                      Thuộc tính ngành then chốt
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/10">
                        <div className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Mục tiêu doanh thu ngành</div>
                        <div className="text-2xl font-black text-white">~ 480T VND</div>
                      </div>
                      <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/10">
                        <div className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Lợi nhuận toàn ngành</div>
                        <div className="text-2xl font-black text-green-400">61.2T VND</div>
                      </div>
                      <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/10">
                        <div className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Số đơn vị theo dõi</div>
                        <div className="text-2xl font-black text-white">{sectorCompanies.length}</div>
                      </div>
                      <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/10">
                        <div className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">P/E trung bình</div>
                        <div className="text-2xl font-black text-white">14.5x</div>
                      </div>
                    </div>
                  </div>

                  {mockTables.map((table, idx) => (
                    <div key={idx} className="glass-panel overflow-hidden border-white/10 shadow-xl">
                      <div className="px-8 py-5 border-b border-white/10 bg-slate-900/50">
                        <h3 className="text-lg font-bold text-white tracking-tight">{table.title}</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-base text-left">
                          <thead className="text-sm text-slate-300 font-black uppercase bg-slate-900/80 border-b border-white/10 tracking-widest">
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

        {/* Right Panel: Agentic Analysis (Fixed Width) */}
        <aside className="w-[420px] glass-panel rounded-none flex flex-col shrink-0 border-l-0">
          <div className="h-20 border-b border-white/10 flex items-center px-6 gap-3 shrink-0 bg-slate-900/50">
            <Bot className="w-6 h-6 text-violet-500" />
            <h2 className="text-lg font-black text-white uppercase tracking-wider">Phân tích AI</h2>
            <span className="ml-auto text-xs font-bold px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30 animate-pulse">Trực tiếp</span>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
            
            {/* Executive Summary */}
            <section>
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" /> Tóm tắt điều hành
              </h3>
              <div className="text-lg text-slate-200 leading-relaxed bg-violet-500/5 p-6 rounded-2xl border border-violet-500/20 shadow-lg italic">
                Trong năm {selectedYear}, ngành {sectorStr} đã thể hiện sự tăng trưởng mạnh mẽ bất chấp những thách thức kinh tế vĩ mô. Thị trường chung đã thực hiện thành công các kế hoạch mở rộng chiến lược rộng rải, dẫn đến mức tăng doanh thu 11.8% so với cùng kỳ năm ngoái trên các đơn vị được theo dõi.
              </div>
            </section>

            {/* Highlights & Lowlights */}
            <section>
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> Thông tin chi tiết
              </h3>
              <div className="space-y-3">
                {mockHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 shadow-sm transition-hover hover:bg-white/10">
                    {highlight.type === 'positive' ? (
                      <TrendingUp className="w-6 h-6 text-green-400 shrink-0" />
                    ) : highlight.type === 'negative' ? (
                      <TrendingDown className="w-6 h-6 text-red-400 shrink-0" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-slate-500 shrink-0" />
                    )}
                    <span className="text-base font-bold text-slate-100">{highlight.text}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Chat Interface */}
          <div className="h-[45%] border-t border-white/10 flex flex-col bg-slate-900/40">
            <div className="p-4 border-b border-white/5 bg-slate-900/60 flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-violet-500" />
              <h3 className="text-sm font-black text-slate-300 uppercase tracking-widest">Hỏi AI về ngành này</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-5">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] p-4 rounded-2xl text-base font-bold shadow-md ${
                    msg.role === 'user' 
                      ? 'bg-violet-600 text-white rounded-tr-sm' 
                      : 'bg-slate-800/80 text-slate-100 border border-white/10 rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
 
            <div className="p-6 bg-slate-950/80 border-t border-white/10">
              <form onSubmit={handleSendMessage} className="relative">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Hỏi AI phân tích chi tiết..."
                  className="w-full bg-slate-900 border-2 border-slate-700 rounded-2xl py-4 pl-6 pr-14 text-base text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition-all shadow-inner"
                />
                <button 
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-violet-600 text-white rounded-xl disabled:bg-slate-700 disabled:text-slate-500 transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
