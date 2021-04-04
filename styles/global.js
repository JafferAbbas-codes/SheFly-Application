import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export const gStyles = StyleSheet.create({
  stepImg: {
    backgroundColor: '#B0389F',
    alignSelf: 'center',
    marginVertical: 40,
    // backgroundColor: 'black',
    width:
      0.60856481481 * width,
    // 239,
    height:
      0.02580947911778508 * height,
    // 20
  },
});
export const images = {
  ratings: {
    // '1': require('../assets/step-1.jpg'),
    // '2': require('../assets/step2.jpg'),
    // '3': require('../assets/step3.jpg'),
    // '4': require('../assets/step4.jpg'),
  },
};
