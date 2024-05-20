import React, { useEffect , useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View , Text , TouchableOpacity , ScrollView , Image , TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { Video } from 'expo-av';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const Display = ({ navigation }) => {
  const route = useRoute();
  const { id , roll } = route.params || {};
  const [isLoading1, setLoading1] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [data1, setData1] = useState('');
  const [data2, setData2] = useState('');
  const [FeedBack,setFeedBack] = useState(null);
  const svideo = [];

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get('http://192.168.166.200:3000/display1',
          {
            params:{
              id: id
            }
          }
        );
        setData1(response.data);
        setLoading1(false);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchData2 = async () => {
        try {
          const response = await axios.get('http://192.168.166.200:3000/display2',
            {
              params:{
                id: id,
                rollno: roll,
              }
            }
          );
          setData2(response.data);
          setLoading2(false);
        } 
        catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData1();
      fetchData2();
  }, []);

  if(data2.length !== 0){
    for(let i=0 ; i < data2.length;i++){
        const id = data2[i].video_id;
        svideo.push(
            <View key={i} className='flex-col px-[30] py-[10]'>
                <TouchableOpacity activeOpacity={2} onPress={() => navigation.push("Display",{id,roll})} >
                  <Video source={{uri: data2[i].video_link}} className='w-[270] h-[150] border-4 rounded-md' useNativeControls={false} isLooping={false} shouldPlay={false}/>
                </TouchableOpacity>
                <Text className='text-xl p-[10]'>{data2[i].video_name}</Text>
            </View>
        )
      }
  }

  if (isLoading1 || isLoading2 ) {
    return (
    <LinearGradient 
      className='flex-1'
      colors={['#3D52AD','#7091E6','#8697C4','#ADBBDA','#EDE8F5']}>
    </LinearGradient>
    );
  };


  return (
    <LinearGradient 
      className='flex-1'
      colors={['#3D52AD','#7091E6','#8697C4','#ADBBDA','#EDE8F5']}>
      <ScrollView>  
        <View className='p-[20] mt-[30]'>
        <Text className='p-[10] text-3xl font-bold'>{data1[0].video_name}:</Text>
        <Video source={{uri: data1[0].video_link}} className='w-full h-[210] border-4 rounded-md mr-[20]' useNativeControls={true} isLooping={false} shouldPlay={false}/>
        <View className='mt-[20] rounded-xl p-3 bg-cyan-300'>
            <Text className='font-bold text-xl'>Description:</Text>
            <Text className='p-[7] ml-[10] text-base'>{data1[0].descriptions}</Text>
        </View>
        <View className='flex-row mt-[30] justify-evenly'>
            <Text className='text-base p-[10] bg-violet-400 rounded-3xl'>{data1[0].views} Views</Text>
            <Text className='text-base p-[10] bg-violet-400 rounded-3xl'>{data1[0].likes} Likes</Text>
            <View className='flex-row justify-center items-center  bg-violet-400 rounded-3xl'>
                <Text className='text-base p-[10]'>Watchlater</Text>
                <MaterialIcons name="watch-later" size={40}  />
            </View>
        </View>
        <View className='mt-[20] rounded-xl p-3 bg-blue-300'>
            <Text className='font-bold text-xl'>Attachment:</Text>
            <View className='justify-center items-center'>
            <Image source={{uri: data1[0].attachments}} className='w-[300] h-[200]'/>
            </View>
        </View>
        <View className='mt-[20] rounded-xl p-3 bg-cyan-300'>
            <Text className='font-bold text-xl'>FeedBack:</Text>
            <TextInput
                className='p-[10] text-base'
                multiline={true}
                numberOfLines={3}
                placeholder="Enter your Feedback..."
                placeholderTextColor={'#000000'}
                onChangeText={text => setFeedBack(text)}
                value={FeedBack}
            />
            <TouchableOpacity className='flex-row-reverse'>
                <Text className='text-sm p-[7] bg-violet-300 rounded-3xl'>Submit</Text>
            </TouchableOpacity>
        </View>
        </View>
        <View>
            <Text className='font-bold text-3xl px-[30] py-[7]'>Similar Videos:</Text>
            {svideo}
        </View>
      </ScrollView>
    </LinearGradient>
  )
}
export default Display;