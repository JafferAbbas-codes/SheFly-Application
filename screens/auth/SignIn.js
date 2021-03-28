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
import Header from '../../shared/header';
import Card from '../../shared/card';
import FlatButton from '../../shared/button.js';
import {Formik} from 'formik';
import * as yup from 'yup';

// import MaterialIcons from 'react-native-vector-icons/FontAwesome';
export default function SignIn() {
  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [pass, onChangePass] = useState('');
  const [confirmpass, onChangeConf] = useState('');
  const changeNameHandler = (val) => {
    setText(val);
  };
  const reviewSchema = yup.object({
    email: yup.string().required(),
    password: yup
      .string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.'),
  });

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
                    Welcome Back
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    alignContent: 'space-around',
                  }}>
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
                  <Text style={{marginBottom: 30}}>Forget Password?</Text>
                </View>
                <FlatButton text="Login" />
                <Text style={{marginTop: 30}}>Already have an account?</Text>
                <Text>Sign Up</Text>
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
