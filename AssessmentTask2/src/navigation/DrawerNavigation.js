import { createDrawerNavigator } from '@react-navigation/drawer';
import MyProfile from '../screens/MyProfile';
import MyTabs from './BottomNavigation';
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator screenOptions={{headerShown:false}}>
      <Drawer.Screen name="Home" component={MyTabs} />
      <Drawer.Screen name="MyProfile" component={MyProfile} />
    </Drawer.Navigator>

  );
}
export default MyDrawer