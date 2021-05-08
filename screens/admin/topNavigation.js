import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import BookingCard from './BookingCard';
const Tab = createMaterialTopTabNavigator();

function MyTabs(props) {
  console.log('props in top navigation', props);
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
        // style={{backgroundColor: 'black'}}
        children={() => (
          <BookingCard
            bookings={props.pendingBookings}
            Refresh={props.Refresh}
          />
        )}
      />
      <Tab.Screen
        name="Confirmed"
        children={() => (
          <BookingCard
            bookings={props.confirmedBookings}
            Refresh={props.Refresh}
          />
        )}
      />
      <Tab.Screen
        name="Completed"
        children={() => (
          <BookingCard
            bookings={props.completedBookings}
            Refresh={props.Refresh}
          />
        )}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;
