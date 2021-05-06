import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import {
  URL,
  getAllUsers,
  getAllOrders,
  getAllComplains,
} from '../../config/const';
import axios from 'axios';
import {connect} from 'react-redux';

const Item = ({item}) => (
  <View style={styles.bookings}>
    <View style={styles.details}>
      <Text style={{fontSize: 14, fontWeight: '700'}}>
        Booking No:{item._id}
      </Text>
      <Text style={styles.confirm}>
        {item.status == 'Confirmed' && (
          <Text
            style={{
              fontWeight: 'bold',
            }}>
            {'Confirmed on  ' + moment(item.updatedAt).format('ll')}
          </Text>
        )}

        {item.status == 'Completed' && (
          <Text
            style={{
              fontWeight: 'bold',
            }}>
            {'Completed on  ' + moment(item.updatedAt).format('ll')}
          </Text>
        )}
        {item.status == 'Pending' && (
          <Text
            style={{
              fontWeight: 'bold',
            }}>
            {'Requested on  ' + moment(item.updatedAt).format('ll')}
          </Text>
        )}
      </Text>
    </View>
    <View style={styles.BuyerDetails}>
      <View style={styles.userdetails}>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <Icon
            name="user-alt"
            color="black"
            size={20}
            style={{marginRight: 10}}
          />
          <Text style={{fontSize: 18, color: '#ae379d', fontWeight: '400'}}>
            {item.buyer.name}
          </Text>
        </View>

        <View style={styles.update}>
          <Text
            style={{
              color: '#fff',
            }}>
            {item.status}
          </Text>
        </View>
      </View>
    </View>
    <View style={styles.sellerDetails}>
      <View style={styles.userdetails}>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <Entypo
            name="smashing"
            color="black"
            size={20}
            style={{marginRight: 10}}
          />
          <Text style={{fontSize: 18, fontWeight: '400', color: 'black'}}>
            {item.seller != undefined ? ' ' + item.seller.name : '  TBD'}
          </Text>
        </View>

        <View style={styles.update1}>
          <Text
            style={{
              color: '#ae379d',
              fontWeight: '700',
            }}>
            {item.service != undefined
              ? ' ' + item.service.name
              : '  No Service'}
          </Text>
        </View>
      </View>
    </View>
  </View>
);
export default function bookingCard(props) {
  console.log('props in Booking Card ', props);
  const renderItem = ({item}) => <Item item={item} />;

  const [pendingBookings, setPendingBookings] = useState([]);
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);

  const allOrders = async () => {
    try {
      let response = await axios.get(`${URL}${getAllOrders}`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      let pending = [];
      let confirmed = [];
      let completed = [];
      response.data.result.map((bookings) => {
        if (bookings.status == 'Pending') {
          pending.push(bookings);
        } else if (bookings.status == 'Confirmed') {
          confirmed.push(bookings);
        } else if (bookings.status == 'Completed') {
          completed.push(bookings);
        }
      });
      setPendingBookings(pending);
      setConfirmedBookings(confirmed);
      setCompletedBookings(completed);
      console.log('in getAllOrdersAPI call admin home', response.data.result);
      return response.data.result;
    } catch (error) {
      console.log('error', error);
      if (error?.response?.data?.result) {
        return {error: error.response.data.result};
      }
    }
  };

  // useEffect(() => {
  //   allOrders();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.bookings}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#F4F9FE',
  },
  tabContainer: {
    margin: 15,
    flex: 1,
  },
  bookings: {
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 13.97,
    elevation: 10,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 3,
    borderColor: '#e2e2e2',
    borderWidth: 1,
    paddingBottom: 5,
  },

  details: {
    alignItems: 'baseline',
    justifyContent: 'space-between',
    borderBottomWidth: 2.5,
    borderColor: '#e2e2e2',
    paddingHorizontal: 7,
    paddingTop: 5,
    paddingBottom: 2,
    width: '100%',
    flexDirection: 'row',
  },
  confirm: {
    fontSize: 12,
    fontWeight: '700',
    flexDirection: 'row',
  },
  BuyerDetails: {
    flexDirection: 'row',
    width: '100%',
  },
  update: {
    backgroundColor: '#ae379d',
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  update1: {
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  userdetails: {
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: 7,
    width: '100%',
    flexDirection: 'row',
    paddingTop: 2,
  },
});
