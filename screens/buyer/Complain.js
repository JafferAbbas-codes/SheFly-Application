import React, {useState} from 'react';
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {gStyles} from '../../styles/global.js';
import {Formik} from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/Button.js';
import {URL, createComplain} from '../../config/const';
import axios from 'axios';
import {connect, useDispatch} from 'react-redux';

const ComplainForm = ({
  addReview,
  order,
  onPress,
  displayReportModal,
  token,
  props,
}) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const reviewSchema = yup.object({
    // SellerName: yup.string().required(),
    // BuyerName: yup.string().required(),
    description: yup.string().required('No description provided.'),
  });

  const createComplainAPI = async (description) => {
    try {
      console.log('props in createComplainAPI', token);
      console.log('Input data', description);
      setButtonLoading(true);
      let response = await axios.post(
        `${URL}${createComplain}`,
        {
          seller: order.seller._id,
          buyer: order.buyer._id,
          order: order._id,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setButtonLoading(false);
      console.log('response of createComplainAPI', response.data.result);
      displayReportModal(true);
      Alert.alert('We will look forward to your complain within 2 days.');
      displayReportModal(false);
      // props.navigation.dispatch(StackActions.popToTop());
    } catch (error) {
      setButtonLoading(false);
      console.log('propss in createComplainAPI', error);
      if (error?.response?.data?.result) {
        console.log('propss in createComplainAPI', error);
        console.log('error123 createComplainAPI : ', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };

  return (
    <View style={gStyles.container}>
      {/* {console.log(order)} */}
      <Formik
        initialValues={{SellerName: '', BuyerName: '', description: ''}}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          console.log(' in on submit', values.description);
          createComplainAPI(values.description);
        }}>
        {(propss) => (
          <View
            style={{
              margin: 25,
              borderColor: 'black',
              borderRadius: 10,
              borderWidth: 1,
              padding: 20,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 30,
                // marginVertical: 15,
              }}>
              Launch a Complain
            </Text>
            <Text
              style={{textAlign: 'center', fontSize: 15, marginVertical: 10}}>
              Booking No.{' '}
              {order._id.substring(order._id.length - 10, order._id.length - 3)}
            </Text>
            <TextInput
              style={{
                backgroundColor: '#fafafa',
                borderColor: '#D2D2D2',
                borderWidth: 1,
                borderRadius: 10,
                // flex: 9,
                // width: 200,
                paddingVertical: 5,
                // height: 200,
              }}
              placeholder="Seller Name"
              onChangeText={propss.handleChange('seller')}
              value={order.seller.name}
              onBlur={propss.handleBlur('seller')}
            />
            <Text style={gStyles.errorText}>
              {propss.touched.name && propss.errors.name}
            </Text>

            <TextInput
              style={{
                backgroundColor: '#fafafa',
                borderColor: '#D2D2D2',
                borderWidth: 1,
                borderRadius: 10,
                // flex: 9,
                // width: 200,
                paddingVertical: 5,
                // paddingHorizontal: 10,
                // height: 200,
              }}
              placeholder="Buyer Name"
              onChangeText={propss.handleChange('buyer')}
              value={order.buyer.name}
              onBlur={propss.handleBlur('buyer')}
            />
            <Text style={gStyles.errorText}>
              {propss.touched.contact && propss.errors.contact}
            </Text>

            <TextInput
              multiline={true}
              style={{
                backgroundColor: '#fafafa',
                borderColor: '#D2D2D2',
                borderWidth: 1,
                borderRadius: 10,
                // flex: 9,
                // width: 200,
                paddingVertical: 5,
                height: 100,
              }}
              placeholder="Description"
              onChangeText={propss.handleChange('description')}
              value={propss.values.description}
              onBlur={propss.handleBlur('description')}
            />
            <View style={{marginVertical: 15}}>
              <FlatButton
                text="Submit"
                loading={buttonLoading}
                onPress={propss.handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const mapStateToProps = (state) => ({
  temp: state,
  user: state.userDetails.user,
  token: state.userDetails.token,
  loading: state.userDetails.loading,
});

export default connect(mapStateToProps)(ComplainForm);
