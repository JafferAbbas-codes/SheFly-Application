import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {SearchBar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';

const Header = (props) => {
  // {navigation, title}
  // const openMenu=()=>{
  //     navigation.openDrawer();
  // }

  {
    console.log('profile header props', props);
  }

  const OnPressEdit = () => {
    console.log('in on Press Edit');
    props.navigation.navigate('EditProfile', {
      ...props.route.params,
    });
  };

  return (
    <View style={{alignSelf: 'center', margin: 40}}>
      {console.log('In header', props)}
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{
            uri: props.user.profileImage,
          }}
          style={styles.headerImage}
        />
        <View style={{margin: 5}}>
          <Text
            style={{fontSize: 14, color: 'white', marginTop: 2, marginLeft: 2}}>
            Hello,
          </Text>
          <Text
            style={{
              fontSize: 24,
              color: 'white',
              fontWeight: 'bold',
              // margin: 2,
            }}>
            {props.user.name}
          </Text>

          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 12, color: 'white'}}>{props.title}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 10, color: '#FFFFFF'}}>
                <MaterialIcons name="star" size={10} />
                {' ' + props.user.rating.toFixed(1)}
              </Text>
              <Text style={{fontSize: 10, color: '#FFFFFF'}}>
                {' (' + props.user.ratingCount + ') '}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Text
        style={{
          fontSize: 16,
          textAlignVertical: 'center',
          marginTop: 10,
          color: 'white',
        }}>
        {props.user.bio}
      </Text>
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
    alignItems: 'flex-end',
    // left:16,
    width: 100,
    textAlign: 'right',
    textAlignVertical: 'center',
    // fontWeight: 'bold',
    marginTop: 15,
  },
  headerTitle: {
    flexDirection: 'row',
  },
  headerImage: {
    width: 80,
    height: 80,
    alignSelf: 'flex-end',
    borderRadius: 15,
    margin: 10,
    borderWidth: 3,
    borderColor: 'white',
  },
});

export default Header;
