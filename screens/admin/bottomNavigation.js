import React from 'react';
import HomeScreen from './home';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import BookingScreen from './Booking.js';
import ComplainScreen from './Complain.js';
import Users from './User.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default function bottomNavigator() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="black"
      inactiveColor="#3e2465"
      labeled={false}
      barStyle={{backgroundColor: 'white', height: 50}}>
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
}
