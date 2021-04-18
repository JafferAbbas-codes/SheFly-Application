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
import FlatButton from '../../shared/Button.js';
import {gStyles} from '../../styles/global';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {URL, getAllServicesRoute, getRecommendedJobs} from '../../config/const';
import axios from 'axios';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {logout} from '../../redux/authActions';

const Home = (props) => {
  const [services, setServices] = useState([]);
  const [Recommendation, setRecommendation] = useState([]);

  useEffect(() => {
    getAllServices();
    getAllRecommendedJobs();
  }, []);

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

  const OnPressService = (id, name) => {
    props.navigation.navigate('ServiceJobs', {
      ...props.route.params,
      id,
      name,
    });
  };

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
      services,
    });
  };

  const seeAllJobsPressHandler = () => {
    props.navigation.navigate('Availablejobs', {
      ...props.route.params,
      Recommendation,
    });
  };

  const getAllRecommendedJobs = async () => {
    try {
      let response = await axios.post(
        `${URL}${getRecommendedJobs}${props.user._id}`,
        {services: props.user.services},
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      );
      console.log('response of getAllRecommendedJobs', response.data.result);
      setRecommendation(response.data.result);
      return response.data.result;
    } catch (error) {
      if (error?.response?.data?.result) {
        console.log('propss in getAllRecommendedJobs', props);
        console.log('error123 getAllRecommendedJobs : ', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };

  const renderRecommendation = ({item}) => (
    <ItemRecom
      name={item.buyer.name}
      image={item.buyer.profileImage}
      service={item.service}
      location={item.address}
      // service={item.service}
      budget={item.budget}
      description={item.description}
    />
  );

  const OnPressJobs = (name, service, location, budget, description, image) => {
    props.navigation.navigate('ViewJob', {
      ...props.route.params,
      name,
      service,
      location,
      budget,
      description,
      image,
    });
  };

  const ItemRecom = ({name, service, location, budget, description, image}) => (
    <TouchableOpacity
      onPress={
        () => {
          OnPressJobs(name, service.name, location, budget, description, image);
        }
        // console.log('on click', item._id),
      }>
      <View
        style={{
          // height: 150,
          width: 300,
          borderRadius: 25,
          backgroundColor: 'white',
          marginHorizontal: 5,
        }}>
        {/* {console.log('To test')} */}
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.headerImage}
          />
          <View>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 9}}>
              {name}
            </Text>
            <Text style={{fontSize: 10, marginTop: 2, color: '#A28FA1'}}>
              {service.name}
            </Text>
            <Text style={{fontSize: 10, color: '#A28FA1'}}>
              <MaterialIcons
                name="map-marker"
                size={10}
                /*onPress={openMenu}*/ style={styles.icon}
              />
              {' ' + location}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 15,
                // width: 130,
                // textAlign: 'right',
                // textAlignVertical: 'center',
                fontWeight: 'bold',
                marginTop: 20,
              }}>
              {'Rs. ' + budget}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 15,
            textAlignVertical: 'center',
            marginHorizontal: 10,
            marginBottom: 15,
          }}>
          {description}
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
              Recommendation For You
            </Text>
            <TouchableOpacity
              onPress={seeAllJobsPressHandler}
              style={{textAlignVertical: 'center', marginLeft: 90}}>
              <Text>see all</Text>
            </TouchableOpacity>
          </View>
          <SafeAreaView style={styles.container}>
            <FlatList
              horizontal
              data={Recommendation}
              renderItem={renderRecommendation}
              keyExtractor={(item) => item.key}
              style={{borderRadius: 20}}
            />
          </SafeAreaView>
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
