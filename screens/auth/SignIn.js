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
} from 'react-native';
import Header from '../../shared/header';
import Card from '../../shared/card';
import FlatButton from '../../shared/button.js';
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
      // await props.setLoading(true);
      setButtonLoading(true);
      const result = await props.Login(body);
      setButtonLoading(false);
      // console.log("props.user is " , props.user)
      // await props.setLoading(false);
      // console.log('result', result);
      if (result.error) {
        console.log('result.error', result.error);
        setError(result.error);
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
      <ScrollView style={styles.back}>
        <Header />
        <Card>
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
                    Welcome Back
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
                        alignSelf: 'center',
                        marginHorizontal: 50,
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
                          onChangeText={propss.handleChange('email')}
                          value={propss.values.email}
                          onBlur={propss.handleBlur('email')}
                        />
                        <View style={{width: 215}}>
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
                        alignSelf: 'center',
                        marginHorizontal: 50,
                        fontSize: 25,
                      }}>
                      <View>
                        <TextInput
                          style={
                            error.responseCode == 400 ||
                            (propss.errors.password && propss.touched.password)
                              ? styles.errorInput
                              : styles.input
                          }
                          onChangeText={propss.handleChange('password')}
                          value={propss.values.password}
                          onBlur={propss.handleBlur('password')}
                        />

                        <View style={{width: 215}}>
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

                  <Text style={{marginBottom: 30}}>Forget Password?</Text>
                </View>
                <FlatButton
                  text="Login"
                  loading={buttonLoading}
                  onPress={propss.handleSubmit}
                />
                <Text style={{marginTop: 30}}>Already have an account?</Text>
                <TouchableOpacity onPress={signUpPressHandler}>
                  <Text>Sign Up</Text>
                </TouchableOpacity>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    // marginBottom: 35,
    backgroundColor: '#FEF8FF',
    width: 302,
  },
  errorInput: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    // marginBottom: 35,
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
