import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Searchbar} from 'react-native-paper';
import MyTabs from './topNavigation.js';
import {
  URL,
  getAllUsers,
  getAllOrders,
  getAllComplains,
} from '../../config/const';
import axios from 'axios';
import {connect} from 'react-redux';

const BookingScreen = (props) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);

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
      // const sorted = response.data.result.sort(
      //   (a, b) => b.updatedAt - a.updatedAt,
      // );
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

  useEffect(() => {
    allOrders();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <Searchbar
          placeholder="Search bookings"
          value={searchQuery}
          style={{borderRadius: 20}}
        />
      </View>
      <View style={styles.tabContainer}>
        <MyTabs
          pendingBookings={pendingBookings}
          confirmedBookings={confirmedBookings}
          completedBookings={completedBookings}
          Refresh={allOrders}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F9FE',
    flex: 1,
  },
  tabContainer: {
    margin: 15,
    flex: 1,
    height: '90%',
  },
  viewmore: {
    backgroundColor: '#ae379d',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    paddingHorizontal: 3,
    paddingVertical: 5,
    borderRadius: 20,
    marginVertical: 10,
  },
});

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(BookingScreen);
