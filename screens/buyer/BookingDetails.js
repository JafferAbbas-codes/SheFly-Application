import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import moment from 'moment';
import Card from '../../shared/Card';
import {TouchableOpacity} from 'react-native';

export default function BookingDetails(props) {
  console.log('props in cfd', props);
  const [order, setOrder] = useState(props.route.params.order);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
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
        <Card>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 25,
                marginBottom: 5,
              }}>
              Booking #{' '}
              {order._id.substring(order._id.length - 10, order._id.length - 3)}
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
                {order.status}
              </Text>
              {order.status != 'Pending' && (
                <TouchableOpacity
                  onPress={() => {
                    order.status == 'Completed'
                      ? console.log('Rate clicked')
                      : console.log('Pay Now clicked');
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
                      shadowOpacity: 0.5,
                      shadowRadius: 5,
                      elevation: 10,
                      padding: 20,
                    }}>
                    {order.status == 'Completed' ? 'Rate' : 'Pay Now'}
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
                Requested on {' ' + moment(order.createdAt).format('ll')}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                Confirmed on {' ' + moment(order.updatedAt).format('ll')}
              </Text>
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
          {/* <SafeAreaView style={styles.container}>
            <FlatList
              data={Servises}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
              style={{borderRadius: 20}}
            />
          </SafeAreaView> */}
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
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
}

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
    // marginVertical: 30,
  },
  item: {
    // backgroundColor: '#f9c2ff',
    // padding: 20,
    // marginVertical: 8,
    // marginHorizontal: 16,
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
  headerTitle: {},
});
