import React, { useEffect , useState } from 'react';
import { View, Text , ScrollView , TouchableOpacity , Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const SelectCourse = ({ navigation }) => {
  const route = useRoute();
  const { rollno } = route.params || {};
  const buttons = [];
  const [data, setData] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [isPressed, setisPressed] = useState(false);
  const mulcourse = [];
  const cname = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.166.200:3000/course',
          {
            params:{
              rollno: rollno
            }
          }
        );
        setData(response.data);
        setLoading(false);
        setisPressed([...isPressed, false]);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };
      fetchData();
  }, []);
  
  for( let i = 0;i < data.length; i++){
    cname.push(data ? Object.values(data[i]) : []);
    buttons.push(
      <TouchableOpacity className={ isPressed ?'w-[135] h-[135] rounded-full justify-center items-center bg-cyan-200 m-[25] border-4 border-lime-400' : 'w-[135] h-[135] rounded-full justify-center items-center bg-cyan-200 m-[25]'}
      key={i}
      onPress={() =>{
        setisPressed(!isPressed);
        if(isPressed){
          mulcourse.push(cname);
          console.log(isPressed);
          console.log(mulcourse);
        }
        else{
          mulcourse.pop(cname);
          console.log(isPressed);
          console.log(mulcourse);
        }}
         } >
        <Text className='text-base text-center font-bold'>{cname}</Text>
      </TouchableOpacity>
    )
  };

  if (isLoading) {
    return (
    <LinearGradient 
      className='flex-1'
      colors={['#3D52AD','#7091E6','#8697C4','#ADBBDA','#EDE8F5']}>
    </LinearGradient>
    );
  }

  const nextpage = async () =>{
    if(mulcourse.length < 3){
      Alert.alert('INFO', 'Please select atleast 3 courses');
    }
    else{
      try {
        const response = await axios.post('http://192.168.166.200:3000/mulcourse', {
          mulcourse,
          rollno,
        });
        
        if (response.data.message === 'successfully inserted') {
          navigation.navigate("Final",{rollno}); 
        }
      } 
      catch (error) {
        console.error('Error fetching data', error.message);
      }
    }
  }

  return (
  <LinearGradient 
    className='flex-1'
    colors={['#3D52AD','#7091E6','#8697C4','#ADBBDA','#EDE8F5']}>
    <ScrollView>  
      <View className='justify-center items-center mt-[50] p-[30] h-[200]'>
        <Text className='text-3xl text-center font-bold'>Select the Courses that you needed the most</Text>
      </View>
      <View className='justify-center items-center m-4 flex-wrap flex-row mb-[25]'>
        {buttons}
      </View>
      <View className='justify-center items-center'>
        <Text className='text-base text-center'>!!!  Select at least 3 courses  !!!</Text>
      </View>
      <View className='justify-center items-center content-end h-[200]'>
      <TouchableOpacity
          className='w-1/2 mb-[80] p-[20] border bg-white rounded-full text-black justify-center items-center bg-cyan-400'
          onPress={nextpage}>  
        <Text>Next</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  </LinearGradient>
  );
};

export default SelectCourse;