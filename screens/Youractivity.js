import React, {useState} from 'react';
import { View , Text , TouchableOpacity , ScrollView , TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import DocumentPicker from 'react-native-document-picker';
//import RNFS from 'react-native-fs';


const Youractivity = ({ navigation }) => {
  const [ispressed, setispressed] = useState(false);
  const [vname, setvname] = useState('');
  const [description, setdescription] = useState('');
  const [image, setimage] = useState([]);


  const selection = async () => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf]
      });
      if(doc){
      console.log(doc);
      setimage(doc);
      }
    } catch(err) {
      if(DocumentPicker.isCancel(err)) 
        console.log("User cancelled the upload", err);
      else 
        console.log(err);
    }
  };

  return (
    <LinearGradient 
      className='flex-1'
      colors={['#3D52AD','#7091E6','#8697C4','#ADBBDA','#EDE8F5']}>
      <ScrollView>  
        <View className='flex-row items-center mt-[60] p-[40]'>
          <Text className='text-2xl font-bold pr-[120]'>
                Uploaded Videos:
          </Text>
          <AntDesign.Button name="pluscircleo" size={30} color="#000" onPress={() => setispressed(!ispressed)} backgroundColor="transparent"/>
        </View>
        <View>

        </View>
        {ispressed?
        <View className='items-start mt-[60] p-[40]'>
          <Text className='text-2xl font-bold'>Upload New Videos:</Text>
          <View>
            <Text className='text-xl font-bold pt-[30]'>Enter video name:</Text>
            <TextInput
              className='w-full my-[10] pr-[100] border-b-2 border-black text-black'
              placeholder=""
              placeholderTextColor={'#000000'}
              onChangeText={text => setvname(text)}
              value={vname}
            />
          </View>
          <View>
            <Text className='text-xl font-bold pt-[30]'>Enter description:</Text>
            <TextInput
              className='w-full my-[10] pr-[100] border-b-2 border-black text-black'
              placeholder=""
              placeholderTextColor={'#000000'}
              onChangeText={text => setdescription(text)}
              value={description}
            />
          </View>
          <View>
            <Text className='text-xl font-bold pt-[30]'>Insert attachment:</Text>
            <TouchableOpacity
              className='p-[10] m-[10] border text-black justify-center items-center bg-white'
              onPress={async () => {selection();}}>
            <Text>Insert</Text>
            </TouchableOpacity>
          </View>
        </View>
        :''}
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
export default Youractivity;