import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {SearchBar} from 'react-native-elements';

export default function Header() {
  // {navigation, title}
  // const openMenu=()=>{
  //     navigation.openDrawer();
  // }
  const [search, updateSearch] = useState('');
  return (
    <View>
      <View style={{marginVertical: 20}}>
        <MaterialIcons
          name="bars"
          size={28}
          /*onPress={openMenu}*/ style={styles.icon}
        />
        <Image source={require('../assets/i.jpg')} style={styles.headerImage} />
      </View>
      <SearchBar
        placeholder="Search for job"
        onChangeText={updateSearch}
        value={search}
        containerStyle={{
          backgroundColor: '#BC53AE',
          borderColor: '#BC53AE',
          borderRadius: 20,
          marginHorizontal: 20,
          marginVertical: 20,
          paddingVertical: 3,
          borderTopColor: '#BC53AE',
          borderBottomColor: '#BC53AE',
        }}
        inputContainerStyle={{backgroundColor: '#BC53AE'}}
        leftIconContainerStyle={{backgroundColor: '#BC53AE'}}
        rightIconContainerStyle={{backgroundColor: '#BC53AE'}}
      />
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
    left: 16,
  },
  headerTitle: {
    flexDirection: 'row',
  },
  headerImage: {
    width: 30,
    height: 30,
    right: 16,
    alignSelf: 'flex-end',
    borderRadius: 10,
  },
});
