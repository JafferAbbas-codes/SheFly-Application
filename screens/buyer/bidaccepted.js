import React, {useState} from 'react';
import {View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';

export default function offerSent() {
  return (
    <View
      style={{
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
      }}>
      {console.log('To test')}
      <MaterialIcons
        name="check-circle"
        size={180}
        style={{
          color: '#AD379D',
        }}
      />
      <Text style={{textAlign: 'center', fontSize: 30}}>Bid Accepted</Text>
    </View>
  );
}
