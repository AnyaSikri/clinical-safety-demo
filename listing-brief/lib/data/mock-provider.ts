import { DataProvider, PropertyData, Comp, NeighborhoodData, MarketData } from './types';

const MOCK_PROPERTIES: Record<string, PropertyData> = {
  '1547 Spruce Street, Berkeley, CA 94709': {
    address: '1547 Spruce Street, Berkeley, CA 94709',
    beds: 3,
    baths: 2.5,
    sqft: 1920,
    lotSqft: 4500,
    yearBuilt: 1923,
    propertyType: 'Craftsman single-family',
    lastSale: { date: 'June 2015', price: 1200000 },
    renovationYear: 2018,
  },
  '2347 Hillegass Avenue, Berkeley, CA 94704': {
    address: '2347 Hillegass Avenue, Berkeley, CA 94704',
    beds: 4,
    baths: 3,
    sqft: 2400,
    lotSqft: 5200,
    yearBuilt: 1912,
    propertyType: 'Victorian single-family',
    lastSale: { date: 'March 2017', price: 1450000 },
    renovationYear: 2020,
  },
};

const MOCK_COMPS: Record<string, Comp[]> = {
  '1547 Spruce Street, Berkeley, CA 94709': [
    {
      address: '1612 Spruce Street',
      beds: 3,
      baths: 2.5,
      sqft: 1850,
      saleDate: '22 days ago',
      salePrice: 1925000,
      distanceMi: 0.1,
      daysOnMarket: 12,
    },
    {
      address: '2104 Cedar Street',
      beds: 4,
      baths: 2,
      sqft: 2100,
      saleDate: '14 days ago',
      salePrice: 2050000,
      distanceMi: 0.3,
      daysOnMarket: 18,
      hadKitchenUpdate: true,
    },
    {
      address: '1428 Vine Street',
      beds: 3,
      baths: 2,
      sqft: 1775,
      saleDate: '38 days ago',
      salePrice: 1780000,
      distanceMi: 0.4,
      daysOnMarket: 24,
    },
  ],
  '2347 Hillegass Avenue, Berkeley, CA 94704': [
    {
      address: '2401 Hillegass Avenue',
      beds: 4,
      baths: 3,
      sqft: 2350,
      saleDate: '18 days ago',
      salePrice: 2280000,
      distanceMi: 0.1,
      daysOnMarket: 15,
    },
    {
      address: '1850 Parker Street',
      beds: 4,
      baths: 2.5,
      sqft: 2550,
      saleDate: '25 days ago',
      salePrice: 2420000,
      distanceMi: 0.2,
      daysOnMarket: 22,
      priceReduction: 30000,
    },
    {
      address: '2123 Dwight Way',
      beds: 3,
      baths: 2,
      sqft: 2200,
      saleDate: '42 days ago',
      salePrice: 2150000,
      distanceMi: 0.3,
      daysOnMarket: 28,
    },
  ],
};

const MOCK_NEIGHBORHOOD: Record<string, NeighborhoodData> = {
  '1547 Spruce Street, Berkeley, CA 94709': {
    schools: [
      {
        name: 'Cragmont Elementary',
        level: 'elementary',
        rating: 8,
        distanceMi: 0.3,
        trend: 'up',
      },
      {
        name: 'MLK Jr. Middle',
        level: 'middle',
        rating: 7,
        distanceMi: 0.8,
        trend: 'stable',
      },
      {
        name: 'Berkeley High',
        level: 'high',
        rating: 7,
        distanceMi: 1.1,
        trend: 'stable',
      },
    ],
    crime: {
      propertyCrimeYoyPct: -12,
      violentCrimeYoyPct: -8,
      vsCityAvg: 'below',
    },
    walkability: {
      walkScore: 82,
      bikeScore: 91,
      transitScore: 65,
    },
    environmental: {
      femaFloodZone: 'X',
      wildfireRisk: 'moderate',
      airQuality: 'good',
    },
  },
  '2347 Hillegass Avenue, Berkeley, CA 94704': {
    schools: [
      {
        name: 'Berkeley Arts Magnet',
        level: 'elementary',
        rating: 9,
        distanceMi: 0.4,
        trend: 'up',
      },
      {
        name: 'Willard Middle',
        level: 'middle',
        rating: 8,
        distanceMi: 0.6,
        trend: 'up',
      },
      {
        name: 'Berkeley High',
        level: 'high',
        rating: 7,
        distanceMi: 0.9,
        trend: 'stable',
      },
    ],
    crime: {
      propertyCrimeYoyPct: -8,
      violentCrimeYoyPct: -5,
      vsCityAvg: 'at',
    },
    walkability: {
      walkScore: 88,
      bikeScore: 95,
      transitScore: 72,
    },
    environmental: {
      femaFloodZone: 'X',
      wildfireRisk: 'low',
      airQuality: 'good',
    },
  },
};

const MOCK_MARKET: Record<string, MarketData> = {
  '1547 Spruce Street, Berkeley, CA 94709': {
    medianDom: 18,
    domTrend: -6,
    listToSale: 102,
    listToSaleTrend: 3,
    activeInventory: 12,
    inventoryDelta: -3,
    priceAppreciation90d: 2.4,
    cityPriceAppreciation90d: 1.8,
  },
  '2347 Hillegass Avenue, Berkeley, CA 94704': {
    medianDom: 22,
    domTrend: -4,
    listToSale: 100,
    listToSaleTrend: 1,
    activeInventory: 18,
    inventoryDelta: -2,
    priceAppreciation90d: 1.9,
    cityPriceAppreciation90d: 1.8,
  },
};

export class MockProvider implements DataProvider {
  async getProperty(address: string): Promise<PropertyData> {
    const property = MOCK_PROPERTIES[address];
    if (!property) {
      throw new Error(`No mock data for address: ${address}`);
    }
    return property;
  }

  async getComps(property: PropertyData): Promise<Comp[]> {
    const comps = MOCK_COMPS[property.address];
    if (!comps) {
      throw new Error(`No mock comps for address: ${property.address}`);
    }
    return comps;
  }

  async getNeighborhood(address: string): Promise<NeighborhoodData> {
    const neighborhood = MOCK_NEIGHBORHOOD[address];
    if (!neighborhood) {
      throw new Error(`No mock neighborhood data for address: ${address}`);
    }
    return neighborhood;
  }

  async getMarket(address: string): Promise<MarketData> {
    const market = MOCK_MARKET[address];
    if (!market) {
      throw new Error(`No mock market data for address: ${address}`);
    }
    return market;
  }

  getAvailableAddresses(): string[] {
    return Object.keys(MOCK_PROPERTIES);
  }
}
