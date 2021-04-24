import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
  SafeAreaView,
  Modal,
  Alert,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import MainCard from '../../shared/MainCard';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import {URL, getBidsByOrder} from '../../config/const';

const BidsOnBuyerRequests = (props) => {
  const [Bids, setBids] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const getAllBidsByOrder = async () => {
    try {
      let response = await axios.get(
        `${URL}${getBidsByOrder}${props.route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      );
      setBids(response.data.result);
      return response.data.result;
    } catch (error) {
      if (error?.response?.data?.result) {
        return {error: error.response.data.result};
      }
    }
  };

  useEffect(() => {
    getAllBidsByOrder();
  }, []);

  const displayModal = (show) => {
    setIsVisible(show);
    setTimeout(() => {
      setIsVisible(false);
      props.navigation.dispatch(StackActions.pop(0));
    }, 2000);
    // props.navigation.navigate('Home', {
    //   ...props.route.params,
    // });
  };

  const renderItem = ({item}) => (
    <Item
      description={item.description}
      seller={item.seller}
      budget={item.budget}
    />
  );
  const Item = ({description, seller, budget}) => (
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
      }}>
      <View
        style={{
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
          Request ID:{' '}
          {props.route.params.id.substring(
            props.route.params.id.length - 10,
            props.route.params.id.length - 3,
          )}
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
          {seller != undefined ? ' ' + seller.name : '  TBD'}
        </Text>
        <Text
          style={{
            backgroundColor: '#B0389F',
            borderRadius: 10,
            color: 'white',
            paddingBottom: 3,
            paddingHorizontal: 8,
          }}>
          <MaterialIcons name="comment" size={22} />
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 5,
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

        <TouchableOpacity onPress={() => displayModal(true)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Accept</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const OnPressBack = () => {
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
        <Modal
          animationType={'fade'}
          transparent={false}
          visible={isVisible}
          onRequestClose={() => {
            Alert.alert('Modal has now been closed.');
          }}>
          {/* <Text
            style={styles.closeText}
            onPress={() => {
              displayModal(!isVisible);
            }}>
            {' '}
            x{' '}
          </Text> */}
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <MaterialIcons
              name="check-circle"
              size={180}
              style={{
                color: '#AD379D',
              }}
            />
            <Text style={{textAlign: 'center', fontSize: 30}}>
              Bid Accepted!
            </Text>
          </View>
        </Modal>
        <View
          style={{
            flexDirection: 'row',
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
  button: {
    borderRadius: 30,
    textAlign: 'center',
    paddingVertical: 2,
    paddingHorizontal: 24,
    backgroundColor: '#43C58D',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(BidsOnBuyerRequests);
