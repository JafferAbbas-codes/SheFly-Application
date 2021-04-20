import React, {useEffect, useState} from 'react';
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
  Alert,
} from 'react-native';

const AccountType = (props) => {
  const [userType, setUserType] = useState(null);

  const handleTypeSelect = (inputValue) => {
    setUserType(inputValue);
    pressHandler(inputValue);
  };

  useEffect(() => {
    if (props.route.params.cnic % 2 != 0) {
      Alert.alert(
        'Important Notice',
        'Male users cannot provide services on She-Fly platform(s), however, they can hire someone for work.',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Continue',
            onPress: () => console.log('OK Pressed'),
            color: 'green',
          },
        ],
        {
          cancelable: true,
        },
      );
    }
  }, []);

  const pressHandler = (inputValue) => {
    props.navigation.navigate('AccountInfo', {
      ...props.route.params,
      userType: inputValue,
    });
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
        <TouchableOpacity onPress={() => handleTypeSelect('buyer')}>
          <View style={styles.option}>
            <Text style={{fontSize: 16}}>Hire someone</Text>
          </View>
        </TouchableOpacity>

        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
          OR
        </Text>
        {props.route.params.cnic % 2 == 0 ? (
          <TouchableOpacity onPress={() => handleTypeSelect('seller')}>
            <View style={styles.option}>
              <Text style={{fontSize: 16}}>Work for Someone</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableWithoutFeedback>
            <View style={styles.disabled}>
              <Text style={{fontSize: 16, textDecorationLine: 'line-through'}}>
                Work for someone
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
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
  disabled: {
    backgroundColor: '#A9A9A9',
    marginVertical: 20,
    paddingHorizontal: 70,
    paddingVertical: 30,
    borderRadius: 20,
  },
});

export default AccountType;
