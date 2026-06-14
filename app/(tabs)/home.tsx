import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useStore } from '../../store';

export default function HomeScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const apiKey = useStore((state) => state.apiKey);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant gallery access');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setGeneratedImage(null);
    }
  };

  const generateProfessional = async () => {
    if (!selectedImage) {
      Alert.alert('No image', 'Please select a sample photo first');
      return;
    }
    if (!apiKey) {
      Alert.alert('API Key Missing', 'Add your Replicate API key in Settings');
      return;
    }

    setLoading(true);

    try {
      // Convert image to base64 for API (or use URL if hosted)
      // For demo, we'll use a placeholder prompt. In production, upload image or use Replicate's file handling
      const prompt = `professional studio headshot of the person in the photo, business attire, clean background, sharp details, high resolution, LinkedIn style`;

      const response = await axios.post('https://api.replicate.com/v1/predictions', {
        version: 'black-forest-labs/flux-dev', // or a fine-tuned version
        input: {
          prompt: prompt,
          image: selectedImage, // Note: In real impl, upload image first or use proper input
          num_outputs: 1,
          guidance_scale: 3.5,
        }
      }, {
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': 'application/json',
        }
      });

      // Poll for result if needed (Replicate is async)
      // Simplified here
      setGeneratedImage(response.data.output ? response.data.output[0] : null);
    } catch (error) {
      console.error(error);
      Alert.alert('Generation Failed', 'Check API key and internet connection. Try a different model if needed.');
    }
    setLoading(false);
  };

  return (
    <ScrollView className="flex-1 bg-neutral-950 p-6">
      <Text className="text-4xl font-bold text-white mb-8 text-center">ProPhoto AI</Text>
      
      <TouchableOpacity 
        onPress={pickImage}
        className="bg-cyan-500 py-4 rounded-2xl mb-6 active:bg-cyan-600"
      >
        <Text className="text-white text-center font-semibold text-lg">📸 Pick Sample Photo</Text>
      </TouchableOpacity>

      {selectedImage && (
        <View className="items-center mb-6">
          <Text className="text-white mb-2">Original Sample</Text>
          <Image source={{ uri: selectedImage }} className="w-72 h-72 rounded-3xl" />
        </View>
      )}

      <TouchableOpacity 
        onPress={generateProfessional}
        disabled={loading || !selectedImage}
        className="bg-white py-4 rounded-2xl active:bg-gray-200 disabled:opacity-50"
      >
        <Text className="text-neutral-900 text-center font-semibold text-lg">
          {loading ? 'Generating Magic...' : '✨ Generate Professional Version'}
        </Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#22d3ee" className="mt-6" />}

      {generatedImage && (
        <View className="items-center mt-8">
          <Text className="text-white mb-2">Professional Result</Text>
          <Image source={{ uri: generatedImage }} className="w-72 h-72 rounded-3xl" />
        </View>
      )}
    </ScrollView>
  );
}