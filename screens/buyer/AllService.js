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
  RefreshControl,
} from 'react-native';
import Header from '../../shared/Header2';
import Card from '../../shared/AppStackCard';
import FlatButton from '../../shared/Button.js';
import {gStyles} from '../../styles/global';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {connect} from 'react-redux';
import {URL, getAllServicesRoute} from '../../config/const';
import {TouchableOpacity} from 'react-native';

const AllServices = (props) => {
  const [Services, setServices] = useState([]);
  const renderItem = (item) => <Item item={item.item} />;
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Refresh();
    }, 2000);
  };

  const Refresh = () => {
    getAllServices();
  };

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
          width: 159,
          height: 159,
          borderRadius: 32,
          marginHorizontal: 5,
          overflow: 'hidden',
          // backgroundColor: 'black',
          // opacity: 0.9,
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontSize: 25,
            color: 'white',
            fontWeight: 'bold',
            width: 160,
            textAlign: 'center',
            textAlignVertical: 'center',
            height: 160,
          }}>
          {item.name}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  const ServiceList = () => {
    console.log('here in servicelist');
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#F4F9FE']}
              progressBackgroundColor={'#B0389F'}
            />
          }
          numColumns={2}
          data={Services}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </SafeAreaView>
    );
  };

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
  }, [props]);

  return (
    <View
      onPress={() => {
        Keyboard.dismiss();
      }}
      style={styles.back}>
      {/* <View > */}
      {console.log('services', Services)}
      <Header />
      <Card>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
          }}>
          Services
        </Text>

        <ServiceList />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#B0389F',
  },
  container: {
    flex: 1,
    marginTop: 25,
    paddingBottom: 170,
  },
});
const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(AllServices);
