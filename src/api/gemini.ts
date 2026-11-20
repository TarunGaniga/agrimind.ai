import {
  AGRIMIND_SYSTEM_INSTRUCTION,
  getSystemInstructionWithLanguage,
  buildUserPromptWithContext,
} from '../constants/systemPrompt';
import { FarmingContext } from '../types';
import { SupportedLanguage } from '../constants/translations';

/**
 * Direct Gemini API Service for AgriMind AI
 * Supports Kannada, Telugu, Tamil, Malayalam, Hindi, and English.
 */

const PRIMARY_MODEL = 'gemini-3.8-flash';
const FALLBACK_MODEL = 'gemini-2.5-flash';

export function getGeminiApiKey(): string | undefined {
  const key = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  if (!key || key.trim() === '' || key === 'your_gemini_api_key_here') {
    return undefined;
  }
  return key.trim();
}

export function isGeminiConfigured(): boolean {
  return Boolean(getGeminiApiKey());
}

async function callGeminiRest(
  apiKey: string,
  model: string,
  prompt: string,
  systemInstruction: string
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const payload = {
    systemInstruction: {
      parts: [{ text: systemInstruction }],
    },
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.3,
      topP: 0.9,
      maxOutputTokens: 1200,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const candidate = data.candidates?.[0];
  const text = candidate?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('Gemini API returned an empty response.');
  }

  return text;
}

export async function askAgriMind(
  question: string,
  context?: FarmingContext | null,
  lang: SupportedLanguage = 'en'
): Promise<string> {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    return `⚠️ **Gemini API Key Required**\n\nAgriMind AI connects **directly** from your device to Google Gemini without passing through any external servers or tracking databases.\n\nPlease set your key in \`.env\`:\n\`\`\`\nEXPO_PUBLIC_GEMINI_API_KEY=AIzaSy...\n\`\`\``;
  }

  const systemInstruction = getSystemInstructionWithLanguage(lang);
  const promptWithContext = buildUserPromptWithContext(question, context, lang);

  // 1. Try using the official @google/genai SDK dynamically
  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: PRIMARY_MODEL,
      contents: promptWithContext,
      config: {
        systemInstruction,
        temperature: 0.3,
        maxOutputTokens: 1200,
      },
    });

    if (response && response.text) {
      return response.text;
    }
  } catch (sdkError: any) {
    // Falls back to direct HTTPS REST
  }

  // 2. Direct REST call with PRIMARY_MODEL ('gemini-3.8-flash')
  try {
    return await callGeminiRest(apiKey, PRIMARY_MODEL, promptWithContext, systemInstruction);
  } catch (primaryError: any) {
    try {
      return await callGeminiRest(apiKey, FALLBACK_MODEL, promptWithContext, systemInstruction);
    } catch (fallbackError: any) {
      throw new Error(
        `Unable to reach Gemini API. Please check your internet connection and verify your API key in .env.\n\nDetails: ${fallbackError?.message || primaryError?.message}`
      );
    }
  }
}
