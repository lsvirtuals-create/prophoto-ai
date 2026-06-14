import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useStore } from '../../store';

export default function SettingsScreen() {
  const apiKey = useStore((state) => state.apiKey);
  const setApiKey = useStore((state) => state.setApiKey);
  const [inputKey, setInputKey] = useState(apiKey);

  const saveKey = () => {
    setApiKey(inputKey);
    Alert.alert('Saved', 'Replicate API key saved securely in app state.');
  };

  return (
    <View className="flex-1 bg-neutral-950 p-6">
      <Text className="text-3xl font-bold text-white mb-8">Settings</Text>
      
      <Text className="text-neutral-400 mb-2">Replicate API Key</Text>
      <TextInput
        value={inputKey}
        onChangeText={setInputKey}
        placeholder="r8_xxxxxxxxxxxxxxxx"
        className="bg-neutral-900 text-white p-4 rounded-xl mb-4"
        secureTextEntry
      />
      <TouchableOpacity onPress={saveKey} className="bg-emerald-500 py-4 rounded-2xl">
        <Text className="text-white text-center font-semibold">Save API Key</Text>
      </TouchableOpacity>
      
      <Text className="text-neutral-500 mt-8 text-sm">
        Get key at: https://replicate.com/account/api-tokens
        
        Recommended: Use FLUX.1 dev or a fine-tuned headshot LoRA for best results.
      </Text>
    </View>
  );
}