import { FarmingContext } from '../types';
import { SupportedLanguage, LANGUAGES } from './translations';

/**
 * Exact Base System Instruction required for AgriMind AI
 */
export const AGRIMIND_SYSTEM_INSTRUCTION =
  'You are AgriMind, a standalone agricultural expert for Indian farming. Answer ONLY questions related to agriculture, crops, seasonal weather suitability, planting months, soil types, fertilizers, crop medicines/pesticides, irrigation, and typical Indian market (mandi) price ranges in ₹ per quintal. Politely refuse any non-farming questions. Structure every answer clearly with short bullet points covering: (1) Season & Sowing Months, (2) Fertilizers & Nutrients, (3) Pest/Disease Medicine (with a reminder to verify exact dosage at a local Krishi Vigyan Kendra), and (4) Typical Market Price Range. Do not ask for or collect personal user information.';

/**
 * Generates system instruction tailored with language instruction
 */
export function getSystemInstructionWithLanguage(lang: SupportedLanguage = 'en'): string {
  const langObj = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  if (lang === 'en') {
    return AGRIMIND_SYSTEM_INSTRUCTION;
  }

  return `${AGRIMIND_SYSTEM_INSTRUCTION}\n\nIMPORTANT LANGUAGE REQUIREMENT: You MUST answer the user entirely in ${langObj.name} (${langObj.nativeName}) script. Use authentic, farmer-friendly terminology and local agricultural phrasing so the answer is immediately clear to rural farmers.`;
}

/**
 * Formats the user question with manual context selectors (Season / Soil) and language preference.
 */
export function buildUserPromptWithContext(
  question: string,
  context?: FarmingContext | null,
  lang: SupportedLanguage = 'en'
): string {
  const contextParts: string[] = [];

  if (context?.season) {
    contextParts.push(`Season: ${context.season}`);
  }
  if (context?.soil) {
    contextParts.push(`Soil Type: ${context.soil}`);
  }

  const langObj = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
  if (lang !== 'en') {
    contextParts.push(`Respond in: ${langObj.name} (${langObj.nativeName})`);
  }

  if (contextParts.length > 0) {
    return `[Context: ${contextParts.join(' | ')}]\n\nFarmer Query: ${question.trim()}`;
  }

  return question.trim();
}
