# Listing Intelligence Brief Generator

A real estate tool that generates polished one-page listing intelligence briefs for property addresses. Pulls comps, neighborhood data, and market signals, then uses Claude API to synthesize pricing recommendations, listing strategies, and draft listing copy.

## Tech Stack

- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS** for styling
- **Anthropic SDK** (`@anthropic-ai/sdk`) for Claude API calls
- **Zod** for schema validation between LLM steps
- Deploy target: **Vercel**

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with your Anthropic API key:
```bash
ANTHROPIC_API_KEY=sk-ant-...
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
listing-brief/
├── app/
│   ├── page.tsx                    # Address input landing page
│   ├── brief/[address]/page.tsx    # Generated report page
│   ├── api/
│   │   └── generate/route.ts       # Main endpoint that orchestrates the pipeline
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   ├── claude.ts                   # Anthropic SDK wrapper
│   ├── prompts.ts                  # All LLM prompts (one per chain step)
│   ├── schemas.ts                  # Zod schemas for each LLM step's JSON output
│   ├── data/
│   │   ├── types.ts                # PropertyData, Comp, NeighborhoodData types
│   │   └── mock-provider.ts        # Mock data for MVP
│   └── pipeline.ts                 # Orchestrates the prompt chain
├── components/
│   ├── PropertySummary.tsx
│   ├── PricingHero.tsx
│   ├── CompCard.tsx
│   ├── MarketVelocity.tsx
│   ├── NeighborhoodCards.tsx
│   ├── ListingStrategy.tsx
│   ├── RiskFlags.tsx
│   └── DraftDescription.tsx
```

## How It Works

The app uses a 5-step Claude API prompt chain:

1. **Comp adjustment analysis** - Analyzes how each comp differs from the subject property
2. **Pricing recommendation** - Recommends a price range and three strategies (velocity, market, aspirational)
3. **Listing strategy synthesis** - Advises on list date, staging, marketing, photography
4. **Risk flags** - Identifies risk factors to be aware of
5. **Listing descriptions** - Generates three draft descriptions in different voices

All LLM outputs are validated with Zod schemas. The pipeline runs steps in parallel where possible to minimize latency.

## Demo Addresses

The MVP includes mock data for two Bay Area properties:
- 1547 Spruce Street, Berkeley, CA 94709
- 2347 Hillegass Avenue, Berkeley, CA 94704

## MVP Completion Checklist

- [x] Next.js 15 app with TypeScript and Tailwind
- [x] Data types and mock provider
- [x] Claude API wrapper with Zod validation
- [x] 5-step prompt chain (comps, pricing, strategy, risk, descriptions)
- [x] Pipeline orchestration with parallel execution
- [x] Landing page with demo addresses
- [x] Brief page matching mockup design
- [x] All UI components (PropertySummary, PricingHero, CompCard, etc.)
- [ ] Test full flow end-to-end
- [ ] Deploy to Vercel

## Future Enhancements (v2)

- Real comp scraping (Playwright/Redfin/Zillow)
- Real school/crime/walkability API integrations
- PDF export
- Photo analysis
- Save/library functionality
- Multi-user auth
- Address autocomplete with Google Places API
