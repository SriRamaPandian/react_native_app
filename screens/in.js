import React, { useState } from 'react';
import { View, TextInput, Button , Text , StyleSheet } from 'react-native';
import axios from 'axios';



const UserDetailsForm = () => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [info, setinfo] = useState('');
  const [isVisible, setIsVisible] = useState(false);


  const handleNameChange = (text) => {
    setName(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleSubmit = () => {
    axios.post('http://localhost:3000/login',{name,email})
      .then(response => {
        console.log(response.data);
        // Handle success, maybe clear form fields or show a success message
      })
      .catch(error => {
        console.error('Error inserting data:', error);
        // Handle error, maybe show an error message to the user
      });
      setinfo('Data inserted!!!')
    setIsVisible(!isVisible);
  };

  return (
    <View style={styles.a}>
      <TextInput
      style={styles.na}
        placeholder="Enter your name"
        onChangeText={handleNameChange}
        value={name}
      />
      <TextInput
      style={styles.ma}
        placeholder="Enter your email"
        onChangeText={handleEmailChange}
        value={email}
        keyboardType="email-address"
      />
      <Button title="Submit" onPress={handleSubmit} />
      {isVisible && <Text>{info}</Text>}
      <Text>{name}{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    na: {
      backgroundColor: '#79ff4d',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
    },
    ma: {
        backgroundColor: '#33d6ff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
      },
      a: {
        backgroundColor: '#A7FEED',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
      },
  });
export default UserDetailsForm;