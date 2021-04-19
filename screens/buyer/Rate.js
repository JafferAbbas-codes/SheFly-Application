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
import FlatButton from '../../shared/button.js';

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
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 30,
                marginVertical: 15,
              }}>
              Launch a Complain
            </Text>
            <Text
              style={{textAlign: 'center', fontSize: 25, marginVertical: 15}}>
              Booking No.
            </Text>
            <TextInput
              style={gStyles.input}
              placeholder="Seller Name"
              onChangeText={props.handleChange('Name')}
              value={props.values.name}
              onBlur={props.handleBlur('Name')}
            />
            <Text style={gStyles.errorText}>
              {props.touched.name && props.errors.name}
            </Text>

            <TextInput
              style={gStyles.input}
              placeholder="Buyer Name"
              onChangeText={props.handleChange('contact')}
              value={props.values.contact}
              onBlur={props.handleBlur('contact')}
            />
            <Text style={gStyles.errorText}>
              {props.touched.contact && props.errors.contact}
            </Text>

            <TextInput
              multiline={true}
              style={gStyles.input}
              placeholder="Description"
              onChangeText={props.handleChange('Email')}
              value={props.values.email}
              onBlur={props.handleBlur('email')}
            />
            <View style={{marginVertical: 15}}>
              <FlatButton text="Submit" onPress={props.handleSubmit} />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
