import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import Header from '../../shared/Header';
import Card from '../../shared/Card';
import FlatButton from '../../shared/Button.js';
import Stepper from '../../shared/Stepper';

import {Formik} from 'formik';
import * as yup from 'yup';
import {connect, useDispatch} from 'react-redux';

import {login, setLoading} from '../../redux/authActions';

// import MaterialIcons from 'react-native-vector-icons/FontAwesome';
const SignIn = (props) => {
  const [error, setError] = useState({responseCode: 200, message: ''});
  const [buttonLoading, setButtonLoading] = useState(false);
  const changeNameHandler = (val) => {
    setText(val);
  };
  const loginFunction = async (body) => {
    try {
      setButtonLoading(true);
      const result = await props.Login(body);
      setButtonLoading(false);
      if (result.error) {
        console.log('result.error', result.error);
        setError(result.error);
        if (result.error.responseCode == 403) {
          console.log('in Alert');
          Alert.alert(
            'Ops!',
            result.error.message,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {
              cancelable: true,
            },
          );
        }

        //do something here
      }
    } catch (error) {
      console.log('error : ', error);
    }
  };
  const reviewSchema = yup.object({
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
  });
  const signUpPressHandler = () => {
    props.navigation.navigate('PhoneNumber');
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      {/* {console.log('To Test')} */}
      <View style={styles.back}>
        <Header />
        <Stepper
        // step={1}
        />
        <ScrollView>
          <Card cardWithOutStepper={true}>
            <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={reviewSchema}
              onSubmit={(values, actions) => {
                loginFunction({
                  email: values.email,
                  password: values.password,
                });

                // console.log('form values', values);
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
                      Welcome to She-Fly
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignContent: 'space-around',
                    }}>
                    <View style={{marginBottom: 7}}>
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
                          // backgroundColor: 'yellow',
                          // alignSelf: 'center',
                          // marginHorizontal: 50,
                          fontSize: 25,
                        }}>
                        <View>
                          <TextInput
                            style={
                              error.responseCode == 404 ||
                              (propss.errors.email && propss.touched.email)
                                ? styles.errorInput
                                : styles.input
                            }
                            placeholder="example@gmail.com"
                            onChangeText={propss.handleChange('email')}
                            value={propss.values.email}
                            onBlur={propss.handleBlur('email')}
                          />
                          <View
                          // style={{ width: 215 }}
                          >
                            <Text style={{color: 'red'}}>
                              {error.responseCode == 404
                                ? 'Email not found'
                                : propss.errors.email && propss.touched.email
                                ? propss.errors.email
                                : ''}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={{marginBottom: 7}}>
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
                              error.responseCode == 400 ||
                              (propss.errors.password &&
                                propss.touched.password)
                                ? styles.errorInput
                                : styles.input
                            }
                            type="password"
                            placeholder="********"
                            secureTextEntry={true}
                            autoCompleteType="password"
                            onChangeText={propss.handleChange('password')}
                            value={propss.values.password}
                            onBlur={propss.handleBlur('password')}
                          />

                          <View
                          // style={{ width: 215 }}
                          >
                            <Text
                              style={{
                                color: 'red',
                              }}>
                              {error.responseCode == 400
                                ? error.message
                                : propss.errors.password &&
                                  propss.touched.password
                                ? propss.errors.password
                                : ''}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <Text style={{marginBottom: 25}}>Forget Password?</Text>
                  </View>
                  <FlatButton
                    text="Login"
                    loading={buttonLoading}
                    onPress={propss.handleSubmit}
                  />
                  <Text style={{marginTop: 30, textAlign: 'center'}}>
                    Don't have an account?
                  </Text>
                  <TouchableOpacity onPress={signUpPressHandler}>
                    <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </Card>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#B0389F',
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
    // alignSelf: 'stretch',
    // width: width,
    fontSize: 16,
    padding: 10,
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
  temp: state,
  user: state.userDetails.user,
  loading: state.userDetails.loading,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (body) => dispatch(setLoading(body)),
    Login: (body) => dispatch(login(body)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
