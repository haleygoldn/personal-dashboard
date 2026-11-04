// Fidelity API integration placeholder
// This adapter will handle reading Fidelity data
// Start with local JSON exports, then upgrade to API later

export interface FidelityAccount {
  accountId: string;
  accountType: string;
  balance: number;
  positions: FidelityPosition[];
}

export interface FidelityPosition {
  symbol: string;
  quantity: number;
  price: number;
  value: number;
  percentOfPortfolio: number;
}

export async function getFidelityData(exportPath: string): Promise<FidelityAccount[]> {
  // TODO: Implement reading from data/private/fidelity.json
  // For now, returns mock data
  return [];
}
