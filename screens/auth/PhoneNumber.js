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
import Header from '../../shared/header';
import Card from '../../shared/card';
import FlatButton from '../../shared/button.js';

// import MaterialIcons from 'react-native-vector-icons/FontAwesome';
const PhoneNumber = (props) => {
  const [phoneNumber, setPhoneNumber] = React.useState('+92');

  const handleNumberChange = (inputValue) => {
    setPhoneNumber(inputValue);
  };

  const nextPressHandler = () => {
    props.navigation.navigate('EnterCNIC', {
      ...props.route.params,
      phoneNumber,
    });
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ScrollView style={styles.back}>
        <Header />
        <Image
          source={require('../../assets/step1.jpg')}
          style={gStyles.stepImg}
        />
        <Card>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 25, marginBottom: 15}}>
              Let's Get Started
            </Text>
            <Text style={{marginBottom: 40}}>
              Enter your phone number to begin
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/flag-400.jpg')}
              style={styles.headerImage}
            />
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 50,
                backgroundColor: '#FEF8FF',
                width: 250,
              }}
              onChangeText={(text) => handleNumberChange(text)}
              keyboardType="numeric"
              value={phoneNumber}
            />
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

export default PhoneNumber;
