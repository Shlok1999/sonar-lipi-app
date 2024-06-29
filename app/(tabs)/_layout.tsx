import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name='index'/>
      <Stack.Screen name='Dashboard'/>
      <Stack.Screen name="composition/[filename]" options={{ title: 'composition' }} />
    </Stack>
  );
}