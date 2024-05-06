import React from 'react';
import { View, Text , ScrollView , TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const SelectCourse = ({ navigation }) => {
  const route = useRoute();
  const rollno = route.params || {};

  return (
  <LinearGradient 
    className='flex-1'
    colors={['#3D52AD','#7091E6','#8697C4','#ADBBDA','#EDE8F5']}>
    <ScrollView>  
      <View className='justify-center items-center p-{30} h-{200}'>
        <Text className='text-2xl h-96 text-center'>Select Your Course</Text>
        <TouchableOpacity
          className='border-2 rounded-md border-slate-700 shadow-2xl bottom-0'
          onPress={() => navigation.navigate("Final")}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </LinearGradient>
  );
};

export default SelectCourse;