import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-paper';
import moment from 'moment';
import {URL, blockSeller, getAllUsers} from '../../config/const';
import axios from 'axios';
import {connect} from 'react-redux';

const UserCard = (props) => {
  console.log('props in usecard', props);
  const renderItem = ({item}) => <Item item={item} />;
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      props.allUsers();
    }, 2000);
  };

  const onPressBlockSeller = async (id) => {
    console.log('in block seller', props.token, id);
    try {
      let response = await axios.put(
        `${URL}${blockSeller}${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      );
      console.log('in blockseller', response.data.result);
      Alert.alert(
        'Seller Blocked',
        'This seller has been blocked.',
        [
          {
            text: 'Continue',
            onPress: () => props.allUsers(),
            color: 'green',
          },
        ],
        {
          cancelable: true,
        },
      );
      return response.data.result;
    } catch (error) {
      console.log('error', error.message);
      if (error?.response?.data?.result) {
        console.log('error', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };
  const Item = ({item}) => (
    <View style={styles.user}>
      <View style={styles.avatar}>
        <Avatar.Image
          source={{
            uri: item.profileImage,
          }}
          size={60}
          borderColor="purple"
        />
      </View>

      <View style={styles.details}>
        <View style={[styles.userdetails, {justifyContent: 'space-between'}]}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text style={styles.highlightedText}>Name: </Text>
            <Text>{item.name}</Text>
          </View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text style={styles.highlightedText}>
              {' '}
              <Icon name="star" color="#ae379d" size={16} />
              {' ' + item.rating.toFixed(1)}
            </Text>
          </View>
        </View>
        <View style={styles.userdetails}>
          <Text style={styles.highlightedText}>Type: </Text>
          <Text>{item.userType}</Text>
        </View>
        <View style={styles.userdetails}>
          <Text style={styles.highlightedText}>CNIC: </Text>
          <Text>{item.cnic}</Text>
        </View>
        <View style={styles.userdetails}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text style={styles.highlightedText}>Contact: </Text>
            <Text>{item.phoneNumber}</Text>
          </View>
          {item.userType == 'seller' && (
            <View style={{flexDirection: 'row', flex: 1}}>
              {item.isActivated ? (
                <TouchableOpacity
                  style={styles.update}
                  onPress={() => onPressBlockSeller(item._id)}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 12,
                    }}>
                    Block
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.unblock}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 12,
                    }}>
                    Unblock
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
  return (
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
        data={props.users}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#daecfd',
  },
  tabContainer: {
    margin: 15,
    flex: 1,
  },
  user: {
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
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  details: {
    alignItems: 'baseline',
    justifyContent: 'space-between',
    borderBottomWidth: 2.5,
    borderColor: '#e2e2e2',
    paddingHorizontal: 7,
    paddingTop: 5,
    paddingBottom: 2,
    flexDirection: 'row',
  },
  confirm: {
    fontSize: 12,
    fontWeight: '700',
    flexDirection: 'row',
  },
  details: {
    width: '100%',
  },
  update: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,

    elevation: 10,
    backgroundColor: '#d21b1b',
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 25,
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginLeft: 8,
  },
  unblock: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,

    elevation: 10,
    backgroundColor: '#43C58D',
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 25,
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginLeft: 8,
  },
  userdetails: {
    alignItems: 'baseline',
    paddingHorizontal: 7,
    width: '100%',
    flexDirection: 'row',
    paddingTop: 2,
  },
  highlightedText: {
    fontSize: 14,
    fontWeight: '700',
  },
});

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(UserCard);
