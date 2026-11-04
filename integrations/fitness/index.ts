// Fitness data integration placeholder
// Supports Apple Health, Strava, and local exports

export interface FitnessEntry {
  date: string;
  type: 'run' | 'lift' | 'walk' | 'other';
  distance?: number;
  duration: number; // minutes
  calories?: number;
  heartRate?: number;
  notes?: string;
}

export interface FitnessStats {
  averageStepsPerDay: number;
  totalRunsThisWeek: number;
  totalDistanceThisWeek: number;
  currentWeight: number;
  weightGoal: number;
}

export async function getFitnessData(exportPath: string): Promise<FitnessEntry[]> {
  // TODO: Implement reading from data/private/fitness exports
  // Support Apple Health JSON, Strava CSV, Fitbit exports, etc.
  return [];
}
