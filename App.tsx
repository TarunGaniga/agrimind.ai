import React from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';
import { COLORS } from './src/constants/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" backgroundColor={COLORS.surface} />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
});
