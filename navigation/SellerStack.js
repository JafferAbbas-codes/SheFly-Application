import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Home from '../screens/seller/Home';
import AllServices from '../screens/seller/AllService';
import Messaging from '../screens/seller/Messaging';
import DrawerContent from '../screens/seller/DrawerContent';
import Availablejobs from '../screens/seller/Availablejobs';
import Profile from '../screens/seller/Profile';
import ServiceSeller from '../screens/buyer/ServiceSeller';
import EditProfile from '../screens/seller/EditProfile';
import JobsDone from '../screens/seller/JobsDone';
import JobsInProgress from '../screens/seller/JobsInProgress';
import AllBids from '../screens/seller/Bids';
import ViewJob from '../screens/seller/ViewJobDetails';
import SendBid from '../screens/seller/SendBid';
import OfferSent from '../screens/seller/OfferSent';
import ServiceJobs from '../screens/seller/ServiceJobs';
// import io from 'socket.io-client';
import Icon from 'react-native-vector-icons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

const SellerStack = (myProps) => {
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
      // activeColor="#fff"
      activeColor="#291F28"
      inactiveColor="#D8BFD6"
      tabBarOptions={{
        showLabel: false,
      }}
      // style={{backgroundColor: 'tomato'}}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          // tabBarLabel: 'Home',
          // tabBarColor: '#FF9900',
          tabBarColor: '#FFFFFF',

          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatStackScreen}
        options={{
          // tabBarLabel: 'Chats',
          // tabBarColor: '#CC0000',
          tabBarColor: '#FFFFFF',
          tabBarIcon: ({color}) => (
            <Ionicons name="chatbox-ellipses-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AvailableJobs"
        component={AvailableJobsStackScreen}
        options={{
          // tabBarLabel: 'AvailableJobs',
          // tabBarColor: '#FF6699',
          tabBarColor: '#FFFFFF',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="briefcase" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          // tabBarLabel: 'Profile',
          // tabBarColor: '#FF6699',
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
      <Stack.Screen name="Availablejobs" component={Availablejobs} />
      <Stack.Screen name="ViewJob" component={ViewJob} />
      <Stack.Screen name="SendBid" component={SendBid} />
      <Stack.Screen name="OfferSent" component={OfferSent} />
      <Stack.Screen name="ServiceJobs" component={ServiceJobs} />
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
const AvailableJobsStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Availablejobs" component={Availablejobs} />
      <Stack.Screen name="ViewJob" component={ViewJob} />
      <Stack.Screen name="SendBid" component={SendBid} />
      <Stack.Screen name="OfferSent" component={OfferSent} />
      {/* <Stack.Screen name="Home" component={Home} /> */}
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
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="JobsDone" component={JobsDone} />
      <Stack.Screen name="JobsInProgress" component={JobsInProgress} />
      <Stack.Screen name="AllBids" component={AllBids} />
      {/* <Stack.Screen name="Explorer" component={Explorer} /> */}
    </Stack.Navigator>
  );
};

export default SellerStack;
