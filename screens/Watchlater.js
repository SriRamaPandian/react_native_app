import React,{useContext} from 'react';
import { View , Text , TouchableOpacity , ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MyContext } from './Drawerpage';


const Watchlater = ({ navigation }) => {
  const { roll } = useContext(MyContext);


  return (
    <LinearGradient 
      className='flex-1'
      colors={['#3D52AD','#7091E6','#8697C4','#ADBBDA','#EDE8F5']}>
      <ScrollView>  
        <View className='justify-center items-center mt-[50] p-[30] h-[200]'>
          <Text className='text-2xl font-bold'>
            Watchlater{roll}
          </Text>
        </View>
        <View className='justify-center items-center content-end h-[200]'>
          <TouchableOpacity
              className='w-1/2 mb-[80] p-[20] border bg-white rounded-full text-black justify-center items-center bg-cyan-400'
              onPress={() => navigation.navigate("Main")}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}
export default Watchlater;