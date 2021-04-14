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
} from 'react-native';
import Header from '../../shared/Header2';
import Card from '../../shared/Card';
import FlatButton from '../../shared/Button.js';
import {gStyles} from '../../styles/global';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {connect} from 'react-redux';
import {URL, getAllServicesRoute, getUserByType} from '../../config/const';
import {TouchableOpacity} from 'react-native';
import {TouchableHighlight} from 'react-native';

const AvailableSellers = (props) => {
  // const [value, onChangeText] = React.useState('42|');
  const [Sellers, setSellers] = useState([
    // { text: 'Cooking', key: '1' },
    // { text: 'Makeup', key: '2' },
    // { text: 'Sewing', key: '3' },
    // { text: 'Henna Arts', key: '4' },
    // { text: 'Nursing', key: '5' },
    // { text: 'Teaching', key: '6' },
  ]);
  //   const renderItem = (item) => <Item item={item.item} />;

  //   const Item = ({item}) => (
  //     <TouchableOpacity
  //       onPress={
  //         () => {
  //           OnPressService(item._id, item.name);
  //         }
  //         // console.log('on click', item._id),
  //       }>
  //       <ImageBackground
  //         //   source={require('../../assets/i.jpg')}
  //         source={{
  //           uri: item.image,
  //         }}
  //         style={{
  //           height: 120,
  //           borderRadius: 20,
  //           margin: 10,
  //           flex: 1,
  //           overflow: 'hidden',
  //         }}>
  //         {console.log('item in Item', item)}
  //         <Text
  //           style={{
  //             fontSize: 25,
  //             color: 'white',
  //             fontWeight: 'bold',
  //             width: 120,
  //             textAlign: 'center',
  //             textAlignVertical: 'center',
  //             height: 120,
  //           }}>
  //           {item.name}
  //         </Text>
  //       </ImageBackground>
  //     </TouchableOpacity>
  //   );
  const renderAvailableSellers = (item) => (
    // console.log('item in ItemRecom seller', item);
    <ItemRecom item={item.item} />
  );
  const ItemRecom = ({item}) => (
    <View
      style={{
        height: 150,
        // width: 300,
        borderRadius: 25,
        backgroundColor: 'white',
        marginHorizontal: 5,
        marginBottom: 10,
      }}>
      {/* {console.log('To test')} */}
      <View style={{height: 75, width: 300, flexDirection: 'row'}}>
        <Image source={{uri: item.profileImage}} style={styles.headerImage} />
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 6}}>
            {item.name}
          </Text>
          <Text style={{fontSize: 10, color: '#C0C0C0', fontWeight: 'bold'}}>
            {item.title}
          </Text>
          <Text style={{fontSize: 10, color: '#FFB266'}}>
            <MaterialIcons
              name="star"
              size={10}
              /*onPress={openMenu}*/ style={styles.icon}
            />
            {' ' + item.rating}
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
        {item.bio}
      </Text>
    </View>
  );

  const getAllSellers = async () => {
    try {
      let response = await axios.get(`${URL}${getUserByType}seller`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      let seller = response.data.result;
      console.log('response of users', seller);
      setSellers(seller);
      return response.data.result;
    } catch (error) {
      if (error?.response?.data?.result) {
        console.log('error123 signin : ', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };

  const OnPressService = (id, name) => {
    props.navigation.navigate('ServiceSeller', {
      ...props.route.params,
      id,
      name,
    });
  };

  useEffect(() => {
    // getAllServices();
    getAllSellers();
  }, []);

  return (
    <View
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.back}>
        {console.log('in return', Sellers)}
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
              Available Sellers
            </Text>
          </View>
          <View style={styles.container}>
            <FlatList
              //   horizontal
              data={Sellers}
              renderItem={renderAvailableSellers}
              keyExtractor={(item) => item._id}
              style={{borderRadius: 20}}
            />
          </View>
        </Card>
      </View>
    </View>
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
    // marginBottom: 30,
    // paddingBottom: 10,
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
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(AvailableSellers);
