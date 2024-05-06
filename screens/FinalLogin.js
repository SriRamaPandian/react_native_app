import React from 'react';
import { View , Text , Button , StyleSheet , ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const FinalLogin = ({ navigation }) => {
  return (
    <LinearGradient 
      className='flex-1 justify-center items-center'
      colors={['#3D52AD','#7091E6','#8697C4','#ADBBDA','#EDE8F5']}>
      <ScrollView>  
        <View className='justify-center items-center p-{30} h-{1200}'>
            <Text className='text-2x1 font-bold'>
                FinalLogin
            </Text>
            <Button
                title="next"
                onPress={() => navigation.push("Login")} />
        </View>
      </ScrollView>
    </LinearGradient>
  )
}
export default FinalLogin;

const styles = StyleSheet.create({
  innercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    height: 1200,
  },
});