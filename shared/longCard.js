import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function LongCard(props) {
  return (
    <View style={styles.card}>
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
    width: width,//120,//108//1
    // height: 0.6 * height,
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
  },
});
