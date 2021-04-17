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
import {URL, getAllServicesRoute} from '../../config/const';
import {TouchableOpacity} from 'react-native';

const AllServices = (props) => {
  // const [value, onChangeText] = React.useState('42|');
  const [Services, setServices] = useState([
    // { text: 'Cooking', key: '1' },
    // { text: 'Makeup', key: '2' },
    // { text: 'Sewing', key: '3' },
    // { text: 'Henna Arts', key: '4' },
    // { text: 'Nursing', key: '5' },
    // { text: 'Teaching', key: '6' },
  ]);
  const renderItem = (item) => <Item item={item.item} />;

  const Item = ({item}) => (
    <TouchableOpacity
      onPress={
        () => {
          OnPressService(item._id, item.name);
        }
        // console.log('on click', item._id),
      }>
      {/* {console.log('To test')} */}
      <ImageBackground
        //   source={require('../../assets/i.jpg')}
        source={{
          uri: item.image,
        }}
        style={{
          height: 120,
          borderRadius: 20,
          margin: 10,
          flex: 1,
          overflow: 'hidden',
        }}>
        {console.log('item in Item', item)}
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
          {item.name}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  const OnPressService = (id, name) => {
    props.navigation.navigate('ServiceSeller', {
      ...props.route.params,
      id,
      name,
    });
  };

  const getAllServices = async () => {
    console.log('props in AllServices', props);
    setServices(props.route.params.services);
  };

  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <View
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.back}>
        {console.log('in return', Services)}
        <Header />
        <Card>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 25,
                // marginBottom: 15,
                // width: 200,
              }}>
              Services
            </Text>
          </View>
          <SafeAreaView style={styles.container}>
            <FlatList
              numColumns={2}
              data={Services}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              style={{borderRadius: 20}}
            />
          </SafeAreaView>
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
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(AllServices);
