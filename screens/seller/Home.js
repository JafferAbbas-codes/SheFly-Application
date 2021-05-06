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
        console.log('error123 getAllRecommendedJobs : ', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };

  const renderRecommendation = ({item}) => <ItemRecom job={item} />;

  const OnPressJobs = (job) => {
    props.navigation.navigate('ViewJobDetails', {
      job,
    });
  };

  const ItemRecom = ({job}) => (
    <TouchableOpacity
      onPress={() => {
        OnPressJobs(job);
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
              source={{
                uri: job.buyer.profileImage,
              }}
              style={styles.headerImage}
            />
            <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {job.buyer.name}
              </Text>
              <Text style={{fontSize: 10, color: '#A28FA1'}}>
                {job.service.name}
              </Text>
              <Text style={{fontSize: 10, color: '#A28FA1'}}>
                <MaterialIcons
                  name="map-marker"
                  size={10}
                  style={styles.icon}
                />
                {' ' + job.address}
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
              {'Rs. ' + job.budget}
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
          {job.description}
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
                fontSize: 24,
                // fontFamily: 'Poppins-SemiBoldItalic',
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
                width: 290,
              }}>
              Recommended For You
            </Text>
            <TouchableOpacity
              onPress={seeAllJobsPressHandler}
              style={{
                fontSize: 16,
              }}>
              <Text>see all</Text>
            </TouchableOpacity>
          </View>
          <SafeAreaView style={styles.container}>
            <FlatList
              horizontal
              data={Recommendation}
              renderItem={renderRecommendation}
              keyExtractor={(item) => item.key}
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
