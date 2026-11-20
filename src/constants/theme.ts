/**
 * AgriMind AI Theme Constants
 * Optimized for high-contrast outdoor readability in field sunlight.
 */

export const COLORS = {
  // Brand Core
  primary: '#1B5E20',       // Deep Forest Green
  primaryDark: '#0D3813',   // Ultra-deep green for headers & titles
  primaryLight: '#2E7D32',  // Vibrant Leaf Green
  primaryMuted: '#4CAF50',  // Mid-tone green

  // Backgrounds & Surfaces
  background: '#F8FAF8',    // Off-white, crisp daylight background
  surface: '#FFFFFF',       // Card & container surface
  surfaceSubtle: '#F1F8F1', // Very faint green tint for section blocks
  surfaceLeaf: '#E8F5E9',   // Soft Leaf Green accent

  // Typography (High-contrast for outdoor glare resistance)
  textPrimary: '#1A1A1A',   // High-contrast near-black
  textSecondary: '#374151', // Dark charcoal for subheadings and body
  textMuted: '#6B7280',     // Medium gray for captions & timestamps
  textLight: '#FFFFFF',     // Pure white for primary buttons & dark bubbles
  textGreen: '#1B5E20',     // Deep green brand text

  // Agricultural Accents
  amberHarvest: '#E65100',  // Sun/Harvest Amber for Mandi Price & Highlights
  amberLight: '#FFF8E1',    // Soft amber background for price tags
  soilBrown: '#5D4037',     // Rich Earth Brown
  soilLight: '#EFEBE9',     // Earthy light chip background

  // Functional & Status
  success: '#2E7D32',
  warning: '#F57F17',
  error: '#C62828',
  errorLight: '#FFEBEE',
  info: '#0277BD',
  infoLight: '#E1F5FE',

  // Borders & Dividers
  border: '#DCE7DC',
  borderLight: '#E8EFE8',
  borderFocus: '#1B5E20',

  // Chat Bubbles
  userBubble: '#1B5E20',
  userBubbleText: '#FFFFFF',
  aiBubble: '#FFFFFF',
  aiBubbleBorder: '#D0E3D0',
  aiBubbleText: '#1A1A1A',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const SHADOWS = {
  subtle: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  card: {
    shadowColor: '#0D3813',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  elevated: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
  },
};
