import React, { useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';
import { useFonts } from 'expo-font';
import { NotoSansEthiopic_100Thin,
  NotoSansEthiopic_200ExtraLight,
  NotoSansEthiopic_300Light,
  NotoSansEthiopic_400Regular,
  NotoSansEthiopic_500Medium,
  NotoSansEthiopic_600SemiBold,
  NotoSansEthiopic_700Bold,
  NotoSansEthiopic_800ExtraBold,
  NotoSansEthiopic_900Black, } from '@expo-google-fonts/noto-sans-ethiopic';
import * as SplashScreen from 'expo-splash-screen';
import { router, useLocalSearchParams } from 'expo-router';
SplashScreen.preventAutoHideAsync();
export default function LocationPermissionScreen() {
  const {city} = useLocalSearchParams();
  console.log(city);
  const handleEnableLocation = () => {
    router.push("/final")
  };

  const handleSkip = () => {
    Alert.alert("Don't Lie!")
  };
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    NotoSansEthiopic_400Regular,
    NotoSansEthiopic_500Medium,
    NotoSansEthiopic_600SemiBold,
    NotoSansEthiopic_700Bold,
  });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      {/* Illustration */}
      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/undraw_My_current_location_re_whmt (2).png')} style={styles.image} />
        <Text style={styles.title}>Are you in {city}?</Text>
      </View>

      {/* Buttons */}
      <View style={{ width: '100%' }}>
        <TouchableOpacity style={styles.enableButton} onPress={handleEnableLocation}>
          <Text style={styles.enableButtonText}>Yes, I'm here</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1f24', // Dark background color
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  imageContainer: {
    marginBottom: 180,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250, // Adjust size according to your image
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 24,
    fontFamily: 'OpenSans_700Bold',
  },
  description: {
    fontSize: 16,
    color: '#A9A9A9',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  enableButton: {
    backgroundColor: '#9ed90d',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  enableButtonText: {
    color: '#2d3d2c',
    // fontFamily: 'OpenSans_600SemiBold',
    fontFamily: 'NotoSansEthiopic_600SemiBold',
    fontSize: 16,
  },
  skipButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  skipButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'NotoSansEthiopic_600SemiBold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});