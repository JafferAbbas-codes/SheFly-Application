import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';

const PaymentView = (props) => {
  console.log('props in payment', props);
  const order = props.order;

  const STRIPE_PK =
    'pk_test_51IuypmAjcOK9kO5oAhHy7G4LOnJoAPvpFd0H6vOtEsbgLaDi4xAmocpOpRBntjWDUpZHWVm4lBrHmCZvPjeI5ABM00xXvZ4zQY';

  const onCheckStatus = (response) => {
    props.onCheckStatus(response);
  };

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Page</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
      <script src="https://js.stripe.com/v3/"></script>
      <style>
      
      .card-holder{
          display: flex;
          flex-direction: column;
          height: 200px;
          justify-content: space-around;
          background-color: #D8BFD6;
          border-radius: 20px;
          padding: 10px;
          padding-top: 20px;
          padding-bottom: 20px;
          margin-top: 50px;
          margin-bottom: 50px;
      }
      .card-element{
          height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
      }
      .card-name{
          padding: 20;
          color: '#FFF';
          font-weight: 500;
          font-size: '25px';
          background-color: transparent;
          border: none;
      
      }
      input {
          outline:none;
          color: #000;
          font-size: '25px';
          font-weight: 500;
          background-color: transparent;
          }
          
          .row{
              margin-top: '50px';
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
          }
          .textBold{
              font-weight:bold;
          }
          
          .card-errors{
              color: red;
          }
          .pay-btn{
              display: flex;
              height: 50px;
              justify-content: center;
              align-items: center;
              margin:auto;
              background-color:#D3D6DB;
              width:150px;
              color:#FFF;
              border-radius: 15px
          }
          .box{
              border: 1px solid black;
              margin-top:20px;
              padding: 10px;
              border-radius:10px
          }
      
      </style>
  
  </head>
  <body>
      
      <!-- product info -->
      <div class="container-fluid">
      <div class="box">
      <div class="row">
      <div class="col col-4 textBold colFisrt">
          Order Id:
      </div>
      <div class="col col-8 textLight colFisrt">
          ${order._id.substring(order._id.length - 10, order._id.length - 3)}
      </div>
  </div>
  <div class="row">
      <div class="col col-4 textBold">
          Seller Name:
      </div>
      <div class="col col-8 textLight">
          ${order.seller.name}
      </div>
  </div>
  <div class="row">
      <div class="col col-4 textBold">
          Buyer Name:
      </div>
      <div class="col col-8 textLight">
          ${order.buyer.name}
      </div>
  </div>
  <div class="row">
      <div class="col col-4 textBold">
          Address:
      </div>
      <div class="col col-8 textLight">
          ${order.address}
      </div>
  </div>
  <div class="row">
      <div class="col col-4 textBold">
          Service:
      </div>
      <div class="col col-8 textLight">
          ${order.service.name}
      </div>
  </div>
  <div class="row">
      <div class="col col-4 textBold">
          Amount:
      </div>
      <div class="col col-8 textLight">
          Rs. ${order.budget}/hr
      </div>
  
  </div>
  </div>
          <div class="row">
              <label class="card-errors" id="card-errors"></label>
          </div>
  
              <form>
                  <div class="card-holder">
                          <input type="text" placeholder="Card Holder Name" id="card-name" class="card-name" />
                          <div id="card-element" class="card-element">
                              <div class="form-group">
                                  <label for="card_number">Carn Number</label>
                                  <input type="text" class="form-control" id="card_number" data-stripe="number">
                              </div>
                              <div class="form-row">
                                  <label>
                                      <span>Card number</span>
                                      <input type="text" size="20" data-stripe="number">
                                  </label>
                              </div> 
                          
                              <div class="form-row">
                              <label>
                                  <span>Expiration (MM/YY)</span>
                                  <input type="text" size="2" data-stripe="exp_month">
                              </label>
                              <span> / </span>
                              <input type="text" size="2" data-stripe="exp_year">
                              </div>
                          
                              <div class="form-row">
                              <label>
                                  <span>CVC</span>
                                  <input type="text" size="4" data-stripe="cvc">
                              </label>
                              </div>
                          </div>
                      </div>
                  
                      <div class="pay-btn">
                          <input type="submit" class="btn btn-lg" value="Pay Now" />
                      </div>
      
              </form>
  
          
      </div>
      
      <script>
          var stripe = Stripe('${STRIPE_PK}');
          var elements = stripe.elements();
  
  
              var card = elements.create("card", {
                  hidePostalCode: true,
                  style: {
                      base: {
                      color: '#FFF',
                      fontWeight: 500,
                      fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
                      fontSize: '20px',
                      fontSmoothing: 'antialiased',
                      '::placeholder': {
                          color: '#664385',
                      },
                      ':-webkit-autofill': {
                          color: '#e39f48',
                      },
                  },
                  invalid: {
                      color: '#FC011F',
                      '::placeholder': {
                          color: '#FFCCA5',
                      },
                  },
                  }
              });
              // Add an instance of the card Element into the 'card-element' <div>.
              card.mount('#card-element');
              /**
               * Error Handling
               */
              //show card error if entered Invalid Card Number
              function showCardError(error){
                  document.getElementById('card-errors').innerHTML = ""
                  if(error){
                      document.getElementById('card-errors').innerHTML = error
                  } 
              }
              
              card.on('change', function(event) {
                  if (event.complete) {
                      showCardError()
                      // enable payment button
                  } else if (event.error) {
                      const { message} = event.error
                      console.log(message)
                      showCardError(message)
                  }
              });
              
              card.mount('#card-element');
              
              /**
               * Payment Request Element
               */
              var paymentRequest = stripe.paymentRequest({
                  country: "US",
                  currency: "$",
                  total: {
                      amount: ${order.budget * 100},
                      label: "Total"
                  }
              });
              var form =  document.querySelector('form');
              form.addEventListener('submit', function(e) {
  
                  var additionalData = {
                      name: document.getElementById('card-name').value,
                      address_line1: undefined,
                      address_city:  undefined,
                      address_state: undefined,
                      address_zip: undefined,
                  };
  
                  stripe.createToken(card, additionalData).then(function(result) {
                  
                  console.log("stripe api token result",result);
                  if (result.token) {
                      window.postMessage(JSON.stringify(result));
                  } else {
                      window.postMessage(JSON.stringify(result));
                  }
              });
              })
      </script>
  </body>
  </html>
    `;

  const injectedJavaScript = `(function() {
        window.postMessage = function(data){
            window.ReactNativeWebView.postMessage(data);
        };
    })()`;

  const onMessage = (event) => {
    const {data} = event.nativeEvent;
    console.log('in on msg', data);
    onCheckStatus(data);
  };

  return (
    <WebView
      javaScriptEnabled={true}
      style={{flex: 1}}
      originWhitelist={['*']}
      source={{html: htmlContent}}
      injectedJavaScript={injectedJavaScript}
      onMessage={(event) => console.log('onMessage event', event)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
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

export default PaymentView;
