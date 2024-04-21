import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert , SafeAreaView , Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Logo from '../assets/e-learn.jpeg';
import { Picker } from '@react-native-picker/picker';


const LoginScreen = ({ navigation }) => {
  const [rollno, setrollno] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [year, setyear] = useState('');
  const [sem, setsem] = useState('');
  const [dept,setdept] = useState('');


  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://192.168.189.200:3000/login', {
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
        navigation.navigate('Course');
      }
    } catch (error) {
      console.error('Error occurred during registration:', error.message);
      Alert.alert('Error', 'An error occurred while registering. Please try again later.');
    }
     
  };

  return (
    <SafeAreaView style={styles.body}>
    <View style={styles.container}>
      <Image
      source={Logo}
      style={styles.logo}/>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Rollno"
        onChangeText={text => setrollno(text)}
        value={rollno}
        keyboardType="number-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Year"
        onChangeText={text => setyear(text)}
        value={year}
        keyboardType="number-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Sem"
        onChangeText={text => setsem(text)}
        value={sem}
        keyboardType="number-pad"
      />
      <Picker
        selectedValue={dept}
        style={styles.input}
        onValueChange={(itemValue) => setdept(itemValue)}
      >
        <Picker.Item label="CSE" value="CSE" />
        <Picker.Item label="MECH" value="MECH" />
        <Picker.Item label="ECE" value="ECE" />
      </Picker>
      <Button
      style={styles.button}  
      title="Register" onPress={handleRegistration} />
    </View>
    </SafeAreaView>
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
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    height: '100%',
    width: '100%',
  },
  body: {
    fontfamily: 'Arial',
    backgroundColor: '#BEFCFE',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifycontent: 'center',
    alignitems: 'center',
    height: 1000,
    width: '100%',
  },
  input: {
    width: '80%',
    marginBottom: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    backgroundColor: '#B437FB',
    color: '#AAFDA5',
  },
  button: {
    width: '100%',
    padding: 10,
    border: 'none',
    borderradius: 5,
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
});

export default LoginScreen;
