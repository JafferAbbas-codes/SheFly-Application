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
} from 'react-native';
import Header from '../../shared/Header2';
import Card from '../../shared/Card';
import FlatButton from '../../shared/Button.js';
import {gStyles} from '../../styles/global';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';

export default function requestDetails(props) {
  const job = props.route.params.job;

  const OnPressBack = () => {
    console.log('in on Press Back');
    props.navigation.navigate('Availablejobs', {
      ...props.route.params,
    });
  };

  const OnPressBid = (job) => {
    props.navigation.navigate('SendBid', {
      ...props.route.params,
      job,
    });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View>
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
              size={18}
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
              }}>
              Job Details
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 30,
            }}>
            <Text style={{fontSize: 10, color: '#A28FA1'}}>
              {job.service.name}
            </Text>
            <MaterialIcons
              name="map-marker"
              size={10}
              color={'#A28FA1'}
              style={{
                marginLeft: 20,
                marginVertical: 2,
              }}
            />
            <Text style={{fontSize: 10, color: '#A28FA1'}}>
              {' ' + job.address}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginHorizontal: 30,
              // justifyContent: 'space-around',
            }}>
            <Text style={{fontSize: 16}}>{job.description}</Text>
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
              Rs. {job.budget}
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
                  uri: job.buyer.profileImage,
                }}
                style={styles.headerImage}
              />
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                {'  ' + job.buyer.name}
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
              text="Bid"
              onPress={
                () => {
                  OnPressBid(job);
                }
                // console.log('on click', item._id),
              }
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

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
