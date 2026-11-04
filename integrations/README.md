// README for integrations
# Integrations

This directory contains adapters for connecting to various data sources.

## Folder Structure

- **fidelity/** - Fidelity brokerage account integration
- **fitness/** - Fitness data (Apple Health, Strava, etc.)
- **bank/** - Banking and budgeting data

## Development Flow

1. Start with **local JSON/CSV exports** in `../data/private/`
2. Each integration reads from the appropriate file
3. Later, upgrade to API-based integrations (Plaid, Strava, etc.)

## Current Focus

Next.js + Hermes will help you scaffold:
- Data models and types
- Integration functions
- Error handling
- Data caching strategies
