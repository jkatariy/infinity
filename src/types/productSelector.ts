import type { ProductType as DBProductType, PackagingType as DBPackagingType, Machine as DBMachine } from './supabase';

// Re-export database types
export type { ProductType, PackagingType, Machine } from './supabase';

// Product specifications that user needs to provide
export interface ProductSpecifications {
  length: number;
  width: number;
  height: number;
  weight: number;
  specialRequirements?: string[];
}

// Production requirements that user needs to provide
export interface ProductionRequirements {
  speed: number; // units per minute
  floorSpace: number; // square meters
  utilities: {
    power?: string;
    air?: string;
    water?: string;
  };
  environmentalConditions?: {
    temperature?: string;
    humidity?: string;
    cleanRoom?: boolean;
  };
}

// Machine recommendation with compatibility score
export interface MachineRecommendation {
  machine: DBMachine;
  compatibilityScore: number;
  matchingFeatures: string[];
  missingFeatures: string[];
  priceEstimate: {
    min: number;
    max: number;
    currency: string;
  };
} 