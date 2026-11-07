# Personal Dashboard

A private, AI-powered personal finance and fitness dashboard built with Hermes AI, GitHub Copilot, and Next.js.

## ✨ Features

- 🏠 **Overview**: Net worth summary, monthly savings rate, fitness snapshot, and goals at a glance
- 💰 **Finances**: Assets, debts, spending analysis, budget tracking, and savings rate
- 🏃 **Fitness**: Weight trends, running history, lifting stats, step count, and macro tracking
- 🎯 **Goals**: Savings targets, investment milestones, fitness objectives, and personal goals
- 🤖 **AI Insights**: Hermes-powered monthly analysis and recommendations

## Tech Stack

- **Frontend**: Next.js 16+ + TypeScript + Tailwind CSS
- **UI Components**: shadcn/ui-inspired components
- **Visualization**: Recharts for charts and graphs
- **Icons**: Lucide React
- **Data**: Mock data generators (ready for real data sources)
- **AI Agent**: Hermes Agent with GitHub Copilot provider
- **Data Storage**: Local JSON/CSV exports (no credentials stored)

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- GitHub Copilot access (optional, for future Hermes integration)

### Installation

1. **Navigate to dashboard directory**
   ```bash
   cd dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Visit `http://localhost:3000`
   - You'll see the dashboard with mock data

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
personal-dashboard/
├── dashboard/                      # Next.js application
│   ├── src/
│   │   ├── app/                   # Next.js app router pages
│   │   │   ├── page.tsx           # Overview page
│   │   │   ├── finances/page.tsx  # Finances page
│   │   │   ├── fitness/page.tsx   # Fitness page
│   │   │   ├── goals/page.tsx     # Goals page
│   │   │   └── layout.tsx         # Root layout
│   │   ├── components/
│   │   │   ├── layout/            # Layout components (Header, Nav)
│   │   │   ├── ui/                # Reusable UI components (Card, MetricCard, ProgressBar)
│   │   │   └── charts/            # Chart components (Line, Bar, Pie charts)
│   │   ├── data/
│   │   │   └── mock/              # Mock data generators
│   │   ├── lib/                   # Utility functions (formatting, calculations)
│   │   ├── types/                 # TypeScript type definitions
│   │   └── app.css               # Global styles
│   └── package.json
├── data/                          # Data exports
│   ├── mock/                      # Sample mock data
│   └── private/                   # .gitignored - your real data goes here
├── integrations/                  # Future: Data source adapters
├── .env.example                   # Environment variable template
├── .gitignore
└── README.md                      # This file
```

## Dashboard Pages

### 1. **Overview** (`/`)
- Net worth snapshot (total assets - total debts)
- Monthly spending trend chart
- Budget status by category
- Top financial and fitness goals
- Key metrics: net worth, spending, weight, steps

### 2. **Finances** (`/finances`)
- Asset allocation pie chart
- Assets breakdown by type
- Debt summary with interest rates
- Spending by category stacked bar chart
- Budget status with remaining balance per category

### 3. **Fitness** (`/fitness`)
- Current weight with trend
- Average daily steps (last 30 days)
- Recent lifting sessions
- Weight trend line chart
- Daily steps bar chart
- Latest macro tracking data
- Running history

### 4. **Goals** (`/goals`)
- Goal progress tracking by category
- Financial goals, Fitness goals, Personal goals
- Priority-based filtering (high/medium/low)
- Days until target date
- Progress percentages
- Goal completion summary

## Mock Data

The dashboard uses TypeScript generators to create realistic mock data for:

- **Finances**: Assets (cash, savings, stocks, crypto, retirement, real estate), debts (mortgage, credit card), monthly spending, budget items
- **Fitness**: Daily weight, runs, lifting sessions, steps, macros
- **Goals**: Financial, fitness, and personal goals with targets and deadlines

### Using Mock Data

All pages use `useMemo` with generators to create consistent mock data during a session:

```typescript
const financeData = useMemo(() => generateMockFinanceData(), []);
```

## Connecting Real Data

When you're ready to add real data sources:

1. Create data import functions in `src/data/`
2. Update mock generators to load from `data/private/` files (not committed to git)
3. Replace generator calls with your data fetch functions
4. Update TypeScript types if your data schema differs

Example structure for real data:
```
data/
├── private/
│   ├── finances.json      # Your exported financial data
│   ├── fitness.json       # Your exported fitness data
│   └── goals.json         # Your goals
└── mock/                  # Keep mock generators for reference
```

## Hermes AI Integration (Future)

Once the dashboard is stable, use Hermes Agent with GitHub Copilot to enhance it:

1. **Install Hermes** (see original README)
2. **Ask Hermes to add features**:
   ```
   "Add a spending forecast based on historical trends. Show projected spending for next 3 months."
   ```
3. **Hermes uses Copilot** to generate code, create components, and commit changes

## Customization

### Adding a New Page

1. Create `src/app/new-page/page.tsx`
2. Use existing components from `components/ui/` and `components/charts/`
3. Import data generators or real data fetchers
4. Add navigation link in `components/layout/MainLayout.tsx`

### Styling

- Uses Tailwind CSS (configured in `tailwind.config.ts`)
- Responsive grid layouts with `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Color scheme: Blues, greens, reds, grays from Tailwind

### Adding Charts

Import from `components/charts/Charts.tsx`:
- `LineChartComponent` - Line chart (weight trends, spending)
- `BarChartComponent` - Bar chart (steps, macros)
- `PieChartComponent` - Pie chart (asset allocation)
- `StackedBarChart` - Stacked bar (budget vs spent)

## Environment Variables

Create `.env.local` with any needed variables (currently none required for mock data):

```bash
# .env.local (optional for future integrations)
# NEXT_PUBLIC_API_URL=https://api.example.com
```

## Performance Notes

- All pages use React `Suspense` for client-side rendering
- Mock data is generated fresh on each page visit
- Charts use `ResponsiveContainer` for mobile responsiveness
- Optimized production build with Turbopack

## Privacy & Security

⚠️ **Important**

- **Never commit** `.env`, `.env.local`, or `data/private/`
- **Never store** financial credentials or API tokens in code
- Use `.gitignore` to exclude sensitive files
- All data stays local until you explicitly export it
- Treat `data/private/` as local-only, never push to git

## Troubleshooting

### Build fails with "Math.random()" error
- Pages are wrapped with `Suspense` to handle dynamic mock data
- This is normal for client-side data generation

### Charts not rendering
- Ensure `recharts` is installed: `npm install recharts`
- Check that chart components are wrapped in `ResponsiveContainer`

### Styling looks broken
- Ensure Tailwind CSS is built: `npm run dev` should auto-build
- Check `globals.css` is imported in `layout.tsx`

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts Documentation](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Next Steps

1. ✅ Dashboard scaffolded with all 4 pages
2. ✅ Mock data generators ready
3. ✅ Recharts visualizations working
4. ⏳ Connect your first real data source
5. ⏳ Set up automatic data exports from Fidelity/banks
6. ⏳ Integrate with Hermes for AI insights

## License

Private project - for personal use only

---

**Built with ❤️ using Next.js + Tailwind CSS + Recharts**
