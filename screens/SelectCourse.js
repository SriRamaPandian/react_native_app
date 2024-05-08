import React, { useEffect , useState } from 'react';
import { View, Text , ScrollView , TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const SelectCourse = ({ navigation }) => {
  const route = useRoute();
  const { rollno , n } = route.params || {};
  const buttons = [];
  const [data, setData] = useState('');

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
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };
      fetchData();
    }, []);
    var strdata=JSON.stringify(data);
    //console.log(strdata);
    for( let i = 0;i < 4; i++){
      var cname = data ? Object.values(data[i]) : [];
      buttons.push(
        <TouchableOpacity className='w-[120] h-[120] rounded-full justify-center items-center bg-cyan-200 m-[30]'>
          <Text>{cname}</Text>
        </TouchableOpacity>
      )
    };

  return (
  <LinearGradient 
    className='flex-1'
    colors={['#3D52AD','#7091E6','#8697C4','#ADBBDA','#EDE8F5']}>
    <ScrollView>  
      <View className='justify-center items-center mt-[50] p-[30] h-[200]'>
        <Text className='text-3xl text-center font-bold'>Select the Courses that you needed the most</Text>
      </View>
      <View className='justify-center items-center m-4 flex-wrap flex-row mb-[50]'>
        {buttons}
      </View>
      <View className='justify-center items-center content-end h-[200]'>
      <TouchableOpacity
          className='w-1/2 mb-[80] p-[20] border bg-white rounded-full text-black justify-center items-center bg-cyan-400'
          onPress={() => navigation.navigate("Final")}>
        <Text>Next</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  </LinearGradient>
  );
};

export default SelectCourse;