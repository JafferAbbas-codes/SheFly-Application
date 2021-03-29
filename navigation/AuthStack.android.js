import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/auth/SignIn';
import EnterCNIC from '../screens/auth/CNIC';
import AccountType from '../screens/auth/AccountType';
import AccountInfo from '../screens/auth/AccountInfo';
import SellerBio from '../screens/auth/SellerBio';
import PhoneNumber from '../screens/auth/PhoneNumber';
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
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
      <Stack.Screen name="EnterCNIC" component={EnterCNIC} />
      <Stack.Screen name="AccountType" component={AccountType} />
      <Stack.Screen name="AccountInfo" component={AccountInfo} />
      <Stack.Screen name="SellerBio" component={SellerBio} />
    </Stack.Navigator>
  );
};

export default AuthStack;
