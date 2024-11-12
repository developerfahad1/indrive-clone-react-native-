import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { router, useLocalSearchParams } from 'expo-router';
import * as Location from 'expo-location';
SplashScreen.preventAutoHideAsync();
export default function LocationPermissionScreen() {
  const [location, setLocation] = useState<null | object>(null);
  const [currentCity,setCurrentCity] = useState<string>('')
  const handleEnableLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const apiKey = "AlzaSyqcM2y85JecIqQm1XJgzVmfsmuKPtesB3b"; // Replace with your API key
      const url = `https://maps.gomaps.pro/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        const addressComponents = data.results[0].address_components;
        const city = addressComponents.find((component:any) =>
          component.types.includes("locality")
        );
        city && setCurrentCity(city.long_name);
        router.push(`/confirmCity?city=${encodeURIComponent(city.long_name)}`);
      } else {
        console.error("Geocoding error:", data.status);
        return "Error in retrieving city";
      }
    } catch (error) {
      Alert.alert('Could not fetch location');
    }
  };
  const handleSkip = () => {
    Alert.alert("Please enable location services to proceed!")
  };
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
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
        <Image source={require('../assets/images/undraw_Location_tracking_re_n3ok-removebg.png')} style={styles.image} />
        <Text style={styles.title}>Turn your location on</Text>
        <Text style={styles.description}>
          You’ll be able to find yourself on the map, and drivers will be able to find you at the pickup point
        </Text>
      </View>

      {/* Title */}

      {/* Description */}

      {/* Buttons */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.enableButton} onPress={handleEnableLocation}>
          <Text style={styles.enableButtonText}>Enable location services</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
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
    justifyContent: 'center',
    padding: 20,
    position: 'relative'
  },
  imageContainer: {
    alignItems: 'center',
    position: 'absolute',
    top: 100
  },
  image: {
    marginBottom: 20,
    width: 250, // Adjust size according to your image
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
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
    color: '#1A1A1A',
    fontWeight: 'bold',
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
  },
  buttonWrapper: { width: '100%', position: 'absolute', bottom: 20 }
});