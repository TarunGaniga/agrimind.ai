# AgriMind AI 🌾🧠

> **Privacy-First, Standalone Agricultural AI Assistant for Indian Farming**  
> Built with **React Native (Expo SDK 52)**, **TypeScript**, and direct **Google Gemini 3.8 Flash** connectivity.

---

## 🛡️ Core Architecture & Strict Privacy Principles

1. **Zero External Data Access:**
   - **No Backend Database:** Does not connect to Firebase, Supabase, Mongo, AWS, or any remote database.
   - **Zero Analytics / Telemetry:** No Google Analytics, Segment, Mixpanel, Sentry, or advertising trackers.
   - **Zero Device Permissions:** Explicitly requests **no GPS/location**, no contacts, no camera, and no device storage permissions in `app.json`.
2. **Fresh & Stateless by Default:**
   - Every app launch starts in a clean, blank slate.
   - All conversation messages and context chips reside **strictly in temporary React component memory (`useState`)**.
   - Tapping **"New Chat"** instantly wipes all messages and manual context from memory.
3. **Direct AI Connection Only:**
   - The only outbound network connection made by the app is a direct HTTPS call from your device straight to Google's Gemini API endpoint (`gemini-3.8-flash`) using your developer API key stored locally in `.env`.

---

## 📱 Tech Stack

- **Framework:** React Native with Expo (SDK 52) & TypeScript
- **Navigation:** React Navigation (`@react-navigation/bottom-tabs`, `@react-navigation/native`)
- **AI Engine:** Google Gemini (`gemini-3.8-flash` via `@google/genai` with automatic REST fallback)
- **Icons:** `@expo/vector-icons` (`Ionicons`)
- **Design System:** Tailored for outdoor field conditions (high-contrast sunlight readability)

---

## 🎨 Color Palette (Field Sunlight Readability)

| Color Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Deep Forest Green** | `#1B5E20` | Primary brand color, headers, user chat bubbles |
| **Soft Leaf Green** | `#E8F5E9` | Subtle section backgrounds, active tags, banners |
| **Off-White Background** | `#F8FAF8` | Clean, glare-resistant screen background |
| **High-Contrast Dark Text**| `#1A1A1A` | High-visibility primary text for outdoor glare |
| **Charcoal Subtext** | `#374151` | Readable subtitles & technical specifications |
| **Harvest Amber** | `#E65100` | Mandi prices, MSP alerts, critical notices |

---

## 🌿 App Screens & Features

### Screen 1: AI Agri-Chat (Main Screen)
- **Welcome Card & Privacy Assurance:** Outlines zero-tracking rules on launch.
- **"New Chat" Button:** Header button to immediately wipe session memory.
- **Manual Context Selectors (Chips):**
  - **Season:** `Kharif` (Monsoon), `Rabi` (Winter), `Zaid` (Summer)
  - **Soil Type:** `Black (Regur)`, `Alluvial`, `Red / Laterite`, `Loamy`, `Sandy`
  - Allows farmers to manually personalize answers *without sharing GPS coordinates*.
- **One-Tap Quick Questions:**
  1. *Best crops for this season & weather*
  2. *Recommended fertilizers & NPK schedule*
  3. *Crop diseases & medicine/pesticide guide*
  4. *Expected market price & MSP range*
- **Structured AI Formatting:**
  - Distinct section badges for:
    1. **Season & Sowing Months**
    2. **Fertilizers & Nutrients**
    3. **Pest/Disease Medicine** (includes prominent **Krishi Vigyan Kendra (KVK)** dosage verification advisory)
    4. **Typical Market Price Range** (₹ per quintal)

### Screen 2: Offline Crop Season Reference (100% Offline Guide)
- Fully hardcoded database of 20+ major Indian crops across Kharif, Rabi, and Zaid seasons.
- Requires **zero internet** and zero external database queries.
- Instant search by English or Hindi/Devanagari name (`Wheat`, `Dhan`, `Kapas`, `Chana`, `Tarbooz`, etc.).
- Season filters: `All`, `Kharif (Jun–Oct)`, `Rabi (Oct–Mar)`, `Zaid (Mar–Jun)`.
- **"Ask AI" Action Button:** Tapping transfers directly to the Chat screen with a pre-filled crop prompt and automatically pre-selected season and soil context!

---

## 🤖 Embedded AI System Instruction

The Gemini API call strictly enforces this agricultural boundary:

```text
You are AgriMind, a standalone agricultural expert for Indian farming. Answer ONLY questions related to agriculture, crops, seasonal weather suitability, planting months, soil types, fertilizers, crop medicines/pesticides, irrigation, and typical Indian market (mandi) price ranges in ₹ per quintal. Politely refuse any non-farming questions. Structure every answer clearly with short bullet points covering: (1) Season & Sowing Months, (2) Fertilizers & Nutrients, (3) Pest/Disease Medicine (with a reminder to verify exact dosage at a local Krishi Vigyan Kendra), and (4) Typical Market Price Range. Do not ask for or collect personal user information.
```

---

## 📂 Project Structure

```
agrimind-ai/
├── .env.example                     # Environment template for Gemini API Key
├── .gitignore                       # Git exclusions (credentials, build artifacts)
├── app.json                         # Expo configuration (zero permissions declared)
├── babel.config.js                  # Babel preset configuration
├── metro.config.js                  # Metro bundler configuration
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript compiler configuration
├── index.ts                         # Expo root component registration
├── App.tsx                          # Root container with SafeArea and Navigation
├── assets/                          # Application icons and splash images
└── src/
    ├── api/
    │   └── gemini.ts                # Direct Gemini API integration (SDK + REST fallback)
    ├── constants/
    │   ├── cropData.ts              # 100% offline hardcoded crop database
    │   ├── systemPrompt.ts          # Embedded prompt & quick questions
    │   └── theme.ts                 # Forest green & high-contrast outdoor color palette
    ├── types/
    │   └── index.ts                 # TypeScript interfaces (Chat, Crops, Context)
    ├── components/
    │   ├── ChatBubble.tsx           # User & AI chat bubbles with context tags
    │   ├── ContextChips.tsx         # Manual season & soil selector chips
    │   ├── FormattedAIResponse.tsx  # Section headers, KVK alert, bullet points
    │   ├── PrivacyBanner.tsx        # Zero-telemetry & in-memory badge
    │   └── QuickQuestions.tsx       # 4 One-tap quick question cards
    ├── screens/
    │   ├── ChatScreen.tsx           # AI Agri-Chat screen
    │   └── CropReferenceScreen.tsx  # Offline Crop Season Reference screen
    └── navigation/
        └── AppNavigator.tsx         # 2-Tab Bottom Navigation configuration
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- Expo Go app on your physical Android/iOS device (or Android Studio emulator)

### 2. Configure Your Gemini API Key
Obtain a free API key from [Google AI Studio](https://aistudio.google.com/):

```bash
# Copy the example environment file
cp .env.example .env
```

Open `.env` and paste your key:
```env
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Application
```bash
npm start
# or
npx expo start -c
```
Scan the QR code with **Expo Go** (Android) or the **Camera app** (iOS).

---

## 🌐 Live Web Version (24/7 Access)

Access the live web version directly from any mobile or desktop browser without installing anything:
👉 **[https://tarunganiga.github.io/agrimind.ai](https://tarunganiga.github.io/agrimind.ai)**

- **100% Client-Side & Private:** No backend proxy or tracking servers.
- **Resilient AI Architecture:** Automatically routes between active Gemini models (`gemini-3.5-flash-lite`, `gemini-flash-lite-latest`, `gemini-3.8-flash`) and seamlessly activates the built-in offline Agricultural Knowledge Engine during cloud traffic spikes.
- **Multilingual Support:** Supports English, Kannada (ಕನ್ನಡ), Telugu (తెలుగు), Tamil (தமிழ்), Malayalam (മലയാളം), and Hindi (हिंदी).

