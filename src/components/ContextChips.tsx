import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { SeasonType, SoilType, FarmingContext } from '../types';

interface ContextChipsProps {
  context: FarmingContext;
  onUpdateContext: (updated: FarmingContext) => void;
  collapsed?: boolean;
}

const SEASONS: { type: SeasonType; label: string; period: string }[] = [
  { type: 'Kharif', label: 'Kharif', period: 'Monsoon (Jun–Oct)' },
  { type: 'Rabi', label: 'Rabi', period: 'Winter (Oct–Mar)' },
  { type: 'Zaid', label: 'Zaid', period: 'Summer (Mar–Jun)' },
];

const SOILS: { type: SoilType; label: string }[] = [
  { type: 'Black', label: 'Black (Regur)' },
  { type: 'Alluvial', label: 'Alluvial' },
  { type: 'Red', label: 'Red / Laterite' },
  { type: 'Loamy', label: 'Loamy' },
  { type: 'Sandy', label: 'Sandy' },
];

export const ContextChips: React.FC<ContextChipsProps> = ({
  context,
  onUpdateContext,
}) => {
  const toggleSeason = (season: SeasonType) => {
    onUpdateContext({
      ...context,
      season: context.season === season ? null : season,
    });
  };

  const toggleSoil = (soil: SoilType) => {
    onUpdateContext({
      ...context,
      soil: context.soil === soil ? null : soil,
    });
  };

  const clearAll = () => {
    onUpdateContext({ season: null, soil: null });
  };

  const hasActiveContext = Boolean(context.season || context.soil);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleWrap}>
          <Ionicons name="options-outline" size={14} color={COLORS.primary} />
          <Text style={styles.title}>Manual Field Context (Optional)</Text>
        </View>
        {hasActiveContext && (
          <TouchableOpacity onPress={clearAll} style={styles.clearBtn} activeOpacity={0.7}>
            <Ionicons name="close-circle" size={14} color={COLORS.textMuted} />
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.helperText}>
        No GPS used. Tap your current season or soil to personalize answers:
      </Text>

      {/* Season Chips */}
      <View style={styles.chipRowWrap}>
        <Text style={styles.rowLabel}>Season:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollList}
        >
          {SEASONS.map((item) => {
            const isSelected = context.season === item.type;
            return (
              <TouchableOpacity
                key={item.type}
                style={[styles.chip, isSelected && styles.chipActive]}
                onPress={() => toggleSeason(item.type)}
                activeOpacity={0.75}
              >
                {isSelected && (
                  <Ionicons name="checkmark-sharp" size={13} color={COLORS.textLight} />
                )}
                <Text
                  style={[
                    styles.chipText,
                    isSelected && styles.chipTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Soil Chips */}
      <View style={styles.chipRowWrap}>
        <Text style={styles.rowLabel}>Soil:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollList}
        >
          {SOILS.map((item) => {
            const isSelected = context.soil === item.type;
            return (
              <TouchableOpacity
                key={item.type}
                style={[styles.chip, isSelected && styles.chipActive]}
                onPress={() => toggleSoil(item.type)}
                activeOpacity={0.75}
              >
                {isSelected && (
                  <Ionicons name="checkmark-sharp" size={13} color={COLORS.textLight} />
                )}
                <Text
                  style={[
                    styles.chipText,
                    isSelected && styles.chipTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  clearText: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  helperText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  chipRowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  rowLabel: {
    width: 54,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  scrollList: {
    flexDirection: 'row',
    gap: 6,
    paddingRight: SPACING.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.surfaceLeaf,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryDark,
  },
  chipText: {
    fontSize: 11,
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  chipTextActive: {
    color: COLORS.textLight,
    fontWeight: '700',
  },
});
