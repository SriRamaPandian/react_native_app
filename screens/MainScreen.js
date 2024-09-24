import React, { useContext, useEffect , useState } from 'react';
import { View , Text , ScrollView , TextInput , TouchableOpacity , RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import axios from 'axios';
import { MyContext } from './Drawerpage';
import { Video } from 'expo-av';
import * as Updates from 'expo-updates';

const Stack = createNativeStackNavigator();

const MainScreen = ({ navigation }) => {
  const { roll } = useContext(MyContext);
  const [isLoading1, setLoading1] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [search, setsearch] = useState('');
  const [dataout1, setDataout1] = useState('');
  const SelectCourse1 = [];
  const scourse1 = [];
  const coursetag1 = [];
  const [dataout2, setDataout2] = useState('');
  const SelectCourse2 = [];
  const scourse2 = [];
  const coursetag2 = [];
  const [refreshKey, setRefreshKey] = useState(0);
  
  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setsearch('');
    setRefreshKey(refreshKey + 1);
    // Perform your data fetching or other refreshing tasks here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulate a network request
  };



  useEffect(() => {
    const fetchDataout1 = async () => {
      try {
        const response = await axios.get('http://192.168.155.200:3000/main1',
          {
            params:{
              rollno: roll
            }
          }
        );
        setDataout1(response.data);
        
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchDataout2 = async () => {
      try {
        const response = await axios.get('http://192.168.155.200:3000/main2',
          {
            params:{
              rollno: roll
            }
          }
        );
        setDataout2(response.data);
        
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
      fetchDataout1();
      fetchDataout2();
      setLoading2(false);
      setLoading1(false);
  }, [refreshKey || roll]);

  //console.log(dataout1,dataout2);

  for( let i = 0;i < dataout1.length ; i++){
    SelectCourse1.push(dataout1 ? Object.values(dataout1[i]) : []);
    if(scourse1.indexOf(SelectCourse1[i][0]) == -1){
      scourse1.push(SelectCourse1[i][0]);
    }
  };
  
  for(let i=0;i < scourse1.length;i++){
    const subjecttag = [];
    for(let j=0;j < dataout1.length;j++){
      if(scourse1[i] == SelectCourse1[j][0]){
        const id = SelectCourse1[j][3];
        subjecttag.push(
          <View key={j+100} className='flex-col'>
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("Display",{id,roll})} >
              <Video source={{uri: SelectCourse1[j][2]}} className='w-[270] h-[150] border-4 rounded-md mr-[20]' useNativeControls={false} isLooping={false} shouldPlay={false}/>
            </TouchableOpacity>
            <Text className='text-xl p-[10]'>{SelectCourse1[j][1]}</Text>
          </View>
        )
      }
    }
    coursetag1.push(
      <View key={i} className='p-[10] px-[30]'>
        <Text className='font-bold text-2xl pb-[20]'>{scourse1[i]}:</Text>
        <ScrollView horizontal={true}>
          <View className='flex-row'>
          {subjecttag}
          </View>
        </ScrollView>
      </View>
    )
  }
  
  for( let i = 0;i < dataout2.length ; i++){
    SelectCourse2.push(dataout2 ? Object.values(dataout2[i]) : []);
    if(scourse2.indexOf(SelectCourse2[i][0]) == -1){
      scourse2.push(SelectCourse2[i][0]);
    }
  };
  
  for(let i=0;i < scourse2.length;i++){
    const subjecttag = [];
    for(let j=0;j < dataout2.length;j++){
      if(scourse2[i] == SelectCourse2[j][0]){
        const id = SelectCourse2[j][3];
        subjecttag.push(
          <View key={j+100} className='flex-col'>
            <TouchableOpacity activeOpacity={2} onPress={() => navigation.navigate("Display",{id,roll})} >
              <Video source={{uri: SelectCourse2[j][2]}} className='w-[270] h-[150] border-4 rounded-md mr-[20]' useNativeControls={false} isLooping={false} shouldPlay={false}/>
            </TouchableOpacity>
            <Text className='text-xl p-[10]'>{SelectCourse2[j][1]}</Text>
          </View>
        )
      }
    }
    coursetag2.push(
      <View key={i} className='p-[10] px-[30]'>
        <Text className='font-bold text-2xl pb-[20]'>{scourse2[i]}:</Text>
        <ScrollView horizontal={true}>
          <View className='flex-row'>
          {subjecttag}
          </View>
        </ScrollView>
      </View>
    )
  }
  if (isLoading1 || isLoading2 ) {
    return (
    <LinearGradient 
      className='flex-1'
      colors={['#4682b4','#4682b4','#b0e0e6','#b0e0e6']}>
    </LinearGradient>
    );
  }
  

  return (
  <LinearGradient 
    className='flex-1'
    colors={['#4682b4','#4682b4','#b0e0e6','#b0e0e6']}>
    <ScrollView 
    className='flex-col'
    refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View className='justify-evenly items-center mt-[30]'>
        <View className='flex-row justify-evenly items-center mt-[10] content-center bg-white border-2 border-black rounded-full px-5'>
          <FontAwesome name="search" size={23} color="#000" />
          <TextInput
              //caretHidden={true}
              className='w-10/12 p-[13] text-black '
              placeholder="Enter subject or video name..."
              placeholderTextColor={'#000000'}
              onChangeText={text => setsearch(text)}
              onSubmitEditing={() => navigation.navigate("Search",{
                text:search,
                roll:roll})}
              value={search}
            />
        </View>
      </View>
      <Text className='font-bold text-4xl p-[30]'>Your courses:</Text>
      <View className='flex-col'>
        {coursetag1}
      </View>
      <Text className='font-bold text-4xl p-[30]'>Other courses:</Text>
      <View className='flex-col'>
        {coursetag2}
      </View>
    </ScrollView>
  </LinearGradient>
  );
};

export default MainScreen;