import React, {useEffect, useState} from 'react';
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
import axios from 'axios';
import {connect} from 'react-redux';
import {URL, getSellersByService} from '../../config/const';

const ServiceSeller = (props) => {
  const [sellerByService, setsellerByService] = useState([
    // {
    //     name: 'Mashama Hafeez',
    //     rating: '5.0',
    //     service: 'Make up Artist',
    //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor consectetur adipiscing. Sed id placerat odio.',
    //     text: 'Makeup',
    //     key: '1',
    // },
    // {
    //     name: 'Mashama Hafeez',
    //     rating: '5.0',
    //     service: 'Make up Artist',
    //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id placerat odio. ',
    //     text: 'Makeup',
    //     key: '2',
    // },
    // {
    //     name: 'Mashama Hafeez',
    //     rating: '5.0',
    //     service: 'Make up Artist',
    //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id placerat odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id placerat odio. ',
    //     text: 'Makeup',
    //     key: '4',
    // },
    // {
    //     name: 'Mashama Hafeez',
    //     rating: '5.0',
    //     service: 'Make up Artist',
    //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id placerat odio.  ',
    //     text: 'Makeup',
    //     key: '5',
    // },
  ]);

  const getAllSellersByService = async (id) => {
    // return {};
    console.log('In getAllSellersByService ' + id);
    try {
      // console.log('In try ', id);
      // console.log('get parameter', URL);
      let response = await axios.get(`${URL}${getSellersByService}${id}`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      console.log('response', response);
      setsellerByService(response.data.result);
      return response.data.result;
    } catch (error) {
      if (error?.response?.data?.result) {
        console.log('error123 signin : ', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };

  const renderRecommendation = ({item}) => (
    <ItemRecom
      name={item.name}
      bio={item.bio}
      rating={item.rating}
      title={item.title}
      profileImage={item.profileImage}
    />
  );
  const ItemRecom = ({name, bio, rating, title, profileImage, key}) => (
    <View
      style={{
        // height: 150,
        // width: 300,
        borderRadius: 15,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 5,
        margin: 5,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../../assets/i.jpg')}
          style={styles.headerImage}
        />
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 6}}>
            {name}
          </Text>
          <Text style={{fontSize: 10, color: '#C0C0C0', fontWeight: 'bold'}}>
            {title}
          </Text>
          <Text style={{fontSize: 10, color: '#FFB266'}}>
            <MaterialIcons
              name="star"
              size={10}
              /*onPress={openMenu}*/ style={styles.icon}
            />
            {' ' + rating}
          </Text>
        </View>
        <View>
          <MaterialIcons
            name="comment"
            size={22}
            style={styles.icon}
            style={{
              margin: 22,
              paddingLeft: 5,
              paddingRight: 5,
              paddingBottom: 4,
              paddingTop: 1,
              backgroundColor: '#BC53AE',
              color: 'white',
              borderRadius: 8,
            }}
          />
        </View>
      </View>
      <Text
        style={{
          fontSize: 15,
          textAlignVertical: 'center',
          margin: 10,
          marginTop: 0,
        }}>
        {bio}
      </Text>
    </View>
  );

  useEffect(() => {
    getAllSellersByService(props.route.params.id);
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ScrollView>
        {/* {console.log('Props in Service Seller', props)} */}
        <View style={styles.back}>
          <Header />
          <Card>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 25,
                  // marginBottom: 10,
                  // width: 200,
                }}>
                Available sellers for {props.route.params.name}
              </Text>
            </View>
            <SafeAreaView style={styles.container}>
              <FlatList
                data={sellerByService}
                renderItem={renderRecommendation}
                keyExtractor={(item) => item.key}
                style={{borderRadius: 20}}
              />
            </SafeAreaView>
          </Card>
        </View>
      </ScrollView>
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
  title: {
    fontSize: 32,
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

export default connect(mapStateToProps)(ServiceSeller);
