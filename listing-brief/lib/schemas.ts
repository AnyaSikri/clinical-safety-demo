import { z } from 'zod';

export const CompAdjustmentSchema = z.object({
  adjustments: z.array(
    z.object({
      compAddress: z.string(),
      similarityScore: z.number().min(0).max(100),
      adjustmentDollars: z.number(),
      adjustedPrice: z.number(),
      reasoning: z.string(),
    })
  ),
});

export const PricingRecommendationSchema = z.object({
  rangeLow: z.number(),
  rangeHigh: z.number(),
  confidence: z.number().min(0).max(100),
  strategies: z.object({
    velocity: z.object({
      price: z.number(),
      domMin: z.number(),
      domMax: z.number(),
    }),
    market: z.object({
      price: z.number(),
      domMin: z.number(),
      domMax: z.number(),
    }),
    aspirational: z.object({
      price: z.number(),
      domMin: z.number(),
      domMax: z.number(),
    }),
  }),
  rationale: z.string(),
});

export const ListingStrategySchema = z.object({
  targetListDate: z.string(),
  stagingPriority: z.string(),
  marketingEmphasis: z.string(),
  photography: z.string(),
});

export const RiskFlagsSchema = z.object({
  flags: z.array(
    z.object({
      severity: z.enum(['warning', 'info']),
      message: z.string(),
    })
  ),
});

export const DescriptionsSchema = z.object({
  lifestyle: z.string(),
  luxury: z.string(),
  factual: z.string(),
});

export type CompAdjustment = z.infer<typeof CompAdjustmentSchema>;
export type PricingRecommendation = z.infer<typeof PricingRecommendationSchema>;
export type ListingStrategy = z.infer<typeof ListingStrategySchema>;
export type RiskFlags = z.infer<typeof RiskFlagsSchema>;
export type Descriptions = z.infer<typeof DescriptionsSchema>;
