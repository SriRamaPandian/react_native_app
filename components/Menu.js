import { createDrawerNavigator } from '@react-navigation/drawer';
import Youractivity from '../screens/Youractivity';
import Watchlater from '../screens/Watchlater';

const Drawer = createDrawerNavigator();

const Menu = () => {
  return (
    <Drawer.Navigator initialRouteName="Feed">
      <Drawer.Screen
        name="Youractivity"
        component={Youractivity}
        options={{ drawerLabel: 'Your Activity' }}
      />
      <Drawer.Screen
        name="Youractivity"
        component={Youractivity}
        options={{ drawerLabel: 'Your Activity' }}
      />
      <Drawer.Screen
        name="Notifications"
        //component={Notifications}
        options={{ drawerLabel: 'Notification' }}
      />
      <Drawer.Screen
        name="Watchlater"
        component={Watchlater}
        options={{ drawerLabel: 'Watchlater' }}
      />
    </Drawer.Navigator>
  );
}

export default Menu;