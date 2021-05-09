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
import Zocial from 'react-native-vector-icons/Zocial';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {connect} from 'react-redux';
import {URL, getBuyerRequests} from '../../config/const';
import {replace} from 'formik';

const BuyerRequests = (props) => {
  const [Requests, setRequests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Refresh();
    }, 2000);
  };

  const Refresh = () => {
    getAllBuyerRequests();
  };

  const getAllBuyerRequests = async () => {
    try {
      let response = await axios.get(
        `${URL}${getBuyerRequests}${props.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      );
      setRequests(
        response.data.result.filter((req) => req.status == 'Pending'),
      );
      console.log('in buyer request', response.data.result);
      return response.data.result;
    } catch (error) {
      if (error?.response?.data?.result) {
        return {error: error.response.data.result};
      }
    }
  };

  useEffect(() => {
    getAllBuyerRequests();
  }, [props]);

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

  const renderItem = ({item}) => {
    var date = moment(item.createdAt).format('ll');
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
      />
    );
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
        );
      }}>
      <View
        style={{
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          padding: 5,
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 10,
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
            Your Requests
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
              data={Requests}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
              style={{
                borderRadius: 20,
                marginBottom: 30,
              }}
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
    paddingHorizontal: 10,
    marginTop: 30,
    paddingBottom: 5,
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

export default connect(mapStateToProps)(BuyerRequests);
