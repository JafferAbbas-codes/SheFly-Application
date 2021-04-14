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
import {gStyles} from '../../styles/global';
import Header from '../../shared/Header';
import Card from '../../shared/Card';
import FlatButton from '../../shared/Button.js';
import {Dimensions} from 'react-native';
import Stepper from '../../shared/Stepper';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

// import MaterialIcons from 'react-native-vector-icons/FontAwesome';
const PhoneNumber = (props) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [error, setError] = React.useState({status: false, message: ''});

  const handleNumberChange = (inputValue) => {
    setError({status: false, message: ''});

    console.log(typeof inputValue);
    let reg = /^\d+$/;
    if (reg.test(inputValue) || inputValue == '') {
      setPhoneNumber(inputValue);
    }
  };

  // const validatePhoneNumber = () => {

  // }

  const nextPressHandler = () => {
    if (phoneNumber.length == 11) {
      props.navigation.navigate('EnterCNIC', {
        ...props.route.params,
        phoneNumber,
      });
    } else {
      setError({status: true, message: 'Invalid phone number'});
    }
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      {/* {console.log('To Test')} */}
      <ScrollView
        style={styles.back}
        // contentContainerStyle={styles.temp}
      >
        <Header />
        <Stepper step={1} />
        {/* <Image
          source={require('../../assets/stepper1.png')}
          style={gStyles.stepImg}
        /> */}
        <Card>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 25, marginBottom: 15}}>
              Let's Get Started
            </Text>
            <Text style={{marginBottom: 30}}>
              Enter your phone number to begin
            </Text>
          </View>
          <View
            style={{
              // backgroundColor: 'red',
              flexDirection: 'row',
              marginBottom: 50,
              justifyContent: 'flex-start',
            }}>
            <Image
              source={require('../../assets/flag-400.jpg')}
              style={styles.headerImage}
            />

            <View
              style={{
                flexDirection: 'column',
                // backgroundColor: 'yellow',
                flex: 7,
              }}>
              <TextInput
                style={error.status ? styles.errorInput : styles.input}
                placeholder="eg. 03362032476"
                onChangeText={(text) => handleNumberChange(text)}
                keyboardType="number-pad"
                value={phoneNumber}
              />

              <View>
                <Text
                  style={{
                    color: 'red',
                    flexDirection: 'column',
                  }}>
                  {error.status ? error.message : ''}
                </Text>
              </View>
            </View>
          </View>
          <FlatButton text="Next" onPress={nextPressHandler} />
        </Card>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#B0389F',

    // alignItems: 'flex-end'
    // textAlignVertical: "bottom"
  },
  temp: {
    alignContent: 'flex-end',
    justifyContent: 'space-between',
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
    width: 28,
    height: 38,
    backgroundColor: 'pink',
    marginRight: 7,
    flex: 1,
    // paddingVertical: 12
    // marginTop: 7,
    // flex: 2
  },
  errorInput: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    // marginBottom: 55,
    backgroundColor: '#FEF8FF',
    // width: 250,
    padding: 10,
    // paddingVertical: 0,
    fontSize: 16,
  },
  input: {
    // flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    // marginBottom: 50,
    backgroundColor: '#FEF8FF',
    alignSelf: 'stretch',
    // width: width,
    fontSize: 16,
    padding: 10,
  },
});

export default PhoneNumber;
