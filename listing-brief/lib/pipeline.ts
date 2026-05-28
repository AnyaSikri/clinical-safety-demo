import { MockProvider } from './data/mock-provider';
import { PropertyData, Comp, NeighborhoodData, MarketData } from './data/types';
import { callClaude } from './claude';
import {
  COMP_ADJUSTMENT_PROMPT,
  PRICING_PROMPT,
  STRATEGY_PROMPT,
  RISK_PROMPT,
  DESCRIPTION_PROMPT,
} from './prompts';
import {
  CompAdjustmentSchema,
  PricingRecommendationSchema,
  ListingStrategySchema,
  RiskFlagsSchema,
  DescriptionsSchema,
  CompAdjustment,
  PricingRecommendation,
  ListingStrategy,
  RiskFlags,
  Descriptions,
} from './schemas';

export interface BriefResult {
  property: PropertyData;
  comps: Comp[];
  adjustments: CompAdjustment;
  pricing: PricingRecommendation;
  market: MarketData;
  neighborhood: NeighborhoodData;
  strategy: ListingStrategy;
  riskFlags: RiskFlags;
  descriptions: Descriptions;
}

function formatProperty(property: PropertyData): string {
  return JSON.stringify(property, null, 2);
}

function formatComps(comps: Comp[]): string {
  return JSON.stringify(comps, null, 2);
}

function formatNeighborhood(neighborhood: NeighborhoodData): string {
  return JSON.stringify(neighborhood, null, 2);
}

function formatMarket(market: MarketData): string {
  return JSON.stringify(market, null, 2);
}

export async function generateBrief(address: string): Promise<BriefResult> {
  const provider = new MockProvider();

  // Fetch all base data in parallel
  const [property, neighborhood, market] = await Promise.all([
    provider.getProperty(address),
    provider.getNeighborhood(address),
    provider.getMarket(address),
  ]);

  const comps = await provider.getComps(property);

  // Step 1: Comp adjustments
  const compAdjustmentPrompt = COMP_ADJUSTMENT_PROMPT.replace('{subject}', formatProperty(property)).replace(
    '{comps}',
    formatComps(comps)
  );

  const adjustments = await callClaude(compAdjustmentPrompt, CompAdjustmentSchema);

  // Run strategy and risk analysis in parallel
  const [strategy, riskFlags] = await Promise.all([
    callClaude(
      STRATEGY_PROMPT.replace('{subject}', formatProperty(property))
        .replace('{comps}', formatComps(comps))
        .replace('{neighborhood}', formatNeighborhood(neighborhood))
        .replace('{market}', formatMarket(market)),
      ListingStrategySchema
    ),
    callClaude(
      RISK_PROMPT.replace('{comps}', formatComps(comps)).replace('{market}', formatMarket(market)),
      RiskFlagsSchema
    ),
  ]);

  // Step 2: Pricing (depends on adjustments)
  const pricing = await callClaude(
    PRICING_PROMPT.replace('{adjustments}', JSON.stringify(adjustments, null, 2)).replace(
      '{market}',
      formatMarket(market)
    ),
    PricingRecommendationSchema
  );

  // Step 3: Descriptions (depends on strategy)
  const descriptions = await callClaude(
    DESCRIPTION_PROMPT.replace('{subject}', formatProperty(property))
      .replace('{neighborhood}', formatNeighborhood(neighborhood))
      .replace('{emphasis}', strategy.marketingEmphasis),
    DescriptionsSchema
  );

  return {
    property,
    comps,
    adjustments,
    pricing,
    market,
    neighborhood,
    strategy,
    riskFlags,
    descriptions,
  };
}
