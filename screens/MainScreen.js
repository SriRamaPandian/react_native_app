import React, { useContext, useEffect , useState } from 'react';
import { View , Text , ScrollView , TextInput , TouchableOpacity , SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import axios from 'axios';
import Searchpage from '../screens/Searchpage';
import Profilepage from '../screens/Profilepage';
import { MyContext } from './Drawerpage';

const Stack = createNativeStackNavigator();

const MainScreen = ({ navigation }) => {
  const { roll } = useContext(MyContext);
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
      <View className='justify-evenly items-center mt-[90]'>
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
        <Text>{search}{roll}</Text>
      </View>  
    </ScrollView>
  </LinearGradient>
  );
};

export default MainScreen;