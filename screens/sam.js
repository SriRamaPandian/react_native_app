import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View , ScrollView , SafeAreaView } from 'react-native';
//import UserDetailsForm from './app/in';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import LoginScreen from './app/LoginScreen.js'
import LandingScreen from './app/LandingScreen.js';
import SelectCourse from './app/SelectCourse.js';
import FinalLogin from './app/FinalLogin.js'
import LoginScreen from './app/LoginScreen.js';



const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    checkLoginStatus();
  }, []);
  
  var check = false;
  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        check = true;
        console.log('User is already logged in',check);
      }
    } catch (error) {
      console.error('Error occurred while checking login status:', error.message);
      // Handle error
    }
  };

return (
<SafeAreaView>
  <View style={styles.container}>
    <Text>HEll0</Text>
  </View>   
  <StatusBar style="auto" />
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
