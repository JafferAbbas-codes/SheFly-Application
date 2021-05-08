import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Drawer, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {logout} from '../../redux/authActions';
import {connect} from 'react-redux';

const DrawerContent = (props) => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View>
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
              <Text style={styles.admin}>{props.user.name}</Text>
            </View>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                style={styles.drawerItem}
                icon={({color, size}) => (
                  <MaterialCommunityIcons name="home" color={color} size={35} />
                )}
                label="Home"
                labelStyle={{fontSize: 17, fontWeight: 'bold'}}
                onPress={() => {
                  props.navigation.navigate('HomeScreen');
                }}
              />
              <DrawerItem
                style={styles.drawerItem}
                labelStyle={{fontSize: 17, fontWeight: 'bold'}}
                icon={({color, size}) => (
                  <Icon name="shopping-cart" color={color} size={24} />
                )}
                label="  Bookings"
                onPress={() => {
                  props.navigation.navigate('Booking');
                }}
              />
              <DrawerItem
                style={styles.drawerItem}
                labelStyle={{fontSize: 17, fontWeight: 'bold'}}
                // style={{paddingLeft: 10}}
                icon={({color, size}) => (
                  <MaterialCommunityIcons
                    name="emoticon-sad"
                    color={color}
                    size={27}
                  />
                )}
                label=" Complains"
                onPress={() => {
                  props.navigation.navigate('Complains');
                }}
              />

              <DrawerItem
                style={styles.drawerItem}
                labelStyle={{fontSize: 17, fontWeight: 'bold'}}
                icon={({color, size}) => (
                  <FontAwesome5Icon name="users" color={color} size={24} />
                )}
                label=" Users"
                onPress={() => {
                  props.navigation.navigate('users');
                }}
              />
            </Drawer.Section>
          </View>
          <Drawer.Section style={styles.logout}>
            <DrawerItem
              icon={() => (
                <MaterialCommunityIcons
                  name="exit-to-app"
                  color="black"
                  size={22}
                />
              )}
              label="Log Out"
              onPress={props.logout}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      {/* <Drawer.Section style={styles.bottomDrawerSection}>
        <View>
          <Text style={styles.terms}>Terms and conditions</Text>
        </View>
      </Drawer.Section> */}
    </View>
  );
};

const styles = StyleSheet.create({
  logout: {
    marginTop: 100,
    // justifyContent:'flex-end'
  },
  drawerItem: {
    paddingStart: 15,
    paddingBottom: 0,
    marginBottom: 0,
  },
  drawerContent: {
    flex: 1,
    fontWeight: '700',
    // justifyContent: 'space-between',
    // flexDirection: 'column',
  },
  userInfoSection: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
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

  terms: {
    textAlign: 'center',
  },
  admin: {
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
