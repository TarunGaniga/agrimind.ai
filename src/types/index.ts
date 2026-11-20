/**
 * Type definitions for AgriMind AI
 */

export type SeasonType = 'Kharif' | 'Rabi' | 'Zaid';

export type SoilType = 'Black' | 'Alluvial' | 'Red' | 'Loamy' | 'Sandy';

export interface FarmingContext {
  season?: SeasonType | null;
  soil?: SoilType | null;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
  context?: FarmingContext;
  isError?: boolean;
}

export interface CropItem {
  id: string;
  name: string;
  hindiName: string;
  season: SeasonType;
  sowingMonths: string;
  harvestingMonths: string;
  soilSuitability: string;
  idealTemperature: string;
  rainfallWater: string;
  majorStates: string[];
  keyFertilizers: string;
  commonDiseases: string;
  typicalPriceRange: string;
  description: string;
  quickPrompt: string;
}

export type RootTabParamList = {
  AgriChat: {
    initialPrompt?: string;
    initialContext?: FarmingContext;
  } | undefined;
  CropSeasonReference: undefined;
};
