import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import MainCard from '../../shared/MainCard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Zocial from 'react-native-vector-icons/Zocial';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

const Jobs = (props) => {
  //   const [bookings, setBookings] = useState(props.route.params.bookings);
  console.log('In Jobs', props);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Refresh();
    }, 2000);
  };

  const Refresh = () => {
    props.route.params.getJobsDoneBySeller();
  };

  const OnPressJob = (job) => {
    props.navigation.navigate('JobDetails', {
      job,
    });
  };

  useEffect(() => {
    props.route.params.getJobsDoneBySeller();
  }, [props]);

  const OnPressBack = () => {
    console.log('in on Press Edit');
    props.navigation.navigate('Profile', {
      ...props.route.params,
    });
  };

  const renderItem = ({item}) => {
    return <Item job={item} />;
  };
  const Item = ({job}) => (
    <TouchableOpacity
      onPress={() => {
        OnPressJob(job);
      }}>
      <View
        style={{
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 5,
            height: 1,
          },
          padding: 5,
          shadowOpacity: 1,
          shadowRadius: 10,
          marginHorizontal: 20,
          elevation: 13,
          marginVertical: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: 'black',
            borderBottomWidth: 2,
            marginBottom: 5,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            Booking ID:
            {' ' + job._id.substring(job._id.length - 10, job._id.length - 3)}
          </Text>
          <Text
            style={{
              fontWeight: '900',
              fontSize: 12,
            }}>
            Completed on{' ' + moment(job.updatedAt).format('ll')}
          </Text>
        </View>
        <View style={{paddingVertical: 5}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#B0389F'}}>
              <FontAwesome5
                name="user-alt"
                size={16}
                style={{color: 'black'}}
              />
              {'  ' + job.buyer.name}
            </Text>
            <Text
              style={{
                backgroundColor: '#B0389F',
                borderRadius: 10,
                color: 'white',
                padding: 3,
                paddingHorizontal: 15,
              }}>
              {job.status}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>
              <Zocial name="stripe" size={16} />
              {job.seller != undefined ? ' ' + job.seller.name : '  TBD'}
            </Text>
            <Text
              style={{
                color: '#B0389F',
                padding: 3,
                paddingHorizontal: 10,
              }}>
              {job.service.name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.back}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-evenly',
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
              // justifyContent: 'space-between',
              paddingTop: 25,
            }}>
            {props.route.params.headerTitle}
          </Text>
        </View>
        <MainCard requests={true}>
          <SafeAreaView style={styles.container}>
            {/* {console.log(' in scroll view', props.route.params.jobsDone)} */}
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#F4F9FE']}
                  progressBackgroundColor={'#B0389F'}
                />
              }
              data={props.route.params.jobs}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              style={{borderRadius: 20, marginBottom: 30}}
            />
          </SafeAreaView>
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
    margin: 10,
    borderRadius: 50,
  },
  container: {
    marginTop: 25,
    // paddingBottom: 300,
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
});

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(Jobs);
