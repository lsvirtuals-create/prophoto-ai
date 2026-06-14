import { Tabs } from 'expo-router';
import { Camera, Image, Settings, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{ title: 'Generate', tabBarIcon: ({ color }) => <Camera color={color} /> }} />
      <Tabs.Screen name="gallery" options={{ title: 'Gallery', tabBarIcon: ({ color }) => <Image color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color }) => <Settings color={color} /> }} />
    </Tabs>
  );
}