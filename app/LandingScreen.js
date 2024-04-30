import React from 'react';
import { View , Text , StyleSheet } from 'react-native';


const LandingScreen = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.input}>
            LANDINGPAGE
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 250,
      height: 500,
      width: 500,
      backgroundColor:'blue',
      overflow: 'scroll',
      alignItems: 'center',
      justifyContent: 'space-evenly',
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
  });
  
  export default LandingScreen;
