import React from 'react';
import { images } from '../styles/global';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

// import MaterialIcons from 'react-native-vector-icons/FontAwesome';
export default function Stepper(props) {
    console.log("dimension", width, height)
    return (
        <View style={styles.container}>

            {props.step == 1 && <Image
                source={require('../assets/stepper1.png')}
                style={styles.stepImg}
            />}
            {props.step == 2 && <Image
                source={require('../assets/stepper2.png')}
                style={styles.stepImg}
            />}
            {props.step == 3 && <Image
                source={require('../assets/stepper3.png')}
                style={styles.stepImg}
            />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'column',
        width: width,
        height: height * 0.1,
        // flex: 1,
        bottom: 0,
        alignItems: 'center',
        // alignContent: 'space-between',
        // alignSelf: 'center',
        justifyContent: 'center',
        // backgroundColor: "yellow"
    },
    stepImg: {
        backgroundColor: '#B0389F',
        alignSelf: 'center',
        // marginVertical: 40,
        // backgroundColor: 'black',
        width:
            0.60856481481 * width,
        // 239,
        height:
            0.02580947911778508 * height,
        // 20
    },
});
