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
import Card from '../../shared/Card';
import FlatButton from '../../shared/Button.js';
import {gStyles} from '../../styles/global';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {URL, getSellerOffers} from '../../config/const';
import axios from 'axios';
import {connect} from 'react-redux';

const Offers = (props) => {
  const [offers, setOffers] = useState([]);

  const getAllSellerOffers = async () => {
    try {
      console.log('props in setOffers', props);
      //   if (props.route.params && props.route.params.Recommendation) {
      //     setRecommendation(props.route.params.Recommendation);
      //   } else {
      let response = await axios.get(
        `${URL}${getSellerOffers}${props.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      );
      console.log('response of setOffers', response.data.result);
      setOffers(response.data.result);
      return response.data.result;
      //   }
    } catch (error) {
      console.log('error in setOffers', error);
      if (error?.response?.data?.result) {
        console.log('error123 setOffers : ', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };

  useEffect(() => {
    getAllSellerOffers();
  }, []);

  const renderOffers = ({item}) => (
    // console.log('item in availableJob', item);
    <ItemRecom
      name={item.buyer.name}
      image={item.buyer.profileImage}
      service={item.service.name}
      location={item.address}
      // service={item.service}
      orderId={item._id}
      budget={item.budget}
      description={item.description}
    />
  );

  const OnPressJobs = (name, service, location, budget, description, image) => {
    props.navigation.navigate('ViewOfferDetails', {
      ...props.route.params,
      name,
      service,
      location,
      budget,
      description,
      image,
      orderId,
      sellerId,
    });
  };

  const ItemRecom = ({
    name,
    service,
    location,
    budget,
    description,
    image,
    orderId,
  }) => (
    <TouchableOpacity
      onPress={
        () => {
          OnPressJobs(
            name,
            service,
            location,
            budget,
            description,
            image,
            orderId,
          );
        }
        // console.log('on click', item._id),
      }>
      <View
        style={{
          // height: 150,
          // width: 300,
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 9}}>
                {name}
              </Text>
              <Text style={{fontSize: 10, marginTop: 2, color: '#A28FA1'}}>
                {service}
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
              Job Offers
            </Text>
          </View>
          <SafeAreaView style={styles.container}>
            <FlatList
              data={offers}
              renderItem={renderOffers}
              keyExtractor={(item) => item._id}
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
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 50,
  },
  container: {
    borderRadius: 20,
    marginVertical: 30,
  },
  title: {
    fontSize: 32,
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

export default connect(mapStateToProps)(Offers);
