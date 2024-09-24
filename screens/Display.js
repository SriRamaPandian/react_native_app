import React, { useEffect , useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View , Text , TouchableOpacity , ScrollView , Image , TextInput , RefreshControl , Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { Video } from 'expo-av';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Watchlater from './Watchlater';


const Display = ({ navigation }) => {
  const route = useRoute();
  const { id , roll } = route.params || {};
  const [isLoading1, setLoading1] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [data1, setData1] = useState('');
  const [data2, setData2] = useState('');
  const [FeedBack,setFeedBack] = useState('');
  const svideo = [];
  const [islike, setislike] = useState(false);
  const [view, setview] = useState(true);
  const [watch, setwatch] = useState(true);
  const [feed, setfeed] = useState(true);
  
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshKey(refreshKey + 1);
    // Perform your data fetching or other refreshing tasks here
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulate a network request
  };

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get('http://192.168.155.200:3000/display1',
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
          const response = await axios.get('http://192.168.155.200:3000/display2',
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
  }, [refreshKey]);

  if(data2.length !== 0){
    for(let i=0 ; i < data2.length;i++){
        const id = data2[i].video_id;
        const video_link = data2[i].video_link;
        if(video_link){
          svideo.push(
            <View key={i} className='flex-col px-[30] py-[10]'>
                <TouchableOpacity activeOpacity={2} onPress={() => navigation.push("Display",{id,roll})} >
                  <Video source={{uri: video_link}} className='w-[270] h-[150] border-4 rounded-md' useNativeControls={false} isLooping={false} shouldPlay={false}/>
                </TouchableOpacity>
                <Text className='text-xl p-[10]'>{data2[i].video_name}</Text>
            </View>
        )
        }
      }
  }

  if (isLoading1 || isLoading2 ) {
    return (
    <LinearGradient 
      className='flex-1'
      colors={['#4682b4','#4682b4','#b0e0e6','#b0e0e6']}>
    </LinearGradient>
    );
  };

  const liked = async () => {
    try {
      const response = await axios.post('http://192.168.155.200:3000/liked',
        {id}
      );
      if (response.data.message === 'liked') {
        setislike(!islike);
      }
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const notliked = async () => {
    try {
      const response = await axios.post('http://192.168.155.200:3000/notliked',
        {id}
      );
      if (response.data.message === 'notliked') {
        setislike(!islike);
      }
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const views = async () => {
    if(view){
      try {
        const response = await axios.post('http://192.168.155.200:3000/views',
          {id}
        );
        if (response.data.message === 'views') {
          setview(false);
        }
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

  const watchlater = async () => {
    if(watch){
      try {
        const response = await axios.post('http://192.168.155.200:3000/watchlater',
          {
            id,
            roll,
          }
        );
        if (response.data.message === 'successfully added in watchlater') {
          setwatch(false);
          Alert.alert('INFO','Video Added to Watch Later');
        }
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

  const feedsubmit = async () => {
    if(feed){
      try {
        const response = await axios.post('http://192.168.155.200:3000/feedback',
          {
            id,
            roll,
            FeedBack,
          }
        );
        if (response.data.message === 'successfully added feedback') {
          setfeed(false);
          Alert.alert('INFO','Feedback is submitted');
        }
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }


  return (
    <LinearGradient 
      className='flex-1'
      colors={['#4682b4','#4682b4','#b0e0e6','#b0e0e6']}>
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>  
        <View className='p-[20] mt-[30]'>
        <Text className='p-[10] text-3xl font-bold'>{data1[0].video_name}:</Text>
        <TouchableOpacity activeOpacity={0.97} onPress={views}>
          <Video source={{uri: data1[0].video_link}} className='w-full h-[210] border-4 rounded-md mr-[20]' useNativeControls={true} isLooping={false} shouldPlay={false}/>
        </TouchableOpacity>
        <View className='mt-[20] rounded-xl p-3 bg-cyan-300'>
            <Text className='font-bold text-xl'>Description:</Text>
            <Text className='p-[7] ml-[10] text-base'>{data1[0].descriptions}</Text>
        </View>
        <View className='flex-row mt-[30] justify-evenly'>
            <Text className='text-base p-[20] bg-violet-400 rounded-3xl justify-center items-center'>{data1[0].views} Views</Text>
            { islike ? 
            <TouchableOpacity activeOpacity={0.3} className=' p-[10] bg-violet-400 rounded-3xl flex-row justify-center items-center' onPress={notliked}>
              <Text className='text-base mr-2'>{data1[0].likes} Likes</Text>
              <AntDesign name='like1' size={30}/>
            </TouchableOpacity> :
            <TouchableOpacity activeOpacity={0.3} className=' p-[10] bg-violet-400 rounded-3xl flex-row justify-center items-center' onPress={liked}>
              <Text className='text-base mr-2'>{data1[0].likes} Likes</Text>
              <AntDesign name='like2' size={30}/>
            </TouchableOpacity>}
            <TouchableOpacity activeOpacity={0.3} className='flex-row justify-center items-center  bg-violet-400 rounded-3xl' onPress={watchlater}>
                <Text className='text-base p-[10]'>Watchlater</Text>
                <MaterialIcons name="watch-later" size={40}  />
            </TouchableOpacity>
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
            <TouchableOpacity className='flex-row-reverse' onPress={feedsubmit}>
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