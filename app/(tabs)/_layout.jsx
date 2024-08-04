import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRoute } from '@react-navigation/native';

import { Stack } from 'expo-router';


export default function TabLayout() {
  const route = useRoute()
  const { name } = route.params || {}; // Ensure params are defined
  const decodedFilename = decodeURIComponent(name || ""); // Handle undefined name

  return (
    <Stack>
      <Stack.Screen name='index'/>
      <Stack.Screen name='Dashboard'/>
      <Stack.Screen name="composition/[filename]" options={{ title: decodedFilename }} />
    </Stack>
  );
}