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
} from 'react-native';
import Header from '../../shared/Header2';
import MainCard from '../../shared/MainCard';
import FlatButton from '../../shared/Button.js';
import {gStyles} from '../../styles/global';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import {URL, getOrdersBySeller, getBidsByOrder} from '../../config/const';

const BidsOnBuyerRequests = (props) => {
  // const [value, onChangeText] = React.useState('42|');
  console.log('props in bidsonbuyerrequest', props);
  const [Bids, setBids] = useState([]);

  const getAllBidsByOrder = async () => {
    console.log('in Api call', props.route.params.id);
    try {
      let response = await axios.get(
        `${URL}${getBidsByOrder}${props.route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      );
      console.log('response of getAllBidsByOrder', response.data.result);

      setBids(response.data.result);
      return response.data.result;
    } catch (error) {
      if (error?.response?.data?.result) {
        console.log('propss in getAllBidsByOrder', props);
        console.log('error123 getAllBidsByOrder : ', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };

  useEffect(() => {
    getAllBidsByOrder();
  }, []);

  const renderItem = ({item}) => (
    <Item
      text={item.text}
      bookingno={item.bookingno}
      description={item.description}
      seller={item.seller}
      budget={item.budget}
      user={item.user}
      service={item.service}
    />
  );
  const Item = ({
    text,
    bookingno,
    description,
    seller,
    budget,
    user,
    service,
  }) => (
    <View
      style={{
        margin: 5,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        padding: 5,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        // marginHorizontal: 10,
      }}>
      <View
        style={{
          //   flexDirection: 'row',
          //   justifyContent: 'space-between',
          borderBottomColor: '#D3D6DB',
          borderBottomWidth: 2,
          paddingBottom: 5,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 15,
          }}>
          Booking No: {props.route.params.id}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 5,
          paddingHorizontal: 8,
        }}>
        <Text style={{fontSize: 15}}>
          <MaterialIcons name="female" size={18} style={{color: 'black'}} />
          {' ' + seller}
        </Text>
        <Text
          style={{
            backgroundColor: '#B0389F',
            borderRadius: 10,
            color: 'white',
            paddingBottom: 3,
            paddingHorizontal: 8,
          }}>
          <MaterialIcons
            name="comment"
            size={22}
            // style={styles.icon}
            // style={{
            //   margin: 22,
            //   paddingLeft: 5,
            //   paddingRight: 5,
            //   paddingBottom: 4,
            //   paddingTop: 1,
            //   backgroundColor: '#BC53AE',
            //   color: 'white',
            //   borderRadius: 8,
            // }}
          />
        </Text>
      </View>
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>
          <MaterialIcons name="user" />
          {user}
        </Text>
        <Text
          style={{
            color: '#B0389F',
            padding: 3,
            paddingHorizontal: 10,
          }}>
          {service}
        </Text>
      </View> */}
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 5,
          //   justifyContent: 'space-between',
        }}>
        <Text style={{paddingLeft: 8, fontWeight: 'bold', fontSize: 12}}>
          Description:{' '}
        </Text>
        <Text style={{fontSize: 12, textAlign: 'justify'}}>{description}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 5,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{paddingLeft: 8, fontWeight: 'bold', fontSize: 12}}>
            Budget:{' '}
          </Text>
          <Text style={{fontSize: 12, textAlign: 'justify'}}>
            {'Rs. ' + budget}
          </Text>
        </View>

        {/* <FlatButton text="View all Bids" /> */}
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Accept</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* <Text style={{paddingHorizontal: 8}}>Budget: {budget}</Text> */}
    </View>
  );

  const OnPressBack = () => {
    console.log('in on Press Edit');
    props.navigation.navigate('RequestDetails', {
      ...props.route.params,
    });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.back}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-evenly',
            padding: 35,
          }}>
          <MaterialIcons
            onPress={() => OnPressBack()}
            name="arrow-left"
            size={20}
            color="white"
          />
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 30,
              // justifyContent: 'space-between',
              paddingTop: 25,
            }}>
            Bids
          </Text>
        </View>
        <MainCard>
          <ScrollView>
            <SafeAreaView style={styles.container}>
              <FlatList
                data={Bids}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                style={{borderRadius: 20}}
              />
            </SafeAreaView>
          </ScrollView>
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
    padding: 10,
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
  button: {
    // height: 20.5,
    // height: 46,
    borderRadius: 30,
    textAlign: 'center',
    paddingVertical: 2,
    // marginHorizontal: 70,
    paddingHorizontal: 24,
    backgroundColor: '#43C58D',
  },
  buttonText: {
    color: 'white',
    // fontWeight: 'bold',
    // textTransform: 'uppercase',
    fontSize: 12,
    textAlign: 'center',
    // flexDirection: 'row',
    // alignContent: 'center',
    // justifyContent: 'center',
  },
});

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(BidsOnBuyerRequests);
