import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View , ScrollView , SafeAreaView } from 'react-native';
//import UserDetailsForm from './app/in';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './app/LoginScreen.js'
import LandingScreen from './app/LandingScreen.js';
import SelectCourse from './app/SelectCourse.js';
import FinalLogin from './app/FinalLogin.js'


export default function App() {
  useEffect(() => {
    checkLoginStatus();
  }, []);
  
  const Stack = createStackNavigator();
  var check = false;
  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        //navigation.navigate('Landing');
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
    <ScrollView>
        <View>
        { false ? <LandingScreen /> : <LoginScreen />}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Landing" component= {LandingScreen} />
            <Stack.Screen name="Course" component= {SelectCourse} />
            <Stack.Screen name="Final" component= {FinalLogin} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
        </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 250,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  safe: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  back:{
    backgroundColor: '#9130D4',
    textDecorationColor: '#fff',
    textShadowColor: '#fff',
  },
});
