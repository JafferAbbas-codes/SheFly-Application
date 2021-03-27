import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
// import { GoogleSignin } from '@react-native-community/google-signin';

const Stack = createStackNavigator();

const AuthStack = () => {
  // useEffect(()=>{
  //   GoogleSignin.configure({
  //     webClientId:'153330860530-b0ndbngo9rlm7g9i5a2gfn43sofdpsku.apps.googleusercontent.com'
  //   })

  // },[])
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthStack;
