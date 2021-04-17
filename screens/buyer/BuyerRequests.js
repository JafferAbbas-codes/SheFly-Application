import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
  ScrollView,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../shared/Header2';
import MainCard from '../../shared/MainCard';
import FlatButton from '../../shared/Button.js';
import {gStyles} from '../../styles/global';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {connect} from 'react-redux';
import {URL, getBuyerRequests} from '../../config/const';

const BuyerRequests = (props) => {
  // const [value, onChangeText] = React.useState('42|');
  const [Requests, setRequests] = useState([]);

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
      console.log('response', response.data.result);
      setRequests(response.data.result);
      return response.data.result;
    } catch (error) {
      if (error?.response?.data?.result) {
        console.log('error123 in getAllBuyerRequests : ', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };

  useEffect(() => {
    getAllBuyerRequests();
  }, []);

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
    var date = new Date(item.dateAndTime * 1000);
    // var requestNo = parseInt(`${item._id}`, 10);
    return (
      <Item
        requestNo={item._id.substring(0, 6)}
        buyer={item.buyer.name}
        date={date.toUTCString()}
        // buyer={item.buyer}
        seller={item.seller}
        status={item.status}
        service={item.service}
        id={item._id}
        budget={item.budget}
        address={item.address}
        description={item.description}
        //sellername
        // index={item.index}
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
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 5,
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
            }}>
            Request No:{' ' + requestNo}
          </Text>
          <Text>Requested on{' ' + date}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // margin: 2,
          }}>
          <Text style={{color: '#B0389F'}}>
            <MaterialIcons name="user" style={{color: 'black'}} />
            {' ' + buyer}
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
            <MaterialIcons name="female" />
            {' ' + seller}
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
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.back}>
        {/* {console.log(props)} */}
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
        <MainCard>
          <SafeAreaView style={styles.container}>
            {console.log('In return print requests', Requests)}
            <FlatList
              data={Requests}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
              style={{borderRadius: 20}}
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
    // marginVertical: 30,
  },
  item: {
    // backgroundColor: '#f9c2ff',
    // padding: 20,
    // marginVertical: 8,
    // marginHorizontal: 16,
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
  headerTitle: {},
});

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(BuyerRequests);
