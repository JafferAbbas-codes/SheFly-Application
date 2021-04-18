import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {SearchBar} from 'react-native-elements';
import axios from 'axios';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native';

const Header2 = (props) => {
  console.log(props);
  // {navigation, title}
  // const openMenu=()=>{
  //     navigation.openDrawer();
  // }
  return (
    <View>
      <View
        style={{
          marginVertical: 20,
          paddingHorizontal: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <MaterialIcons
          name="bars"
          size={28}
          color={'white'}
          /*onPress={openMenu}*/ style={styles.icon}
        />
        {/* <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Profile', {
              ...props.route.params,
            });
          }}> */}
        <View style={{paddingTop: 20}}>
          <Image
            style={{
              width: 125,
              height: 165,

              // position: 'absolute',
              alignSelf: 'center',
            }}
            source={require('../assets/logo/shefly1.png')}
          />
        </View>
        <Image
          source={{
            uri: props.user.profileImage,
          }}
          // source={require('../assets/i.jpg')}
          style={styles.headerImage}
        />
        {/* </TouchableOpacity> */}
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
    // position: 'absolute',
    // left: 16,
    width: 50,
  },
  headerTitle: {
    flexDirection: 'row',
  },
  headerImage: {
    width: 50,
    height: 50,
    // right: 30,
    // alignSelf: 'flex-end',
    borderRadius: 20,
  },
});

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(Header2);
