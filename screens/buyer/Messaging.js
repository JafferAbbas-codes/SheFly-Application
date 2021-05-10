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
import Card from '../../shared/AppStackCard';
import FlatButton from '../../shared/Button.js';
import {gStyles} from '../../styles/global';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
export default function getStarted() {
  // const [value, onChangeText] = React.useState('42|');
  const [Servises, setServises] = useState([
    {text: 'Salman', key: '1', msg: 'Hello', time: '15 min'},
    {text: 'Ibrahim', key: '2', msg: 'HI', time: '20 min'},
    {text: 'Zubair', key: '3', msg: 'Greetings', time: '25 min'},
  ]);
  const renderItem = ({item}) => (
    <Item text={item.text} msg={item.msg} time={item.time} />
  );
  const Item = ({text, msg, time}) => (
    <View style={{flexDirection: 'row', margin: 10}}>
      <Image
        source={require('../../assets/i.jpg')}
        style={{
          width: 50,
          height: 50,
          borderRadius: 20,
          marginHorizontal: 5,
          overflow: 'hidden',
        }}
      />
      {/* {console.log('To test')} */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 250,
        }}>
        <View>
          <Text
            style={{
              fontSize: 15,
              color: 'grey',
            }}>
            {text}
          </Text>
          <Text>{msg}</Text>
        </View>
        <Text>{time}</Text>
      </View>
    </View>
  );
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
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.back}>
        <Header />
        <Card>
          <SafeAreaView style={styles.container}>
            <FlatList
              data={Servises}
              renderItem={renderItem}
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
