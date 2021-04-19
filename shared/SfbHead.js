import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {SearchBar} from 'react-native-elements';
import FlatButton from './Button';
import {FlatList} from 'react-native';

export default function Header() {
  // {navigation, title}
  // const openMenu=()=>{
  //     navigation.openDrawer();
  // }
  const [search, updateSearch] = useState('');
  return (
    <View style={{margin: 40}}>
      <View style={{flexDirection: 'row'}}>
        <Image source={require('../assets/i.jpg')} style={styles.headerImage} />
        <View style={{margin: 5}}>
          <Text
            style={{
              fontSize: 25,
              color: 'white',
              fontWeight: 'bold',
              margin: 2,
            }}>
            Ibrahim
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 15, color: 'white', margin: 2}}>
              Make Up Artist
            </Text>
            <Text style={{fontSize: 15, color: 'white', margin: 2}}>
              <MaterialIcons
                name="star"
                size={15}
                /*onPress={openMenu}*/ style={styles.icon}
              />
              5.0
            </Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          fontSize: 20,
          textAlignVertical: 'center',
          margin: 10,
          color: 'white',
        }}>
        I am a professional
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            color: 'black',
            paddingVertical: 15,
            paddingHorizontal: 60,
            margin: 5,
          }}>
          Offer
        </Text>
        <Text
          style={{
            backgroundColor: '#B0389F',
            borderRadius: 10,
            borderColor: 'white',
            borderWidth: 1,
            color: 'white',
            paddingVertical: 15,
            paddingHorizontal: 50,
          }}>
          Message
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-between',
  },
  HeaderText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
  },
  icon: {
    position: 'absolute',
    color: 'white',
    // left:16,
    width: 130,
    textAlign: 'right',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
  headerTitle: {
    flexDirection: 'row',
  },
  headerImage: {
    width: 100,
    height: 100,
    alignSelf: 'flex-end',
    borderRadius: 15,
    margin: 10,
    borderWidth: 3,
    borderColor: 'white',
  },
});
