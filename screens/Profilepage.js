import { View , Text , TouchableOpacity , ScrollView , RefreshControl , Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
//import { useRoute } from '@react-navigation/native';
import { MyContext } from './Drawerpage';
import React, { useEffect , useState , useContext } from 'react';
import axios from 'axios';
const Profilepage = ({ navigation }) => {
  const { roll } = useContext(MyContext);
  const [data, setData] = useState('');
  const [isLoading, setisLoading] = useState(true);
  const [firstLetters,setfirstLetters] = useState('');
  const [usernames,setusernames] = useState('');
  const [emails,setemails] = useState('');
  const [deptNames,setdeptNames] = useState('');
  const [years,setyears] = useState('');
  const [courses,setcourses] = useState('');
  const yourcourses = [];
  const [refreshKey, setRefreshKey] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshKey(refreshKey + 1);
    // Perform your data fetching or other refreshing tasks here
    setTimeout(() => {
      setRefreshing(false);
    }, 3000); // Simulate a network request
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.155.200:3000/profile', {
          params: {
            rollno: roll
          }
        });
        
        setData(response.data);
        setisLoading(false);
        console.log(response.data);
        setfirstLetters(data[0].first_letter);
        setusernames(data[0].username);
        setemails(data[0].email);
        setdeptNames(data[0].dept_name);
        setyears(data[0].years);
        setcourses(data[0].courses);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Alert', 'Pls refresh the page.');
      }
    };

    fetchData();
    
  }, [refreshKey || roll]);

  

  for(let i=0;i < courses.length;i++){
    yourcourses.push(
      <View key={i}>
        <Text className='ml-8 mt-4 text-xl' >
        {courses[i]}
        </Text>
      </View>
    )
  }

  if (isLoading) {
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
      className='container'
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>  
       <View className='flex-row items-center'>
          <TouchableOpacity className={'w-[65] h-[65] rounded-full justify-center bg-cyan-200 m-[25] mt-[30] ml-6 items-center'} onPress={() => navigation.push("Drawer",2022103537)}>
            <Text className='text-center  text-3xl'> 
             {firstLetters}
            </Text>
          </TouchableOpacity>
          <Text className=' text-2xl mt-[10] flex-wrap justify-center items-center'>
              {usernames}
          </Text>
        </View>
        <View>
          <Text className='ml-6 mt-4 text-xl w-4/5 mb-[16] p-[13] border-2 border-black bg-white rounded-3xl text-black text-center'>
           {emails}
          </Text>
          <Text className='ml-6  text-xl w-4/5 mb-[16] p-[13] border-2 border-black bg-white rounded-3xl text-black text-center'>
            {deptNames}
          </Text>
          <Text className='ml-6 text-xl w-4/5 mb-[16] p-[13] border-2 border-black bg-white rounded-3xl text-black text-center'>
            {years}-Year
          </Text>
        </View>
        <View >
          <Text className= 'ml-6 mt-6 text-2xl'> 
          YOUR COURSES :
          </Text>
          <View className='ml-8 mt-4 flex-col' >
          <Text className='text-lg'>{courses}</Text></View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}
export default Profilepage;