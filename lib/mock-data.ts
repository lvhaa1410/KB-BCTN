export interface Company {
  id: string;
  ticker: string;
  name: string;
  sector: string;
  subSector: string;
  exchange: string;
  logoUrl?: string;
}

export const mockCompanies: Company[] = [
  { id: '1', ticker: 'FPT', name: 'FPT Corporation', sector: 'Technology', subSector: 'Software & IT Services', exchange: 'HOSE' },
  { id: '2', ticker: 'MWG', name: 'Mobile World Investment Corporation', sector: 'Retail', subSector: 'Electronics Retail', exchange: 'HOSE' },
  { id: '3', ticker: 'VCB', name: 'Joint Stock Commercial Bank for Foreign Trade of Vietnam', sector: 'Financials', subSector: 'Banks', exchange: 'HOSE' },
  { id: '4', ticker: 'VNM', name: 'Vietnam Dairy Products Joint Stock Company', sector: 'Consumer Goods', subSector: 'Food & Beverage', exchange: 'HOSE' },
  { id: '5', ticker: 'HPG', name: 'Hoa Phat Group Joint Stock Company', sector: 'Materials', subSector: 'Steel', exchange: 'HOSE' },
  { id: '6', ticker: 'VIC', name: 'Vingroup Joint Stock Company', sector: 'Real Estate', subSector: 'Real Estate Development', exchange: 'HOSE' },
  { id: '7', ticker: 'VHM', name: 'Vinhomes Joint Stock Company', sector: 'Real Estate', subSector: 'Real Estate Development', exchange: 'HOSE' },
  { id: '8', ticker: 'GAS', name: 'Petrovietnam Gas Joint Stock Corporation', sector: 'Energy', subSector: 'Oil & Gas', exchange: 'HOSE' },
  { id: '9', ticker: 'BID', name: 'Joint Stock Commercial Bank for Investment and Development of Vietnam', sector: 'Financials', subSector: 'Banks', exchange: 'HOSE' },
  { id: '10', ticker: 'CTG', name: 'Vietnam Joint Stock Commercial Bank for Industry and Trade', sector: 'Financials', subSector: 'Banks', exchange: 'HOSE' },
  { id: '11', ticker: 'PNJ', name: 'Phu Nhuan Jewelry Joint Stock Company', sector: 'Retail', subSector: 'Specialty Retail', exchange: 'HOSE' },
  { id: '12', ticker: 'REE', name: 'Refrigeration Electrical Engineering Corporation', sector: 'Industrials', subSector: 'Industrial Conglomerates', exchange: 'HOSE' },
];

export const sectors = Array.from(new Set(mockCompanies.map(c => c.sector)));
export const subSectors = Array.from(new Set(mockCompanies.map(c => c.subSector)));
