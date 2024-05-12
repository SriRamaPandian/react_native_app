import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import MainScreen from '../screens/MainScreen'
import Youractivity from '../screens/Youractivity';
import Watchlater from '../screens/Watchlater';
import Profilepage from './Profilepage';

const Drawer = createDrawerNavigator();

const Drawerpage = () => {
return (
<SafeAreaView className='flex-1'>
    <Drawer.Navigator 
    initialRouteName="Main"
    screenOptions={
    {headerTransparent: true , 
    headerTitleStyle: {fontWeight: 'bold',fontSize: 30}}}>
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
</SafeAreaView>
    
);
}

export default Drawerpage;