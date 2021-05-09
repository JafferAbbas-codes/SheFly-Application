import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  Switch,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {logout} from '../../redux/authActions';
import {connect} from 'react-redux';

const DrawerContent = (props) => {
  return (
    <View style={{flex: 1}}>
      {/* {console.log('Props in drawer', props)} */}
      <DrawerContentScrollView {...props}>
        {/* {console.log('Props in drawer2', props)} */}
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 70}}>
              <Image
                source={{uri: props.user.profileImage}}
                style={{
                  width: 130,
                  height: 130,
                  borderColor: '#AB369B',
                  borderRadius: 58,
                  borderWidth: 5,
                  marginBottom: 10,
                }}
              />
            </View>
          </View>
          <View>
            <Text style={styles.buyer}>{props.user.name}</Text>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color}) => (
                <MaterialCommunityIcons name="home" color={color} size={35} />
              )}
              label="Home"
              labelStyle={{fontSize: 17, fontWeight: 'bold'}}
              onPress={() =>
                props.navigation.navigate('Home', {
                  // ...props.route.params,
                })
              }
            />

            <DrawerItem
              icon={({color}) => (
                <MaterialCommunityIcons
                  name="message-text"
                  color={color}
                  size={31}
                />
              )}
              label="Inbox"
              labelStyle={{fontSize: 17, fontWeight: 'bold'}}
              onPress={() =>
                props.navigation.navigate('Chats', {
                  // ...props.route.params,
                })
              }
            />
            <DrawerItem
              icon={({color}) => (
                <MaterialCommunityIcons
                  name="briefcase-variant"
                  color={color}
                  size={31}
                />
              )}
              label="Available Jobs"
              labelStyle={{fontSize: 17, fontWeight: 'bold'}}
              onPress={() =>
                props.navigation.navigate('AvailableJobs', {
                  // ...props.route.params,
                })
              }
            />
            <DrawerItem
              icon={({color}) => (
                <MaterialCommunityIcons name="bell" color={color} size={32} />
              )}
              label="Job Offers"
              labelStyle={{fontSize: 17, fontWeight: 'bold'}}
              onPress={() =>
                props.navigation.navigate('SellerOffers', {
                  // ...props.route.params,
                })
              }
            />
            <DrawerItem
              icon={({color}) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={33}
                />
              )}
              label="Profile"
              labelStyle={{fontSize: 17, fontWeight: 'bold'}}
              onPress={() =>
                props.navigation.navigate('Profile', {
                  // ...props.route.params,
                })
              }
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.logout}>
        <DrawerItem
          icon={() => (
            <MaterialCommunityIcons
              name="exit-to-app"
              color="black"
              size={25}
            />
          )}
          label="Log Out"
          onPress={props.logout}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    fontWeight: '700',
  },
  userInfoSection: {
    alignItems: 'center',
  },
  logout: {
    marginTop: 100,
    // justifyContent:'flex-end'
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    // lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 5,
    fontWeight: 'bold',
    paddingLeft: 15,
  },
  bottomDrawerSection: {
    borderWidth: 0,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buyer: {
    textAlign: 'center',
    paddingTop: 15,
    fontSize: 25,
    fontWeight: '700',
    paddingBottom: 40,
  },
});

const mapStateToProps = (state) => ({
  reduxstate: state,
  user: state.userDetails.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
