# Personal Dashboard

A private, AI-powered personal finance and fitness dashboard built with Hermes AI, GitHub Copilot, and Next.js.

## Features

- 🏠 **Overview**: Net worth summary, monthly savings rate, fitness snapshot, and goals at a glance
- 💰 **Finances**: Assets, debts, spending analysis, budget tracking, and savings rate
- 🏃 **Fitness**: Weight trends, running history, lifting stats, step count, and macro tracking
- 🎯 **Goals**: Savings targets, investment milestones, fitness objectives, and personal goals
- 🤖 **AI Insights**: Hermes-powered monthly analysis and recommendations

## Tech Stack

- **Frontend**: Next.js + TypeScript + Tailwind CSS + shadcn/ui
- **Visualization**: Recharts
- **AI Agent**: Hermes Agent with GitHub Copilot provider
- **Data**: Local JSON/CSV exports (no direct API credentials stored)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- GitHub account with GitHub Copilot access
- Hermes Agent installed
- GitHub CLI (`gh`) authenticated

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/haleygoldn/personal-dashboard.git
   cd personal-dashboard
   ```

2. **Install Hermes Agent**
   ```bash
   hermes setup
   ```

3. **Install GitHub Copilot plugin for Hermes**
   ```bash
   hermes plugins install github-copilot
   hermes auth add copilot
   ```
   - Open the GitHub URL provided
   - Sign in with your personal GitHub account
   - Enter the device code

4. **Configure Hermes model provider**
   ```bash
   hermes model
   ```
   - Select "GitHub Copilot"

5. **Authenticate GitHub CLI** (if not already done)
   ```bash
   gh auth status
   gh auth login
   ```

6. **Set up environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your settings
   ```

7. **Install dependencies and run**
   ```bash
   npm install
   npm run dev
   ```

8. **Start Hermes** (from repo directory in another terminal)
   ```bash
   hermes
   ```

### Project Structure

```
personal-dashboard/
├── dashboard/          # Next.js pages and components
│   ├── pages/
│   ├── components/
│   └── styles/
├── data/              # Local data exports and mock data
│   ├── mock/
│   └── private/       # .gitignored - your real data goes here
├── integrations/      # Data source adapters
│   ├── fidelity/
│   ├── fitness/
│   └── bank/
├── .env.example       # Environment variable template
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## Data Sources

### Recommended Approach

🔒 **Start with local exports** - Keep credentials out of the repo

1. **Financial Data**: Export from Fidelity, bank as CSV/JSON
2. **Fitness Data**: Export from Apple Health or Strava
3. **Place in** `data/private/` (this folder is `.gitignored`)

### Future Integrations

Once the dashboard is working, you can add:

- Fidelity API (read-only) for live stock data
- Bank APIs for transaction sync
- Strava API for running metrics
- Apple HealthKit for health data
- Microsoft compensation/RSU tracking

## Using Hermes for Dashboard Updates

Once set up, you can ask Hermes to enhance the dashboard:

```
"Add a new page for investment tracking. Pull data from data/private/fidelity.json and show allocation breakdown, performance by sector, and year-to-date returns."
```

Hermes will use GitHub Copilot to generate code, create components, and commit changes.

## Privacy & Security

⚠️ **Important**

- **Never commit** `.env`, `.env.local`, or `data/private/`
- **Never store** financial credentials or API tokens in the repo
- Use `.gitignore` to exclude sensitive files
- Treat `data/private/` as local-only exports
- Review Hermes commits before pushing

## Getting Help

- [Hermes Documentation](https://github.com/DeltaGa/hermes-agent-docs)
- [Hermes GitHub Copilot Plugin](https://github.com/NousResearch/hermes-labs-plugins/tree/main/github-copilot)
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

## Next Steps

1. ✅ Repository created
2. ⏳ Install Hermes and Copilot provider
3. ⏳ Create sample mock data in `data/mock/`
4. ⏳ Have Hermes scaffold the Next.js dashboard
5. ⏳ Connect your first real data source
6. ⏳ Set up monthly AI insights generation

---

**Made with ❤️ and AI**
