export type SupportedLanguage = 'en' | 'kn' | 'te' | 'ta' | 'ml' | 'hi';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🌾' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🌱' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🌾' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🌴' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
];

export const TRANSLATIONS: Record<SupportedLanguage, {
  appName: string;
  tagline: string;
  newChat: string;
  newChatConfirmTitle: string;
  newChatConfirmMsg: string;
  clear: string;
  cancel: string;
  privacyTitle: string;
  privacySubtitle: string;
  privacyRule1: string;
  privacyRule2: string;
  privacyRule3: string;
  manualContext: string;
  contextHelper: string;
  seasonLabel: string;
  soilLabel: string;
  clearContext: string;
  quickQuestionsTitle: string;
  quickQuestions: {
    title: string;
    subtitle: string;
    prompt: string;
  }[];
  inputPlaceholder: string;
  consultingAi: string;
  welcomeGreeting: string;
  welcomeDescription: string;
  offlineGuideTitle: string;
  offlineBadge: string;
  searchPlaceholder: string;
  allCrops: string;
  showingCrops: string;
  askAiAbout: string;
  tabChat: string;
  tabCrops: string;
  seasons: {
    kharif: string;
    rabi: string;
    zaid: string;
  };
  soils: {
    black: string;
    alluvial: string;
    red: string;
    loamy: string;
    sandy: string;
  };
  cropFields: {
    sowing: string;
    harvesting: string;
    soil: string;
    water: string;
    npk: string;
    diseases: string;
    price: string;
  };
}> = {
  en: {
    appName: 'AgriMind AI',
    tagline: 'Direct Gemini • Stateless',
    newChat: 'New Chat',
    newChatConfirmTitle: 'Start New Chat?',
    newChatConfirmMsg: 'This will clear current chat messages from memory. AgriMind does not save logs anywhere.',
    clear: 'Clear',
    cancel: 'Cancel',
    privacyTitle: 'AgriMind Privacy Guarantee',
    privacySubtitle: 'Zero telemetry • In-memory only • Fresh sessions',
    privacyRule1: 'Zero External Database: No cloud database, analytics, contacts, or GPS permissions.',
    privacyRule2: 'Fresh & Stateless: Starts clean every launch. No logs stored on external servers.',
    privacyRule3: 'Direct Gemini Connection: Calls straight to Google Gemini using your local key.',
    manualContext: 'Manual Field Context (Optional)',
    contextHelper: 'No GPS used. Tap your current season or soil to personalize answers:',
    seasonLabel: 'Season',
    soilLabel: 'Soil',
    clearContext: 'Clear Context',
    quickQuestionsTitle: 'One-Tap Quick Questions',
    quickQuestions: [
      {
        title: 'Best Crops',
        subtitle: 'Season & weather suitability',
        prompt: 'Best crops for this season & weather in India',
      },
      {
        title: 'Fertilizers & NPK',
        subtitle: 'Application & dosage schedule',
        prompt: 'Recommended fertilizers & NPK schedule for current crops',
      },
      {
        title: 'Crop Diseases',
        subtitle: 'Medicine & pesticide guide',
        prompt: 'Common crop diseases and safe pesticide/medicine guide',
      },
      {
        title: 'Mandi Price & MSP',
        subtitle: 'Current market estimates',
        prompt: 'Expected mandi market price and official MSP range in ₹ per quintal',
      },
    ],
    inputPlaceholder: 'Ask crop advice, disease medicine, NPK...',
    consultingAi: 'Consulting AgriMind AI for Indian farming best practices...',
    welcomeGreeting: 'Namaste Farmer! 🌾',
    welcomeDescription: 'Direct, Private Agricultural Expert for Indian Farmers. Ask anything regarding crop cultivation, soil health, fertilizer dosage, or pest management.',
    offlineGuideTitle: 'Offline Crop Guide',
    offlineBadge: '100% Offline',
    searchPlaceholder: 'Search crop (Wheat, Dhan, Kapas, Moong...)',
    allCrops: 'All (20+)',
    showingCrops: 'Showing',
    askAiAbout: 'Ask AI about',
    tabChat: 'Agri Chat',
    tabCrops: 'Crop Season Reference',
    seasons: {
      kharif: 'Kharif (Monsoon)',
      rabi: 'Rabi (Winter)',
      zaid: 'Zaid (Summer)',
    },
    soils: {
      black: 'Black (Regur)',
      alluvial: 'Alluvial',
      red: 'Red / Laterite',
      loamy: 'Loamy',
      sandy: 'Sandy',
    },
    cropFields: {
      sowing: 'Ideal Sowing Months:',
      harvesting: 'Harvesting Months:',
      soil: 'Soil Suitability:',
      water: 'Water / Rainfall:',
      npk: 'Key Fertilizers & NPK:',
      diseases: 'Common Diseases & Pests:',
      price: 'Typical Market Price / MSP:',
    },
  },

  kn: {
    appName: 'ಅಗ್ರಿಮೈಂಡ್ AI',
    tagline: 'ಡೈರೆಕ್ಟ್ ಜೆಮಿನಿ • ಗೌಪ್ಯತೆ ರಕ್ಷಣೆ',
    newChat: 'ಹೊಸ ಚಾಟ್',
    newChatConfirmTitle: 'ಹೊಸ ಚಾಟ್ ಪ್ರಾರಂಭಿಸುವುದೇ?',
    newChatConfirmMsg: 'ಇದು ನಿಮ್ಮ ಹಿಂದಿನ ಚಾಟ್ ಸಂದೇಶಗಳನ್ನು ಅಳಿಸುತ್ತದೆ. ಅಗ್ರಿಮೈಂಡ್ ಯಾವುದೇ ಡೇಟಾವನ್ನು ಉಳಿಸುವುದಿಲ್ಲ.',
    clear: 'ತೆರವುಗೊಳಿಸಿ',
    cancel: 'ರದ್ದುಮಾಡಿ',
    privacyTitle: 'ಅಗ್ರಿಮೈಂಡ್ ಸಂಪೂರ್ಣ ಗೌಪ್ಯತೆ ಭರವಸೆ',
    privacySubtitle: 'ಶೂನ್ಯ ಟ್ರ್ಯಾಕಿಂಗ್ • ಮೆಮೊರಿಯಲ್ಲಿ ಮಾತ್ರ • ತಾಜಾ ಸೆಷನ್',
    privacyRule1: 'ಶೂನ್ಯ ಬಾಹ್ಯ ಡೇಟಾಬೇಸ್: ಯಾವುದೇ ಕ್ಲೌಡ್ ಡೇಟಾಬೇಸ್, ಅನಲಿಟಿಕ್ಸ್ ಅಥವಾ GPS ಅನುಮತಿಗಳಿಲ್ಲ.',
    privacyRule2: 'ತಾಜಾ ಸೆಷನ್: ಪ್ರತಿ ಬಾರಿಯೂ ಸ್ವಚ್ಛವಾಗಿ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ. ಯಾವುದೇ ಸರ್ವರ್‌ನಲ್ಲಿ ಲಾಗ್‌ಗಳಿಲ್ಲ.',
    privacyRule3: 'ನೇರ ಜೆಮಿನಿ AI: ನಿಮ್ಮ ಸಾಧನದಿಂದ ನೇರವಾಗಿ ಗೂಗಲ್ ಜೆಮಿನಿ ಸಂಪರ್ಕ.',
    manualContext: 'ಕೃಷಿ ಕ್ಷೇತ್ರದ ಮಾಹಿತಿ (ಐಚ್ಛಿಕ)',
    contextHelper: 'GPS ಅಗತ್ಯವಿಲ್ಲ. ಉತ್ತಮ ಉತ್ತರದ ಸಲುವಾಗಿ ಋತು ಅಥವಾ ಮಣ್ಣಿನ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ:',
    seasonLabel: 'ಋತು',
    soilLabel: 'ಮಣ್ಣು',
    clearContext: 'ಆಯ್ಕೆ ತೆರವು',
    quickQuestionsTitle: 'ಒಂದು ಟ್ಯಾಪ್ ತ್ವರಿತ ಪ್ರಶ್ನೆಗಳು',
    quickQuestions: [
      {
        title: 'ಉತ್ತಮ ಬೆಳೆಗಳು',
        subtitle: 'ಋತು ಮತ್ತು ಹವಾಮಾನಕ್ಕೆ ಸೂಕ್ತ ಬೆಳೆ',
        prompt: 'ಈ ಋತುವಿನಲ್ಲಿ ಮತ್ತು ಹವಾಮಾನದಲ್ಲಿ ಬೆಳೆಯಲು ಸೂಕ್ತವಾದ ಬೆಳೆಗಳು ಯಾವುವು?',
      },
      {
        title: 'ಗೊಬ್ಬರ & NPK ವೇಳಾಪಟ್ಟಿ',
        subtitle: 'ರಸಗೊಬ್ಬರ ಪ್ರಮಾಣ ಮತ್ತು ಬಳಕೆ',
        prompt: 'ಬೆಳೆಗಳಿಗೆ ಶಿಫಾರಸು ಮಾಡಿದ ರಸಗೊಬ್ಬರ ಪ್ರಮಾಣ ಮತ್ತು NPK ವೇಳಾಪಟ್ಟಿ ತಿಳಿಸಿ',
      },
      {
        title: 'ಬೆಳೆ ರೋಗಗಳು & ಔಷಧ',
        subtitle: 'ಕೀಟನಾಶಕ ಮತ್ತು ರೋಗ ನಿವಾರಣೆ',
        prompt: 'ಮುಖ್ಯ ಬೆಳೆ ರೋಗಗಳು ಮತ್ತು ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರ (KVK) ಆಧಾರಿತ ಔಷಧೋಪಚಾರ ತಿಳಿಸಿ',
      },
      {
        title: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ & MSP',
        subtitle: 'ಮಂಡಿ ಧಾರಣೆ ಮತ್ತು ಬೆಂಬಲ ಬೆಲೆ',
        prompt: 'ಕ್ವಿಂಟಲ್‌ಗೆ ನಿರೀಕ್ಷಿತ ಮಂಡಿ ಮಾರುಕಟ್ಟೆ ದರ ಮತ್ತು ಸರ್ಕಾರದ ಬೆಂಬಲ ಬೆಲೆ (MSP) ವಿವರ',
      },
    ],
    inputPlaceholder: 'ಬೆಳೆ ಸಲಹೆ, ರೋಗ ನಿವಾರಣೆ, ರಸಗೊಬ್ಬರದ ಬಗ್ಗೆ ಕೇಳಿ...',
    consultingAi: 'ಕೃಷಿ ತಜ್ಞರ ಸಲಹೆ ಪಡೆಯಲಾಗುತ್ತಿದೆ...',
    welcomeGreeting: 'ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ! 🌾',
    welcomeDescription: 'ಭಾರತೀಯ ಕೃಷಿಕರಿಗಾಗಿ ನೇರ ಮತ್ತು ಖಾಸಗಿ AI ಕೃಷಿ ಮಾರ್ಗದರ್ಶಿ. ಬೆಳೆ ಪದ್ಧತಿ, ಮಣ್ಣಿನ ಫಲವತ್ತತೆ ಮತ್ತು ರೋಗ ನಿಯಂತ್ರಣದ ಬಗ್ಗೆ ಮುಕ್ತವಾಗಿ ಕೇಳಿ.',
    offlineGuideTitle: 'ಆಫ್‌ಲೈನ್ ಬೆಳೆ ಕೈಪಿಡಿ',
    offlineBadge: '100% ಆಫ್‌ಲೈನ್',
    searchPlaceholder: 'ಬೆಳೆ ಹುಡುಕಿ (ಗೋಧಿ, ಭತ್ತ, ಹತ್ತಿ, ಸೋಯಾಬೀನ್...)',
    allCrops: 'ಎಲ್ಲ ಬೆಳೆಗಳು (20+)',
    showingCrops: 'ತೋರಿಸಲಾಗುತ್ತಿದೆ',
    askAiAbout: 'AI ಸಲಹೆ ಪಡೆಯಿರಿ',
    tabChat: 'ಕೃಷಿ ಚಾಟ್',
    tabCrops: 'ಬೆಳೆ ಋತು ಮಾರ್ಗದರ್ಶಿ',
    seasons: {
      kharif: 'ಖಾರಿಫ್ (ಮುಂಗಾರು)',
      rabi: 'ರಬಿ (ಹಿಂಗಾರು)',
      zaid: 'ಜಾಯಿದ್ (ಬೇಸಿಗೆ)',
    },
    soils: {
      black: 'ಕಪ್ಪು ಮಣ್ಣು (ರೆಗೂರ್)',
      alluvial: 'ಮೆಕ್ಕಲು ಮಣ್ಣು',
      red: 'ಕೆಂಪು / ಜಂಬಿಟ್ಟಿಗೆ ಮಣ್ಣು',
      loamy: 'ಗೋಡು ಮಣ್ಣು',
      sandy: 'ಮರಳು ಮಣ್ಣು',
    },
    cropFields: {
      sowing: 'ಬಿತ್ತನೆ ಸಮಯ:',
      harvesting: 'ಕೊಯ್ಲು ಸಮಯ:',
      soil: 'ಸೂಕ್ತ ಮಣ್ಣು:',
      water: 'ನೀರಿನ ಅವಶ್ಯಕತೆ:',
      npk: 'ಪ್ರಮುಖ ರಸಗೊಬ್ಬರ (NPK):',
      diseases: 'ಸಾಮಾನ್ಯ ರೋಗಗಳು:',
      price: 'ಮಾರುಕಟ್ಟೆ ದರ / MSP:',
    },
  },

  te: {
    appName: 'అగ్రిమైండ్ AI',
    tagline: 'డైరెక్ట్ జెమిని • గోప్యత రక్షణ',
    newChat: 'కొత్త చాట్',
    newChatConfirmTitle: 'కొత్త చాట్ ప్రారంభించాలా?',
    newChatConfirmMsg: 'ఇది ప్రస్తుత చాట్ సందేశాలను మెమరీ నుండి తొలగిస్తుంది. ఏ సమాచారమూ నిల్వ చేయబడదు.',
    clear: 'క్లియర్',
    cancel: 'రద్దు',
    privacyTitle: 'అగ్రిమైండ్ గోప్యతా రక్షణ హామీ',
    privacySubtitle: 'జీరో ట్రాకింగ్ • మెమరీలోనే భద్రం • ప్రైవేట్ AI',
    privacyRule1: 'బాహ్య డేటాబేస్ లేదు: క్లౌడ్ డేటాబేస్, లొకేషన్/GPS లేదా పరిచయాల అనుమతులు అవసరం లేదు.',
    privacyRule2: 'స్టేట్‌లెస్ సెషన్: ప్రతిసారీ సరికొత్తగా ప్రారంభమవుతుంది. ఎటువంటి లాగ్‌లు సేవ్ కావు.',
    privacyRule3: 'డైరెక్ట్ గూగుల్ జెమిని: మీ లోకల్ కీతో నేరుగా AI విశ్లేషణ.',
    manualContext: 'క్షేత్ర సమాచారం (ఐచ్ఛికం)',
    contextHelper: 'GPS వాడము. మెరుగైన సమాధానాల కోసం సీజన్ లేదా నేల రకాన్ని ఎంచుకోండి:',
    seasonLabel: 'సీజన్',
    soilLabel: 'నేల రకం',
    clearContext: 'ఎంపిక క్లియర్',
    quickQuestionsTitle: 'ఒక్క ట్యాప్‌తో ప్రశ్నలు',
    quickQuestions: [
      {
        title: 'మంచి పంటలు',
        subtitle: 'ఈ సీజన్‌కు అనుకూలమైన పంటలు',
        prompt: 'ప్రస్తుత సీజన్ మరియు వాతావరణానికి అనువైన ఉత్తమ పంటలు ఏవి?',
      },
      {
        title: 'ఎరువులు & NPK షెడ్యూల్',
        subtitle: 'మోతాదు మరియు వాడే సమయం',
        prompt: 'పంటలకు సిఫార్సు చేసిన ఎరువులు మరియు NPK మోతాదు షెడ్యూల్ తెలపండి',
      },
      {
        title: 'పంట తెగుళ్ళు & మందులు',
        subtitle: 'తెగుళ్ళ నివారణ & పురుగు మందులు',
        prompt: 'ప్రధాన పంట తెగుళ్ళు మరియు కృషి విజ్ఞాన కేంద్రం (KVK) ఆమోదిత మందుల వివరాలు',
      },
      {
        title: 'మార్కెట్ ధర & మద్దతు ధర',
        subtitle: 'మండి ధరలు మరియు MSP శ్రేణి',
        prompt: 'క్వింటాల్‌కు ఆశించే మార్కెట్ (మండి) ధర మరియు కనీస మద్దతు ధర (MSP) వివరాలు',
      },
    ],
    inputPlaceholder: 'పంట సలహాలు, తెగుళ్ళ మందులు, ఎరువుల గురించి అడగండి...',
    consultingAi: 'వ్యవసాయ నిపుణుల సలహాలు సేకరిస్తున్నాము...',
    welcomeGreeting: 'రైతు సోదరులకు నమస్కారం! 🌾',
    welcomeDescription: 'భారతీయ రైతుల కోసం ప్రత్యక్ష మరియు ప్రైవేట్ AI వ్యవసాయ సహాయకుడు. పంట సాగు, నేల ఆరోగ్యం, ఎరువులు మరియు తెగుళ్ళ నివారణపై ఏ ప్రశ్నైనా అడగండి.',
    offlineGuideTitle: 'ఆఫ్‌లైన్ పంటల సమాచారం',
    offlineBadge: '100% ఆఫ్‌లైన్',
    searchPlaceholder: 'పంట పేరు వెతకండి (వరి, గోధుమ, పత్తి, మిరప...)',
    allCrops: 'అన్ని పంటలు (20+)',
    showingCrops: 'చూపిస్తున్నవి',
    askAiAbout: 'AI సలహా అడగండి',
    tabChat: 'వ్యవసాయ చాట్',
    tabCrops: 'పంట కాలాల సమాచారం',
    seasons: {
      kharif: 'ఖరీఫ్ (వర్షాకాలం)',
      rabi: 'రబీ (శీతాకాలం)',
      zaid: 'జాయెద్ (వేసవికాలం)',
    },
    soils: {
      black: 'నల్లరేగడి నేల (రెగూర్)',
      alluvial: 'ఒండ్రు నేల',
      red: 'ఎర్ర నేల',
      loamy: 'దుబ్బ / లోమీ నేల',
      sandy: 'ఇసుక నేల',
    },
    cropFields: {
      sowing: 'విత్తే సమయం:',
      harvesting: 'కోత సమయం:',
      soil: 'అనుకూల నేల:',
      water: 'నీటి అవసరం:',
      npk: 'ముఖ్య ఎరువులు (NPK):',
      diseases: 'సాధారణ తెగుళ్ళు:',
      price: 'మార్కెట్ ధర / MSP:',
    },
  },

  ta: {
    appName: 'அக்ரிமைண்ட் AI',
    tagline: 'நேரடி ஜெமினி • தனியுரிமை பாதுகாப்பு',
    newChat: 'புதிய அரட்டை',
    newChatConfirmTitle: 'புதிய அரட்டையைத் தொடங்கவா?',
    newChatConfirmMsg: 'இது தற்போதைய செய்திகளை மெமரியிலிருந்து நீக்கும். அக்ரிமைண்ட் எந்தத் தரவையும் சேமிப்பதில்லை.',
    clear: 'அழி',
    cancel: 'ரத்து',
    privacyTitle: 'அக்ரிமைண்ட் தனியுரிமை உத்தரவாதம்',
    privacySubtitle: 'டிராக்கிங் இல்லை • மெமரியில் மட்டும் • நேரடி AI',
    privacyRule1: 'வெளிப்புற தரவுத்தளம் இல்லை: கிளவுட் தரவுத்தளம், ஜிபிஎஸ் அல்லது தொடர்புகளுக்கான அனுமதி தேவையில்லை.',
    privacyRule2: 'புதிய அமர்வு: ஒவ்வொரு முறையும் புதிதாகத் தொடங்குகிறது. சர்வர்களில் எந்த லாக்களும் இல்லை.',
    privacyRule3: 'நேரடி ஜெமினி AI: உங்கள் உள்ளூர் சாவியுடன் கூகிள் ஜெமினியுடன் நேரடி இணைப்பு.',
    manualContext: 'விவசாய கள சூழல் (விருப்பம்)',
    contextHelper: 'GPS தேவையில்லை. துல்லியமான பதிலுக்கு பருவம் அல்லது மண் வகையைத் தேர்வு செய்யவும்:',
    seasonLabel: 'பருவம்',
    soilLabel: 'மண் வகை',
    clearContext: 'தெரிவை நீக்கு',
    quickQuestionsTitle: 'ஒரே தட்டலில் கேள்விகள்',
    quickQuestions: [
      {
        title: 'சிறந்த பயிர்கள்',
        subtitle: 'பருவத்திற்கும் வானிலைக்கும் ஏற்றது',
        prompt: 'இந்த பருவத்திற்கும் தட்பவெப்ப நிலைக்கும் ஏற்ற சிறந்த பயிர்கள் எவை?',
      },
      {
        title: 'உரங்கள் & NPK திட்டம்',
        subtitle: 'பரிந்துரைக்கப்பட்ட உரம் மற்றும் அளவு',
        prompt: 'பயிர்களுக்கான பரிந்துரைக்கப்பட்ட உர அளவு மற்றும் NPK அட்டவணை என்ன?',
      },
      {
        title: 'பயிர் நோய்கள் & மருந்து',
        subtitle: 'பூச்சிக்கொல்லி மற்றும் நோய் மேலாண்மை',
        prompt: 'முக்கிய பயிர் நோய்கள் மற்றும் வேளாண் அறிவியல் மைய (KVK) பரிந்துரைக்கப்பட்ட மருந்துகள்',
      },
      {
        title: 'சந்தை விலை & MSP',
        subtitle: 'மண்டி விலை மற்றும் ஆதார விலை',
        prompt: 'குவிண்டாலுக்கு எதிர்பார்க்கப்படும் சந்தை (மண்டி) விலை மற்றும் குறைந்தபட்ச ஆதரவு விலை (MSP)',
      },
    ],
    inputPlaceholder: 'பயிர் ஆலோசனை, நோய் மருத்துவம், உரம் பற்றி கேளுங்கள்...',
    consultingAi: 'வேளாண் நிபுணர்களின் ஆலோசனையைப் பெறுகிறது...',
    welcomeGreeting: 'வணக்கம் விவசாய பெருமக்களே! 🌾',
    welcomeDescription: 'இந்திய விவசாயிகளுக்கான நேரடி மற்றும் பாதுகாப்பான AI விவசாய வழிகாட்டி. சாகுபடி, மண் வளம், உரம் மற்றும் பூச்சி மேலாண்மை பற்றி கேளுங்கள்.',
    offlineGuideTitle: 'ஆஃப்லைன் பயிர் வழிகாட்டி',
    offlineBadge: '100% ஆஃப்லைன்',
    searchPlaceholder: 'பயிர் பெயரைத் தேடுங்கள் (நெல், கோதுமை, பருத்தி, உளுந்து...)',
    allCrops: 'அனைத்து பயிர்கள் (20+)',
    showingCrops: 'காட்டப்படுகிறது',
    askAiAbout: 'AI ஆலோசனை பெறு',
    tabChat: 'விவசாய அரட்டை',
    tabCrops: 'பயிர் பருவக் குறிப்பு',
    seasons: {
      kharif: 'காரீப் (மழைக்காலம்)',
      rabi: 'ரபி (குளிர்காலம்)',
      zaid: 'ஜைத் (கோடைகாலம்)',
    },
    soils: {
      black: 'கரிசல் மண் (ரெகுர்)',
      alluvial: 'வண்டல் மண்',
      red: 'செம்மண்',
      loamy: 'வண்டல் கலந்த மண்',
      sandy: 'மணல் மண்',
    },
    cropFields: {
      sowing: 'விதைப்பு காலம்:',
      harvesting: 'அறுவடை காலம்:',
      soil: 'ஏற்ற மண்:',
      water: 'நீர் தேவை:',
      npk: 'முக்கிய உரங்கள் (NPK):',
      diseases: 'தாக்கும் நோய்கள்:',
      price: 'சந்தை விலை / MSP:',
    },
  },

  ml: {
    appName: 'അഗ്രിമൈൻഡ് AI',
    tagline: 'ഡയറക്ട് ജെമിനി • സ്വകാര്യത സുരക്ഷിതം',
    newChat: 'പുതിയ ചാറ്റ്',
    newChatConfirmTitle: 'പുതിയ ചാറ്റ് ആരംഭിക്കണോ?',
    newChatConfirmMsg: 'ഇത് നിലവിലെ ചാറ്റ് സന്ദേശങ്ങൾ നീക്കം ചെയ്യും. അഗ്രിമൈൻഡ് യാതൊരു വിവരങ്ങളും ശേഖരിക്കുന്നില്ല.',
    clear: 'മായ്ക്കുക',
    cancel: 'റദ്ദാക്കുക',
    privacyTitle: 'അഗ്രിമൈൻഡ് സ്വകാര്യതാ ഉറപ്പ്',
    privacySubtitle: 'ട്രാക്കിംഗ് ഇല്ല • മെമ്മറിയിൽ മാത്രം • പൂർണ്ണ സ്വകാര്യത',
    privacyRule1: 'ഡാറ്റാബേസ് ഇല്ല: ക്ലൗഡ് ഡാറ്റാബേസ്, ലൊക്കേഷൻ/GPS, കോൺടാക്റ്റ് അനുമതികൾ ആവശ്യമില്ല.',
    privacyRule2: 'സ്റ്റേറ്റ്‌ലെസ്സ് സെഷൻ: ഓരോ തവണയും ശുദ്ധമായി ആരംഭിക്കുന്നു. സെർവറിൽ വിവരങ്ങൾ സൂക്ഷിക്കുന്നില്ല.',
    privacyRule3: 'ഡയറക്ട് ജെമിനി കണക്ഷൻ: നിങ്ങളുടെ ഫോണിൽ നിന്ന് നേരിട്ട് ഗൂഗിൾ ജെമിനി AI ലേക്ക്.',
    manualContext: 'കൃഷി വിവരങ്ങൾ (ഓപ്ഷണൽ)',
    contextHelper: 'GPS ആവശ്യമില്ല. കൃത്യമായ ഉത്തരങ്ങൾക്ക് സീസണോ മണ്ണോ തിരഞ്ഞെടുക്കുക:',
    seasonLabel: 'സീസൺ',
    soilLabel: 'മണ്ണ്',
    clearContext: 'ഒഴിവാക്കുക',
    quickQuestionsTitle: 'പെട്ടെന്നുള്ള ചോദ്യങ്ങൾ',
    quickQuestions: [
      {
        title: 'മികച്ച വിളകൾ',
        subtitle: 'സീസണും കാലാവസ്ഥയും അനുസരിച്ച്',
        prompt: 'ഈ സീസണിലും കാലാവസ്ഥയിലും കൃഷി ചെയ്യാൻ അനുയോജ്യമായ വിളകൾ ഏവ?',
      },
      {
        title: 'വളങ്ങളും NPK ഷെഡ്യൂളും',
        subtitle: 'വളപ്രയോഗവും അളവുകളും',
        prompt: 'വിളകൾക്ക് ശുപാർശ ചെയ്യുന്ന വളങ്ങളും NPK ഷെഡ്യൂളും വിശദമാക്കുക',
      },
      {
        title: 'വിള രോഗങ്ങളും മരുന്നും',
        subtitle: 'കീട നിയന്ത്രണവും മരുന്നുകളും',
        prompt: 'പ്രധാന വിള രോഗങ്ങളും കൃഷി വിജ്ഞാൻ കേന്ദ്രം (KVK) നിർദ്ദേശിക്കുന്ന മരുന്നുകളും',
      },
      {
        title: 'മാർക്കറ്റ് വിലയും MSP യും',
        subtitle: 'വിപണി വിലയും താങ്ങുവിലയും',
        prompt: 'ക്വിന്റലിന് പ്രതീക്ഷിക്കുന്ന മാർക്കറ്റ് (മണ്ടി) വിലയും താങ്ങുവിലയും (MSP) വിവരിക്കുക',
      },
    ],
    inputPlaceholder: 'വിള ഉപദേശം, രോഗ പ്രതിവിധി, വളങ്ങൾ എന്നിവ ചോദിക്കൂ...',
    consultingAi: 'കൃഷി വിദഗ്ദ്ധരുടെ ഉപദേശം ലഭ്യമാക്കുന്നു...',
    welcomeGreeting: 'നമസ്കാരം കർഷക സുഹൃത്തേ! 🌾',
    welcomeDescription: 'ഇന്ത്യൻ കർഷകർക്കായുള്ള സുരക്ഷിത AI കൃഷി സഹായി. കൃഷി രീതികൾ, വളപ്രയോഗം, രോഗ നിയന്ത്രണം എന്നിവയെക്കുറിച്ച് ചോദിക്കാം.',
    offlineGuideTitle: 'ഓഫ്‌ലൈൻ വിള വിവരങ്ങൾ',
    offlineBadge: '100% ഓഫ്‌ലൈൻ',
    searchPlaceholder: 'വിള തിരയുക (നെല്ല്, ഗോതമ്പ്, പരുത്തി, വാഴ...)',
    allCrops: 'എല്ലാ വിളകളും (20+)',
    showingCrops: 'കാണിക്കുന്നത്',
    askAiAbout: 'AI യോട് ചോദിക്കൂ',
    tabChat: 'കൃഷി ചാറ്റ്',
    tabCrops: 'വിള സീസൺ ഗൈഡ്',
    seasons: {
      kharif: 'ഖാരിഫ് (മഴക്കാലം)',
      rabi: 'റബി (ശീതകാലം)',
      zaid: 'സായിദ് (വേനൽക്കാലം)',
    },
    soils: {
      black: 'കരിമണ്ണ് (റെഗുർ)',
      alluvial: 'എക്കൽ മണ്ണ്',
      red: 'ചെമ്മണ്ണ്',
      loamy: 'പശിമരാശി മണ്ണ്',
      sandy: 'മണൽ മണ്ണ്',
    },
    cropFields: {
      sowing: 'വിതയ്ക്കുന്ന സമയം:',
      harvesting: 'വിളവെടുപ്പ് സമയം:',
      soil: 'യോജിച്ച മണ്ണ്:',
      water: 'ജല ലഭ്യത:',
      npk: 'പ്രധാന വളങ്ങൾ (NPK):',
      diseases: 'സാധാരണ രോഗങ്ങൾ:',
      price: 'മാർക്കറ്റ് വില / MSP:',
    },
  },

  hi: {
    appName: 'एग्रीमाइंड AI',
    tagline: 'डायरेक्ट जेमिनी • पूर्णतः गोपनीय',
    newChat: 'नई चैट',
    newChatConfirmTitle: 'नई चैट शुरू करें?',
    newChatConfirmMsg: 'यह वर्तमान चैट संदेशों को मेमोरी से हटा देगा। एग्रीमाइंड कोई डेटा सुरक्षित नहीं रखता।',
    clear: 'साफ़ करें',
    cancel: 'रद्द करें',
    privacyTitle: 'एग्रीमाइंड गोपनीयता गारंटी',
    privacySubtitle: 'शून्य ट्रैकिंग • सिर्फ मेमोरी में • पूर्णतः निजी',
    privacyRule1: 'शून्य बाहरी डेटाबेस: कोई क्लाउड डेटाबेस, एनालिटिक्स या GPS अनुमति की आवश्यकता नहीं।',
    privacyRule2: 'स्टेटलेस सत्र: प्रत्येक बार एकदम नया शुरू होता है। कोई सर्वर लॉग नहीं।',
    privacyRule3: 'सीधा जेमिनी AI: आपके फोन से सीधे गूगल जेमिनी से सुरक्षित जुड़ाव।',
    manualContext: 'खेत व फसल संदर्भ (वैकल्पिक)',
    contextHelper: 'GPS की जरूरत नहीं। सटीक उत्तर के लिए मौसम या मिट्टी चुनें:',
    seasonLabel: 'मौसम',
    soilLabel: 'मिट्टी',
    clearContext: 'संदर्भ हटाएं',
    quickQuestionsTitle: 'एक-टैप त्वरित प्रश्न',
    quickQuestions: [
      {
        title: 'सर्वोत्तम फसलें',
        subtitle: 'मौसम व जलवायु के अनुकूल',
        prompt: 'इस मौसम और जलवायु के लिए सर्वोत्तम फसलें कौन सी हैं?',
      },
      {
        title: 'उर्वरक और NPK समय-सारणी',
        subtitle: 'मात्रा और प्रयोग का सही समय',
        prompt: 'फसलों के लिए अनुशंसित उर्वरक और NPK समय-सारणी क्या है?',
      },
      {
        title: 'फसल रोग और कीटनाशक',
        subtitle: 'रोग निवारण और दवा निर्देश',
        prompt: 'प्रमुख फसल रोग एवं कृषि विज्ञान केंद्र (KVK) प्रमाणित कीटनाशक/दवा मार्गदर्शिका',
      },
      {
        title: 'मंडी भाव और MSP',
        subtitle: 'अनुमानित भाव व न्यूनतम समर्थन मूल्य',
        prompt: 'प्रति क्विंटल अनुमानित मंडी भाव और न्यूनतम समर्थन मूल्य (MSP) दायरा क्या है?',
      },
    ],
    inputPlaceholder: 'फसल सलाह, रोग दवा, खाद-उर्वरक के बारे में पूछें...',
    consultingAi: 'कृषि विशेषज्ञ सलाह तैयार हो रही है...',
    welcomeGreeting: 'राम-राम किसान भाई! 🌾',
    welcomeDescription: 'भारतीय किसानों के लिए सीधा और सुरक्षित AI कृषि मार्गदर्शक। बुवाई, खाद, सिंचाई और फसल सुरक्षा से जुड़ा कोई भी प्रश्न पूछें।',
    offlineGuideTitle: 'ऑफ़लाइन फसल मार्गदर्शिका',
    offlineBadge: '100% ऑफ़लाइन',
    searchPlaceholder: 'फसल खोजें (गेहूं, धान, कपास, सोयाबीन...)',
    allCrops: 'सभी फसलें (20+)',
    showingCrops: 'दिखा रहे हैं',
    askAiAbout: 'AI से पूछें',
    tabChat: 'कृषि चैट',
    tabCrops: 'फसल मौसम मार्गदर्शिका',
    seasons: {
      kharif: 'खरीफ (मानसून)',
      rabi: 'रबी (सर्दियों)',
      zaid: 'जायद (गर्मी)',
    },
    soils: {
      black: 'काली मिट्टी (रेगुर)',
      alluvial: 'जलोढ़ मिट्टी',
      red: 'लाल मिट्टी',
      loamy: 'दोमट मिट्टी',
      sandy: 'बलुई / रेतीली मिट्टी',
    },
    cropFields: {
      sowing: 'बुवाई का उपयुक्त समय:',
      harvesting: 'कटाई का समय:',
      soil: 'उपयुक्त मिट्टी:',
      water: 'जल / सिंचाई आवश्यकता:',
      npk: 'प्रमुख खाद व उर्वरक (NPK):',
      diseases: 'प्रमुख रोग व कीट:',
      price: 'अनुमानित मंडी भाव / MSP:',
    },
  },
};
