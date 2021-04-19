import React, {useState, useEffect} from 'react';
import moment from 'moment';
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
  TouchableOpacity,
} from 'react-native';
import Header from '../../shared/Header2';
import MainCard from '../../shared/MainCard';
import FlatButton from '../../shared/Button.js';
import {gStyles} from '../../styles/global';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Zocial from 'react-native-vector-icons/Zocial';
import axios from 'axios';
import {connect} from 'react-redux';
import {URL, getBuyerRequests} from '../../config/const';

const Bookings = (props) => {
  // const [value, onChangeText] = React.useState('42|');
  const [bookings, setBookings] = useState(props.route.params.bookings);
  console.log('in props c.b', props);

  const OnPressRequest = (order) => {
    props.navigation.navigate('BookingDetails', {
      order,
      // ...props.route.params,
      // id,
      // requestNo,
      // date,
      // buyer,
      // updatedAt,
      // buyerNumber,
      // status,
      // seller,
      // service,
      // budget,
      // address,
      // description,
    });
  };

  const renderItem = ({item}) => {
    // var date = moment(item.dateAndTime).format('ll');
    // var requestNo = parseInt(`${item._id}`, 10);
    return (
      <Item
        order={item}
        // requestNo={
        //   item._id.substring(
        //   item._id.length - 10,
        //   item._id.length - 3,
        // )}
        // buyer={item.buyer.name}
        // buyerNumber={item.buyer.phoneNumber}
        // date={date}
        // seller={item.seller}
        // updatedAt={item.updatedAt}
        // status={item.status}
        // service={item.service.name}
        // id={item._id}
        // budget={item.budget}
        // address={item.address}
        // description={item.description}
      />
    );
  };
  const Item = ({order}) => (
    <TouchableOpacity
      onPress={
        () => {
          OnPressRequest(order);
        }
        // console.log('on click', item._id),
      }>
      <View
        style={{
          marginBottom: 10,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          padding: 5,
          shadowOpacity: 1,
          shadowRadius: 10,
          elevation: 10,
        }}>
        {/* {console.log('in Item', index)} */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: 'black',
            borderBottomWidth: 2,
            // paddingBottom: 5,
            marginBottom: 5,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            Request ID:
            {' ' +
              order._id.substring(order._id.length - 10, order._id.length - 3)}
          </Text>
          <Text
            style={{
              fontWeight: '900',
              fontSize: 12,
            }}>
            Requested on{' ' + moment(order.dateAndTime).format('ll')}
          </Text>
        </View>
        <View style={{paddingVertical: 5}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // margin: 2,
            }}>
            <Text style={{color: '#B0389F'}}>
              <FontAwesome5
                name="user-alt"
                size={16}
                style={{color: 'black'}}
              />
              {'  ' + order.buyer.name}
            </Text>
            <Text
              style={{
                backgroundColor: '#B0389F',
                borderRadius: 10,
                color: 'white',
                padding: 3,
                paddingHorizontal: 15,
              }}>
              {order.status}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>
              <Zocial name="stripe" size={16} />
              {order.seller != undefined ? ' ' + order.seller.name : '  TBD'}
              {console.log('seller after TBD', order.seller)}
            </Text>
            <Text
              style={{
                color: '#B0389F',
                padding: 3,
                paddingHorizontal: 10,
              }}>
              {order.service.name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.back}>
        {/* {console.log(props)} */}
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
              fontSize: 30,
              justifyContent: 'space-between',
              margin: 25,
            }}>
            {props.route.params.headerTitle}
          </Text>
        </View>
        <MainCard>
          <SafeAreaView style={styles.container}>
            {console.log(
              'In return print requests',
              props.route.params.confirmedBookings,
            )}
            <FlatList
              data={bookings}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
              style={{borderRadius: 20}}
            />
          </SafeAreaView>
        </MainCard>
      </View>
    </TouchableWithoutFeedback>
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

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(Bookings);
