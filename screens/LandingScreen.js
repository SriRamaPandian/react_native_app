import React from 'react';
import { View , Text , StyleSheet , ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const LandingScreen = () => {
  return (
    <LinearGradient 
      className='flex-1 justify-center items-center'
      colors={['#3D52AD','#7091E6','#8697C4','#ADBBDA','#EDE8F5']}>
      <ScrollView>  
        <View className='container'>
          <Text className='text-2x1 font-bold'>
              LANDINGPAGE
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
  export default LandingScreen;

  const styles = StyleSheet.create({
    innercontainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
      height: 1200,
    },
  });
