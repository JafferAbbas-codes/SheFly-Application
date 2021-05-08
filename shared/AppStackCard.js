import React from 'react';
import {StyleSheet, ScrollView, View, Text, Dimensions} from 'react-native';
// import {Dimensions} from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function Card(props) {
  return (
    <View
      style={
        props.cardWithOutStepper
          ? styles.cardWithOutStepper
          : props.availableSeller
          ? styles.card2
          : styles.card
      }>
      {props.children}
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    paddingTop: 50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#F4F9FE',
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 19,
    padding: 30,
    // width: width, //120,//108//1
    height: height - 100,
    bottom: 0,
    // flexDirection: 'column',
    // flex: 3,
    // alignItems: 'center',
    // alignContent: 'space-between',
    // alignSelf: 'center',
    // justifyContent: 'flex-end',
    // backgroundColor: "blue"
  },
  cardWithOutStepper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    paddingTop: 50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#F4F9FE',
    padding: 30,
    // width: width, //120,//108//1
    height: height,
    bottom: 0,
    // alignItems: 'center',
    // alignContent: 'space-between',
    // alignSelf: 'center',
    // justifyContent: 'flex-end',
    // backgroundColor: "blue"
  },

  card2: {
    paddingTop: 50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#F4F9FE',
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 19,
    paddingVertical: 30,
    // width: width, //120,//108//1
    height: height - 180,
    bottom: 0,
  },
});
