import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View , ScrollView , SafeAreaView } from 'react-native';
//import UserDetailsForm from './app/in';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import LoginScreen from './app/LoginScreen.js'
import MainScreen from './screens/MainScreen.js';
import SelectCourse from './screens/SelectCourse.js';
import FinalLogin from './screens/FinalLogin.js'
import LoginScreen from './screens/LoginScreen.js';



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
<SafeAreaView className='flex-1'>
  <NavigationContainer>
    <Stack.Navigator 
    initialRouteName={ true ? "Login" : "Course"}
    screenOptions={{headerShown: false}}>
      <Stack.Screen name="Course" component={SelectCourse}/>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Final" component={FinalLogin}/>
      <Stack.Screen name="Main" component={MainScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
  <StatusBar style="auto" />
</SafeAreaView>
  );
}
