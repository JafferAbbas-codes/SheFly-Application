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
export default function bookingDetails() {
  // const [value, onChangeText] = React.useState('42|');
  const [Services, setServices] = useState([
    {
      bookingno: '1',
      status: 'completed',
      serviceprovider: 'Narjis',
      date: '6-06-2021',
      service: 'Cooking',
      user: 'Salman',
      key: '1',
    },
    {
      bookingno: '1',
      status: 'completed',
      serviceprovider: 'Narjis',
      date: '6-06-2021',
      service: 'Nursing',
      user: 'Salman',
      key: '2',
    },
    {
      bookingno: '1',
      status: 'completed',
      serviceprovider: 'Narjis',
      date: '6-06-2021',
      service: 'Cooking',
      user: 'Salman',
      key: '3',
    },
    {
      bookingno: '1',
      status: 'completed',
      serviceprovider: 'Narjis',
      date: '6-06-2021',
      service: 'Cooking',
      user: 'Salman',
      key: '4',
    },
  ]);
  const renderItem = ({item}) => (
    <Item
      text={item.text}
      bookingno={item.bookingno}
      date={item.date}
      serviceprovider={item.serviceprovider}
      status={item.status}
      user={item.user}
      service={item.service}
    />
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            margin: 15,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 30,
              margin: 25,
            }}>
            Bridal Makeup Required
          </Text>
          <Text style={{fontSize: 10, margin: 2}}>{Services.service}</Text>
          <MaterialIcons
            name="map-marker"
            size={10}
            /*onPress={openMenu}*/ style={styles.icon}
          />
          <Text>Description</Text>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text>Budget</Text>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Rs.</Text>
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text>Posted by</Text>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              <Image
                source={require('../../assets/i.jpg')}
                style={{borderRadius: 10}}
              />
            </Text>
          </View>
          <FlatButton text="Bid" />
        </View>

        <Card>
          <View style={{margin: 10}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 25,
                margin: 5,
              }}>
              Booking No: bookingno
            </Text>
            <Text
              style={{
                backgroundColor: '#B0389F',
                borderRadius: 10,
                color: 'white',
                width: 80,
                textAlign: 'center',
              }}>
              status
            </Text>
          </View>
          <View
            style={{
              margin: 15,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              padding: 5,
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 10,
              padding: 20,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                borderBottomColor: 'black',
                borderBottomWidth: 2,
                paddingBottom: 5,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                Requested on
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                Completed on
              </Text>
            </View>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Seller Name:
            </Text>

            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Buyer Name:
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Buyer No:
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Address
            </Text>
            <Text>
              <MaterialIcons name="user" />
              user
            </Text>
            <Text
              style={{
                color: '#B0389F',
                padding: 3,
                paddingHorizontal: 10,
              }}>
              service
            </Text>
          </View>
          {/* <SafeAreaView style={styles.container}>
            <FlatList
              data={Servises}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
              style={{borderRadius: 20}}
            />
          </SafeAreaView> */}
          <View style={{margin: 10}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 25,
                margin: 5,
              }}>
              Service Details
            </Text>
          </View>
          <View
            style={{
              margin: 15,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              padding: 5,
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 10,
              padding: 20,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Service:
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Description:
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Service Date:
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Amount:
            </Text>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
}

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
  icon: {
    position: 'absolute',
  },
  headerTitle: {},
});
