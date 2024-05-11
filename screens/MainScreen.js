import React, { useEffect , useState } from 'react';
import { View , Text , ScrollView , TextInput , TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import axios from 'axios';


const LandingScreen = ({ navigation }) => {
  const route = useRoute();
  const { rollno } = route.params || {};
  const [data, setData] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [search, setsearch] = useState('');


  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.166.200:3000/main',
          {
            params:{
              rollno: rollno
            }
          }
        );
        setData(response.data);
        setLoading(false);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };
      fetchData();
  }, []);*/

  return (
    <LinearGradient 
      className='flex-1'
      colors={['#3D52AD','#7091E6','#8697C4','#ADBBDA','#EDE8F5']}>
      <ScrollView className='flex-col'>
        <View className=' flex-row items-center p-[15] mt-[20]'>
          <Entypo name="menu" size={35} color="#000" />
          <Text className='text-3xl font-bold pl-[20] pr-[155]'>E_Learn</Text>
          <TouchableOpacity className={'w-[40] h-[40] rounded-full justify-center items-center bg-blue-300 m-[20]'}
            onPress={() =>{navigation.navigate("Profile")}} >
            <Text className='text-base text-center font-bold'>S</Text>
          </TouchableOpacity>
        </View>
        <View className='justify-evenly items-center'>
          <View className='flex-row justify-evenly items-center mt-[10] content-center bg-white border-2 border-black rounded-full px-5'>
            <FontAwesome name="search" size={23} color="#000" />
            <TextInput
                caretHidden={true}
                className='w-10/12 p-[13] text-black '
                placeholder="search"
                placeholderTextColor={'#000000'}
                onChangeText={text => setsearch(text)}
                onSubmitEditing={() => navigation.navigate("Search")}
                value={search}
              />
          </View>
          <Text>{search}</Text>
        </View>  
      </ScrollView>
    </LinearGradient>
  );
};
  export default LandingScreen;