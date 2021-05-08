import React from 'react';
import { images } from '../styles/global';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

// import MaterialIcons from 'react-native-vector-icons/FontAwesome';
export default function Header() {
  console.log("dimension", width, height)
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
    // flexDirection: 'column',
    width: width * 0.99,
    height: height * 0.3,
    // flex: 1,
    bottom: 0,
    alignItems: 'center',
    // alignContent: 'space-between',
    // alignSelf: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: "blue"
  },
  headerImage: {
    // width: 150,
    // height: 150,
    // marginBottom: 0,
    // backgroundColor: 'red',
    width: 0.38 * width,//120,//108//1
    height: 0.2591 * height,//169.86,//152.88//1.4155
    // marginHorizontal: 10,
    // marginTop: 100,
  },
});
