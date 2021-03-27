import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>{props.children}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    paddingTop: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#F4F9FE',
    shadowColor: '#333',
  },
  cardContent: {
    marginHorizontal: 30,
    marginBottom: 95,
    marginVertical: 30,
    textAlignVertical: 'top',
  },
});
