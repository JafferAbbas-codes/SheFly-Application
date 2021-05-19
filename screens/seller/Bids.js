import React, {useState, useEffect} from 'react';
import moment from 'moment';
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
  RefreshControl,
} from 'react-native';
import Header from '../../shared/Header2';
import MainCard from '../../shared/MainCard';
import FlatButton from '../../shared/Button.js';
import {gStyles} from '../../styles/global';
import Zocial from 'react-native-vector-icons/Zocial';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import {URL, getOrdersBySeller, getBidsByOrder} from '../../config/const';

const Bids = (props) => {
  // const [value, onChangeText] = React.useState('42|');
  console.log('props in bids', props);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Refresh();
    }, 2000);
  };

  const Refresh = () => {
    props.route.params.getAllBidsBySeller();
  };

  const renderItem = ({item}) => {
    var date = moment(item.updatedAt).format('ll');
    return (
      <Item
        BookingID={item._id.substring(
          item._id.length - 10,
          item._id.length - 3,
        )}
        date={date}
        description={item.description}
        seller={item.seller.name}
        budget={item.budget}
        buyer={item.order.buyer.name}
        service={item.order.service.name}
        status={item.order.status}
      />
    );
  };
  const Item = ({
    date,
    BookingID,
    description,
    seller,
    budget,
    buyer,
    service,
    status,
  }) => (
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
      {/* {console.log('in Item', index)} */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          borderBottomColor: '#D3D6DB',
          borderBottomWidth: 2,
          // paddingBottom: 5,
          marginBottom: 5,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          Booking ID:{' ' + BookingID}
        </Text>
      </View>
      <View style={{paddingVertical: 5}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // margin: 2,
          }}>
          <Text style={{color: '#B0389F'}}>
            <FontAwesome5 name="user-alt" size={16} style={{color: 'black'}} />
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
            {seller != undefined ? ' ' + seller : '  TBD'}
            {console.log('seller after TBD', seller)}
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
      <View>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            margin: 2,
            width: 240,
          }}>
          <Text style={{fontWeight: 'bold'}}>Description: </Text>
          <Text>{description}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Budget: </Text>
          <Text>{'Rs. ' + budget + ' / hr'}</Text>
        </View>
      </View>
    </View>
  );

  const OnPressBack = () => {
    console.log('in on Press Back');
    props.navigation.navigate('Profile', {
      ...props.route.params,
    });
  };

  useEffect(() => {
    props.route.params.getAllBidsBySeller();
  }, [props]);

  const ServiceList = () => {
    console.log('here in servicelist');
    return (
      <SafeAreaView style={styles.container}>
        {console.log(' in scroll view', props.route.params.bids)}
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#F4F9FE']}
              progressBackgroundColor={'#B0389F'}
            />
          }
          data={props.route.params.bids}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          // style={{borderRadius: 20}}
        />
      </SafeAreaView>
    );
  };

  return (
    <View
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
            Your Bids
          </Text>
        </View>
        <MainCard requests={true}>
          <ServiceList />
        </MainCard>
      </View>
    </View>
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
    // flex: 1,
    marginTop: 25,
    paddingBottom: 40,
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

export default connect(mapStateToProps)(Bids);
