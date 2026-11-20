import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { OFFLINE_CROPS } from '../constants/cropData';
import { CropItem, RootTabParamList, SeasonType } from '../types';
import { TRANSLATIONS, SupportedLanguage } from '../constants/translations';
import { LanguageSelector } from '../components/LanguageSelector';

type NavigationProp = BottomTabNavigationProp<RootTabParamList, 'CropSeasonReference'>;

type FilterTab = 'All' | SeasonType;

export const CropReferenceScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedTab, setSelectedTab] = useState<FilterTab>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCropId, setExpandedCropId] = useState<string | null>(null);
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  const t = TRANSLATIONS[language];

  const TABS: { key: FilterTab; label: string; period: string }[] = [
    { key: 'All', label: t.allCrops, period: 'Kharif, Rabi, Zaid' },
    { key: 'Kharif', label: t.seasons.kharif, period: 'Jun – Oct' },
    { key: 'Rabi', label: t.seasons.rabi, period: 'Oct – Mar' },
    { key: 'Zaid', label: t.seasons.zaid, period: 'Mar – Jun' },
  ];

  const filteredCrops = useMemo(() => {
    return OFFLINE_CROPS.filter((crop) => {
      const matchesSeason =
        selectedTab === 'All' || crop.season === selectedTab;

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        crop.name.toLowerCase().includes(query) ||
        crop.hindiName.toLowerCase().includes(query) ||
        crop.soilSuitability.toLowerCase().includes(query) ||
        crop.commonDiseases.toLowerCase().includes(query);

      return matchesSeason && matchesQuery;
    });
  }, [selectedTab, searchQuery]);

  const handleAskAI = (crop: CropItem) => {
    navigation.navigate('AgriChat', {
      initialPrompt: crop.quickPrompt,
      initialContext: {
        season: crop.season,
        soil: crop.soilSuitability.includes('Black')
          ? 'Black'
          : crop.soilSuitability.includes('Alluvial')
          ? 'Alluvial'
          : crop.soilSuitability.includes('Sandy')
          ? 'Sandy'
          : crop.soilSuitability.includes('Loam')
          ? 'Loamy'
          : null,
      },
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedCropId((prev) => (prev === id ? null : id));
  };

  const renderCropCard = ({ item }: { item: CropItem }) => {
    const isExpanded = expandedCropId === item.id;
    const isKharif = item.season === 'Kharif';
    const isRabi = item.season === 'Rabi';

    const seasonBadgeStyle = isKharif
      ? styles.badgeKharif
      : isRabi
      ? styles.badgeRabi
      : styles.badgeZaid;

    const seasonTextStyle = isKharif
      ? styles.badgeTextKharif
      : isRabi
      ? styles.badgeTextRabi
      : styles.badgeTextZaid;

    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.cardHeader}
          onPress={() => toggleExpand(item.id)}
          activeOpacity={0.8}
        >
          <View style={styles.headerTitleCol}>
            <View style={styles.titleRow}>
              <Text style={styles.cropName}>{item.name}</Text>
              <View style={[styles.seasonBadge, seasonBadgeStyle]}>
                <Text style={[styles.seasonBadgeText, seasonTextStyle]}>
                  {item.season}
                </Text>
              </View>
            </View>
            <Text style={styles.hindiName}>{item.hindiName}</Text>
          </View>
          <Ionicons
            name={isExpanded ? 'chevron-up-circle' : 'chevron-down-circle-outline'}
            size={22}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <View style={styles.highlightRow}>
          <View style={styles.highlightItem}>
            <Ionicons name="calendar-outline" size={14} color={COLORS.primary} />
            <Text style={styles.highlightLabel} numberOfLines={1}>
              {item.sowingMonths}
            </Text>
          </View>
          <View style={styles.highlightItem}>
            <Ionicons name="earth" size={14} color={COLORS.soilBrown} />
            <Text style={styles.highlightLabel} numberOfLines={1}>
              {item.soilSuitability.split(';')[0]}
            </Text>
          </View>
        </View>

        {isExpanded && (
          <View style={styles.expandedDetails}>
            <View style={styles.divider} />
            <Text style={styles.cropDescription}>{item.description}</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailKey}>{t.cropFields.harvesting}</Text>
              <Text style={styles.detailVal}>{item.harvestingMonths}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailKey}>{t.cropFields.water}</Text>
              <Text style={styles.detailVal}>{item.rainfallWater}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailKey}>{t.cropFields.npk}</Text>
              <Text style={styles.detailVal}>{item.keyFertilizers}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailKey}>{t.cropFields.diseases}</Text>
              <Text style={styles.detailVal}>{item.commonDiseases}</Text>
            </View>

            <View style={styles.priceBox}>
              <Ionicons name="cash-outline" size={16} color={COLORS.amberHarvest} />
              <View style={styles.priceTextWrap}>
                <Text style={styles.priceBoxTitle}>{t.cropFields.price}</Text>
                <Text style={styles.priceBoxValue}>{item.typicalPriceRange}</Text>
              </View>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.askAiButton}
          onPress={() => handleAskAI(item)}
          activeOpacity={0.85}
        >
          <Ionicons name="sparkles" size={16} color={COLORS.textLight} />
          <Text style={styles.askAiButtonText}>
            {t.askAiAbout} {item.name.split('/')[0].trim()}
          </Text>
          <Ionicons name="arrow-forward" size={15} color={COLORS.textLight} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/agricultural-land-bg.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.backdropOverlay} />
      <View style={styles.screen}>
        {/* Screen Header */}
        <View style={styles.header}>
          <View style={styles.headerTitleWrap}>
            <Ionicons name="book" size={20} color={COLORS.primary} />
            <Text style={styles.headerTitle}>{t.offlineGuideTitle}</Text>
          </View>
          <View style={styles.offlineBadge}>
            <Ionicons name="checkmark-circle" size={13} color={COLORS.success} />
            <Text style={styles.offlineBadgeText}>{t.offlineBadge}</Text>
          </View>
        </View>

        {/* Multilingual Selector */}
        <LanguageSelector
          currentLanguage={language}
          onSelectLanguage={setLanguage}
        />

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={COLORS.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder={t.searchPlaceholder}
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Season Tabs Filter */}
        <View style={styles.tabsRow}>
          {TABS.map((tab) => {
            const isActive = selectedTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
                onPress={() => setSelectedTab(tab.key)}
                activeOpacity={0.75}
              >
                <Text
                  style={[styles.tabButtonText, isActive && styles.tabButtonTextActive]}
                  numberOfLines={1}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Crops List */}
        <FlatList
          data={filteredCrops}
          keyExtractor={(item) => item.id}
          renderItem={renderCropCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.subtle,
  },
  headerTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryDark,
    letterSpacing: 0.3,
  },
  offlineBadge: {
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
  offlineBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
    ...SHADOWS.subtle,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textPrimary,
    paddingVertical: 2,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    gap: 6,
    marginBottom: SPACING.xs,
  },
  tabButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryDark,
  },
  tabButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  tabButtonTextActive: {
    color: COLORS.textLight,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginVertical: 6,
    ...SHADOWS.card,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTitleCol: {
    flex: 1,
    marginRight: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  cropName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  seasonBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  badgeKharif: {
    backgroundColor: '#E8F5E9',
    borderColor: '#A5D6A7',
    borderWidth: 1,
  },
  badgeRabi: {
    backgroundColor: '#E1F5FE',
    borderColor: '#90CAF9',
    borderWidth: 1,
  },
  badgeZaid: {
    backgroundColor: '#FFF8E1',
    borderColor: '#FFE082',
    borderWidth: 1,
  },
  seasonBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  badgeTextKharif: { color: '#1B5E20' },
  badgeTextRabi: { color: '#0D47A1' },
  badgeTextZaid: { color: '#E65100' },
  hindiName: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  highlightRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 4,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  highlightLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    flex: 1,
  },
  expandedDetails: {
    marginTop: 6,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: 8,
  },
  cropDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 8,
  },
  detailRow: {
    marginVertical: 3,
  },
  detailKey: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  detailVal: {
    fontSize: 12,
    color: COLORS.textPrimary,
    marginTop: 1,
    lineHeight: 17,
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.amberLight,
    padding: SPACING.sm,
    borderRadius: RADIUS.sm,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  priceTextWrap: {
    flex: 1,
  },
  priceBoxTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.amberHarvest,
    textTransform: 'uppercase',
  },
  priceBoxValue: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 1,
  },
  askAiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.sm,
    marginTop: 10,
    ...SHADOWS.subtle,
  },
  askAiButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textLight,
  },
});
