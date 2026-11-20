import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { LANGUAGES, SupportedLanguage } from '../constants/translations';

interface LanguageSelectorProps {
  currentLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onSelectLanguage,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Ionicons name="language" size={14} color={COLORS.primary} />
        <Text style={styles.labelText}>Language / ಭಾಷೆ / భాష / மொழி / ഭാഷ:</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {LANGUAGES.map((lang) => {
          const isActive = currentLanguage === lang.code;
          return (
            <TouchableOpacity
              key={lang.code}
              style={[styles.langChip, isActive && styles.langChipActive]}
              onPress={() => onSelectLanguage(lang.code)}
              activeOpacity={0.75}
            >
              <Text style={styles.flagText}>{lang.flag}</Text>
              <Text
                style={[
                  styles.langChipText,
                  isActive && styles.langChipTextActive,
                ]}
              >
                {lang.nativeName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingVertical: 6,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  labelText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  scrollContent: {
    flexDirection: 'row',
    gap: 6,
    paddingRight: SPACING.sm,
  },
  langChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.surfaceLeaf,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  langChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryDark,
  },
  flagText: {
    fontSize: 12,
  },
  langChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  langChipTextActive: {
    color: COLORS.textLight,
  },
});
