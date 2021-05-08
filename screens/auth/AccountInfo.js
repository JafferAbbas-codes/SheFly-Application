import React, { useState } from 'react';
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
import Header from '../../shared/Header';
import LongCard from '../../shared/LongCard';
import FlatButton from '../../shared/Button.js';
import { gStyles } from '../../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import Stepper from '../../shared/Stepper';

import { signup, setLoading } from '../../redux/authActions';
import { connect } from 'react-redux';

// import MaterialIcons from 'react-native-vector-icons/FontAwesome';
const AccountInfo = (props) => {
  const [isSelected, setSelection] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleSubmit = (values) => {
    signupFunction(
      Object.assign({ isActivated: true }, values, props.route.params),
    );
  };

  const signupFunction = async (body) => {
    try {
      // await props.setLoading(true);
      setButtonLoading(true);
      const result = await props.signup(body);
      setButtonLoading(false);
      if (result.error) {
        console.log('result.error', result.error);
      }
    } catch (error) {
      console.log('error d: ', error);
    }
  };

  const navigateToSampleScreen = () => {
    // props.navigation.goBack();
    props.navigation.navigate('SellerBio');
  };

  const reviewSchema = yup.object({
    name: yup
      .string()
      .required('Name is a required field')
      .min(2, 'Name must be atleast 2 characters'),
    email: yup
      .string()
      .required('Email is a required field')
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Invalid Email',
      ),
    password: yup
      .string()
      .required('Password is a required field')
      .min(8, 'Password must be atleast 8 characters'),
    passwordConfirmation: yup
      .string()
      .required('Confirm password is a required field')
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
        <Stepper step={3} />
        {/* <Image
          source={require('../../assets/stepper3.png')}
          style={gStyles.stepImg}
        /> */}
        <LongCard>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              passwordConfirmation: '',
              // acceptTerms: false,
            }}
            validationSchema={reviewSchema}
            onSubmit={(values, actions) => {
              if (props.route.params.userType == 'seller') {
                navigateToSampleScreen();
              } else {
                handleSubmit({
                  name: values.name,
                  email: values.email,
                  password: values.password,
                });
              }
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
                    marginBottom: 5,
                  }}>
                  <View style={{ marginBottom: 7 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        // backgroundColor: 'red',
                        justifyContent: 'space-between',
                      }}>
                      <Text>Name</Text>
                    </View>
                    <View
                      style={{
                        // backgroundColor: 'yellow',
                        // alignSelf: 'center',
                        // marginHorizontal: 50,
                        fontSize: 25,
                      }}>
                      <View>
                        <TextInput
                          style={
                            propss.errors.name && propss.touched.name
                              ? styles.errorInput
                              : styles.input
                          }
                          onChangeText={propss.handleChange('name')}
                          value={propss.values.name}
                          onBlur={propss.handleBlur('name')}
                          placeholder="Enter your name"
                        />
                        {/* {propss.errors.name && propss.touched.name ? ( */}
                        <View>
                          <Text style={{ color: 'red' }}>
                            {propss.errors.name && propss.touched.name
                              ? propss.errors.name
                              : ''}
                          </Text>
                        </View>
                        {/* ) : null} */}
                      </View>
                    </View>
                  </View>

                  <View style={{ marginBottom: 7 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        // backgroundColor: 'red',
                        justifyContent: 'space-between',
                      }}>
                      <Text>Email</Text>
                    </View>
                    <View
                      style={{
                        // alignSelf: 'center',
                        // marginHorizontal: 50,
                        fontSize: 25,
                      }}>
                      <View>
                        <TextInput
                          placeholder="abc@example.com"
                          style={
                            propss.errors.email && propss.touched.email
                              ? styles.errorInput
                              : styles.input
                          }
                          onChangeText={propss.handleChange('email')}
                          value={propss.values.email}
                          onBlur={propss.handleBlur('email')}
                        />
                        {/* {propss.errors.email && propss.touched.email ? ( */}
                        <View>
                          <Text style={{ color: 'red' }}>
                            {propss.errors.email && propss.touched.email
                              ? propss.errors.email
                              : ''}
                          </Text>
                        </View>
                        {/* ) : null} */}
                      </View>
                    </View>
                  </View>

                  <View style={{ marginBottom: 7 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        // backgroundColor: 'red',
                        justifyContent: 'space-between',
                      }}>
                      <Text>Password</Text>
                    </View>
                    <View
                      style={{
                        // alignSelf: 'center',
                        // marginHorizontal: 50,
                        fontSize: 25,
                      }}>
                      <View>
                        <TextInput
                          style={
                            propss.errors.password && propss.touched.password
                              ? styles.errorInput
                              : styles.input
                          }
                          secureTextEntry={true}
                          autoCompleteType="password"
                          onChangeText={propss.handleChange('password')}
                          value={propss.values.password}
                          onBlur={propss.handleBlur('password')}
                          placeholder="********"
                        />

                        {/* {propss.errors.password && propss.touched.password ? ( */}
                        <View>
                          <Text
                            style={{
                              color: 'red',
                            }}>
                            {propss.errors.password && propss.touched.password
                              ? propss.errors.password
                              : ''}
                          </Text>
                        </View>
                        {/* ) : null} */}
                      </View>
                    </View>
                  </View>

                  <View style={{ marginBottom: 7 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        // backgroundColor: 'red',
                        justifyContent: 'space-between',
                      }}>
                      <Text>Confirm Password</Text>
                    </View>
                    <View
                      style={{
                        // alignSelf: 'center',
                        // marginHorizontal: 50,
                        fontSize: 25,
                      }}>
                      <View>
                        <TextInput
                          style={
                            propss.errors.passwordConfirmation &&
                              propss.touched.passwordConfirmation
                              ? styles.errorInput
                              : styles.input
                          }
                          secureTextEntry={true}
                          placeholder="********"
                          autoCompleteType="password"
                          onChangeText={propss.handleChange(
                            'passwordConfirmation',
                          )}
                          value={propss.values.passwordConfirmation}
                          onBlur={propss.handleBlur('passwordConfirmation')}
                        />
                        {/* {propss.errors.passwordConfirmation &&
                        propss.touched.passwordConfirmation ? ( */}
                        <View>
                          <Text
                            style={{
                              color: 'red',
                            }}>
                            {propss.errors.passwordConfirmation &&
                              propss.touched.passwordConfirmation
                              ? propss.errors.passwordConfirmation
                              : ''}
                          </Text>
                        </View>
                        {/* ) : null} */}
                      </View>
                    </View>
                  </View>
                </View>
                <FlatButton
                  text="Join"
                  loading={buttonLoading}
                  onPress={propss.handleSubmit}
                />
              </View>
            )}
          </Formik>
        </LongCard>
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
    // marginBottom: 35,
    backgroundColor: '#FEF8FF',
    // width: 302,
    padding: 10,
    // paddingVertical: 0,
    fontSize: 16,
  },
  errorInput: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    // marginBottom: 35,
    backgroundColor: '#FEF8FF',
    // width: 302,
    padding: 10,
    // paddingVertical: 0,
    fontSize: 16,
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

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (body) => dispatch(setLoading(body)),
    signup: (body) => dispatch(signup(body)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
