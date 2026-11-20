import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { QUICK_QUESTIONS } from '../constants/systemPrompt';

interface QuickQuestionsProps {
  onSelectQuestion: (question: string) => void;
  disabled?: boolean;
}

export const QuickQuestions: React.FC<QuickQuestionsProps> = ({
  onSelectQuestion,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Ionicons name="flash" size={14} color={COLORS.amberHarvest} />
        <Text style={styles.headerTitle}>One-Tap Quick Questions</Text>
      </View>

      <View style={styles.grid}>
        {QUICK_QUESTIONS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, disabled && styles.cardDisabled]}
            onPress={() => onSelectQuestion(item.prompt)}
            disabled={disabled}
            activeOpacity={0.7}
          >
            <View style={styles.iconCircle}>
              <Ionicons
                name={item.icon as any}
                size={16}
                color={COLORS.primary}
              />
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.cardSubtitle} numberOfLines={1}>
                {item.subtitle}
              </Text>
            </View>
            <Ionicons
              name="arrow-forward-circle"
              size={16}
              color={COLORS.primaryLight}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: SPACING.xs,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  card: {
    width: '48.5%',
    backgroundColor: COLORS.surface,
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.subtle,
  },
  cardDisabled: {
    opacity: 0.5,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.surfaceLeaf,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  textWrap: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  cardSubtitle: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 1,
  },
  arrowIcon: {
    marginLeft: 2,
  },
});
