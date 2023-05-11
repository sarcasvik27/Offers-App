import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import SavedOffer from '../screens/SavedOffers';
import Icon from 'react-native-vector-icons/FontAwesome';
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="All Offers" component={Home} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" style={{fontSize:25}}></Icon>
          ),
        }} />
      <Tab.Screen name="My Offers" component={SavedOffer} options={{
          tabBarLabel: 'Saved Offers',
          tabBarIcon: ({ color, size }) => (
            <Icon name="bookmark" style={{fontSize:25}}></Icon>
          ),
        }} />
    </Tab.Navigator>
  );
}
export default MyTabs