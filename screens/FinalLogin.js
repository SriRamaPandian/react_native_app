import React, { useEffect , useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View , Text , TouchableOpacity , ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const FinalLogin = ({ navigation }) => {
  const route = useRoute();
  const { rollno } = route.params || {};

  return (
    <LinearGradient 
      className='flex-1'
      colors={['#1d9bb2','#ffffff']}>
      <ScrollView>
        <View className='justify-center items-center mt-[50] p-[30] h-[200]'>
          <Text className='text-5xl font-extrabold mt-16'>
              !!! Welcome !!!
          </Text>
          </View>
          <Text className='text-2xl font-bold'>
            
          </Text>
          <View className='ml-4 mr-4'>
          <View>
          <Text className=' text-center text-2xl font-extrabold'>
          You've successfully created an account!
          </Text>
          <Text className='text-2xl font-bold'>
            
          </Text>
          <Text className='text-xl font-semibold'>
          Ready for a learning adventure ?
          Here's what you can do
          </Text>
          <Text className='text-2xl font-bold'>
            
          </Text>
          </View>
          <View>
          <Text className='text-2xl font-medium ml-4'>
          * My Profile: Check and update your details.
          </Text>
          </View>
          <View>
          <Text className='text-2xl font-medium mt-6 ml-4' >
          * Discover Courses: Pick up your current lessons.
          </Text>
          </View>
          <View>
          <Text className='text-2xl font-medium mt-6 ml-4'>
          * What's New: Browse courses curated just for you.
          </Text>
          </View>
          <View>
          <Text className='text-2xl font-medium mt-6 ml-4'>
          * Your Activity: Track your recent uploads.
          </Text>
          <Text className='text-2xl font-bold'>
            
          </Text>
          <Text className='text-2xl font-bold'>
            
          </Text>

          </View>
          <View>
          <Text className='text-2xl font-semibold'>
          PRO TIP : Did you know you can save courses for watching it later? Perfect for learning on the go!
          </Text>
          </View>
        </View>
        <View className='justify-center items-center mt-[50] p-[20] h-[100]'>
          <Text className='text-4xl font-extrabold'>
          Happy Learning!!
          </Text>
        </View>
        <View className='justify-center items-center content-end h-[200] mt-8'>
          <TouchableOpacity
              className='w-1/2 mb-[80] p-[20] border bg-cyan-600 rounded-full text-black justify-center items-center'
              onPress={() => navigation.replace("Drawer",{rollno})}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}
export default FinalLogin;