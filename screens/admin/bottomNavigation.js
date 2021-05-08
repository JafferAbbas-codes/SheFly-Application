import React from 'react';
import HomeScreen from './Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
export default function bottomNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          elevation: 0,
          border: 4,
          height: 55,
          backgroundColor: '#FFFFFF',

          // borderColor: '#000000',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,

          // backgroundColor: 'red',
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="home"
              color={focused ? '#b23aa2' : '#D8BFD6'}
              size={26}
            />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="shopping-cart"
              color={focused ? '#b23aa2' : '#D8BFD6'}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Complains"
        component={ComplainScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="emoticon-sad"
              color={focused ? '#b23aa2' : '#D8BFD6'}
              size={27}
            />
          ),
        }}
      />
      <Tab.Screen
        name="users"
        component={Users}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesome5Icon
              name="users"
              color={focused ? '#b23aa2' : '#D8BFD6'}
              size={20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
