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
  const [dept,setdept] = useState('');

  //const navigation = useNavigation();

  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://192.168.14.200:3000/login', {
        rollno,
        username,
        email,
        password,
        year,
        sem,
        dept,
      });

      // Assuming the backend responds with a success message upon successful registration
      if (response.data.message === 'User registered successfully') {
        await AsyncStorage.setItem('isLoggedIn','true');
        Alert.alert('Success', 'Account created successfully.');
        // Navigate to the login screen upon successful registration
        
      }
    } catch (error) {
      console.error('Error occurred during registration:', error.message);
      Alert.alert('Error', 'An error occurred while registering. Please try again later.');
    }
    navigation.replace("Course",{rollno});
  };

  return (
    <LinearGradient 
       style={styles.container}
       colors={['#3D52AD','#7091E6','#8697C4','#ADBBDA','#EDE8F5']}>
       <ScrollView>
          <View style={styles.innercontainer}>
            <Image
            source={Logo}
            style={styles.logo}/>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={'#000000'}
              onChangeText={text => setUsername(text)}
              value={username}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={'#000000'}
              onChangeText={text => setEmail(text)}
              value={email}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={'#000000'}
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Rollno"
              placeholderTextColor={'#000000'}
              onChangeText={text => setrollno(text)}
              value={rollno}
              keyboardType="number-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Year"
              placeholderTextColor={'#000000'}
              onChangeText={text => setyear(text)}
              value={year}
              keyboardType="number-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Sem"
              placeholderTextColor={'#000000'}
              onChangeText={text => setsem(text)}
              value={sem}
              keyboardType="number-pad"
            />
            <View style={styles.drop}>
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
            style={styles.button}  
            onPress={handleRegistration} >
              <Text>CREATE ACCOUNT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: '50%',
    maxWidth: 300,
    maxHeight: 150,
    margin: '30%',
    padding: 60,
  },
  innercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  container: {
    flex: 1,
    overflow: 'visible',
    height: 1200,
    width: 200,
  },
  input: {
    width: '80%',
    marginBottom: 30,
    padding: 13,
    borderWidth: 3,
    borderColor: '#03182F',
    backgroundColor: '#fff',
    borderRadius: 15,
    color: '#03182F',
  },
  drop: {
    width: '80%',
    marginBottom: 30,
    padding: 0,
    borderWidth: 3,
    borderColor: '#03182F',
    backgroundColor: '#fff',
    borderRadius: 15,
    color: '#000000',
  },
  button: {
    width: '50%',
    alignItems: 'center',
    padding: 10,
    borderWidth: 2.5,
    borderRadius: 15,
    backgroundColor: '#5AB9EA',
    color: '#fff',
    cursor: 'pointer',
  },
  
});

export default LoginScreen;
