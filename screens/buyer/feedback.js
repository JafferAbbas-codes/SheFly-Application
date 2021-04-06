import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import FlatButton from '../../shared/button';

export default function offerSent() {
  return (
    <View
      style={{
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
      }}>
      <MaterialIcons
        name="check-circle"
        size={180}
        style={{
          color: '#AD379D',
        }}
      />
      <Text style={{ textAlign: 'center', fontSize: 30 }}>
        Let the seller know how was her service!
      </Text>
      <MaterialIcons
        name="star"
        size={180}
        style={{
          color: '#AD379D',
        }}
      />
      <FlatButton text={Submit} />
    </View>
  );
}
