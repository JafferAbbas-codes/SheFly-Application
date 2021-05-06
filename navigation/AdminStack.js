import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from '../screens/admin/Home';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import BookingScreen from '../screens/admin/Booking';
import ComplainScreen from '../screens/admin/Complain';
import Users from '../screens/admin/User';
import DrawerContent from '../screens/admin/DrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const AdminStack = (myProps) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Welcome to the App" component={MainBottomTabStack} />
      {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
    </Drawer.Navigator>
  );
};

const MainBottomTabStack = () => {
  return (
    <Tab.Navigator
      // initialRouteName="Home"
      // activeColor="black"
      // inactiveColor="#3e2465"
      tabBarOptions={{
        showLabel: false,

        style: {
          position: 'absolute',
          elevation: 0,
          border: 4,
          height: 55,
          // backgroundColor: '#FFFFFF',

          // borderColor: '#000000',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,

          // backgroundColor: 'red',
          ...styles.shadow,
        },
      }}
      // barStyle={{backgroundColor: 'white', height: 50}}
    >
      <Tab.Screen
        name="HomeScreen"
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={22} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="shopping-cart" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Complains"
        component={ComplainScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="alert-circle"
              color={color}
              size={23}
            />
          ),
        }}
      />
      <Tab.Screen
        name="users"
        component={Users}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5Icon name="users" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// const HomeStackScreen = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="AllServices" component={AllServices} />
//       <Stack.Screen name="ServiceSeller" component={ServiceSeller} />
//       <Stack.Screen name="AvailableSellers" component={AvailableSellers} />
//       <Stack.Screen
//         name="SellerProfileForBuyer"
//         component={SellerProfileForBuyer}
//       />
//       <Stack.Screen name="SendOfferToSeller" component={SendOfferToSeller} />
//     </Stack.Navigator>
//   );
// };
// const ChatStackScreen = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="Messaging" component={Messaging} />
//       {/* <Stack.Screen name="Explorer" component={Explorer} /> */}
//     </Stack.Navigator>
//   );
// };
// const PostRequestStack = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="PostRequest" component={PostRequest} />
//       {/* <Stack.Screen name="Explorer" component={Explorer} /> */}
//     </Stack.Navigator>
//   );
// };
// const YourRequestsStackScreen = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="BuyerRequests" component={BuyerRequests} />
//       <Stack.Screen name="RequestDetails" component={RequestDetails} />
//       <Stack.Screen name="BidsOnBuyerRequest" component={BidsOnBuyerRequest} />
//       {/* <Stack.Screen name="Explorer" component={Explorer} /> */}
//     </Stack.Navigator>
//   );
// };
// const ProfileStackScreen = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="BuyerProfile" component={BuyerProfile} />
//       <Stack.Screen name="BuyerRequests" component={BuyerRequests} />
//       <Stack.Screen name="Bookings" component={Bookings} />
//       <Stack.Screen name="BookingDetails" component={BookingDetails} />
//       {/* <Stack.Screen name="RequestDetails" component={RequestDetails} /> */}
//       {/* <Stack.Screen name="Explorer" component={Explorer} /> */}
//     </Stack.Navigator>
//   );
// };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#7F5Df0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default AdminStack;
