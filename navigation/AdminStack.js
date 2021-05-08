import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DrawerContent from '../screens/admin/DrawerContent';
import bottomNavigator from '../screens/admin/bottomNavigation';

const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const BookingsStack = createStackNavigator();

const AdminStack = (myProps) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeStackScreen} />
      <Drawer.Screen name="BookingsStack" component={BookingsStackScreen} />
    </Drawer.Navigator>
  );
};

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#ae379d',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '400',
        letterSpacing: 6,
        marginLeft: 55,
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={bottomNavigator}
      options={{
        title: 'SHE-FLY',
        headerLeft: () => (
          <Ionicons.Button
            name="menu"
            size={30}
            backgroundColor="#ae379d"
            onPress={() => navigation.openDrawer()}></Ionicons.Button>
        ),
      }}
    />
  </HomeStack.Navigator>
);

const BookingsStackScreen = ({navigation}) => (
  <BookingsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: 'purple',
      },
      headerTintColr: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <BookingsStack.Screen
      name="Bookings"
      component={BookingsStackScreen}
      options={{
        title: 'Overview',
        headerLeft: () => (
          <Ionicons.Button
            name="menu"
            size={30}
            backgroundColor="#ae379d"
            onPress={() => navigation.openDrawer()}></Ionicons.Button>
        ),
      }}></BookingsStack.Screen>
  </BookingsStack.Navigator>
);

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

export default AdminStack;
