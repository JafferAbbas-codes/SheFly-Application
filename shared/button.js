import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

export default function FlatButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>
          {props.loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            props.text
          )}
          {/* {props.text} */}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    // height: 46,
    borderRadius: 20,
    paddingVertical: 14,
    marginHorizontal: 70,
    paddingHorizontal: 10,
    backgroundColor: '#B0389F',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 18,
    textAlign: 'center',
    // flexDirection: 'row',
    // alignContent: 'center',
    // justifyContent: 'center',
  },
});
