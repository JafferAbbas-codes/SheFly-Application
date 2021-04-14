import React from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import Home from '../screens/seller/home';
import Profile from '../screens/seller/Profile';
import BuyerStack from './BuyerStack';
import SellerStack from './SellerStack';

// import {DrawerContent} from '../screens/DrawerContent';

import Icon from 'react-native-vector-icons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

const AppStack = (props) => {
  console.log('props in appstack', props);
  return props.user.userType == 'buyer' ? (
    <BuyerStack />
  ) : props.user.userType == 'seller' ? (
    <SellerStack />
  ) : (
    <Text>AdminStack not ready</Text>
  );
};

export default AppStack;
