import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Home from '../screens/seller/Home';
import AllServices from '../screens/seller/AllService';
import Messaging from '../screens/seller/Messaging';
import DrawerContent from '../screens/seller/DrawerContent';
import Offers from '../screens/seller/Offers';
import Availablejobs from '../screens/seller/Availablejobs';
import Profile from '../screens/seller/Profile';
import ServiceSeller from '../screens/buyer/ServiceSeller';
import EditProfile from '../screens/seller/EditProfile';
import JobsDone from '../screens/seller/JobsDone';
import JobsInProgress from '../screens/seller/JobsInProgress';
import AllBids from '../screens/seller/Bids';
import ViewJobDetails from '../screens/seller/ViewJobDetails';
import ViewOfferDetails from '../screens/seller/ViewOfferDetails';
import SendBid from '../screens/seller/SendBid';
import OfferSent from '../screens/seller/OfferSent';
import ServiceJobs from '../screens/seller/ServiceJobs';
// import io from 'socket.io-client';
import Icon from 'react-native-vector-icons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

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
      // activeColor="#291F28"
      // inactiveColor="#D8BFD6"
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
      // style={{backgroundColor: 'tomato'}}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          // tabBarLabel: 'Home',
          // tabBarColor: '#FF9900',
          // tabBarColor: '#FFFFFF',

          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name="home"
              color={focused ? '#b23aa2' : '#D8BFD6'}
              size={27}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatStackScreen}
        options={{
          // tabBarLabel: 'Chats',
          // tabBarColor: '#CC0000',
          // tabBarColor: '#FFFFFF',
          tabBarIcon: ({color, focused}) => (
            <Ionicons
              name="chatbox-ellipses"
              color={focused ? '#b23aa2' : '#D8BFD6'}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AvailableJobs"
        component={AvailableJobsStackScreen}
        options={{
          // tabBarLabel: 'AvailableJobs',
          // tabBarColor: '#FF6699',
          // tabBarColor: '#FFFFFF',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name="briefcase-variant"
              color={focused ? '#b23aa2' : '#D8BFD6'}
              size={27}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SellerOffers"
        component={SellerOffers}
        options={{
          // tabBarLabel: 'AvailableJobs',
          // tabBarColor: '#FF6699',
          // tabBarColor: '#FFFFFF',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name="bell"
              color={focused ? '#b23aa2' : '#D8BFD6'}
              size={27}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          // tabBarLabel: 'Profile',
          // tabBarColor: '#FF6699',
          // tabBarColor: '#FFFFFF',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name="account"
              color={focused ? '#b23aa2' : '#D8BFD6'}
              size={27}
            />
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
      <Stack.Screen name="ViewJobDetails" component={ViewJobDetails} />
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
      <Stack.Screen name="ViewJobDetails" component={ViewJobDetails} />
      <Stack.Screen name="SendBid" component={SendBid} />
      <Stack.Screen name="OfferSent" component={OfferSent} />
    </Stack.Navigator>
  );
};
const SellerOffers = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Offers" component={Offers} />
      <Stack.Screen name="ViewOfferDetails" component={ViewOfferDetails} />
      {/* <Stack.Screen name="SendBid" component={SendBid} />
      <Stack.Screen name="OfferSent" component={OfferSent} /> */}
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
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
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

export default SellerStack;
