import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage from the appropriate package

// Import your components/screens
import LoginScreen from './loginscreen';
import LandingScreen from './landingscreen.js'; // Example landing page component

const check = () => {
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        // User is logged in, navigate to the landing page
        // Example: navigation.navigate('Landing');
        console.log('User is already logged in');
      }
    } catch (error) {
      console.error('Error occurred while checking login status:', error.message);
      // Handle error
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* You can conditionally render the login screen or landing screen based on the login status */}
      {/* Example: */}
      {/* {isLoggedIn ? <LandingScreen /> : <LoginScreen />} */}
      <Text>App Content</Text>
    </View>
  );
};

export default check;