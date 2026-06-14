import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function GalleryScreen() {
  return (
    <View className="flex-1 bg-neutral-950 p-6">
      <Text className="text-3xl font-bold text-white mb-6">My Gallery</Text>
      <Text className="text-neutral-400">Generated photos will appear here.</Text>
      {/* Implement persistent storage with AsyncStorage or similar later */}
    </View>
  );
}