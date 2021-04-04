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
import { ActivityIndicator } from 'react-native';
import { verifyCNIC } from '../../redux/authActions';
import Stepper from '../../shared/stepper';

// import MaterialIcons from 'react-native-vector-icons/FontAwesome';
const EnterCNIC = (props) => {
  const [cnic, setCNIC] = React.useState('');
  const [loading, setLoading] = React.useState({ status: false, message: "" });
  const [error, setError] = React.useState({ status: false, message: "" })

  const handleCNICChange = (inputValue) => {
    setError({ status: false, message: "" })
    setCNIC(inputValue);
  };

  const onNextClick = () => {
    if (cnic.length == 13) {
      setLoading({ status: true, message: "Sending Request" });
      setTimeout(() => setLoading({ status: true, message: "Verifying CNIC" }), 700)
      setTimeout(() => apiCallVerifyCNIC(), 1300)
    } else {
      setError({ status: true, message: "Invalid CNIC number" })
    }

  }
  const apiCallVerifyCNIC = async () => {
    try {
      const result = await verifyCNIC({ cnic });
      setLoading(false);
      console.log('result', result);
      setLoading({ status: false, message: "Sending Request" });
      if (result.error) {
        console.log('result.error', result.error);
        setError({ status: true, message: result.error.message })
        //do something 
      } else {
        nextPressHandler()
      }

    } catch (error) {
      console.log('error d: ', error);
    }
  }

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
          < Stepper step={2} />
          {/* <Image
            source={require('../../assets/stepper2.png')}
            style={gStyles.stepImg}
          /> */}
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <Card style={{}}>
            <View>
              <Text
                style={{ fontWeight: 'bold', fontSize: 25, marginBottom: 15 }}>
                Enter NIC Number
              </Text>
              <Text style={{ marginBottom: 30 }}>Enter 13 Digit National Identity Card Number</Text>
            </View>
            <View
              style={{
                // alignSelf: 'center',
                // marginHorizontal: 50,
                fontSize: 25,
                marginBottom: 30,
              }}>
              <TextInput
                style={
                  error.status
                    ? styles.errorInput
                    : styles.input
                }
                onChangeText={(text) => handleCNICChange(text)}
                keyboardType="numeric"
                value={cnic}
                disabled={loading.status}
                placeholder='eg. 4210112345678'
              />
              {/* loader */}

              {error.status ?
                <View style={{ marginBottom: 20, marginTop: 5, color: 'red', alignItems: 'flex-start', flexDirection: 'row' }}><Text style={{
                  color: 'red',
                }}>{error.message}</Text></View>
                : loading.status ?
                  <View style={{ marginBottom: 20, marginTop: 5, alignItems: 'flex-start', flexDirection: 'row' }}>
                    <ActivityIndicator size='small' color="#B0389F" />
                    <Text>  {loading.message}</Text>
                  </View >
                  : <View style={{ marginBottom: 20, marginTop: 5, alignItems: 'flex-start', flexDirection: 'row' }}><Text>{" "}</Text></View>}
            </View>
            <FlatButton text="Next" onPress={
              // nextPressHandler
              onNextClick
            } />
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
  }
});

export default EnterCNIC;
