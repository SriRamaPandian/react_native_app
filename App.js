import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectCourse from './screens/SelectCourse.js';
import FinalLogin from './screens/FinalLogin.js'
import LoginScreen from './screens/LoginScreen.js';
import Searchpage from './screens/Searchpage.js';
import Display from './screens/Display.js';
import Drawerpage from './screens/Drawerpage.js';



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
    }
  };

return (
<SafeAreaView className='flex-1'>
  <NavigationContainer>
    <Stack.Navigator 
    initialRouteName={true ? "Drawer" : "Login"}
    screenOptions={{headerShown: false}}>
      <Stack.Screen name="Course" component={SelectCourse}/>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Final" component={FinalLogin}/>
      <Stack.Screen name="Drawer" component={Drawerpage}/>
      <Stack.Screen name="Search" component={Searchpage}/>      
      <Stack.Screen name="Display" component={Display}/>      
    </Stack.Navigator>
  </NavigationContainer>
  <StatusBar style="auto" />
</SafeAreaView>
  );
}
