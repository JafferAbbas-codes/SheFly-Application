import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import MainCard from '../../shared/MainCard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Zocial from 'react-native-vector-icons/Zocial';
import {connect} from 'react-redux';

const Bookings = (props) => {
  const [bookings, setBookings] = useState(props.route.params.bookings);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Refresh();
    }, 2000);
  };

  const Refresh = () => {
    props.route.params.getBookingsByBuyer();
  };
  console.log('In Bookings', props.route.params.bookings);

  const OnPressRequest = (order) => {
    props.navigation.navigate('BookingDetails', {
      order,
    });
  };

  const renderItem = ({item}) => {
    return <Item order={item} />;
  };
  const Item = ({order}) => (
    <TouchableOpacity
      onPress={() => {
        OnPressRequest(order);
      }}>
      <View
        style={{
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
          marginVertical: 5,
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
            Request ID:
            {' ' +
              order._id.substring(order._id.length - 10, order._id.length - 3)}
          </Text>
          <Text
            style={{
              fontWeight: '900',
              fontSize: 12,
            }}>
            Requested on{' ' + moment(order.createdAt).format('ll')}
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

  useEffect(() => {
    props.route.params.getBookingsByBuyer();
  }, [props]);

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
              fontSize: 30,
              justifyContent: 'space-between',
              margin: 25,
            }}>
            {props.route.params.headerTitle}
          </Text>
        </View>
        <MainCard requests={true}>
          <SafeAreaView style={styles.container}>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#F4F9FE']}
                  progressBackgroundColor={'#B0389F'}
                />
              }
              data={bookings}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
              style={{borderRadius: 20, marginBottom: 30}}
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
    marginTop: 25,
    // paddingBottom: 10,
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
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(Bookings);
