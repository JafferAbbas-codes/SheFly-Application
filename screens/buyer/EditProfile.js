import React from 'react';
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {gStyles} from '../../styles/global.js';
import {Formik} from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/Button.js';

const reviewSchema = yup.object({
  name: yup.string().required().min(3),
  contact: yup.string().required().min(11),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function ReviewForm({addReview}) {
  return (
    <View style={gStyles.container}>
      <Formik
        initialValues={{name: '', contact: '', email: '', password: ''}}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          addReview(values);
          console.log(values);
        }}>
        {(props) => (
          <View style={{margin: 25}}>
            {console.log('To test')}
            <TextInput
              style={gStyles.input}
              placeholder="Name"
              onChangeText={props.handleChange('Name')}
              value={props.values.name}
              onBlur={props.handleBlur('Name')}
            />
            <Text style={gStyles.errorText}>
              {props.touched.name && props.errors.name}
            </Text>

            <TextInput
              style={gStyles.input}
              placeholder="Phone Number"
              onChangeText={props.handleChange('contact')}
              keyboardType="numeric"
              value={props.values.contact}
              onBlur={props.handleBlur('contact')}
            />
            <Text style={gStyles.errorText}>
              {props.touched.contact && props.errors.contact}
            </Text>

            <TextInput
              style={gStyles.input}
              placeholder="Email"
              onChangeText={props.handleChange('Email')}
              value={props.values.email}
              onBlur={props.handleBlur('email')}
            />
            <Text style={gStyles.errorText}>
              {props.touched.email && props.errors.email}
            </Text>
            <TextInput
              style={gStyles.input}
              placeholder="Password"
              onChangeText={props.handleChange('Password')}
              value={props.values.password}
              onBlur={props.handleBlur('Password')}
            />
            <Text style={gStyles.errorText}>
              {props.touched.password && props.errors.password}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                alignContent: 'space-between',
                margin: 10,
              }}>
              <Text
                style={{paddingHorizontal: 15, paddingVertical: 5, margin: 3}}>
                Profile Pic:
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  backgroundColor: '#DADADA',
                  alignItems: 'center',
                  shadowColor: '#E67E22',
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderWidth: 3,
                }}>
                <Text>Choose File</Text>
              </TouchableOpacity>
            </View>

            <FlatButton text="Submit" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}
