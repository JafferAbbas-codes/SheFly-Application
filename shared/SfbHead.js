import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {SearchBar} from 'react-native-elements';
import FlatButton from './Button';
import {FlatList} from 'react-native';
import {TouchableHighlight} from 'react-native';
import {TouchableOpacity} from 'react-native';

export default function Header(propss) {
  const props = propss.profile.route.params.index;
  console.log('Props in SFB hedaers', props);
  return (
    <View style={{margin: 25, paddingTop: 20}}>
      <MaterialIcons></MaterialIcons>
      <View style={{flexDirection: 'row'}}>
        <Image source={{uri: props.profileImage}} style={styles.headerImage} />
        <View style={{margin: 5}}>
          <Text
            style={{
              fontSize: 24,
              color: 'white',
              fontWeight: 'bold',
              paddingTop: 20,
            }}>
            {props.name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 12, color: 'white'}}>{props.title}</Text>
            <Text style={{fontSize: 12, color: 'white', paddingLeft: 10}}>
              <MaterialIcons
                name="star"
                size={12}
                /*onPress={openMenu}*/ style={styles.icon}
              />
              {' ' + parseFloat(props.rating).toFixed(1)}
            </Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          fontSize: 15,
          textAlignVertical: 'center',
          margin: 10,
          color: 'white',
        }}>
        {props.bio}
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity>
          <Text
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              color: 'black',
              paddingVertical: 15,
              paddingHorizontal: 60,
              margin: 5,
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            Offer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              // backgroundColor: 'white',
              borderRadius: 10,
              color: 'white',
              paddingVertical: 13,
              paddingHorizontal: 60,
              margin: 5,
              fontSize: 14,
              borderWidth: 2,
              borderColor: 'white',
              fontWeight: 'bold',
            }}>
            Message
          </Text>
        </TouchableOpacity>
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
    width: 80,
    height: 80,
    // alignSelf: 'flex-end',
    borderRadius: 15,
    margin: 10,
    borderWidth: 1.6,
    borderColor: 'white',
  },
});
