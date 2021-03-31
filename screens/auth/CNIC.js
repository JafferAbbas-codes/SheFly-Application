import React from 'react';
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
import Header from '../../shared/header';
import Card from '../../shared/card';
import FlatButton from '../../shared/button.js';
import { gStyles } from '../../styles/global';

// import MaterialIcons from 'react-native-vector-icons/FontAwesome';
const EnterCNIC = (props) => {
  const [cnic, setCNIC] = React.useState('');

  const handleCNICChange = (inputValue) => {
    setCNIC(inputValue);
  };

  const nextPressHandler = () => {
    props.navigation.navigate('AccountType', {
      ...props.route.params,
      cnic,
    });
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ScrollView
        style={styles.back}
        contentContainerStyle={{ justifyContent: 'space-between' }}>
        {/* <View
          style={{

          }}> */}
        <View>
          <Header />
          <Image
            source={require('../../assets/stepper2.png')}
            style={gStyles.stepImg}
          />
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <Card style={{}}>
            <View>
              <Text
                style={{ fontWeight: 'bold', fontSize: 25, marginBottom: 15 }}>
                Enter NIC Number
              </Text>
              <Text>Enter 14 Digit National Identity Card Number</Text>
            </View>
            <View
              style={{
                alignSelf: 'center',
                marginHorizontal: 50,
                fontSize: 25,
              }}>
              <TextInput
                style={{
                  height: 40,
                  fontSize: 20,
                  borderColor: 'gray',
                  borderWidth: 1,
                  borderRadius: 10,
                  marginBottom: 50,
                  marginTop: 15,
                  paddingLeft: 15,
                  backgroundColor: '#FEF8FF',
                  width: 330,
                }}
                onChangeText={(text) => handleCNICChange(text)}
                keyboardType="numeric"
                value={cnic}
              />
            </View>
            <FlatButton text="Next" onPress={nextPressHandler} />
          </Card>
        </View>
        {/* </View> */}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#B0389F',
    // backgroundColor: 'yellow',
    flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  header: {
    paddingLeft: 35,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  HeaderText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    letterSpacing: 1,
  },
  icon: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    flexDirection: 'row',
  },
  headerImage: {
    width: 26,
    height: 26,
    marginHorizontal: 10,
    marginTop: 7,
  },
});

export default EnterCNIC;
