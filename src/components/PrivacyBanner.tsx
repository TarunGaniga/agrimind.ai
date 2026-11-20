import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

interface PrivacyBannerProps {
  compact?: boolean;
}

export const PrivacyBanner: React.FC<PrivacyBannerProps> = ({ compact = false }) => {
  const [expanded, setExpanded] = useState(false);

  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <Ionicons name="shield-checkmark" size={14} color={COLORS.primary} />
        <Text style={styles.compactText}>
          100% In-Memory • Zero External DB • Direct AI Only
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.headerRow}
        activeOpacity={0.8}
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.iconCircle}>
          <Ionicons name="shield-checkmark" size={18} color={COLORS.primary} />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>AgriMind Privacy Guarantee</Text>
          <Text style={styles.headerSubtitle}>
            Zero telemetry • In-memory only • Fresh sessions
          </Text>
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={COLORS.textSecondary}
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.expandedContent}>
          <View style={styles.divider} />
          <View style={styles.ruleItem}>
            <Ionicons name="cloud-offline-outline" size={16} color={COLORS.primary} />
            <Text style={styles.ruleText}>
              <Text style={styles.ruleBold}>Zero External Database:</Text> No cloud database, analytics, contacts, or GPS permissions.
            </Text>
          </View>
          <View style={styles.ruleItem}>
            <Ionicons name="refresh-circle-outline" size={16} color={COLORS.primary} />
            <Text style={styles.ruleText}>
              <Text style={styles.ruleBold}>Fresh & Stateless:</Text> Starts clean every launch. No logs stored on external servers.
            </Text>
          </View>
          <View style={styles.ruleItem}>
            <Ionicons name="key-outline" size={16} color={COLORS.primary} />
            <Text style={styles.ruleText}>
              <Text style={styles.ruleBold}>Direct Gemini Connection:</Text> Makes calls straight to Google Gemini using your local key.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceLeaf,
    paddingVertical: 5,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  compactText: {
    fontSize: 11,
    color: COLORS.primaryDark,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceLeaf,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  headerSubtitle: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.sm,
  },
  expandedContent: {
    marginTop: SPACING.xs,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
    gap: 8,
  },
  ruleText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  ruleBold: {
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});
