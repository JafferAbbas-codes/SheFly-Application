import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import User from './User.js';
import UserCard from './UserCard.js';
const Tab = createMaterialTopTabNavigator();

function UserTabs(props) {
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
        // style={{backgroundColor: 'black'}}
        children={() => (
          <UserCard users={props.buyers} allUsers={props.allUsers} />
        )}
      />
      <Tab.Screen
        name="Sellers"
        children={() => (
          <UserCard users={props.sellers} allUsers={props.allUsers} />
        )}
      />
    </Tab.Navigator>
  );
}
export default UserTabs;
