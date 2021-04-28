import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Header from '../../shared/ProfileHead';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import Card from '../../shared/Card';
import axios from 'axios';
import {connect} from 'react-redux';
import {URL, getOrdersBySeller, getBidsBySeller} from '../../config/const';
import {TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const Profile = (props) => {
  const [jobsDone, setJobsDone] = useState([]);
  const [jobsInProgress, setJobsInProgress] = useState([]);
  const [bids, setBids] = useState([]);

  const renderItem = (item, i) => <Item item={item.item} i={i} />;
  const Item = ({item, i}) => (
    <ImageBackground
      source={{
        uri: i == 0 ? item.image : item,
      }}
      style={{
        flexDirection: 'column',
        borderRadius: 20,
        width: 100,
        margin: 8,
        backgroundColor: 'white',
        overflow: 'hidden',
      }}>
      <Text
        style={{
          fontSize: 15,
          height: 100,
          textAlign: 'center',
          color: 'white',
          textAlignVertical: 'center',
          fontWeight: 'bold',
        }}>
        {item.name}
      </Text>
    </ImageBackground>
  );

  const getJobsDoneBySeller = async () => {
    try {
      let response = await axios.get(
        `${URL}${getOrdersBySeller}${props.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      );
      console.log('response of getJobsDoneBySeller', response.data.result);
      let inProgess = [];
      let completed = [];
      response.data.result.map((order) => {
        if (order.status == 'Confirmed') {
          inProgess.push(order);
        } else if (order.status == 'Completed') {
          completed.push(order);
        }
      });
      setJobsInProgress(inProgess);
      setJobsDone(completed);
      return response.data.result;
    } catch (error) {
      if (error?.response?.data?.result) {
        console.log('propss in JobsDoneBySeller', props);
        console.log('error123 JobsDoneBySeller : ', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };
  const getAllBidsBySeller = async () => {
    try {
      let response = await axios.get(
        `${URL}${getBidsBySeller}${props.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      );
      console.log('response of getAllBidsBySeller', response.data.result);

      setBids(response.data.result);
      return response.data.result;
    } catch (error) {
      if (error?.response?.data?.result) {
        console.log('propss in getAllBidsBySeller', props);
        console.log('error123 getAllBidsBySeller : ', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };

  useEffect(() => {
    getJobsDoneBySeller();
    getAllBidsBySeller();
  }, []);

  const OnPressJobsDone = (jobsDone) => {
    props.navigation.navigate('Jobs', {
      ...props.route.params,
      jobs: jobsDone,
      headerTitle: 'Jobs Done',
    });
  };

  const OnPressJobsInProgress = (jobsInProgress) => {
    props.navigation.navigate('Jobs', {
      ...props.route.params,
      jobs: jobsInProgress,
      headerTitle: 'Jobs In Progress',
    });
  };

  const OnPressBids = (bids) => {
    props.navigation.navigate('AllBids', {
      ...props.route.params,
      bids,
    });
  };

  return (
    <View style={styles.back}>
      {console.log('Inprofile', props)}
      <Header
        user={props.user}
        navigation={props.navigation}
        route={props.route}
      />
      <Card>
        <ScrollView>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                OnPressJobsDone(jobsDone);
              }}>
              <View
                style={{
                  borderRadius: 24,
                  margin: 8,
                  padding: 15,
                  backgroundColor: 'white',
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textAlignVertical: 'bottom',
                  }}>
                  {jobsDone.length}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    textAlign: 'center',
                    textAlignVertical: 'top',
                  }}>
                  Jobs Done
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                OnPressJobsInProgress(jobsInProgress);
              }}>
              <View
                style={{
                  borderRadius: 24,
                  margin: 8,
                  padding: 15,
                  backgroundColor: 'white',
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textAlignVertical: 'bottom',
                  }}>
                  {jobsInProgress.length}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    textAlign: 'center',
                    textAlignVertical: 'top',
                  }}>
                  In Progress
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                OnPressBids(bids);
              }}>
              <View
                style={{
                  borderRadius: 24,
                  width: 90,
                  margin: 8,
                  padding: 15,
                  backgroundColor: 'white',
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textAlignVertical: 'bottom',
                  }}>
                  {bids.length}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    textAlign: 'center',
                    textAlignVertical: 'top',
                  }}>
                  Bids
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 25, margin: 10}}>
            Expertise
          </Text>
          <View style={{flexDirection: 'row'}}>
            <FlatList
              horizontal
              data={props.user.services}
              renderItem={(item) => renderItem(item, 0)}
              keyExtractor={(item) => item._id}
            />
          </View>

          <Text style={{fontWeight: 'bold', fontSize: 25, margin: 10}}>
            Samples
          </Text>
          <View style={{flexDirection: 'row'}}>
            <FlatList
              horizontal
              data={props.user.samples}
              renderItem={(item) => renderItem(item, 1)}
              keyExtractor={(item) => item.index}
            />
          </View>
        </ScrollView>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#B0389F',
  },
  container: {
    // borderRadius: 20,
    // marginVertical: 30,
  },
});

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(Profile);
