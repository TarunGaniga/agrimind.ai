import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

interface FormattedAIResponseProps {
  content: string;
}

export const FormattedAIResponse: React.FC<FormattedAIResponseProps> = ({ content }) => {
  // Split lines and parse sections
  const lines = content.split('\n');

  const renderFormattedLine = (line: string, index: number) => {
    const trimmed = line.trim();

    if (!trimmed) {
      return <View key={index} style={styles.spacer} />;
    }

    // Check for Section Headers: e.g., (1) Season & Sowing, 1. Season, ### Season, **(1) Season...**
    const isSection1 = /(?:\(1\)|1\.|#+\s*\(?1\)?|\*\*\(?1\)?).*?(?:season|sowing)/i.test(trimmed);
    const isSection2 = /(?:\(2\)|2\.|#+\s*\(?2\)?|\*\*\(?2\)?).*?(?:fertilizer|nutrient|npk)/i.test(trimmed);
    const isSection3 = /(?:\(3\)|3\.|#+\s*\(?3\)?|\*\*\(?3\)?).*?(?:pest|disease|medicine|pesticide)/i.test(trimmed);
    const isSection4 = /(?:\(4\)|4\.|#+\s*\(?4\)?|\*\*\(?4\)?).*?(?:price|market|mandi|msp)/i.test(trimmed);

    // KVK Advisory notice badge detection
    const isKvkNotice = /(?:krishi vigyan kendra|kvk|dosage|verify exact dosage)/i.test(trimmed) && trimmed.length > 20;

    if (isSection1) {
      return (
        <View key={index} style={[styles.sectionHeader, styles.sectionHeaderSeason]}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.primary} />
          <Text style={styles.sectionHeaderText}>{cleanText(trimmed)}</Text>
        </View>
      );
    }

    if (isSection2) {
      return (
        <View key={index} style={[styles.sectionHeader, styles.sectionHeaderNutrient]}>
          <Ionicons name="flask-outline" size={16} color="#2E7D32" />
          <Text style={styles.sectionHeaderText}>{cleanText(trimmed)}</Text>
        </View>
      );
    }

    if (isSection3) {
      return (
        <View key={index} style={[styles.sectionHeader, styles.sectionHeaderPest]}>
          <Ionicons name="shield-checkmark-outline" size={16} color="#C62828" />
          <Text style={styles.sectionHeaderText}>{cleanText(trimmed)}</Text>
        </View>
      );
    }

    if (isSection4) {
      return (
        <View key={index} style={[styles.sectionHeader, styles.sectionHeaderPrice]}>
          <Ionicons name="cash-outline" size={16} color={COLORS.amberHarvest} />
          <Text style={styles.sectionHeaderText}>{cleanText(trimmed)}</Text>
        </View>
      );
    }

    // Highlighting KVK / dosage safety advisory
    if (isKvkNotice && (trimmed.startsWith('*') || trimmed.startsWith('-') || trimmed.includes('reminder:'))) {
      return (
        <View key={index} style={styles.kvkAlertBox}>
          <Ionicons name="alert-circle" size={16} color="#E65100" style={styles.alertIcon} />
          <View style={styles.kvkTextWrap}>
            <Text style={styles.kvkAlertTitle}>KVK Field Verification Advisory:</Text>
            <Text style={styles.kvkAlertBody}>{cleanText(trimmed.replace(/^[-*•]\s*/, ''))}</Text>
          </View>
        </View>
      );
    }

    // General bold / header line (e.g. ### Header or **Heading**)
    if (trimmed.startsWith('###') || (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length < 60)) {
      return (
        <Text key={index} style={styles.subHeading}>
          {cleanText(trimmed)}
        </Text>
      );
    }

    // Bullet point line
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      const bulletText = trimmed.replace(/^[-*•]\s+/, '');
      return (
        <View key={index} style={styles.bulletRow}>
          <View style={styles.bulletDot} />
          <View style={styles.bulletContent}>
            {renderInlineMarkdown(bulletText)}
          </View>
        </View>
      );
    }

    // Numbered list item
    const numberedMatch = trimmed.match(/^(\d+[\.\)])\s+(.*)/);
    if (numberedMatch) {
      return (
        <View key={index} style={styles.bulletRow}>
          <Text style={styles.numberedIndex}>{numberedMatch[1]}</Text>
          <View style={styles.bulletContent}>
            {renderInlineMarkdown(numberedMatch[2])}
          </View>
        </View>
      );
    }

    // Normal paragraph line
    return (
      <View key={index} style={styles.paragraphRow}>
        {renderInlineMarkdown(trimmed)}
      </View>
    );
  };

  return <View style={styles.container}>{lines.map(renderFormattedLine)}</View>;
};

/**
 * Strips markdown header hashes and outer bold markers for section titles
 */
function cleanText(text: string): string {
  return text
    .replace(/^#+\s*/, '')
    .replace(/^\*\*|\*\*$/g, '')
    .trim();
}

/**
 * Parses inline bold markdown (**text**)
 */
function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return (
    <Text style={styles.bodyText}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const boldContent = part.substring(2, part.length - 2);
          return (
            <Text key={i} style={styles.boldText}>
              {boldContent}
            </Text>
          );
        }
        return <Text key={i}>{part}</Text>;
      })}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
  },
  spacer: {
    height: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: RADIUS.sm,
    marginTop: 10,
    marginBottom: 6,
    borderLeftWidth: 4,
  },
  sectionHeaderSeason: {
    backgroundColor: '#E8F5E9',
    borderLeftColor: COLORS.primary,
  },
  sectionHeaderNutrient: {
    backgroundColor: '#F1F8E9',
    borderLeftColor: '#33691E',
  },
  sectionHeaderPest: {
    backgroundColor: '#FFEBEE',
    borderLeftColor: '#C62828',
  },
  sectionHeaderPrice: {
    backgroundColor: '#FFF8E1',
    borderLeftColor: COLORS.amberHarvest,
  },
  sectionHeaderText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: 0.2,
  },
  subHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primaryDark,
    marginTop: 8,
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 3,
    paddingLeft: 4,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginTop: 7,
    marginRight: 8,
  },
  numberedIndex: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    marginRight: 6,
    marginTop: 1,
  },
  bulletContent: {
    flex: 1,
  },
  paragraphRow: {
    marginVertical: 3,
  },
  bodyText: {
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.textPrimary,
  },
  boldText: {
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  kvkAlertBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF3E0',
    borderWidth: 1,
    borderColor: '#FFE0B2',
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
    marginVertical: 6,
  },
  alertIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  kvkTextWrap: {
    flex: 1,
  },
  kvkAlertTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#E65100',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  kvkAlertBody: {
    fontSize: 12,
    color: '#4E342E',
    lineHeight: 18,
  },
});
