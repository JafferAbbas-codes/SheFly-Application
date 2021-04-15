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
import {URL, getAllServicesRoute, getUserByType} from '../../config/const';
import axios from 'axios';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native';

const Home = (props) => {
  // const [value, onChangeText] = React.useState('42|');
  const [services, setServices] = useState([
    // {name: 'Cooking', _id: '1'},
    // {name: 'Makeup', _id: '2'},
    // {name: 'Nursing', _id: '3'},
  ]);
  const renderItem = (item) => <Item item={item.item} />;
  const Item = ({item}) => (
    <TouchableOpacity
      onPress={
        () => {
          OnPressService(item._id, item.name);
        }
        // console.log('on click', item._id),
      }>
      {/* {console.log('To test')} */}
      <ImageBackground
        // source={require('../../assets/i.jpg')}
        source={{
          uri: item.image,
        }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 20,
          marginHorizontal: 5,
          overflow: 'hidden',
        }}>
        {console.log('item in Item', item)}
        <Text
          style={{
            fontSize: 25,
            color: 'white',
            fontWeight: 'bold',
            width: 120,
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
  const [availableSellers, setAvailableSellers] = useState([
    // {
    //   name: 'Mashama Hafeez',
    //   rating: '5.0',
    //   service: 'Make up Artist',
    //   description:
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id placerat odio. ',
    //   text: 'Makeup',
    //   _id: '1',
    // },
    // {
    //   name: 'Mashama Hafeez',
    //   rating: '5.0',
    //   service: 'Make up Artist',
    //   description:
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id placerat odio.',
    //   text: 'Makeup',
    //   _id: '2',
    // },
    // {
    //   name: 'Mashama Hafeez',
    //   rating: '5.0',
    //   service: 'Make up Artist',
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    //   text: 'Makeup',
    //   _id: '3',
    // },
  ]);
  const renderAvailableSellers = (props) => (
    // console.log('item in ItemRecom seller', props);
    <ItemRecom
      name={props.item.name}
      profileImage={props.item.profileImage}
      bio={props.item.bio}
      rating={props.item.rating}
      title={props.item.title}
      _id={props.item._id}
      index={props.index}
    />
  );

  const ItemRecom = ({name, profileImage, bio, rating, title, _id, index}) => (
    <TouchableOpacity
      onPress={() => {
        OnPressSeller(index);
        // console.log('on click in seller box', _id);
      }}>
      <View
        style={{
          height: 150,
          // width: 300,
          borderRadius: 25,
          backgroundColor: 'white',
          marginHorizontal: 5,
        }}>
        <View style={{height: 75, width: 300, flexDirection: 'row'}}>
          <Image source={{uri: profileImage}} style={styles.headerImage} />
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 6}}>
              {name}
            </Text>
            <Text style={{fontSize: 10, color: '#C0C0C0', fontWeight: 'bold'}}>
              {title}
            </Text>
            <Text style={{fontSize: 10, color: '#FFB266'}}>
              <MaterialIcons
                name="star"
                size={10}
                /*onPress={openMenu}*/ style={styles.icon}
              />
              {' ' + rating}
            </Text>
          </View>
          <View>
            <MaterialIcons
              name="comment"
              size={22}
              style={styles.icon}
              style={{
                margin: 22,
                paddingLeft: 5,
                paddingRight: 5,
                paddingBottom: 4,
                paddingTop: 1,
                backgroundColor: '#BC53AE',
                color: 'white',
                borderRadius: 8,
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
          }}>
          {bio}
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
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 25,
                marginBottom: 15,
                width: 200,
              }}>
              Popular Services
            </Text>
            <TouchableOpacity
              onPress={seeAllServicesPressHandler}
              style={{textAlignVertical: 'center', marginLeft: 90}}>
              <Text>see all</Text>
            </TouchableOpacity>
          </View>
          <SafeAreaView style={styles.container}>
            <FlatList
              horizontal
              data={services}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              style={{borderRadius: 20}}
            />
          </SafeAreaView>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 25,
                marginBottom: 15,
                width: 200,
              }}>
              Available Sellers
            </Text>
            <TouchableOpacity
              onPress={seeAllSellersPressHandler}
              style={{textAlignVertical: 'center', marginLeft: 90}}>
              <Text>see all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.container}>
            <FlatList
              horizontal
              data={availableSellers}
              renderItem={renderAvailableSellers}
              keyExtractor={(item) => item._id}
              style={{borderRadius: 20}}
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
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 50,
  },
  container: {
    borderRadius: 20,
    marginVertical: 30,
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

export default connect(mapStateToProps)(Home);
