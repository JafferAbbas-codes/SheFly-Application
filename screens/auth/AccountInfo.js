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
import Header from '../../shared/header';
import Card from '../../shared/card';
import FlatButton from '../../shared/button.js';
import {gStyles} from '../../styles/global';
import {Formik} from 'formik';
import * as yup from 'yup';

// import MaterialIcons from 'react-native-vector-icons/FontAwesome';
const AccountInfo = (props) => {
  console.log('props in AccountInfo', props);
  const [accountInfo, setAccountInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmpass, setConfirmPass] = useState('');
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
    // acceptTerms: yup
    //   .bool()
    //   .oneOf([false], 'Accept Terms & Conditions is required'),
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
              email: email,
              password: pass,
              passwordConfirmation: confirmpass,
              // acceptTerms: false,
            }}
            validationSchema={reviewSchema}
            onSubmit={(values, actions) => {
              console.log('form values', values);

              setAccountInfo({
                name: values.name,
                email: values.email,
                password: values.password,
              });
              // actions.resetForm();
            }}>
            {(propss) => (
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
                  <View
                    style={{
                      flexDirection: 'row',
                      // backgroundColor: 'red',
                      justifyContent: 'space-between',
                    }}>
                    <Text>Name</Text>
                    {propss.errors.name && propss.touched.name ? (
                      <Text style={{color: 'red'}}>{propss.errors.name}</Text>
                    ) : null}
                  </View>
                  <View
                    style={{
                      // backgroundColor: 'yellow',
                      alignSelf: 'center',
                      marginHorizontal: 50,
                      fontSize: 25,
                    }}>
                    <TextInput
                      style={
                        propss.errors.name && propss.touched.name
                          ? styles.errorInput
                          : styles.input
                      }
                      onChangeText={propss.handleChange('name')}
                      value={propss.values.name}
                      onBlur={propss.handleBlur('name')}
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
                      onChangeText={propss.handleChange('email')}
                      value={propss.values.email}
                      onBlur={propss.handleBlur('email')}
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
                      onChangeText={propss.handleChange('password')}
                      value={propss.values.password}
                      onBlur={propss.handleBlur('password')}
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
                      onChangeText={propss.handleChange('passwordConfirmation')}
                      value={propss.values.passwordConfirmation}
                      onBlur={propss.handleBlur('passwordConfirmation')}
                    />
                  </View>
                </View>
                <View style={styles.checkbox}>
                  <Checkbox
                    value={isSelected}
                    onValueChange={setSelection}
                    onPress={
                      () => console.log('pressed')
                      // this.handleClick
                    }
                    onClick={() => console.log('123', propss)}
                  />
                  <Text>
                    I confirm that the above information is right and that i
                    agree to term and conditions and privacy policies of She-Fly
                  </Text>
                </View>
                <FlatButton text="Join" onPress={propss.handleSubmit} />
              </View>
            )}
          </Formik>
        </Card>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

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
    width: 302,
  },
  errorInput: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 35,
    backgroundColor: '#FEF8FF',
    width: 302,
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

export default AccountInfo;
