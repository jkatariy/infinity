/**
 * INFINITY AUTOMATED SOLUTIONS - BRAND THEME CONFIGURATION
 * 
 * This file contains the complete brand theme system to ensure consistency
 * across the entire website. All components should reference these values
 * instead of using hardcoded colors.
 * 
 * Brand Colors:
 * - Primary Blue: #0f4277 (Professional, Engineering)
 * - Primary Green: #5dc027 (Innovation, Growth)
 * 
 * Usage:
 * - Import BRAND_COLORS for color values
 * - Use Tailwind classes: bg-brand-blue-500, text-brand-green-500
 * - Reference theme utilities for consistent patterns
 * 
 * Last Updated: January 2025
 */
export const BRAND_COLORS = {
  // Primary Brand Colors
  primary: {
    blue: '#0f4277',      // Brand Blue (Professional, Engineering)
    green: '#5dc027',     // Brand Green (Innovation, Growth)
  },
  
  // Extended Brand Palette
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#0f4277',       // Brand Blue
    600: '#0c3966',
    700: '#092e54',
    800: '#062343',
    900: '#041832',
  },
  
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#5dc027',       // Brand Green
    600: '#52ad22',
    700: '#47991e',
    800: '#3c8619',
    900: '#317315',
  },
  
  // Supporting Colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Accent Colors for Categories
  accent: {
    indigo: '#4F46E5',
    cyan: '#0891B2',
    emerald: '#059669',
    purple: '#9333EA',
    sky: '#0EA5E9',
    red: '#DC2626',
  }
} as const;

// Engineering Theme Components
export const ENGINEERING_THEME = {
  cornerAccents: {
    border: `2px solid ${BRAND_COLORS.primary.blue}30`,
    hoverBorder: `2px solid ${BRAND_COLORS.primary.blue}50`,
  },
  
  accentLines: {
    primary: BRAND_COLORS.primary.blue,
    secondary: BRAND_COLORS.primary.green,
    gray: BRAND_COLORS.gray[200],
  },
  
  backgroundPatterns: {
    dots: `radial-gradient(circle, ${BRAND_COLORS.primary.blue} 1px, transparent 1px)`,
    grid: `linear-gradient(45deg, ${BRAND_COLORS.primary.blue}15 25%, transparent 25%), linear-gradient(-45deg, ${BRAND_COLORS.primary.blue}15 25%, transparent 25%)`,
  },
  
  animations: {
    hover: {
      scale: 1.02,
      duration: 0.2,
    },
    stagger: {
      duration: 0.1,
    },
  },
} as const;

// Typography System
export const TYPOGRAPHY = {
  fontFamily: "'Product Sans', sans-serif",
  
  headings: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: '600',
      lineHeight: '1.2',
      color: BRAND_COLORS.gray[900],
    },
    h2: {
      fontSize: '2rem',
      fontWeight: '600',
      lineHeight: '1.3',
      color: BRAND_COLORS.gray[900],
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: '600',
      lineHeight: '1.4',
      color: BRAND_COLORS.gray[900],
    },
  },
  
  body: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: BRAND_COLORS.gray[600],
  },
} as const;

// Component Spacing System
export const SPACING = {
  section: 'py-20',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  card: 'p-6 md:p-8',
  button: 'px-6 py-3',
  grid: {
    gap: 'gap-6 md:gap-8',
    cols: {
      1: 'grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'lg:grid-cols-3',
      4: 'xl:grid-cols-4',
    },
  },
} as const;

// Category Color Schemes (for product pages)
export const CATEGORY_COLORS = {
  'bundling-wrapping': {
    accent: BRAND_COLORS.accent.indigo,
    light: '#EEF2FF',
    medium: '#E0E7FF'
  },
  'pouch-baler': {
    accent: BRAND_COLORS.accent.cyan,
    light: '#ECFEFF',
    medium: '#CFFAFE'
  },
  'cartoning': {
    accent: BRAND_COLORS.accent.emerald,
    light: '#ECFDF5',
    medium: '#D1FAE5'
  },
  'case-packers': {
    accent: BRAND_COLORS.accent.purple,
    light: '#F3E8FF',
    medium: '#E9D5FF'
  },
  'checkweighers': {
    accent: BRAND_COLORS.accent.sky,
    light: '#F0F9FF',
    medium: '#E0F2FE'
  },
  'inspection': {
    accent: BRAND_COLORS.accent.red,
    light: '#FEF2F2',
    medium: '#FEE2E2'
  },
  'conveying': {
    accent: BRAND_COLORS.primary.blue,
    light: '#EFF6FF',
    medium: '#DBEAFE'
  }
} as const;

// Button Variants
export const BUTTON_VARIANTS = {
  primary: {
    bg: BRAND_COLORS.primary.blue,
    hover: BRAND_COLORS.blue[600],
    text: 'white',
    border: BRAND_COLORS.primary.blue,
  },
  secondary: {
    bg: BRAND_COLORS.primary.green,
    hover: BRAND_COLORS.green[600],
    text: 'white',
    border: BRAND_COLORS.primary.green,
  },
  outline: {
    bg: 'transparent',
    hover: BRAND_COLORS.gray[50],
    text: BRAND_COLORS.primary.blue,
    border: BRAND_COLORS.primary.blue,
  },
} as const;

// Utility Functions
export const getBrandColor = (color: 'blue' | 'green', shade: number = 500) => {
  return color === 'blue' ? BRAND_COLORS.blue[shade as keyof typeof BRAND_COLORS.blue] 
                          : BRAND_COLORS.green[shade as keyof typeof BRAND_COLORS.green];
};

export const getCategoryColors = (category: string) => {
  const key = category as keyof typeof CATEGORY_COLORS;
  return CATEGORY_COLORS[key] || CATEGORY_COLORS['bundling-wrapping'];
};

export const getEngineeringAccents = () => ({
  cornerClasses: 'absolute w-4 h-4 border-t-2 border-l-2 transition-colors duration-300',
  accentLineClasses: 'absolute top-0 left-0 w-full h-0.5 transition-colors duration-300',
  hoverEffects: 'group-hover:border-brand-blue-500 group-hover:bg-brand-blue-500',
}); 