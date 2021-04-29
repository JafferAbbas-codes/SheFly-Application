import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import UserCard from './UserCard.js';
const Tab = createMaterialTopTabNavigator();

function UserTabs() {
  return (
    <Tab.Navigator
      style={{backgroundColor: '#d8bfd6'}}
      tabBarOptions={{
        labelStyle: {fontSize: 14, fontWeight: '700'},
        indicatorStyle: {backgroundColor: '#ae379d'},
        style: {backgroundColor: '#d8bfd6'},
      }}>
      <Tab.Screen
        name="Buyers"
        style={{backgroundColor: 'black'}}
        component={UserCard}
      />
      <Tab.Screen name="Sellers" component={UserCard} />
    </Tab.Navigator>
  );
}
export default UserTabs;
