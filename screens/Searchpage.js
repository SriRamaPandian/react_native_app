import React, { useEffect , useState } from 'react';
import { View , Text , TouchableOpacity , ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { Video } from 'expo-av';

const Searchpage = ({ navigation }) => {
  const route = useRoute();
  const { text , roll } = route.params || {};
  const [isLoading, setLoading] = useState(true);
  const [data,setData] = useState('');
  const result = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.166.200:3000/search',
          {
            params:{
              search: text
            }
          }
        );
        setData(response.data);
        setLoading(false);
        console.log(data);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };
      fetchData();
  }, []);

  if (isLoading) {
    return (
    <LinearGradient 
      className='flex-1'
      colors={['#3D52AD','#7091E6','#8697C4','#ADBBDA','#EDE8F5']}>
    </LinearGradient>
    );
  };

  if(data !== ''){
    for(let i = 0; i < data.length ;i++){
      const id = data[i].video_id;
        result.push(
            <View key={i*10} className='flex-col px-[30] py-[10]'>
                <TouchableOpacity activeOpacity={2} onPress={() => navigation.navigate("Display",{id,roll})} >
                  <Video source={{uri: data[i].video_link}} className='w-[270] h-[150] border-4 rounded-md' useNativeControls={false} isLooping={false} shouldPlay={false}/>
                </TouchableOpacity>
                <Text className='text-xl p-[10]'>{data[i].video_name}</Text>
            </View>
        )
    }
  }

  const res = [<View className='justify-center items-center'>
    <Text className='font-bold text-2xl items-center p-[50]'>!!!No Result Found!!!</Text>
  </View>]

  return (
    <LinearGradient 
      className='flex-1'
      colors={['#3D52AD','#7091E6','#8697C4','#ADBBDA','#EDE8F5']}>
      <ScrollView>  
        <View className='mt-[50]'>
          <Text className='font-bold text-3xl px-[30] py-[7]'>Your search result:</Text>
          {result}
        </View>
      </ScrollView>
    </LinearGradient>
  )
}
export default Searchpage;