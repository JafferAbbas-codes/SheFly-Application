import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Drawer, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {logout} from '../../redux/authActions';
import {connect} from 'react-redux';

const DrawerContent = (props) => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 70}}>
              <Avatar.Image
                source={require('../../assets/girl.jpg')}
                size={100}
                borderColor="purple"
              />
            </View>
          </View>
          <View>
            <Text style={styles.admin}>Admin</Text>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              style={styles.drawerItem}
              icon={() => <Icon name="user-alt" color="black" size={20} />}
              label="BUYERS"
              onPress={() => {
                props.navigation.navigate('users');
              }}
            />
            <DrawerItem
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Icon name="shopping-cart" color="black" size={18} />
              )}
              label="BOOKINGS"
              onPress={() => {
                props.navigation.navigate('Booking');
              }}
            />
            <DrawerItem
              style={styles.drawerItem}
              style={{paddingLeft: 10}}
              icon={({color, size}) => (
                <MaterialIcons name="size-s" color="black" size={24} />
              )}
              label="SELLERS"
              onPress={() => {
                props.navigation.navigate('users');
              }}
            />

            <DrawerItem
              style={styles.drawerItem}
              icon={({color, size}) => (
                <Fontisto name="plus-a" color="black" size={20} />
              )}
              label="ADD A SERVICE"
              onPress={() => {
                props.navigation.navigate('HomeScreen');
              }}
            />
          </Drawer.Section>
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
    marginTop: 70,
  },
  drawerItem: {
    paddingStart: 15,
    paddingBottom: 0,
    marginBottom: 0,
  },
  drawerContent: {
    flex: 1,
    fontWeight: '700',
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
