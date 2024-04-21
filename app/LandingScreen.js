import React from 'react';
import { View , Text , StyleSheet } from 'react-native';


const LandingScreen = () => {
  return (
    <View style={styles.container}>
        <Text>
            LANDINGPAGE
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 250,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
  });
  
  export default LandingScreen;
