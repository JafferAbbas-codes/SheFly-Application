import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PaymentView from './PaymentView';

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
        product: cartInfo,
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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Payment</Text>
      <PaymentView
        order={props.route.params.order}
        onCheckStatus={onCheckStatus}
      />
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
