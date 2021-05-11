import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import Header from '../../shared/BuyerProfileHead';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Card from '../../shared/AppStackCard';
import FlatButton from '../../shared/Button';
import axios from 'axios';
import {connect} from 'react-redux';
import Zocial from 'react-native-vector-icons/Zocial';
import {URL, getBuyerRequests} from '../../config/const';
import {TouchableOpacity} from 'react-native';
import moment from 'moment';

const BuyerProfile = (props) => {
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Refresh();
    }, 2000);
  };

  const Refresh = () => {
    getBookingsByBuyer();
  };

  const renderItem = ({item}) => {
    var date = moment(item.createdAt).format('ll');
    var serviceDate = moment(item.dateAndTime).format('ll');
    return (
      <Item
        requestNo={item._id.substring(
          item._id.length - 10,
          item._id.length - 3,
        )}
        buyer={item.buyer.name}
        date={date}
        seller={item.seller}
        status={item.status}
        service={item.service.name}
        id={item._id}
        budget={item.budget}
        address={item.address}
        description={item.description}
        serviceDate={serviceDate}
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
    serviceDate,
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
      serviceDate,
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
    serviceDate,
  }) => (
    <TouchableOpacity
      onPress={() => {
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
          serviceDate,
        );
      }}>
      <View
        style={{
          marginVertical: 5,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 5,
            height: 1,
          },
          padding: 5,
          shadowOpacity: 1,
          shadowRadius: 10,
          marginHorizontal: 20,
          elevation: 13,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: 'black',
            borderBottomWidth: 2,
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
      setPendingBookings(pendingBookings);
      console.log('response in buyer profile bookings', response.data.result);
      return response.data.result;
    } catch (error) {
      if (error?.response?.data?.result) {
        return {error: error.response.data.result};
      }
    }
  };

  useEffect(() => {
    getBookingsByBuyer();
  }, [props]);

  const OnPressConfirmedBookings = (confirmedBookings) => {
    props.navigation.navigate('Bookings', {
      ...props.route.params,
      getBookingsByBuyer,
      bookings: confirmedBookings,
      headerTitle: 'Confirmed Bookings',
    });
  };

  const OnPressCompletedBookings = (completedBookings) => {
    props.navigation.navigate('Bookings', {
      ...props.route.params,
      getBookingsByBuyer,
      bookings: completedBookings,
      headerTitle: 'Completed Bookings',
    });
  };

  const OnPressPendingBookings = (pendingBookings) => {
    props.navigation.navigate('Bookings', {
      ...props.route.params,
      getBookingsByBuyer,
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
      <Card availableSeller={true}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#F4F9FE']}
              progressBackgroundColor={'#B0389F'}
            />
          }>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            }}>
            <TouchableOpacity
              onPress={() => {
                OnPressConfirmedBookings(confirmedBookings);
              }}>
              <View style={styles.box}>
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
              onPress={() => {
                OnPressPendingBookings(pendingBookings);
              }}>
              <View style={styles.box}>
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
              onPress={() => {
                OnPressCompletedBookings(completedBookings);
              }}>
              <View style={styles.box}>
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
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              margin: 10,
              paddingHorizontal: 20,
              paddingTop: 30,
            }}>
            Your Requests
          </Text>
          <SafeAreaView style={styles.container}>
            <FlatList
              data={pendingBookings}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
            />
          </SafeAreaView>
        </ScrollView>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#B0389F',
  },
  box: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    flexDirection: 'column',
    borderRadius: 20,
    width: 94,
    marginHorizontal: 3.5,
    padding: 15,
    backgroundColor: 'white',
    zIndex: 1,
    marginTop: 5,
  },
  container: {
    // marginTop: 25,
    paddingBottom: 50,
  },
});

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(BuyerProfile);
