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
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {connect} from 'react-redux';
import {URL, getUserByType} from '../../config/const';

const AvailableSellers = (props) => {
  const [Sellers, setSellers] = useState([]);
  const renderAvailableSellers = (item) => <ItemRecom item={item.item} />;
  const ItemRecom = ({item}) => (
    <View
      style={{
        height: 150,
        borderRadius: 25,
        backgroundColor: 'white',
        marginHorizontal: 5,
        marginBottom: 10,
      }}>
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
            <MaterialIcons name="star" size={10} style={styles.icon} />
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
      setSellers(seller);
      return response.data.result;
    } catch (error) {
      if (error?.response?.data?.result) {
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
    getAllSellers();
  }, []);

  return (
    <View
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
              Available Sellers
            </Text>
          </View>
          <View style={styles.container}>
            <FlatList
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
