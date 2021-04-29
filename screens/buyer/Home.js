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
import Card from '../../shared/Card';
import FlatButton from '../../shared/Button';
import {gStyles} from '../../styles/global';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {URL, getAllServicesRoute, getUserByType} from '../../config/const';
import axios from 'axios';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native';

const Home = (props) => {
  // const [value, onChangeText] = React.useState('42|');
  const [services, setServices] = useState([]);
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
          paddingHorizontal: 8,
          marginRight: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{uri: item.profileImage}}
              style={styles.headerImage}
            />
            <View style={{paddingHorizontal: 7, paddingTop: 6}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 6}}>
                {item.name}
              </Text>
              <Text
                style={{fontSize: 10, color: '#A28FA1', fontWeight: 'bold'}}>
                {item.title}
              </Text>
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
            textAlignVertical: 'center',
            margin: 10,
            marginTop: 0,
            // width: 200,
          }}
          numberOfLines={3}>
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
      <View style={styles.back}>
        <Header />
        <Card>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 25,
              }}>
              Popular Services
            </Text>
            <TouchableOpacity
              onPress={seeAllServicesPressHandler}
              // style={{textAlignVertical: 'center'}}
            >
              <Text>see all</Text>
            </TouchableOpacity>
          </View>
          <SafeAreaView style={styles.container}>
            <FlatList
              horizontal
              data={services}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              // style={{borderRadius: 20}}
            />
          </SafeAreaView>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 25,
                // marginBottom: 15,
                // width: 200,
              }}>
              Available Sellers
            </Text>
            <TouchableOpacity
              onPress={seeAllSellersPressHandler}
              // style={{textAlignVertical: 'center', marginLeft: 90}}
            >
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
