# Quick Start Guide

## Prerequisites

You need an Anthropic API key to run this app. Get one at: https://console.anthropic.com/

## Setup Steps

1. **Navigate to the listing-brief directory:**
   ```bash
   cd listing-brief
   ```

2. **Create a `.env.local` file:**
   ```bash
   cp .env.local.example .env.local
   ```

3. **Add your Anthropic API key to `.env.local`:**
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Testing the App

1. On the landing page, you'll see two demo addresses:
   - 1547 Spruce Street, Berkeley, CA 94709
   - 2347 Hillegass Avenue, Berkeley, CA 94704

2. Click one of the demo addresses (or enter it manually)

3. Click "Generate brief"

4. Wait 20-30 seconds while the app:
   - Fetches mock property data
   - Runs 5 Claude API calls to analyze comps, generate pricing, strategy, risks, and descriptions
   - Renders the complete brief

## What to Expect

The generated brief includes:
- **Property Summary** - beds, baths, sqft, lot size, year built
- **Pricing Recommendation** - price range with velocity/market/aspirational strategies
- **Comparable Sales** - 3 comps with AI-generated adjustment reasoning
- **Market Velocity** - DOM, list-to-sale ratio, inventory, price appreciation
- **Neighborhood Intelligence** - schools, crime, walkability, environmental data
- **Listing Strategy** - target list date, staging priority, marketing emphasis, photography
- **Risk Flags** - warnings about market conditions or comp patterns
- **Draft Description** - lifestyle voice listing copy

## Design Notes

The UI matches the provided mockup with:
- Off-white background (#FAF9F6)
- Sage/teal accent color for positive metrics
- Amber for warnings
- Clean card-based layout
- Professional, sentence-case typography
- Lucide React icons (no emoji)

## Next Steps

- Deploy to Vercel: `vercel deploy`
- Add PDF export functionality
- Integrate real property data APIs
- Add address autocomplete with Google Places

## Troubleshooting

**Build errors:** Run `npm run build` to check for TypeScript errors

**API errors:** Ensure your `.env.local` has a valid `ANTHROPIC_API_KEY`

**No data for address:** Currently only the two demo addresses have mock data. Any other address will throw an error.
