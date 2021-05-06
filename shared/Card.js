import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
// import {Dimensions} from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function Card(props) {
  return (
    <View
      style={
        props.cardWithOutStepper ? styles.cardWithOutStepper : styles.card
      }>
      <View style={styles.cardContent}>{props.children}</View>
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
    // width: width, //120,//108//1
    height: height,
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
    paddingTop: 50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#F4F9FE',
    shadowColor: '#333',
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
  cardContent: {
    // marginHorizontal: 30,
    // marginBottom: 95,
    // marginVertical: 30,
    // textAlignVertical: 'top',
    // backgroundColor: 'blue'
    // flexDirection: 'column',
    // flex: 3,
  },
});
