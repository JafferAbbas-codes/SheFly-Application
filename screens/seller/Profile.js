import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Header from '../../shared/ProfileHead';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {SearchBar} from 'react-native-elements';
import Card from '../../shared/Card';
import axios from 'axios';
import {connect} from 'react-redux';
import {URL, getAllServicesRoute} from '../../config/const';
import {TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const Profile = (props) => {
  // const [Services, setServices] = useState(props.user.services);
  // const [Samples, setSamples] = useState(props.user.samples);
  // console.log('services print', Services);
  // console.log('services print', Samples);
  console.log('props in profile', props);

  const renderItem = (item, i) => <Item item={item.item} i={i} />;
  // console.log('In render Item', i, item);
  const Item = ({item, i}) => (
    <ImageBackground
      source={{
        uri: i == 0 ? item.image : item,
      }}
      style={{
        flexDirection: 'column',
        borderRadius: 20,
        width: 100,
        margin: 8,
        backgroundColor: 'white',
        overflow: 'hidden',
      }}>
      <Text
        style={{
          fontSize: 15,
          height: 100,
          textAlign: 'center',
          color: 'white',
          textAlignVertical: 'center',
          fontWeight: 'bold',
        }}>
        {item.name}
      </Text>
    </ImageBackground>
  );

  return (
    <View style={styles.back}>
      {console.log('Inprofile', props)}
      <Header
        user={props.user}
        navigation={props.navigation}
        route={props.route}
      />
      <Card>
        <ScrollView>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flexDirection: 'column',
                borderRadius: 20,
                width: 100,
                margin: 8,
                padding: 15,
                backgroundColor: 'white',
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textAlignVertical: 'bottom',
                }}>
                12
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  textAlign: 'center',
                  textAlignVertical: 'top',
                }}>
                Jobs Done
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                borderRadius: 20,
                width: 100,
                margin: 8,
                padding: 15,
                backgroundColor: 'white',
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textAlignVertical: 'bottom',
                }}>
                3
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  textAlign: 'center',
                  textAlignVertical: 'top',
                }}>
                In Progress
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                borderRadius: 20,
                width: 100,
                margin: 8,
                padding: 15,
                backgroundColor: 'white',
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textAlignVertical: 'bottom',
                }}>
                3
              </Text>
              {/* {console.log('To test')} */}
              <Text
                style={{
                  fontSize: 13,
                  textAlign: 'center',
                  textAlignVertical: 'top',
                }}>
                Bids
              </Text>
            </View>
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 25, margin: 10}}>
            Expertise
          </Text>
          <View style={{flexDirection: 'row'}}>
            {/* <SafeAreaView style={styles.container}> */}
            <FlatList
              horizontal
              data={props.user.services}
              renderItem={(item) => renderItem(item, 0)}
              keyExtractor={(item) => item._id}
              style={{borderRadius: 20}}
            />
            {/* </SafeAreaView> */}
          </View>

          <Text style={{fontWeight: 'bold', fontSize: 25, margin: 10}}>
            Samples
          </Text>
          <View style={{flexDirection: 'row'}}>
            <FlatList
              horizontal
              data={props.user.samples}
              renderItem={(item) => renderItem(item, 1)}
              keyExtractor={(item) => item.index}
              style={{borderRadius: 20}}
            />
          </View>
        </ScrollView>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#B0389F',
  },
  container: {
    // borderRadius: 20,
    // marginVertical: 30,
  },
});

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(Profile);
