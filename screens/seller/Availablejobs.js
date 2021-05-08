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
import {URL, getRecommendedJobs} from '../../config/const';
import axios from 'axios';
import {connect} from 'react-redux';

const AvailableJobs = (props) => {
  const [Recommendation, setRecommendation] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Refresh();
    }, 2000);
  };

  const Refresh = () => {
    getAllAvailableJobs();
  };

  const getAllAvailableJobs = async () => {
    try {
      if (props.route.params && props.route.params.Recommendation) {
        setRecommendation(props.route.params.Recommendation);
      } else {
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
      }
    } catch (error) {
      if (error?.response?.data?.result) {
        console.log('error123 getAllRecommendedJobs : ', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };

  useEffect(() => {
    getAllAvailableJobs();
  }, [props]);

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
                <MaterialIcons name="map-marker" size={10} />
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

  const JobList = () => {
    console.log('here in servicelist');
    return (
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
          data={Recommendation}
          renderItem={renderRecommendation}
          keyExtractor={(item) => item.key}
        />
      </SafeAreaView>
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View>
        <View style={styles.back}>
          <Header />
          <Card>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 24,
                }}>
                Available Jobs
              </Text>
            </View>
            <JobList />
          </Card>
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
    width: 56,
    height: 56,
    marginVertical: 10,
    borderRadius: 50,
  },
  container: {
    flex: 1,
    marginTop: 25,
    // paddingBottom: 250,
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

export default connect(mapStateToProps)(AvailableJobs);
