import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import Card from '../../shared/AppStackCard';
import {TouchableOpacity} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {StackActions} from '@react-navigation/native';
import StarImage from '../../assets/star.png';
import {URL, rateSeller} from '../../config/const';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {TouchableHighlight} from 'react-native';
import axios from 'axios';
import {connect, useDispatch} from 'react-redux';
import Complain from './Complain';

const BookingDetails = (props) => {
  const [order, setOrder] = useState(props.route.params.order);
  const [rating, setRating] = useState(3);
  const [isVisibleRateModal, setIsVisibleRateModal] = useState(false);
  const [isVisibleReportModal, setIsVisibleReportModal] = useState(false);

  const onPressRate = () => {
    console.log('rating is in onPressRate', rating);
    rateAPI(order.seller._id, order.buyer._id, rating);
  };

  const onPressReport = () => {
    console.log(' in onPressReport');
    // rateAPI(order.seller._id, order.buyer._id, rating);
    Alert.alert(
      'Thankyou, we will email you within 2 days to look forward to your complain.',
    );
    setIsVisibleReportModal(false);
    props.navigation.dispatch(StackActions.popToTop());
  };
  const rateAPI = async (seller, buyer, rating) => {
    try {
      // console.log('props in createBidAPI', props);
      // setButtonLoading(true);
      let response = await axios.put(
        `${URL}${rateSeller}${seller}`,
        {
          buyer,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      );
      // setButtonLoading(false);
      console.log('response of rateAPI', response.data.result);
      displayRateModal(true);
      Alert.alert(
        'You have given ' +
          rating +
          ' stars to the seller.Thankyou for feedback!',
      );
      setIsVisibleRateModal(false);
      props.navigation.dispatch(StackActions.popToTop());
      // props.navigation.navigate('Profile', {
      //   ...props.route.params,
      // });
    } catch (error) {
      // setButtonLoading(false);
      console.log('propss in rateAPI', error);
      if (error?.response?.data?.result) {
        console.log('propss in rateAPI', error);
        console.log('error123 rateAPI : ', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };

  const displayRateModal = (show) => {
    setIsVisibleRateModal(show);
  };

  const displayReportModal = (show) => {
    setIsVisibleReportModal(show);
  };

  return (
    // <TouchableWithoutFeedback
    //   onPress={() => {
    //     Keyboard.dismiss();
    //   }}>
    <View>
      <Modal
        animationType={'fade'}
        transparent={false}
        visible={isVisibleRateModal}
        onRequestClose={() => {
          props.navigation.dispatch(StackActions.pop());
        }}>
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialIcons
            name="check-circle"
            size={100}
            style={{
              color: '#AD379D',
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              textAlign: 'center',
              padding: 15,
            }}>
            Provide your valuable feedback on the service!
          </Text>
          {/* <AirbnbRating /> */}
          {/* <AirbnbRating
              count={5}
              reviews={['Terrible', 'Bad', 'OK', 'Good', 'Very Good']}
              defaultRating={3}
              size={20}
            /> */}
          <Rating
            type="custom"
            ratingImage={StarImage}
            showRating
            // imageSize={30}
            // ratingCount={10}
            onFinishRating={setRating}
            // style={{paddingVertical: 10}}
            ratingColor="#AB369B"
            ratingBackgroundColor="white"
            fractions="1"
            startingValue={3}
            // defaultRating={3}
          />
          <TouchableOpacity
            style={{alignItems: 'center', paddingVertical: 20}}
            onPress={onPressRate}>
            <Text
              style={{
                textAlign: 'center',
                backgroundColor: '#C040AE',
                borderColor: '#C040AE',
                borderRadius: 15,
                color: 'white',
                width: 100,
                paddingVertical: 10,
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType={'fade'}
        transparent={false}
        visible={isVisibleReportModal}
        onRequestClose={() => {
          props.navigation.dispatch(StackActions.popToTop());
        }}>
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Complain
            order={order}
            onPress={onPressReport}
            displayReportModal={displayReportModal}
            token={props.token}
          />
        </View>
      </Modal>

      <View style={styles.back}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 15,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 25,
              justifyContent: 'space-between',
              margin: 25,
            }}>
            BOOKING DETAIL
          </Text>
        </View>
        <Card availableSeller={true}>
          {/* <ScrollView> */}
          <View style={{paddingHorizontal: 30}}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 25,
                  marginBottom: 9,
                  // paddingHorizontal: 30,
                }}>
                Booking #{' '}
                {order._id.substring(
                  order._id.length - 10,
                  order._id.length - 3,
                )}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // paddingHorizontal: 50,
                }}>
                <Text
                  style={{
                    backgroundColor: '#B0389F',
                    borderRadius: 10,
                    color: 'white',
                    width: 80,
                    textAlign: 'center',
                    paddingHorizontal: 4,
                    paddingVertical: 4,
                  }}>
                  {order.status}
                </Text>
                {order.status != 'Pending' && (
                  <TouchableOpacity
                    onPress={() => {
                      order.status == 'Completed'
                        ? displayRateModal(true)
                        : //modal for rate
                          console.log('Pay Now clicked');
                    }}>
                    <Text
                      style={{
                        backgroundColor: '#D3D6DB',
                        borderRadius: 10,
                        color: '#B0389F',
                        width: 80,
                        textAlign: 'center',
                        paddingHorizontal: 4,
                        paddingVertical: 4,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        padding: 5,
                        borderColor: '#bfc3c7',
                        borderWidth: 0.5,
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        elevation: 5,
                        // padding: 20,
                      }}>
                      {order.status == 'Completed' ? 'Rate' : 'Pay Now'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View
              style={{
                marginVertical: 15,
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                padding: 5,
                shadowOpacity: 0.5,
                shadowRadius: 5,
                elevation: 10,
                padding: 20,
                // marginHorizontal: 30,
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  borderBottomColor: 'black',
                  borderBottomWidth: 2,
                  paddingBottom: 5,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>
                  Requested on {' ' + moment(order.createdAt).format('ll')}
                </Text>
                {order.status == 'Confirmed' ? (
                  <Text
                    style={{
                      fontWeight: 'bold',
                    }}>
                    {'Confirmed on  ' + moment(order.updatedAt).format('ll')}
                  </Text>
                ) : (
                  order.status == 'Completed' && (
                    <Text
                      style={{
                        fontWeight: 'bold',
                      }}>
                      {'Completed on  ' + moment(order.updatedAt).format('ll')}
                    </Text>
                  )
                )}
              </View>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                Seller Name:{' '}
                {order.seller != undefined ? ' ' + order.seller.name : '  TBD'}
              </Text>

              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                Buyer Name: {order.buyer.name}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                Buyer No: {order.buyer.phoneNumber}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                Address: {order.address}
              </Text>
            </View>
            <View
            // style={{marginVertical: 2, marginHorizontal: 10}}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 25,
                  // margin: 5,
                  // paddingHorizontal: 30,
                }}>
                Service Details
              </Text>
            </View>
            <View
              style={{
                marginVertical: 15,
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                padding: 5,
                shadowOpacity: 0.5,
                shadowRadius: 5,
                elevation: 10,
                padding: 20,
                // marginHorizontal: 30,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                Service: {order.service.name}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                Description: {order.description}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                Service Date: {' ' + moment(order.dateAndTime).format('ll')}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                Amount: Rs. {order.budget}
              </Text>
            </View>
            <TouchableOpacity
              // style={{marginHorizontal: 30, marginVertical: 15}}
              onPress={() => displayReportModal(true)}>
              <View
                style={{
                  // backgroundColor: 'blue',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  // marginLeft: 7,
                }}>
                {order.status == 'Completed' && (
                  <Text
                    style={{
                      backgroundColor: '#d21b1c',
                      borderRadius: 13,
                      color: 'white',
                      width: 80,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      paddingHorizontal: 7,
                      paddingVertical: 6,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      padding: 5,
                      shadowOpacity: 0.5,
                      shadowRadius: 2,
                      elevation: 7,
                      padding: 20,
                    }}>
                    Report
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            {/* </ScrollView> */}
          </View>
        </Card>
      </View>
    </View>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#B0389F',
  },
  headerImage: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 50,
  },
  container: {
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
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
  },
});

const mapStateToProps = (state) => ({
  temp: state,
  user: state.userDetails.user,
  token: state.userDetails.token,
  loading: state.userDetails.loading,
});

export default connect(mapStateToProps)(BookingDetails);
