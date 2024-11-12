import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import "../global.css";
import { enableScreens } from 'react-native-screens';
export default function RootLayout() {
  enableScreens();
  return (
    <Stack>
      <Stack.Screen options={{headerShown : false,animation:"ios"}} name="index" />
      <Stack.Screen options={{headerShown : false,animation:"ios"}} name="login" />
      <Stack.Screen options={{headerShown : false,animation:"ios"}} name="register" />
      <Stack.Screen options={{headerShown : false,animation:"ios"}} name="profilesetup" />
      <Stack.Screen options={{headerShown : false,animation:"ios"}} name="city" />
      <Stack.Screen options={{headerShown : false,animation:"ios"}} name="confirmCity" />
      <Stack.Screen options={{headerShown : false,animation:"ios"}} name="final" />
    </Stack>
  );
}