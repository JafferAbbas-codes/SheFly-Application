import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import BookingCard from './BookingCard';
import Header from '../../shared/Header2';
import {
  URL,
  getAllUsers,
  getAllOrders,
  getAllComplains,
} from '../../config/const';
import axios from 'axios';
import {connect} from 'react-redux';
import Home from '../buyer/Home';

const HomeScreen = (props) => {
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [complains, setComplains] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);

  const allUsers = async () => {
    try {
      let response = await axios.get(`${URL}${getAllUsers}`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      let sellers = [];
      let buyers = [];
      let blockedusers = [];
      response.data.result.map((user) => {
        if (user.userType == 'seller') {
          sellers.push(user);
        } else if (user.userType == 'buyer') {
          buyers.push(user);
        }

        if (!user.isActivated) {
          blockedusers.push(user);
        }
      });
      setSellers(sellers);
      setBuyers(buyers);
      setBlockedUsers(blockedusers);
      console.log('in getAllUsersAPI call admin home', response.data.result);
      return response.data.result;
    } catch (error) {
      console.log('error', error);
      if (error?.response?.data?.result) {
        return {error: error.response.data.result};
      }
    }
  };

  const allOrders = async () => {
    try {
      let response = await axios.get(`${URL}${getAllOrders}`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      setOrders(response.data.result);
      console.log('in getAllOrdersAPI call admin home', response.data.result);
      return response.data.result;
    } catch (error) {
      console.log('error', error);
      if (error?.response?.data?.result) {
        return {error: error.response.data.result};
      }
    }
  };

  const allComplains = async () => {
    try {
      let response = await axios.get(`${URL}${getAllComplains}`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      setComplains(response.data.result);
      console.log(
        'in getAllComplainsAPI call admin home',
        response.data.result,
      );
      return response.data.result;
    } catch (error) {
      console.log('error', error);
      if (error?.response?.data?.result) {
        return {error: error.response.data.result};
      }
    }
  };

  useEffect(() => {
    allUsers();
    allOrders();
    allComplains();
  }, []);

  const onPressComplains = () => {
    props.navigation.navigate('Complains', {
      ...props.route.params,
    });
  };

  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <Text style={styles.welcomeText}>Welcome to the Admin Panel</Text>
      <View style={styles.mainBox}>
        <View style={styles.boxes}>
          <Icon name="shopping-cart" color="#D8BFD6" size={25} />
          <Text style={styles.boxText}>{orders.length}</Text>
          <Text style={styles.boxText1}>Bookings</Text>
        </View>
        <View style={styles.boxes}>
          <Entypo name="smashing" color="#D8BFD6" size={25} />
          <Text style={styles.boxText}>{sellers.length}</Text>
          <Text style={styles.boxText1}>Sellers</Text>
        </View>
        <View style={styles.boxes}>
          <Icon name="user-alt" color="#D8BFD6" size={25} />
          <Text style={styles.boxText}>{buyers.length}</Text>
          <Text style={styles.boxText1}>Buyers</Text>
        </View>
      </View>
      {/* stats complains and blocked user */}
      <View style={[styles.mainBox, {marginBottom: 5}]}>
        <TouchableOpacity onPress={() => onPressComplains()}>
          <View style={styles.stats}>
            <Text style={styles.boxText}>{complains.length}</Text>
            <Text style={styles.boxText1}>Complains</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.stats}>
          <Text style={styles.boxText}>{blockedUsers.length}</Text>
          <Text style={styles.boxText1}>Blocked Users</Text>
        </View>
      </View>

      {/* Bookings */}
      <BookingCard bookings={orders} />
      {/* <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 3,
        }}>
        <TouchableOpacity style={styles.viewmore} onPress={() => {}}>
          <Text
            style={{
              color: 'white',
            }}>
            View more
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F9FE',
    flex: 1,
  },
  welcomeText: {
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  mainBox: {
    flexDirection: 'row',
    margin: 9,
    marginBottom: 0,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  boxes: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 13.97,
    elevation: 21,
    marginHorizontal: 5,
    width: 103,
    height: 90,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText1: {
    fontWeight: 'bold',
    color: '#291F28',
    fontSize: 15,
    opacity: 0.84,
  },
  boxText: {
    fontWeight: 'bold',
    color: '#291F28',
    fontSize: 18,
  },
  stats: {
    width: 160,
    height: 43,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 13.97,
    elevation: 21,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    paddingVertical: 25,
    backgroundColor: '#fff',
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
  viewmore: {
    backgroundColor: '#ae379d',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    paddingHorizontal: 3,
    paddingVertical: 2,
    borderRadius: 20,
    marginVertical: 10,
  },
});

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(HomeScreen);
