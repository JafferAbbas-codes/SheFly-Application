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
  TouchableOpacity,
} from 'react-native';
import Header from '../../shared/Header2';
import Card from '../../shared/Card';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {connect} from 'react-redux';
import {URL, getUserByType} from '../../config/const';

const AvailableSellers = (props) => {
  const [Sellers, setSellers] = useState([]);
  const renderAvailableSellers = (item) => <ItemRecom item={item.item} />;
  const ItemRecom = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        OnPressSeller(item);
      }}>
      {console.log('item', item)}
      <View
        style={{
          // width: 300,
          borderRadius: 16,
          backgroundColor: 'white',
          paddingHorizontal: 8,
          marginBottom: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{uri: item.profileImage}}
              style={styles.headerImage}
            />
            <View style={{paddingHorizontal: 7, paddingTop: 6}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 6}}>
                {item.name}
              </Text>
              <Text
                style={{fontSize: 10, color: '#A28FA1', fontWeight: 'bold'}}>
                {item.title}
              </Text>
              <Text style={{fontSize: 10, color: '#FFB266'}}>
                <MaterialIcons name="star" size={10} />
                {' ' + item.rating.toFixed(1)}
              </Text>
            </View>
          </View>
          <View>
            <MaterialCommunityIcons
              name="message-text"
              size={19}
              style={{
                backgroundColor: '#C543B3',
                borderRadius: 12,
                color: 'white',
                marginVertical: 10,
                paddingHorizontal: 8,
                paddingVertical: 5,
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
            // width: 200,
          }}
          numberOfLines={2}>
          {item.bio}
        </Text>
      </View>
    </TouchableOpacity>
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

  const OnPressSeller = (index) => {
    props.navigation.navigate('SellerProfileForBuyer', {
      ...props.route.params,
      index,
    });
  };

  useEffect(() => {
    getAllSellers();
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ScrollView>
        <View style={styles.back}>
          <Header />
          <Card>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 25,
                }}>
                Available Sellers
              </Text>
            </View>
            <SafeAreaView style={styles.container}>
              <FlatList
                data={Sellers}
                renderItem={renderAvailableSellers}
                keyExtractor={(item) => item._id}
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
    width: 56,
    height: 56,
    marginVertical: 10,
    borderRadius: 50,
  },
  container: {
    borderRadius: 20,
    marginVertical: 30,
  },
});
const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(AvailableSellers);
