import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView, FlatList} from 'react-native';
import Header from '../../shared/BuyerProfileHead';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SearchBar} from 'react-native-elements';
import Card from '../../shared/Card';
import FlatButton from '../../shared/Button';
import axios from 'axios';
import {connect} from 'react-redux';
import Zocial from 'react-native-vector-icons/Zocial';
import {URL, getBuyerRequests, getBidsBySeller} from '../../config/const';
import {TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';

const BuyerProfile = (props) => {
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  console.log('props in buyer profile', props);

  const renderItem = ({item}) => {
    var date = moment(item.dateAndTime).format('ll');
    // var requestNo = parseInt(`${item._id}`, 10);
    return (
      <Item
        requestNo={item._id.substring(
          item._id.length - 10,
          item._id.length - 3,
        )}
        buyer={item.buyer.name}
        date={date}
        // buyer={item.buyer}
        seller={item.seller}
        status={item.status}
        service={item.service.name}
        id={item._id}
        budget={item.budget}
        address={item.address}
        description={item.description}
        //sellername
        // index={item.index}
      />
    );
  };

  const OnPressRequest = (
    id,
    requestNo,
    date,
    buyer,
    status,
    seller,
    service,
    budget,
    address,
    description,
  ) => {
    props.navigation.navigate('RequestDetails', {
      ...props.route.params,
      id,
      requestNo,
      date,
      buyer,
      status,
      seller,
      service,
      budget,
      address,
      description,
    });
  };

  const Item = ({
    id,
    requestNo,
    date,
    buyer,
    status,
    seller,
    service,
    budget,
    address,
    description,
    // index,
  }) => (
    <TouchableOpacity
      onPress={
        () => {
          OnPressRequest(
            id,
            requestNo,
            date,
            buyer,
            status,
            seller,
            service,
            budget,
            address,
            description,
          );
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
            Request ID:{' ' + requestNo}
          </Text>
          <Text
            style={{
              fontWeight: '900',
              fontSize: 12,
            }}>
            Requested on{' ' + date}
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
              {'  ' + buyer}
            </Text>
            <Text
              style={{
                backgroundColor: '#B0389F',
                borderRadius: 10,
                color: 'white',
                padding: 3,
                paddingHorizontal: 15,
              }}>
              {status}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>
              <Zocial name="stripe" size={16} />
              {seller != undefined ? ' ' + seller.name : '  TBD'}
              {console.log('seller after TBD', seller)}
            </Text>
            <Text
              style={{
                color: '#B0389F',
                padding: 3,
                paddingHorizontal: 10,
              }}>
              {service}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getBookingsByBuyer = async () => {
    try {
      let response = await axios.get(
        `${URL}${getBuyerRequests}${props.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      );
      console.log('response of getBookingsByBuyer', response.data.result);
      let confirmedBookings = [];
      let pendingBookings = [];
      let completedBookings = [];
      response.data.result.map((order) => {
        if (order.status == 'Confirmed') {
          confirmedBookings.push(order);
        } else if (order.status == 'Completed') {
          completedBookings.push(order);
        } else if (order.status == 'Pending') {
          pendingBookings.push(order);
        }
      });
      setCompletedBookings(completedBookings);
      setConfirmedBookings(confirmedBookings);
      console.log('Confirmed Bookings', confirmedBookings);
      setPendingBookings(pendingBookings);
      return response.data.result;
    } catch (error) {
      if (error?.response?.data?.result) {
        console.log('propss in OrdersByBuyer', props);
        console.log('error123 OrdersByBuyer : ', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };

  useEffect(() => {
    getBookingsByBuyer();
  }, []);

  const OnPressConfirmedBookings = (confirmedBookings) => {
    props.navigation.navigate('Bookings', {
      ...props.route.params,
      bookings: confirmedBookings,
      headerTitle: 'Confirmed Bookings',
    });
  };

  const OnPressCompletedBookings = (completedBookings) => {
    props.navigation.navigate('Bookings', {
      ...props.route.params,
      bookings: completedBookings,
      headerTitle: 'Completed Bookings',
    });
  };

  const OnPressPendingBookings = (pendingBookings) => {
    props.navigation.navigate('Bookings', {
      ...props.route.params,
      bookings: pendingBookings,
      headerTitle: 'Pending Bookings',
    });
  };

  return (
    <View style={styles.back}>
      <Header
        user={props.user}
        navigation={props.navigation}
        route={props.route}
      />
      <Card>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={
              () => {
                OnPressConfirmedBookings(confirmedBookings);
              }
              // console.log('on click', item._id),
            }>
            <View
              style={{
                flexDirection: 'column',
                borderRadius: 20,
                width: 100,
                margin: 8,
                padding: 15,
                backgroundColor: 'white',
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textAlignVertical: 'bottom',
                }}>
                {confirmedBookings.length}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  textAlign: 'center',
                  textAlignVertical: 'top',
                }}>
                Confirmed Bookings
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              () => {
                OnPressPendingBookings(pendingBookings);
              }
              // console.log('on click', item._id),
            }>
            <View
              style={{
                flexDirection: 'column',
                borderRadius: 20,
                width: 100,
                margin: 8,
                padding: 15,
                backgroundColor: 'white',
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textAlignVertical: 'bottom',
                }}>
                {pendingBookings.length}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  textAlign: 'center',
                  textAlignVertical: 'top',
                }}>
                Pending Bookings
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              () => {
                OnPressCompletedBookings(completedBookings);
              }
              // console.log('on click', item._id),
            }>
            <View
              style={{
                flexDirection: 'column',
                borderRadius: 20,
                width: 100,
                margin: 8,
                padding: 15,
                backgroundColor: 'white',
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textAlignVertical: 'bottom',
                }}>
                {completedBookings.length}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  textAlign: 'center',
                  textAlignVertical: 'top',
                }}>
                Completed Bookings
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={{fontWeight: 'bold', fontSize: 25, margin: 10}}>
          Your Requests
        </Text>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={pendingBookings}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            style={{borderRadius: 20}}
          />
        </SafeAreaView>
        <FlatButton
          onPress={() => {
            props.navigation.navigate('BuyerRequests', {
              ...props.route.params,
              pendingBookings,
            });
          }}
          text="View all requests"
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#B0389F',
  },
});

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(BuyerProfile);
