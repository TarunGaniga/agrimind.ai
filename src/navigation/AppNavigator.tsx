import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ChatScreen } from '../screens/ChatScreen';
import { CropReferenceScreen } from '../screens/CropReferenceScreen';
import { RootTabParamList } from '../types';
import { COLORS } from '../constants/theme';

const Tab = createBottomTabNavigator<RootTabParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="AgriChat"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tab.Screen
        name="AgriChat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Agri Chat',
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <Ionicons
                name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
                size={size || 22}
                color={focused ? COLORS.primary : color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CropSeasonReference"
        component={CropReferenceScreen}
        options={{
          tabBarLabel: 'Crop Season Reference',
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <Ionicons
                name={focused ? 'book' : 'book-outline'}
                size={size || 22}
                color={focused ? COLORS.primary : color}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    height: 64,
    paddingBottom: 8,
    paddingTop: 6,
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  tabBarItem: {
    paddingVertical: 2,
  },
  iconWrapper: {
    padding: 3,
    borderRadius: 8,
  },
  iconWrapperActive: {
    backgroundColor: COLORS.surfaceLeaf,
  },
});
