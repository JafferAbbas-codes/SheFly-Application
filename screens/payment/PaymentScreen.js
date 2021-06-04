import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PaymentView from './PaymentView';
import axios from 'axios';

const PaymentScreen = (props) => {
  const [response, setResponse] = useState();
  const [makePayment, setMakePayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const order = props.route.params.order;

  const onCheckStatus = async (paymentResponse) => {
    setPaymentStatus('Please wait while confirming your payment!');
    setResponse(paymentResponse);

    let jsonResponse = JSON.parse(paymentResponse);

    try {
      const stripeResponse = await axios.post('http://localhost:8000/payment', {
        email: 'codergogoi@gmail.com',
        product: order,
        authToken: jsonResponse,
      });

      if (stripeResponse) {
        const {paid} = stripeResponse.data;
        if (paid === true) {
          setPaymentStatus('Payment Success');
        } else {
          setPaymentStatus('Payment failed due to some issue');
        }
      } else {
        setPaymentStatus(' Payment failed due to some issue');
      }
    } catch (error) {
      console.log(error);
      setPaymentStatus(' Payment failed due to some issue');
    }
  };
  const paymentUI = () => {
    if (!makePayment) {
      return (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 300,
            marginTop: 50,
          }}>
          <Text style={{fontSize: 25, margin: 10}}> Make Payment </Text>
          <Text style={{fontSize: 16, margin: 10}}>
            {' '}
            Product Description: {order.description}{' '}
          </Text>
          <Text style={{fontSize: 16, margin: 10}}>
            {' '}
            Payable Amount: {order.budget}{' '}
          </Text>

          <TouchableOpacity
            style={{
              height: 60,
              width: 300,
              backgroundColor: '#FF5733',
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setMakePayment(true);
            }}>
            <Text style={{color: '#FFF', fontSize: 20}}>Proceed To Pay</Text>
          </TouchableOpacity>
        </View>
      );

      // show to make payment
    } else {
      if (response !== undefined) {
        return (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: 300,
              marginTop: 50,
            }}>
            <Text style={{fontSize: 25, margin: 10}}> {paymentStatus} </Text>
            <Text style={{fontSize: 16, margin: 10}}> {response} </Text>
          </View>
        );
      } else {
        return (
          <PaymentView
            order={props.route.params.order}
            onCheckStatus={onCheckStatus}
          />
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Payment</Text>
      {paymentUI()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B0389F',
    flex: 1,
  },
  heading: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    marginHorizontal: 25,
    marginVertical: 25,
  },
  navigation: {
    flex: 2,
    backgroundColor: 'red',
  },
  body: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  footer: {
    flex: 1,
    backgroundColor: 'cyan',
  },
});

export default PaymentScreen;
