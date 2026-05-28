export const COMP_ADJUSTMENT_PROMPT = `You are an experienced real estate appraiser performing CMA adjustments.

Subject property:
{subject}

Comparable sales:
{comps}

For each comp, analyze how it differs from the subject and recommend a dollar adjustment that, when applied to the comp's sale price, would estimate the subject's value.

Consider: sqft delta, bed/bath delta, condition (kitchen updates), lot size, distance, recency of sale, days on market.

Return JSON only, no preamble:
{
  "adjustments": [
    {
      "compAddress": "string",
      "similarityScore": number (0-100),
      "adjustmentDollars": number (positive or negative),
      "adjustedPrice": number,
      "reasoning": "one sentence, plain language, mentions specific factors"
    }
  ]
}`;

export const PRICING_PROMPT = `You are a listing agent recommending a price strategy.

Adjusted comp values:
{adjustments}

Market conditions:
{market}

Recommend a list price range and three pricing strategies (velocity, market, aspirational) with predicted days-on-market ranges for each.

Return JSON only:
{
  "rangeLow": number,
  "rangeHigh": number,
  "confidence": number (0-100),
  "strategies": {
    "velocity": { "price": number, "domMin": number, "domMax": number },
    "market": { "price": number, "domMin": number, "domMax": number },
    "aspirational": { "price": number, "domMin": number, "domMax": number }
  },
  "rationale": "two sentences max"
}`;

export const STRATEGY_PROMPT = `You are advising a listing agent on go-to-market strategy.

Property: {subject}
Comps: {comps}
Neighborhood: {neighborhood}
Market: {market}

Recommend listing strategy in four areas: target list date, staging priority, marketing emphasis, photography.

IMPORTANT: Do NOT include any demographic information, family-status references, or steering language ("good for families", "young professional area", etc). Focus only on factual property attributes and market conditions. This is a fair housing compliance requirement.

Return JSON only:
{
  "targetListDate": "string with date and reasoning",
  "stagingPriority": "string with specific recommendation and why",
  "marketingEmphasis": "string listing 2-3 features to emphasize",
  "photography": "string with specific recommendation"
}`;

export const RISK_PROMPT = `You are reviewing a CMA for risk factors a listing agent should be aware of.

Comps: {comps}
Market: {market}

Identify 1-3 risk factors. Examples: comps with price reductions, extended DOM, mortgage rate sensitivity, inventory shifts.

Return JSON only:
{
  "flags": [
    {
      "severity": "warning" | "info",
      "message": "one sentence flag"
    }
  ]
}`;

export const DESCRIPTION_PROMPT = `You are writing draft listing descriptions for an MLS.

Property: {subject}
Neighborhood facts: {neighborhood}
Marketing emphasis: {emphasis}

Write three versions of a listing description, each ~150 words, in three different voices: "lifestyle", "luxury", "factual".

IMPORTANT: Do NOT include demographic descriptions, family-status references, or neighborhood character claims tied to demographics. Stick to factual property attributes, neighborhood amenities, and objective features. Fair housing compliance is required.

Return JSON only:
{
  "lifestyle": "string ~150 words",
  "luxury": "string ~150 words",
  "factual": "string ~150 words"
}`;
