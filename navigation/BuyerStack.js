import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Home from '../screens/buyer/Home';
import AllServices from '../screens/buyer/AllService';
import ServiceSeller from '../screens/buyer/ServiceSeller';
import Messaging from '../screens/buyer/Messaging';
import BuyerRequests from '../screens/buyer/BuyerRequests';
import BuyerProfile from '../screens/buyer/BuyerProfile';
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
import BidsOnBuyerRequest from '../screens/buyer/BidsOnBuyerRequests';
import {TouchableOpacity} from 'react-native';
import Bookings from '../screens/buyer/Booking';
import BookingDetails from '../screens/buyer/BookingDetails';
import PostRequest from '../screens/buyer/PostRequest';
import SendOfferToSeller from '../screens/buyer/SendOfferToSeller';
import PaymentScreen from '../screens/payment/PaymentScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const BuyerStack = (myProps) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Welcome to the App" component={MainBottomTabStack} />
      {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
    </Drawer.Navigator>
  );
};

const CustomTabBarButtom = ({children, onPress, focused}) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}>
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 35,
        backgroundColor: '#b33aa3',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const MainBottomTabStack = () => {
  return (
    <Tab.Navigator
      // initialRouteName="Home"
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
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          // tabBarLabel: 'Home',
          // tabBarColor: '#FF9900',
          // tabBarColor: '#FFFFFF',
          // tabBarOptions: {showLabel: false},
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name="home"
              // color={focused ? '#000000' : '#D8BFD6'}
              color={focused ? '#b23aa2' : '#D8BFD6'}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ChatStackScreen"
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
        name="PostRequestStack"
        component={PostRequestStack}
        options={{
          // tabBarLabel: 'Updates',
          // tabBarColor: '#FF6699',
          // tabBarColor: '#FFFFFF',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons name="plus" color={'#ffffff'} size={27} />
          ),
          tabBarButton: (props) => <CustomTabBarButtom {...props} />,
        }}
      />
      <Tab.Screen
        name="YourRequestsStackScreen"
        component={YourRequestsStackScreen}
        options={{
          // tabBarLabel: 'Requests',
          // tabBarColor: '#FF6699',
          // tabBarColor: '#FFFFFF',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name="clipboard-list"
              color={focused ? '#b23aa2' : '#D8BFD6'}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStackScreen"
        component={ProfileStackScreen}
        options={{
          // tabBarLabel: 'Profile',
          // tabBarColor: '#CC33FF',
          // tabBarColor: '#FFFFFF',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name="account"
              color={focused ? '#b23aa2' : '#D8BFD6'}
              size={26}
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
      <Stack.Screen name="AvailableSellers" component={AvailableSellers} />
      <Stack.Screen
        name="SellerProfileForBuyer"
        component={SellerProfileForBuyer}
      />
      <Stack.Screen name="SendOfferToSeller" component={SendOfferToSeller} />
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
const PostRequestStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PostRequest" component={PostRequest} />
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
      <Stack.Screen name="BidsOnBuyerRequest" component={BidsOnBuyerRequest} />
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
      <Stack.Screen name="BuyerProfile" component={BuyerProfile} />
      <Stack.Screen name="BuyerRequests" component={BuyerRequests} />
      <Stack.Screen name="RequestDetails" component={RequestDetails} />
      <Stack.Screen name="Bookings" component={Bookings} />
      <Stack.Screen name="BookingDetails" component={BookingDetails} />
      {/* <Stack.Screen name="RequestDetails" component={RequestDetails} /> */}
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
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

export default BuyerStack;
