import React, {useState,useContext,useEffect} from 'react';
import { View , Text , TouchableOpacity , ScrollView , TextInput , Image , Alert , RefreshControl} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { Video } from 'expo-av';
import { MyContext } from './Drawerpage';
import * as Updates from 'expo-updates';


const Youractivity = ({ navigation }) => {
  const { roll } = useContext(MyContext);
  const [ispressed, setispressed] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const [vname, setvname] = useState('');
  const [description, setdescription] = useState('');
  const [image, setimage] = useState('');
  const [video, setvideo] = useState('');
  const [cname, setcname] = useState('');
  const [imguri,setimguri] = useState('');
  const [viduri,setviduri] = useState('');
  const uploaded = [];
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshKey(refreshKey + 1);
    setimage('');
    setvideo('');
    setcname('');
    setvname('');
    setdescription('');
    // Perform your data fetching or other refreshing tasks here
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulate a network request
  };

  let inserturi = async () => {
    try {
      const response = await axios.post('http://192.168.155.200:3000/uri', {
        cname,
        roll,
        vname,
        viduri,
        imguri,
        description,
      });
      
      if (response.data.message === 'Uri inserted successfully') {
        Alert.alert('Success', 'New Video Added successfully.');
        //navigation.navigate("Main");
        setispressed(!ispressed);
      }
    } catch (error) {
      console.error('Error occurred during insering uri:', error.message);
      Alert.alert('ERROR', 'Invalid Credential');
    }
    
  };

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
      let destinationUri = folderUri + '/' + cname + fileName;
      setviduri(destinationUri);
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
      let destinationUri = folderUri + '/' + cname + fileName;
      setimguri(destinationUri);
      await FileSystem.copyAsync({ from: imageUri, to: destinationUri });
  
      console.log('Image saved to folder:', destinationUri);
    } catch (error) {
      console.error('Error saving Image to folder:', error);
    }
  };

  useEffect(() => {
    const uploadedvideos = async () =>{
      try {
        const response = await axios.get('http://192.168.155.200:3000/uploadedvideos',
          {
            params:{
              rollno: roll
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
    uploadedvideos();
  }, [refreshKey]);

  if (isLoading) {
    return (
    <LinearGradient 
      className='flex-1'
      colors={['#4682b4','#4682b4','#b0e0e6','#b0e0e6']}>
    </LinearGradient>
    );
  }
  

  for( let i = 0;i < data.length; i++){
    uploaded.push(
      <View key={i} className='mx-[7]'>
        <Text className='p-[7] text-xl'>{data[i].video_name}:</Text>
        <View className='flex-row mt-[7]'>
          <Video source={{uri: data[i].video_link}} className='w-[250] h-[150] border-4 rounded-md' useNativeControls={true} isLooping={false} shouldPlay={false} />
          <View className='flex-col p-[25]'>
            <Text className='text-xl font-bold'>LIKES:{data[i].likes}</Text>
            <Text className='text-xl font-bold mt-[10]'>VIEWS:{data[i].views}</Text>
          </View>
        </View>
      </View>
    )
  };
  /*console.log(data[0].likes);
  console.log(data[0].video_link);
  console.log(data[0].video_name);
  console.log(data[0].views);*/

  return (
    <LinearGradient 
      className='flex-1'
      colors={['#4682b4','#4682b4','#b0e0e6','#b0e0e6']}>
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>  
        <View className='flex-row items-center mt-[30] p-[10]'>
          <Text className='text-2xl font-bold pr-[120]'>
                Uploaded Videos:
          </Text>
          <AntDesign.Button name="pluscircleo" size={40} color="#000" onPress={() => setispressed(!ispressed)} backgroundColor="transparent"/>
        </View>
        <View className='flex-col mb-[30]'>
          {uploaded}
        </View>
        {ispressed?
        <View className='items-start mt-[60] p-[10]'>
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
            <Text className='text-xl font-bold pt-[30]'>Enter Course-id:</Text>
            <Text className='text-xs pt-[10]'>LIKE:"CSE-HS6151,ECE-HS5151,MECH-HS5151"</Text>
            <TextInput
              className='w-full my-[10] pr-[100] border-b-2 border-black text-black'
              placeholder=""
              placeholderTextColor={'#000000'}
              onChangeText={text => setcname(text)}
              value={cname}
            />
          </View>
          <View>
            <Text className='text-xl font-bold pt-[30]'>Insert attachment:</Text>
            <TouchableOpacity
              className='p-[10] m-[10] border text-black justify-center items-center bg-white'
              onPress={openImagePickerAsync}>
            <Text>Insert</Text>
            </TouchableOpacity>
            {image?<Image source={{uri: image}} className='w-[200] h-[200] rounded-md'/>:''}
          </View>
          <View>
            <Text className='text-xl font-bold pt-[30]'>Insert Video:</Text>
            <TouchableOpacity
              className='p-[10] m-[10] border text-black justify-center items-center bg-white'
              onPress={openVideoPickerAsync}>
            <Text>Insert</Text>
            </TouchableOpacity>
            {video?<Video source={{uri: video}} className='w-[270] h-[150] border-4 rounded-md' useNativeControls={true} isLooping={false} shouldPlay={false}/>:''}
          </View>
          <View className='justify-center items-center ml-[150] h-[200]'>
            <TouchableOpacity
                className='w-1/2 mb-[80] p-[20] border rounded-full text-black justify-center items-center bg-cyan-400'
                onPress={inserturi}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        :''}
      </ScrollView>
    </LinearGradient>
  )
}
export default Youractivity;