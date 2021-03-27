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
import Header from '../shared/header2';
import Card from '../shared/card';
import FlatButton from '../shared/button.js';
import {gStyles} from '../styles/global';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
export default function getStarted() {
  const [Recommendation, setRecommendation] = useState([
    {
      name: 'ibrahim',
      price: '25000',
      service: 'graphic',
      location: 'karachi',
      description: 'Hello world',
      text: 'Cooking',
      key: '1',
    },
    {
      name: 'ibrahim',
      price: '25000',
      service: 'graphic',
      location: 'karachi',
      description: 'Hello world',
      text: 'Cooking',
      key: '2',
    },
    {
      name: 'ibrahim',
      price: '25000',
      service: 'graphic',
      location: 'karachi',
      description: 'Hello world',
      text: 'Cooking',
      key: '3',
    },
  ]);
  const renderRecommendation = ({item}) => (
    <ItemRecom
      name={item.name}
      description={item.description}
      location={item.location}
      service={item.service}
      price={item.price}
      text={item.text}
    />
  );
  const ItemRecom = ({
    name,
    price,
    service,
    location,
    description,
    text,
    key,
  }) => (
    <View
      style={{
        height: 150,
        width: 300,
        borderRadius: 15,
        backgroundColor: 'white',
        margin: 5,
      }}>
      <View style={{height: 75, width: 300, flexDirection: 'row'}}>
        <Image source={require('../assets/i.jpg')} style={styles.headerImage} />
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
              keyExtractor={(item) => item.key}
              style={{borderRadius: 20}}
            />
          </SafeAreaView>
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
    marginVertical: 30,
  },
  title: {
    fontSize: 32,
  },
  icon: {
    position: 'absolute',
  },
});
