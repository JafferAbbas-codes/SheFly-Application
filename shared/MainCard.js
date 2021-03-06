import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dimensions} from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function MainCard(props) {
  return (
    <View
      style={
        props.cardWithOutStepper
          ? styles.cardWithOutStepper
          : props.requests
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
    padding: 30,
    width: width, //120,//108//1
    height: height - 200,
    // height: height,
    // flex: 2,
    // flexDirection: 'col',
    // bottom: 0,
    // alignItems: 'center',
    // alignContent: 'space-between',
    // alignSelf: 'center',
    // justifyContent: 'flex-end',
    // backgroundColor: "blue"
  },
  cardWithOutStepper: {
    paddingTop: 50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#F4F9FE',
    shadowColor: '#333',
    padding: 30,
    // flex: 1,
    width: width, //120,//108//1
    // height: 0.7 * height,
    bottom: 0,
    // alignItems: 'center',
    // alignContent: 'space-between',
    // alignSelf: 'center',
    // justifyContent: 'flex-end',
    // backgroundColor: "blue"
  },

  card2: {
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
    // paddingVertical: 30,
    // width: width, //120,//108//1
    height: height - 160,
    bottom: 0,
  },
});
