import { Tabs } from 'expo-router';
import { Camera, Image as ImageIcon, Settings } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarStyle: { backgroundColor: '#171717' }, tabBarActiveTintColor: '#22d3ee' }}>
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: 'Generate', 
          tabBarIcon: ({ color }) => <Camera size={24} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="gallery" 
        options={{ 
          title: 'Gallery', 
          tabBarIcon: ({ color }) => <ImageIcon size={24} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="settings" 
        options={{ 
          title: 'Settings', 
          tabBarIcon: ({ color }) => <Settings size={24} color={color} /> 
        }} 
      />
    </Tabs>
  );
}