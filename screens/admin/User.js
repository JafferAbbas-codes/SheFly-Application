import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import UserTabs from './userTab';
import {
  URL,
  getAllUsers,
  getAllOrders,
  getAllComplains,
} from '../../config/const';
import axios from 'axios';
import {connect} from 'react-redux';

const Users = (props) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);

  const allUsers = async () => {
    try {
      let response = await axios.get(`${URL}${getAllUsers}`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      let sellers = [];
      let buyers = [];
      response.data.result.map((user) => {
        if (user.userType == 'seller') {
          sellers.push(user);
        } else if (user.userType == 'buyer') {
          buyers.push(user);
        }
      });
      setSellers(sellers);
      setBuyers(buyers);
      console.log('in getAllUsersAPI call admin home', response.data.result);
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
  }, []);

  return (
    <View style={styles.container}>
      <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <Searchbar
          placeholder="Search users"
          value={searchQuery}
          style={{borderRadius: 20}}
        />
      </View>
      <View style={styles.tabContainer}>
        <UserTabs buyers={buyers} sellers={sellers} allUsers={allUsers} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#daecfd',
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

export default connect(mapStateToProps)(Users);
