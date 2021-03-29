import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

const AccountType = (props) => {
  const pressHandler = () => {
    props.navigation.navigate('AccountInfo');
  };
  return (
    <View
      style={{
        backgroundColor: '#B0389F',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignContent: 'center',
      }}>
      <View
        style={{
          flexDirection: 'column',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 22}}>
          I want to
        </Text>
        <TouchableOpacity onPress={pressHandler}>
          <View style={styles.option}>
            <Text style={{fontSize: 16}}>Hire someone for work</Text>
          </View>
        </TouchableOpacity>

        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
          OR
        </Text>
        <TouchableOpacity onPress={pressHandler}>
          <View style={styles.option}>
            <Text style={{fontSize: 16}}>Work for someone</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  option: {
    backgroundColor: 'white',
    marginVertical: 20,
    paddingHorizontal: 70,
    paddingVertical: 30,
    borderRadius: 20,
  },
});

export default AccountType;
