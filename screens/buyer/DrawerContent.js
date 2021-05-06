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
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
                paddingTop: 40,
                justifyContent: 'center',
              }}>
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={{uri: props.user.profileImage}}
                  style={{
                    width: 100,
                    height: 100,
                    borderColor: '#AB369B',
                    borderRadius: 30,
                    borderWidth: 5,
                    marginBottom: 20,
                  }}
                />
                <Title style={styles.title}>
                  {props.user.name ? props.user.name : 'User'}
                </Title>
                <Caption style={styles.caption}>{props.user.email}</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={() => (
                <MaterialCommunityIcons name="home" color="black" size={25} />
              )}
              label="Home"
              onPress={() =>
                props.navigation.navigate('Home', {
                  // ...props.route.params,
                })
              }
            />

            <DrawerItem
              icon={() => (
                <MaterialCommunityIcons
                  name="message-text"
                  color="black"
                  size={25}
                />
              )}
              label="Inbox"
              onPress={() =>
                props.navigation.navigate('ChatStackScreen', {
                  // ...props.route.params,
                })
              }
            />
            <DrawerItem
              icon={() => (
                <MaterialCommunityIcons
                  name="clipboard-list"
                  color="black"
                  size={25}
                />
              )}
              label="My Requests"
              onPress={() =>
                props.navigation.navigate('YourRequestsStackScreen', {
                  // ...props.route.params,
                })
              }
            />
            <DrawerItem
              icon={() => (
                <MaterialCommunityIcons
                  name="account"
                  color="black"
                  size={25}
                />
              )}
              label="Profile"
              onPress={() =>
                props.navigation.navigate('ProfileStackScreen', {
                  // ...props.route.params,
                })
              }
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
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
    paddingTop: 30,
  },
  userInfoSection: {
    // paddingLeft: 20,
  },
  title: {
    fontSize: 25,
    marginTop: 3,
    fontWeight: 'bold',
    // justifyContent: 'flex-start',
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
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 45,
    paddingHorizontal: 20,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    paddingHorizontal: 20,
    // borderTopColor: '#f4f4f4',
    // borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
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
