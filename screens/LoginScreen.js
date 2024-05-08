import React, { useState } from 'react';
import { View, Text ,TextInput, TouchableOpacity , StyleSheet, Alert , SafeAreaView , Image , ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Logo from '../assets/e-learn.jpeg';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
//import { ScrollView } from 'react-native-gesture-handler';


const LoginScreen = ({ navigation }) => {
  const [rollno, setrollno] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [year, setyear] = useState('');
  const [sem, setsem] = useState('');
  const [dept,setdept] = useState(null);
  const [n,setn] = useState('');

  //const navigation = useNavigation();

  const handleRegistration = async () => {
    try {
      const postresponse = await axios.post('http://192.168.166.200:3000/login', {
        rollno,
        username,
        email,
        password,
        year,
        sem,
        dept,
      });

      const getresponse = await axios.get('http://192.168.166.200:3000/count',
      {
        params:{
          rollno: rollno
        }
      });
      setn(getresponse.data);

      // Assuming the backend responds with a success message upon successful registration
      if (postresponse.data.message === 'User registered successfully') {
        await AsyncStorage.setItem('isLoggedIn','true');
        Alert.alert('Success', 'Account created successfully.');
        console.log(n);
        navigation.navigate("Course",{rollno , n });
        // Navigate to the login screen upon successful registration
        
      }
    } catch (error) {
      console.error('Error occurred during registration:', error.message);
      Alert.alert('Error', 'An error occurred while registering. Please try again later.');
    }
    
  };

  return (  
    <LinearGradient
       colors={['#3D52AD','#7091E6','#8697C4','#ADBBDA','#EDE8F5']}>
       <ScrollView>
          <View className='container justify-center items-center h-[1200]'>
            <Image
            source={Logo}
            className='w-1/2 max-w-[200] max-h-[200] m-[70] mt-[10]'/>
            <TextInput
              className='w-3/4 mb-[30] p-[13] border-2 border-black bg-white rounded-xl text-black'
              placeholder="Username"
              placeholderTextColor={'#000000'}
              onChangeText={text => setUsername(text)}
              value={username}
            />
            <TextInput
              className='w-3/4 mb-[30] p-[13] border-2 border-black bg-white rounded-xl text-black'
              placeholder="Email"
              placeholderTextColor={'#000000'}
              onChangeText={text => setEmail(text)}
              value={email}
              keyboardType="email-address"
            />
            <TextInput
              className='w-3/4 mb-[30] p-[13] border-2 border-black bg-white rounded-xl text-black'
              placeholder="Password"
              placeholderTextColor={'#000000'}
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry
            />
            <TextInput
              className='w-3/4 mb-[30] p-[13] border-2 border-black bg-white rounded-xl text-black'
              placeholder="Rollno"
              placeholderTextColor={'#000000'}
              onChangeText={text => setrollno(text)}
              value={rollno}
              keyboardType="number-pad"
            />
            <TextInput
              className='w-3/4 mb-[30] p-[13] border-2 border-black bg-white rounded-xl text-black'
              placeholder="Year"
              placeholderTextColor={'#000000'}
              onChangeText={text => setyear(text)}
              value={year}
              keyboardType="number-pad"
            />
            <TextInput
              className='w-3/4 mb-[30] p-[13] border-2 border-black bg-white rounded-xl text-black'
              placeholder="Sem"
              placeholderTextColor={'#000000'}
              onChangeText={text => setsem(text)}
              value={sem}
              keyboardType="number-pad"
            />
            <View className='w-3/4 mb-[60] border-2 border-black bg-white rounded-xl text-black'>
            {dept === null ? (
              <Picker
                selectedValue={dept}
                onValueChange={(itemValue) => setdept(itemValue)}>
                <Picker.Item label="Department" value={null} />
                <Picker.Item label="CSE" value="CSE" />
                <Picker.Item label="MECH" value="MECH" />
                <Picker.Item label="ECE" value="ECE" />
              </Picker>) : (
              <Picker
                selectedValue={dept}
                onValueChange={(itemValue) => setdept(itemValue)}>
                <Picker.Item label="CSE" value="CSE" />
                <Picker.Item label="MECH" value="MECH" />
                <Picker.Item label="ECE" value="ECE" />
              </Picker>)}
            </View>
            <TouchableOpacity
            className='w-1/2 mb-[30] p-[20] border bg-white rounded-full text-black justify-center items-center bg-cyan-400'  
            onPress={handleRegistration} >
              <Text>CREATE ACCOUNT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
    </LinearGradient>
  );
};

export default LoginScreen;
