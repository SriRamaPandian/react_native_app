import React,{useState,useEffect} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainScreen from '../screens/MainScreen'
import Youractivity from '../screens/Youractivity';
import Watchlater from '../screens/Watchlater';
import Profilepage from './Profilepage';


export const MyContext = React.createContext();

const Drawer = createDrawerNavigator();

const Drawerpage = ({ navigation }) => {
    useEffect(() => {
        insertkey();
      }, []);
    const insertkey = async () =>{
        const key = await AsyncStorage.getItem('key');
        {rollno === 'undefined'?setroll(key):''}setroll(key);
    };
    const route = useRoute();
    const { rollno } = route.params || {};
    const [roll,setroll] = useState(rollno);

return (
<SafeAreaView className='flex-1'>
    <MyContext.Provider value={ {roll,setroll} }>
        <Drawer.Navigator 
        initialRouteName="Main"
        screenOptions={
        {headerTitleStyle: {fontWeight: 'bold',fontSize: 30},headerStyle:{backgroundColor:'#1d9bb2'}}}>
        <Drawer.Screen
        name="Main"
        component={MainScreen}
        options={{ drawerLabel: 'Main',title: 'E_Learn' }}
        />
        <Drawer.Screen
        name="Profile"
        component={Profilepage}
        options={{ drawerLabel: 'Profile' }}
        />
        <Drawer.Screen
        name="Your Activity"
        component={Youractivity}
        options={{ drawerLabel: 'Your Activity' }}
        />
        <Drawer.Screen
        name="Watch Later"
        component={Watchlater}
        options={{ drawerLabel: 'Watch Later' }}
        />
        </Drawer.Navigator>
    </MyContext.Provider>
</SafeAreaView>
    
);
}

export default Drawerpage;