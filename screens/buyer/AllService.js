import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Keyboard,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Header from '../../shared/Header2';
import Card from '../../shared/Card';
import axios from 'axios';
import {connect} from 'react-redux';
import {URL, getAllServicesRoute} from '../../config/const';
import {TouchableOpacity} from 'react-native';

const AllServices = (props) => {
  const [Services, setServices] = useState([]);
  const renderItem = (item) => <Item item={item.item} />;

  const Item = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        OnPressService(item._id, item.name);
      }}>
      <ImageBackground
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
    try {
      let response = await axios.get(`${URL}${getAllServicesRoute}`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      setServices(response.data.result);
      return response.data.result;
    } catch (error) {
      if (error?.response?.data?.result) {
        return {error: error.response.data.result};
      }
    }
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
        <Header />
        <Card>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 25,
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
