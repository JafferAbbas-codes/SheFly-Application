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
import {URL, getAvailableJobs} from '../../config/const';
import axios from 'axios';
import {connect} from 'react-redux';
const AvailableJobs = (props) => {
  const [Recommendation, setRecommendation] = useState([
    // {
    //   name: 'ibrahim',
    //   price: '25000',
    //   service: 'graphic',
    //   location: 'karachi',
    //   description: 'Hello world',
    //   text: 'Cooking',
    //   key: '1',
    // },
    // {
    //   name: 'ibrahim',
    //   price: '25000',
    //   service: 'graphic',
    //   location: 'karachi',
    //   description: 'Hello world',
    //   text: 'Cooking',
    //   key: '2',
    // },
    // {
    //   name: 'ibrahim',
    //   price: '25000',
    //   service: 'graphic',
    //   location: 'karachi',
    //   description: 'Hello world',
    //   text: 'Cooking',
    //   key: '3',
    // },
  ]);
  const getAllAvailableJobs = async () => {
    try {
      let response = await axios.post(
        `${URL}${getAvailableJobs}`,
        {status: 'pending'},
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      );
      console.log('response of getAllAvailableJobs', response.data.result);
      setRecommendation(response.data.result);
      return response.data.result;
    } catch (error) {
      if (error?.response?.data?.result) {
        console.log('propss in availablejobs', props);
        console.log('error123 available jobs : ', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };

  useEffect(() => {
    getAllAvailableJobs();
  }, []);

  const renderRecommendation = ({item}) => (
    // console.log('item in availableJob', item);
    <ItemRecom
      name={item.buyer.name}
      description={item.description}
      location={item.address}
      service={item.service}
      price={item.price}
    />
  );
  const ItemRecom = ({name, price, service, location, description, key}) => (
    <View
      style={{
        height: 150,
        width: 300,
        borderRadius: 15,
        backgroundColor: 'white',
        margin: 5,
      }}>
      <View style={{height: 75, width: 300, flexDirection: 'row'}}>
        <Image
          source={require('../../assets/i.jpg')}
          style={styles.headerImage}
        />
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold', margin: 2}}>
            {name}
          </Text>
          <Text style={{fontSize: 10, margin: 2}}>{service}</Text>
          <Text style={{fontSize: 10, margin: 2}}>
            <MaterialIcons
              name="map-marker"
              size={10}
              /*onPress={openMenu}*/ style={styles.icon}
            />
            {location}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              width: 130,
              textAlign: 'right',
              textAlignVertical: 'center',
              fontWeight: 'bold',
              margin: 5,
            }}>
            {price}
          </Text>
          <Text style={{textAlign: 'right'}}>/month</Text>
        </View>
      </View>
      <Text style={{fontSize: 15, textAlignVertical: 'center', margin: 10}}>
        {description}
      </Text>
    </View>
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
              Available Jobs
            </Text>
          </View>
          <SafeAreaView style={styles.container}>
            <FlatList
              data={Recommendation}
              renderItem={renderRecommendation}
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

export default connect(mapStateToProps)(AvailableJobs);
