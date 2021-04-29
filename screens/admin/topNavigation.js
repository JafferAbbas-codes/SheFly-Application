import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import bookingCard from './BookingCard';
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      style={{backgroundColor: '#d8bfd6'}}
      tabBarOptions={{
        labelStyle: {fontSize: 14, fontWeight: '700'},
        indicatorStyle: {backgroundColor: '#ae379d'},
        style: {backgroundColor: '#d8bfd6'},
      }}>
      <Tab.Screen
        name="Pending"
        style={{backgroundColor: 'black'}}
        component={bookingCard}
      />
      <Tab.Screen name="Confirmed" component={bookingCard} />
      <Tab.Screen name="Cancelled" component={bookingCard} />
    </Tab.Navigator>
  );
}
export default MyTabs;
