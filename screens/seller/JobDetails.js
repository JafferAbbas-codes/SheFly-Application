import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import Card from '../../shared/AppStackCard';
import {TouchableOpacity} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {StackActions} from '@react-navigation/native';
import StarImage from '../../assets/star.png';
import {URL, rateSeller, updateOrderStatus} from '../../config/const';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {TouchableHighlight} from 'react-native';
import axios from 'axios';
import {connect, useDispatch} from 'react-redux';

const JobDetails = (props) => {
  const [job, setOrder] = useState(props.route.params.job);

  const MarkComplete = async () => {
    try {
      let response = await axios.put(
        `${URL}${updateOrderStatus}${job._id}`,
        {
          status: 'Completed',
        },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      );
      Alert.alert(
        'Success',
        'This order has been completed. Click on Jobs Done in your Profile Screen to view the details of this order.',
      );
      props.navigation.navigate('Profile', {
        ...props.route.params,
      });
    } catch (error) {
      // setButtonLoading(false);
      console.log('propss in MarkCompleteAPI', error);
      if (error?.response?.data?.result) {
        console.log('propss in MarkCompleteAPI', error);
        console.log('error123 MarkCompleteAPI : ', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };

  return (
    <View>
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
            Job Detail
          </Text>
        </View>
        <Card>
          {/* <ScrollView> */}
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 25,
                marginBottom: 5,
              }}>
              Booking #{' '}
              {job._id.substring(job._id.length - 10, job._id.length - 3)}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
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
                {job.status}
              </Text>
              {job.status == 'Confirmed' && (
                <TouchableOpacity
                  onPress={() => {
                    console.log('Mark completed clicked');
                    MarkComplete();
                  }}>
                  <Text
                    style={{
                      backgroundColor: '#D3D6DB',
                      borderRadius: 10,
                      color: '#B0389F',
                      //   width: 80,
                      textAlign: 'center',
                      paddingHorizontal: 4,
                      paddingVertical: 4,
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
                    }}>
                    Mark Complete
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={{
              margin: 15,
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
                Requested on {' ' + moment(job.createdAt).format('ll')}
              </Text>
              {job.status == 'Confirmed' ? (
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>
                  {'Confirmed on  ' + moment(job.updatedAt).format('ll')}
                </Text>
              ) : (
                job.status == 'Completed' && (
                  <Text
                    style={{
                      fontWeight: 'bold',
                    }}>
                    {'Completed on  ' + moment(job.updatedAt).format('ll')}
                  </Text>
                )
              )}
            </View>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Seller Name:{' '}
              {job.seller != undefined ? ' ' + job.seller.name : '  TBD'}
            </Text>

            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Buyer Name: {job.buyer.name}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Buyer No: {job.buyer.phoneNumber}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Address: {job.address}
            </Text>
          </View>
          <View style={{margin: 10}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 25,
                margin: 5,
              }}>
              Service Details
            </Text>
          </View>
          <View
            style={{
              margin: 15,
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
            }}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Service: {job.service.name}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Description: {job.description}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Service Date: {' ' + moment(job.dateAndTime).format('ll')}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              {'Amount: Rs. ' + job.budget + ' / hr'}
            </Text>
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

export default connect(mapStateToProps)(JobDetails);
