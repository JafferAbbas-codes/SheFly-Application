import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {SearchBar} from 'react-native-elements';

const Header = (props) => {
  {
    console.log('profile header props', props);
  }
  return (
    <View style={{marginVertical: 40, marginHorizontal: 20}}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{
            uri: props.user.profileImage,
          }}
          style={styles.headerImage}
        />
        <View style={{paddingHorizontal: 5}}>
          <Text style={{fontSize: 15, color: 'white', marginTop: 20}}>
            Hello,
          </Text>
          <Text
            style={{
              fontSize: 25,
              color: 'white',
              fontWeight: 'bold',
              // margin: 2,
            }}>
            {props.user.name}
          </Text>

          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 15, color: 'white', marginTop: 10}}>
              <MaterialIcons
                name="star"
                size={10}
                /*onPress={openMenu}*/ style={styles.icon}
              />
              {' ' + parseFloat(props.user.rating).toFixed(1)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
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
    // alignSelf: 'flex-end'
    borderRadius: 15,
    margin: 10,
    borderWidth: 3,
    borderColor: 'white',
  },
});

export default Header;
