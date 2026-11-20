import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { ChatMessage, FarmingContext, RootTabParamList } from '../types';
import { askAgriMind } from '../api/gemini';
import { ChatBubble } from '../components/ChatBubble';
import { ContextChips } from '../components/ContextChips';
import { QuickQuestions } from '../components/QuickQuestions';
import { PrivacyBanner } from '../components/PrivacyBanner';
import { LanguageSelector } from '../components/LanguageSelector';
import { TRANSLATIONS, SupportedLanguage } from '../constants/translations';

type ChatRouteProp = RouteProp<RootTabParamList, 'AgriChat'>;

export const ChatScreen: React.FC = () => {
  const route = useRoute<ChatRouteProp>();
  const flatListRef = useRef<FlatList>(null);

  // Core In-Memory React State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [context, setContext] = useState<FarmingContext>({
    season: null,
    soil: null,
  });

  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (route.params?.initialPrompt) {
      const incomingPrompt = route.params.initialPrompt;
      const incomingContext = route.params.initialContext;

      if (incomingContext) {
        setContext(incomingContext);
      }

      handleSendMessage(incomingPrompt, incomingContext || context);
    }
  }, [route.params]);

  const handleSendMessage = async (
    textToSend: string,
    activeContext: FarmingContext = context
  ) => {
    const trimmed = textToSend.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      text: trimmed,
      sender: 'user',
      timestamp: Date.now(),
      context: { ...activeContext },
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const aiResponseText = await askAgriMind(trimmed, activeContext, language);

      const aiMessage: ChatMessage = {
        id: `ai_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        text: aiResponseText,
        sender: 'ai',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      const errorMessage: ChatMessage = {
        id: `err_${Date.now()}`,
        text: `⚠️ **Connection Error**\n\n${error.message || 'Could not reach Gemini AI.'}`,
        sender: 'ai',
        timestamp: Date.now(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleNewChat = () => {
    if (messages.length === 0) return;

    Alert.alert(
      t.newChatConfirmTitle,
      t.newChatConfirmMsg,
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: t.clear,
          style: 'destructive',
          onPress: () => {
            setMessages([]);
            setInputText('');
            setContext({ season: null, soil: null });
          },
        },
      ]
    );
  };

  const renderWelcomeHeader = () => (
    <View style={styles.welcomeContainer}>
      <View style={styles.brandHero}>
        <View style={styles.logoCircle}>
          <Ionicons name="leaf" size={28} color={COLORS.textLight} />
        </View>
        <Text style={styles.heroTitle}>{t.welcomeGreeting}</Text>
        <Text style={styles.heroSubtitle}>
          {t.welcomeDescription}
        </Text>
      </View>

      <PrivacyBanner />

      <ContextChips context={context} onUpdateContext={setContext} />

      <QuickQuestions
        onSelectQuestion={(q) => handleSendMessage(q, context)}
        disabled={loading}
      />
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/agricultural-land-bg.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.backdropOverlay} />
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Top Header Bar */}
        <View style={styles.topHeader}>
          <View style={styles.headerLeft}>
            <View style={styles.statusDot} />
            <View>
              <Text style={styles.headerBrand}>{t.appName}</Text>
              <Text style={styles.headerSubText}>{t.tagline}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.newChatBtn}
            onPress={handleNewChat}
            activeOpacity={0.7}
          >
            <Ionicons name="refresh" size={15} color={COLORS.primary} />
            <Text style={styles.newChatText}>{t.newChat}</Text>
          </TouchableOpacity>
        </View>

        {/* Multilingual Selector Bar */}
        <LanguageSelector
          currentLanguage={language}
          onSelectLanguage={setLanguage}
        />

        {/* Chat Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatBubble message={item} />}
          ListHeaderComponent={messages.length === 0 ? renderWelcomeHeader : null}
          contentContainerStyle={[
            styles.listContent,
            messages.length === 0 && styles.listContentEmpty,
          ]}
          showsVerticalScrollIndicator={false}
        />

        {/* Loading Indicator */}
        {loading && (
          <View style={styles.loadingBanner}>
            <ActivityIndicator size="small" color={COLORS.primary} />
            <Text style={styles.loadingText}>
              {t.consultingAi}
            </Text>
          </View>
        )}

        {/* Sticky Bottom Context preview if chat is in progress */}
        {messages.length > 0 && (
          <View style={styles.stickyContextRow}>
            <ContextChips context={context} onUpdateContext={setContext} />
          </View>
        )}

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.inputField}
            placeholder={t.inputPlaceholder}
            placeholderTextColor={COLORS.textMuted}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
            editable={!loading}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!inputText.trim() || loading) && styles.sendButtonDisabled,
            ]}
            onPress={() => handleSendMessage(inputText, context)}
            disabled={!inputText.trim() || loading}
            activeOpacity={0.8}
          >
            <Ionicons name="send" size={18} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(248, 250, 248, 0.48)',
  },
  screen: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.subtle,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.success,
  },
  headerBrand: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primaryDark,
    letterSpacing: 0.3,
  },
  headerSubText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  newChatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLeaf,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 4,
  },
  newChatText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  welcomeContainer: {
    paddingTop: SPACING.md,
  },
  brandHero: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
    ...SHADOWS.subtle,
  },
  logoCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    ...SHADOWS.card,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primaryDark,
    letterSpacing: 0.3,
  },
  heroSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: SPACING.lg,
    lineHeight: 18,
  },
  loadingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.surfaceLeaf,
    paddingVertical: 6,
    paddingHorizontal: SPACING.md,
    marginHorizontal: SPACING.md,
    borderRadius: RADIUS.sm,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  loadingText: {
    fontSize: 12,
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  stickyContextRow: {
    paddingHorizontal: SPACING.md,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: 10,
    ...SHADOWS.card,
  },
  inputField: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingTop: Platform.OS === 'ios' ? 10 : 8,
    paddingBottom: Platform.OS === 'ios' ? 10 : 8,
    fontSize: 14,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
    maxHeight: 100,
    minHeight: 40,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.subtle,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.textMuted,
    opacity: 0.4,
  },
});
