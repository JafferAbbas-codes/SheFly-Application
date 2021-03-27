import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import About from '../components/about';
import RevDetails from '../components/RevDetails';
import Header from '../shared/header';

const screens = {
  About: {
    screen: About,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <Header navigation={navigation} title="About GameZone" />
        ),
      };
    },
  },
};

const AboutStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {backgroundColor: '#eee', height: 60},
  },
});
export default AboutStack;
