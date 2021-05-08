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
  RefreshControl,
} from 'react-native';
import Header from '../../shared/Header2';
import Card from '../../shared/AppStackCard';
import FlatButton from '../../shared/Button.js';
import {gStyles} from '../../styles/global';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {URL, getSellerOffers} from '../../config/const';
import axios from 'axios';
import {connect} from 'react-redux';

const Offers = (props) => {
  const [offers, setOffers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Refresh();
    }, 2000);
  };

  const Refresh = () => {
    getAllSellerOffers();
  };

  const getAllSellerOffers = async () => {
    try {
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
  }, [props]);

  const renderOffers = ({item}) => <ItemRecom offer={item} />;

  const OnPressJobs = (offer) => {
    props.navigation.navigate('ViewOfferDetails', {
      ...props.route.params,
      offer,
    });
  };

  const ItemRecom = ({offer}) => (
    <TouchableOpacity
      onPress={() => {
        OnPressJobs(offer);
      }}>
      <View
        style={{
          // width: 300,
          borderRadius: 16,
          backgroundColor: 'white',
          paddingHorizontal: 15,
          marginBottom: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: offer.buyer.profileImage,
              }}
              style={styles.headerImage}
            />
            <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {offer.buyer.name}
              </Text>
              <Text style={{fontSize: 10, color: '#A28FA1'}}>
                {offer.service.name}
              </Text>
              <Text style={{fontSize: 10, color: '#A28FA1'}}>
                <MaterialIcons name="map-marker" size={10} />
                {' ' + offer.address}
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                paddingVertical: 15,
              }}>
              {'Rs. ' + offer.budget}
            </Text>
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
          {offer.description}
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
                fontSize: 24,
              }}>
              Job Offers
            </Text>
          </View>
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
              data={offers}
              renderItem={renderOffers}
              keyExtractor={(item) => item._id}
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
    marginVertical: 10,
    borderRadius: 50,
  },
  container: {
    paddingVertical: 20,
    paddingBottom: 200,
  },
  title: {
    fontSize: 32,
  },
});

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(Offers);
