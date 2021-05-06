import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
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
import Card from '../../shared/Card';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {URL, getAllServicesRoute, getUserByType} from '../../config/const';
import axios from 'axios';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import PTRView from 'react-native-pull-to-refresh';

const Home = (props) => {
  const [services, setServices] = useState([]);

  // const pullToRefresh = () => {
  //   console.log('in setTimeout before apicall');
  //   getAllServicesRoute();
  //   getUserByType();
  //   console.log('in setTimeout after apicall');
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve();
  //     }, 2000);
  //   });
  //   // getAllServicesRoute();
  //   // getUserByType();
  // };

  const renderItem = (item) => <Item item={item.item} />;

  const Item = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        OnPressService(item._id, item.name);
      }}>
      <ImageBackground
        source={{
          uri: item.image,
        }}
        style={{
          width: 128,
          height: 128,
          borderRadius: 32,
          marginHorizontal: 5,
          overflow: 'hidden',
          backgroundColor: 'black',
          opacity: 0.9,
        }}>
        <Text
          style={{
            fontSize: 25,
            color: 'white',
            fontWeight: 'bold',
            width: 130,
            textAlign: 'center',
            textAlignVertical: 'center',
            height: 120,
          }}>
          {item.name}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
  const getAllServices = async () => {
    try {
      let response = await axios.get(`${URL}${getAllServicesRoute}`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      console.log('response', response);
      setServices(response.data.result);
      return response.data.result;
    } catch (error) {
      if (error?.response?.data?.result) {
        console.log('error123 signin : ', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };

  const seeAllServicesPressHandler = () => {
    props.navigation.navigate('AllServices', {
      ...props.route.params,
      getAllServices,
    });
  };

  const seeAllSellersPressHandler = () => {
    props.navigation.navigate('AvailableSellers', {
      ...props.route.params,
      getAllSellers,
    });
  };

  const OnPressService = (id, name) => {
    props.navigation.navigate('ServiceSeller', {
      ...props.route.params,
      id,
      name,
    });
  };

  const OnPressSeller = (index) => {
    props.navigation.navigate('SellerProfileForBuyer', {
      ...props.route.params,
      index,
    });
  };

  const getAllSellers = async () => {
    try {
      let response = await axios.get(`${URL}${getUserByType}seller`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      let seller = response.data.result;
      console.log('response of users', seller);
      setAvailableSellers(seller);
      return response.data.result;
    } catch (error) {
      if (error?.response?.data?.result) {
        console.log('error123 signin : ', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };

  useEffect(() => {
    getAllServices();
    getAllSellers();
  }, []);

  const [availableSellers, setAvailableSellers] = useState([]);

  const renderAvailableSellers = (item) => <ItemRecom item={item.item} />;

  const ItemRecom = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        OnPressSeller(item);
      }}>
      <View
        style={{
          width: 300,
          borderRadius: 16,
          backgroundColor: 'white',
          paddingHorizontal: 15,
          marginRight: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{uri: item.profileImage}}
              style={styles.headerImage}
            />
            <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {item.name}
              </Text>
              <Text style={{fontSize: 10, color: '#A28FA1'}}>{item.title}</Text>
              <Text style={{fontSize: 10, color: '#FFB266'}}>
                <MaterialIcons name="star" size={10} />
                {' ' + item.rating.toFixed(2)}
              </Text>
            </View>
          </View>
          <View>
            <MaterialCommunityIcons
              name="message-text"
              size={19}
              style={{
                backgroundColor: '#C543B3',
                borderRadius: 12,
                color: 'white',
                marginVertical: 10,
                paddingHorizontal: 8,
                paddingVertical: 5,
              }}
            />
          </View>
        </View>

        <Text
          style={{
            fontSize: 15,
            // width: 300,

            textAlignVertical: 'center',
            marginBottom: 15,
            textOverflow: 'ellipsis',
            // flex: 1,
            // flexWrap: 'wrap',
            // flexShrink: 1,
          }}
          numberOfLines={2}>
          {item.bio}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      {/* <PTRView onRefresh={() => pullToRefresh()}> */}
      <View style={styles.back}>
        <Header />
        <Card>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 24,
              }}>
              Popular Services
            </Text>
            <TouchableOpacity
              onPress={seeAllServicesPressHandler}
              style={{
                fontSize: 16,
              }}>
              <Text>see all</Text>
            </TouchableOpacity>
          </View>
          <SafeAreaView style={styles.container}>
            <FlatList
              horizontal
              data={services}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
            />
          </SafeAreaView>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 24,
              }}>
              Available Sellers
            </Text>
            <TouchableOpacity
              onPress={seeAllSellersPressHandler}
              style={{
                fontSize: 16,
              }}>
              <Text>see all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.container}>
            <FlatList
              horizontal
              data={availableSellers}
              renderItem={renderAvailableSellers}
              keyExtractor={(item) => item._id}
            />
          </ScrollView>
        </Card>
      </View>
      {/* </PTRView> */}
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#B0389F',
  },
  headerImage: {
    width: 56,
    height: 56,
    marginVertical: 10,
    borderRadius: 50,
  },
  container: {
    borderRadius: 20,
    marginVertical: 30,
  },
});

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(Home);
