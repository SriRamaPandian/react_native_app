import React, {useState} from 'react';
import { View , Text , TouchableOpacity , ScrollView , TextInput , Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


const Youractivity = ({ navigation }) => {
  const [ispressed, setispressed] = useState(false);
  const [vname, setvname] = useState('');
  const [description, setdescription] = useState('');
  const [image, setimage] = useState('');
  const [video, setvideo] = useState('');


  let openVideoPickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access media library is required!");
      return;
    }
  
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });
    console.log(pickerResult.assets[0].uri);
    if(!pickerResult.canceled){
      saveVideoToFolderAsync(pickerResult.assets[0].uri);
    }
  };
  let saveVideoToFolderAsync = async (videoUri) => {
    let folderName = 'Videos';
    let folderUri = FileSystem.documentDirectory + folderName;
    setvideo(videoUri);
    try {
      // Create the folder if it doesn't exist
      await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
  
      // Get the file name from the video URI
      let fileName = vname;
  
      // Copy the video file to the folder
      let destinationUri = folderUri + '/' + fileName;
      await FileSystem.copyAsync({ from: videoUri, to: destinationUri });
  
      console.log('Video saved to folder:', destinationUri);
    } catch (error) {
      console.error('Error saving video to folder:', error);
    }
  }


  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
  
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult.assets[0].uri);
    if(!pickerResult.canceled){
      saveImageToFileAsync(pickerResult.assets[0].uri);
    }
  };
  let saveImageToFileAsync = async (imageUri) => {
    let folderName = 'assets';
    let folderUri = FileSystem.documentDirectory + folderName;
    setimage(imageUri);
    try {
      // Create the folder if it doesn't exist
      await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
  
      // Get the file name from the video URI
      let fileName = vname;
  
      // Copy the video file to the folder
      let destinationUri = folderUri + '/' + fileName;
      await FileSystem.copyAsync({ from: imageUri, to: destinationUri });
  
      console.log('Image saved to folder:', destinationUri);
    } catch (error) {
      console.error('Error saving Image to folder:', error);
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
              onPress={openImagePickerAsync}>
            <Text>Insert</Text>
            </TouchableOpacity>
            {image?<Image source={{uri: image}} className='w-[200] h-[200]'/>:''}
          </View>
          <View>
            <Text className='text-xl font-bold pt-[30]'>Insert Video:</Text>
            <TouchableOpacity
              className='p-[10] m-[10] border text-black justify-center items-center bg-white'
              onPress={openVideoPickerAsync}>
            <Text>Insert</Text>
            </TouchableOpacity>
            {video?<Image source={{uri: video}} className='w-[200] h-[200]'/>:''}
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