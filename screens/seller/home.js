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

import {logout} from '../../redux/authActions';
import {connect} from 'react-redux';

const Home = (props) => {
  // const [value, onChangeText] = React.useState('42|');
  const [Servises, setServises] = useState([
    {text: 'Cooking', key: '1'},
    {text: 'Makeup', key: '2'},
    {text: 'Nursing', key: '3'},
  ]);
  const renderItem = ({item}) => <Item text={item.text} />;
  const Item = ({text}) => (
    <ImageBackground
      source={require('../../assets/i.jpg')}
      style={{
        width: 120,
        height: 120,
        borderRadius: 20,
        marginHorizontal: 5,
        overflow: 'hidden',
      }}>
      <Text
        style={{
          fontSize: 25,
          color: 'white',
          fontWeight: 'bold',
          width: 120,
          textAlign: 'center',
          textAlignVertical: 'center',
          height: 120,
        }}>
        {text}
      </Text>
    </ImageBackground>
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
        borderRadius: 25,
        backgroundColor: 'white',
        marginHorizontal: 5,
      }}>
      {console.log('To test')}
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
            <TouchableWithoutFeedback onPress={props.logout}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 25,
                  marginBottom: 15,
                  width: 200,
                }}>
                Popular Services
              </Text>
            </TouchableWithoutFeedback>

            <Text style={{textAlignVertical: 'center', marginLeft: 90}}>
              see all
            </Text>
          </View>
          <SafeAreaView style={styles.container}>
            <FlatList
              horizontal
              data={Servises}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
              style={{borderRadius: 20}}
            />
          </SafeAreaView>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 25,
                marginBottom: 15,
                width: 200,
              }}>
              Recommendation For You
            </Text>
            <Text style={{textAlignVertical: 'center', marginLeft: 90}}>
              see all
            </Text>
          </View>
          <SafeAreaView style={styles.container}>
            <FlatList
              horizontal
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

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
});
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
