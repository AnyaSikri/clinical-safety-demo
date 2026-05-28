export interface PropertyData {
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  lotSqft: number;
  yearBuilt: number;
  propertyType: string;
  lastSale?: { date: string; price: number };
  renovationYear?: number;
}

export interface Comp {
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  saleDate: string;
  salePrice: number;
  distanceMi: number;
  daysOnMarket: number;
  priceReduction?: number;
  hadKitchenUpdate?: boolean;
}

export interface NeighborhoodData {
  schools: Array<{
    name: string;
    level: 'elementary' | 'middle' | 'high';
    rating: number;
    distanceMi: number;
    trend: 'up' | 'down' | 'stable';
  }>;
  crime: {
    propertyCrimeYoyPct: number;
    violentCrimeYoyPct: number;
    vsCityAvg: 'below' | 'at' | 'above';
  };
  walkability: {
    walkScore: number;
    bikeScore: number;
    transitScore: number;
  };
  environmental: {
    femaFloodZone: string;
    wildfireRisk: 'low' | 'moderate' | 'high';
    airQuality: 'good' | 'moderate' | 'poor';
  };
}

export interface MarketData {
  medianDom: number;
  domTrend: number; // change vs 90d ago
  listToSale: number; // ratio as percent (e.g. 102)
  listToSaleTrend: number;
  activeInventory: number;
  inventoryDelta: number;
  priceAppreciation90d: number;
  cityPriceAppreciation90d: number;
}

export interface DataProvider {
  getProperty(address: string): Promise<PropertyData>;
  getComps(property: PropertyData): Promise<Comp[]>;
  getNeighborhood(address: string): Promise<NeighborhoodData>;
  getMarket(address: string): Promise<MarketData>;
}
