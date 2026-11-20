import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { ChatMessage } from '../types';
import { FormattedAIResponse } from './FormattedAIResponse';

interface ChatBubbleProps {
  message: ChatMessage;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const timeString = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View
      style={[
        styles.row,
        isUser ? styles.rowUser : styles.rowAi,
      ]}
    >
      {!isUser && (
        <View style={styles.aiAvatar}>
          <Ionicons name="leaf" size={16} color={COLORS.textLight} />
        </View>
      )}

      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.aiBubble,
          message.isError && styles.errorBubble,
        ]}
      >
        {/* Attached context badge on user message */}
        {isUser && message.context && (message.context.season || message.context.soil) && (
          <View style={styles.contextBadge}>
            <Ionicons name="pricetag-outline" size={11} color="#C8E6C9" />
            <Text style={styles.contextBadgeText}>
              {[
                message.context.season ? `${message.context.season} Season` : null,
                message.context.soil ? `${message.context.soil} Soil` : null,
              ]
                .filter(Boolean)
                .join(' • ')}
            </Text>
          </View>
        )}

        {isUser ? (
          <Text style={styles.userText}>{message.text}</Text>
        ) : (
          <FormattedAIResponse content={message.text} />
        )}

        <View style={styles.footerRow}>
          <Text
            style={[
              styles.timeText,
              isUser ? styles.timeTextUser : styles.timeTextAi,
            ]}
          >
            {timeString}
          </Text>
          {!isUser && (
            <View style={styles.aiTag}>
              <Ionicons name="sparkles" size={10} color={COLORS.primary} />
              <Text style={styles.aiTagText}>AgriMind</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    marginVertical: SPACING.xs + 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  rowUser: {
    justifyContent: 'flex-end',
    paddingLeft: SPACING.xl,
  },
  rowAi: {
    justifyContent: 'flex-start',
    paddingRight: SPACING.xl,
  },
  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 4,
    ...SHADOWS.subtle,
  },
  bubble: {
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md - 2,
    paddingHorizontal: SPACING.md,
    maxWidth: '92%',
  },
  userBubble: {
    backgroundColor: COLORS.userBubble,
    borderBottomRightRadius: RADIUS.xs,
    ...SHADOWS.subtle,
  },
  aiBubble: {
    backgroundColor: COLORS.aiBubble,
    borderBottomLeftRadius: RADIUS.xs,
    borderWidth: 1,
    borderColor: COLORS.aiBubbleBorder,
    ...SHADOWS.card,
  },
  errorBubble: {
    borderColor: COLORS.error,
    backgroundColor: COLORS.errorLight,
  },
  contextBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
    gap: 4,
    marginBottom: 6,
  },
  contextBadgeText: {
    fontSize: 10,
    color: '#E8F5E9',
    fontWeight: '700',
  },
  userText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.userBubbleText,
    fontWeight: '500',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  timeText: {
    fontSize: 10,
  },
  timeTextUser: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  timeTextAi: {
    color: COLORS.textMuted,
  },
  aiTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: COLORS.surfaceLeaf,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: RADIUS.xs,
  },
  aiTagText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
});
