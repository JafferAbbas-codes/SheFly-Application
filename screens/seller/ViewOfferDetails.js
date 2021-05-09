import React, {useState} from 'react';
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
  Alert,
  Modal,
} from 'react-native';
import Header from '../../shared/Header2';
import Card from '../../shared/AppStackCard';
import FlatButton from '../../shared/Button.js';
import {gStyles} from '../../styles/global';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {URL, confirmOffer} from '../../config/const';
import axios from 'axios';
import {connect} from 'react-redux';

const ViewOfferDetails = (props) => {
  console.log(props);
  const offer = props.route.params.offer;
  const [isVisible, setIsVisible] = useState(false);

  const displayModal = (show) => {
    setIsVisible(show);
    setTimeout(() => {
      setIsVisible(false);
      props.navigation.navigate('Profile', {
        ...props.route.params,
        refresh: true,
      });
    }, 2000);
  };

  const OnPressConfirmOffer = async (id) => {
    console.log('In OnPress COnfirm');
    try {
      let response = await axios.put(
        `${URL}${confirmOffer}${id}`,
        {
          seller: props.user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      );
      // Alert.alert('Success', 'Offer Sent');
      displayModal(true);
    } catch (error) {
      // setButtonLoading(false);
      console.log('propss in OnPressConfirmOffer', error);

      if (error?.response?.data?.result) {
        console.log('propss in OnPressConfirmOffer', error);
        console.log('error123 OnPressConfirmOffer : ', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };

  const OnPressBack = () => {
    console.log('in on Press Back');
    props.navigation.navigate('Offers', {
      ...props.route.params,
    });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View>
        <Modal
          animationType={'fade'}
          transparent={false}
          visible={isVisible}
          onRequestClose={() => {
            Alert.alert('Modal has now been closed.');
          }}>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="check-circle"
              size={230}
              style={{
                color: '#AD379D',
              }}
            />
            <Text style={{textAlign: 'center', fontSize: 30}}>
              Offer Confirmed
            </Text>
          </View>
        </Modal>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 30,
              marginHorizontal: 30,
              justifyContent: 'space-between',
            }}>
            <MaterialIcons
              onPress={() => OnPressBack()}
              name="arrow-left"
              size={20}
              color="#4A4A4A"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginHorizontal: 30,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 24,
                // margin: 25,
              }}>
              Job Details
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // marginTop: 20,
              marginHorizontal: 30,
              // justifyContent: 'space-around',
            }}>
            <Text style={{fontSize: 10, color: '#A28FA1'}}>
              {offer.service.name}
            </Text>
            <MaterialIcons
              name="map-marker"
              size={10}
              color={'#A28FA1'}
              /*onPress={openMenu}*/ style={{
                marginLeft: 20,
                marginVertical: 2,
              }}
            />
            <Text style={{fontSize: 10, color: '#A28FA1'}}>
              {' ' + offer.address}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginHorizontal: 30,
              // justifyContent: 'space-around',
            }}>
            <Text style={{fontSize: 17}}>{offer.description}</Text>
          </View>

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: 20,
              marginHorizontal: 30,
            }}>
            <Text style={{fontSize: 18, color: '#A28FA1', fontWeight: 'bold'}}>
              Budget
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              Rs. {offer.budget}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: 20,
              marginHorizontal: 30,
            }}>
            <Text style={{fontSize: 18, color: '#A28FA1', fontWeight: 'bold'}}>
              Posted By
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={{
                  uri: offer.buyer.profileImage,
                }}
                style={styles.headerImage}
              />
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                {'  ' + offer.buyer.name}
              </Text>
            </View>
          </View>
          <View
            style={{
              // justifyContent: 'space-between',
              // flexDirection: 'row',
              marginTop: 40,
              marginHorizontal: 30,
            }}>
            <FlatButton
              text="Confirm Offer"
              onPress={
                () => {
                  OnPressConfirmOffer(offer._id);
                }
                // console.log('on click', item._id),
              }
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#B0389F',
  },
  headerImage: {
    width: 30,
    height: 30,
    // margin: 10,
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
});

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(ViewOfferDetails);
