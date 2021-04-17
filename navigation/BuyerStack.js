import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/buyer/Home';
import AllServices from '../screens/buyer/AllService';
import ServiceSeller from '../screens/buyer/ServiceSeller';
import Messaging from '../screens/buyer/Messaging';
import BuyerRequests from '../screens/buyer/BuyerRequests';
// import About from '../screens/About';
// import Notifications from '../screens/Notifications';
// import Profile from '../screens/buyer/Profile';
// import Explorer from '../screens/Explorer';
// import Users from '../screens/Users';
import DrawerContent from '../screens/buyer/DrawerContent';
// import io from 'socket.io-client';
import Icon from 'react-native-vector-icons';
import AvailableSellers from '../screens/buyer/AvailableSellers';
import SellerProfileForBuyer from '../screens/buyer/SellerProfile';
import RequestDetails from '../screens/buyer/RequestDetails';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

const BuyerStack = (myProps) => {
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
      initialRouteName="Home"
      activeColor="#291F28"
      inactiveColor="#D8BFD6"
      style={{backgroundColor: 'tomato'}}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          // tabBarColor: '#FF9900',
          tabBarColor: '#FFFFFF',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatStackScreen"
        component={ChatStackScreen}
        options={{
          tabBarLabel: 'Chats',
          // tabBarColor: '#CC0000',
          tabBarColor: '#FFFFFF',
          tabBarIcon: ({color}) => (
            <Ionicons name="chatbox-ellipses-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="YourRequestsStackScreen"
        component={YourRequestsStackScreen}
        options={{
          tabBarLabel: 'Updates',
          // tabBarColor: '#FF6699',
          tabBarColor: '#FFFFFF',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStackScreen"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          // tabBarColor: '#CC33FF',
          tabBarColor: '#FFFFFF',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AllServices" component={AllServices} />
      <Stack.Screen name="ServiceSeller" component={ServiceSeller} />
      <Stack.Screen name="AvailableSellers" component={AvailableSellers} />
      <Stack.Screen
        name="SellerProfileForBuyer"
        component={SellerProfileForBuyer}
      />
    </Stack.Navigator>
  );
};
const ChatStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Messaging" component={Messaging} />
      {/* <Stack.Screen name="Explorer" component={Explorer} /> */}
    </Stack.Navigator>
  );
};

const YourRequestsStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BuyerRequests" component={BuyerRequests} />
      <Stack.Screen name="RequestDetails" component={RequestDetails} />
      {/* <Stack.Screen name="Explorer" component={Explorer} /> */}
    </Stack.Navigator>
  );
};
const ProfileStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Messaging" component={Messaging} />
      {/* <Stack.Screen name="Explorer" component={Explorer} /> */}
    </Stack.Navigator>
  );
};

export default BuyerStack;
