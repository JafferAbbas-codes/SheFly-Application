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
export default function requestDetails() {
  // const [value, onChangeText] = React.useState('42|');
  const [Services, setServices] = useState([
    {
      bookingno: '1',
      status: 'completed',
      serviceprovider: 'Narjis',
      date: '6-06-2021',
      service: 'Cooking',
      budget: '3000',
      user: 'Salman',
      location: 'FB Area,Karachi',
      description:
        'I want a henna artist.In at iaculis lorem. Praesent tempor dictum tellus ut molestie. Sed sed ullamcorper lorem, id faucibus odio. Duis eu nisl ut ligula cursus molestie at at dolor. Nulla est justo, pellentesque vel lectus eget, fermentum varius dui. Morbi faucibus quam sed efficitur interdum. Suspendisse in pretium magna. Vivamus nec orci purus. Quisque accumsan dictum urna semper laoreet. Sed id rutrum tellus. In nisi sapien, sagittis faucibus tincidunt et, lacinia id felis. Ut tempor lectus porta, tempus orci ac, feugiat tellus. Suspendisse sagittis libero vitae metus sodales, id semper justo congue. Donec quam lorem, efficitur sit amet ex dapibus, venenatis sodales justo. Nulla arcu tellus, lacinia ac feugiat ac, cursus eget felis. Pellentesque fringilla quam ac ex convallis, vel imperdiet magna laoreet.',
      key: '1',
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
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 30,
              marginHorizontal: 30,
              justifyContent: 'space-between',
            }}>
            <MaterialIcons name="arrow-left" size={20} color="#4A4A4A" />
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
              Bridal Makeup Required
            </Text>
            <MaterialIcons name="pencil" size={15} style={{marginTop: 8}} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              // marginTop: 20,
              marginHorizontal: 30,
              // justifyContent: 'space-around',
            }}>
            <Text style={{fontSize: 10, color: '#A28FA1'}}>Henna Art</Text>
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
              {' ' + Services[0].location}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginHorizontal: 30,
              // justifyContent: 'space-around',
            }}>
            <Text style={{fontSize: 17}}>{' ' + Services[0].description}</Text>
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
              Rs. {' ' + Services[0].budget}
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
              Date
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              {Services[0].date}
            </Text>
          </View>
          <View
            style={{
              // justifyContent: 'space-between',
              // flexDirection: 'row',
              marginTop: 40,
              marginHorizontal: 30,
            }}>
            <FlatButton text="View all Bids" />
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
});
