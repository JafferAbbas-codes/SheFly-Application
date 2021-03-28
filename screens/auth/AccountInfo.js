import React, {useState} from 'react';
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
import Checkbox from 'react-native-check-box';
import Header from './../shared/header';
import Card from '../../shared/card';
import FlatButton from '../../shared/button.js';
import {gStyles} from '../../styles/global';
import {Formik} from 'formik';
import * as yup from 'yup';

// import MaterialIcons from 'react-native-vector-icons/FontAwesome';
export default function EnterAccount() {
  // const [name, onChangeName] = useState('');
  // const [email, onChangeEmail] = useState('');
  // const [pass, onChangePass] = useState('');
  // const [confirmpass, onChangeConf] = useState('');
  const changeNameHandler = (val) => {
    setText(val);
  };

  const [isSelected, setSelection] = useState(false);
  const reviewSchema = yup.object({
    name: yup.string().required().min(4),
    email: yup.string().required(),
    password: yup
      .string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.'),
    passwordConfirmation: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
    acceptTerms: yup
      .bool()
      .oneOf([true], 'Accept Terms & Conditions is required'),
  });
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ScrollView style={styles.back}>
        <Header />
        <Image
          source={require('../../assets/step4.jpg')}
          style={gStyles.stepImg}
        />
        <Card>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              passwordConfirmation: '',
              acceptTerms: false,
            }}
            validationSchema={reviewSchema}
            onSubmit={(values, actions) => {
              actions.resetForm();
            }}>
            {(props) => (
              <View>
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 25,
                      marginBottom: 15,
                    }}>
                    Enter Account Info
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    alignContent: 'space-around',
                  }}>
                  <Text>Name</Text>
                  <View
                    style={{
                      alignSelf: 'center',
                      marginHorizontal: 50,
                      fontSize: 25,
                    }}>
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => onChangeName(text)}
                      value={props.values.name}
                      onBlur={props.handleBlur('Name')}
                    />
                  </View>
                  <Text>Email</Text>
                  <View
                    style={{
                      alignSelf: 'center',
                      marginHorizontal: 50,
                      fontSize: 25,
                    }}>
                    <TextInput
                      placeholder={'ex abc@example.com'}
                      style={styles.input}
                      onChangeText={(text) => onChangeEmail(text)}
                      value={props.values.email}
                      onBlur={props.handleBlur('Email')}
                    />
                  </View>
                  <Text>Password</Text>
                  <View
                    style={{
                      alignSelf: 'center',
                      marginHorizontal: 50,
                      fontSize: 25,
                    }}>
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => onChangePass(text)}
                      value={props.values.password}
                      onBlur={props.handleBlur('Password')}
                    />
                  </View>
                  <Text>Confirm Password</Text>
                  <View
                    style={{
                      alignSelf: 'center',
                      marginHorizontal: 50,
                      fontSize: 25,
                    }}>
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => onChangeConf(text)}
                      value={props.values.passwordConfirmation}
                      onBlur={props.handleBlur('')}
                    />
                  </View>
                </View>
                <View style={styles.checkbox}>
                  <Checkbox
                    value={isSelected}
                    onValueChange={setSelection}
                    onClick={this.handleClick}
                  />
                  <Text>
                    I confirm that the above information is right and that i
                    agree to term and conditions and privacy policies of
                    monfleek
                  </Text>
                </View>
                <FlatButton text="Join" />
              </View>
            )}
          </Formik>
        </Card>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#B0389F',
  },
  checkbox: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 35,
    backgroundColor: '#FEF8FF',
    width: 330,
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
