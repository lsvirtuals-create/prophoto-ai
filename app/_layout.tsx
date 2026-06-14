import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerStyle: { backgroundColor: '#171717' }, headerTintColor: '#fff' }} />
      <StatusBar style="light" />
    </>
  );
}