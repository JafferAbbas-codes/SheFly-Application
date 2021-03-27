import React from 'react';
import {images} from '../styles/global';
import {StyleSheet, View, Text, Image} from 'react-native';

// import MaterialIcons from 'react-native-vector-icons/FontAwesome';
export default function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/shefly.png')}
        style={styles.headerImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'space-between',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontSize: 18,
    color: 'white',
    letterSpacing: 1,
    marginBottom: 80,
  },
  icon: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    flexDirection: 'row',
  },
  headerImage: {
    width: 120,
    height: 120,
    marginHorizontal: 10,
    marginTop: 100,
  },
});
