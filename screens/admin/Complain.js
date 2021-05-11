import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {URL, getAllComplains, blockSeller} from '../../config/const';
import axios from 'axios';
import {connect} from 'react-redux';

const ComplainScreen = (props) => {
  const renderItem = ({item}) => <Item item={item} />;
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      allComplains();
    }, 2000);
  };

  const Item = ({item}) => (
    <View style={styles.complains}>
      <View style={styles.details}>
        <Text style={{fontSize: 16, fontWeight: '700'}}>
          Complain No:{' '}
          {item._id.substring(item._id.length - 10, item._id.length - 3)}
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
            <Text style={{fontSize: 18, color: '#000', fontWeight: '400'}}>
              {item.buyer.name}
            </Text>
          </View>
          {item.seller.isActivated ? (
            <TouchableOpacity
              style={styles.update}
              onPress={() => onPressBlockSeller(item.seller._id)}>
              <Text
                style={{
                  color: '#fff',
                }}>
                Block
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.unblock}
              onPress={() => console.log('seller Unblocked')}>
              <Text
                style={{
                  color: '#fff',
                }}>
                Unblock
              </Text>
            </TouchableOpacity>
          )}
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
              {item.seller.name}
            </Text>
          </View>

          <View style={styles.update1}>
            <MaterialCommunityIcons
              name="message-text-outline"
              size={20}
              color="white"
            />
          </View>
        </View>
      </View>
      <View style={styles.descriptionRow}>
        <Text style={{fontWeight: '700'}}>Description : </Text>
        <Text
          style={{
            flexWrap: 'wrap',
            flex: 1,
          }}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  const [complains, setComplains] = useState([]);

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
            onPress: () => allComplains(),
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
    allComplains();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 24,
          }}>
          Complains
        </Text>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#F4F9FE']}
            progressBackgroundColor={'#B0389F'}
          />
        }
        data={complains}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 5,
    backgroundColor: '#F4F9FE',
  },
  complains: {
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
    justifyContent: 'center',
    textAlign: 'center',
    borderBottomWidth: 2.5,
    borderColor: '#e2e2e2',
    paddingHorizontal: 7,
    paddingTop: 5,
    paddingBottom: 2,
    width: '100%',
    flexDirection: 'row',
  },
  BuyerDetails: {
    flexDirection: 'row',
    width: '100%',
  },
  sellerDetails: {
    marginBottom: 5,
  },
  update: {
    backgroundColor: '#FF0404',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  unblock: {
    backgroundColor: '#43C58D',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 5,
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  update1: {
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 25,
    backgroundColor: '#ae379d',
  },
  userdetails: {
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: 7,
    width: '100%',
    flexDirection: 'row',
    paddingTop: 2,
  },
  descriptionRow: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
});

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(ComplainScreen);
