import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import Header from '../../shared/header';
import Card from '../../shared/card';
import FlatButton from '../../shared/button.js';
import {gStyles} from '../../styles/global';

// import MaterialIcons from 'react-native-vector-icons/FontAwesome';
export default function EnterCNIC() {
  const [value, onChangeText] = React.useState('42|');
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ScrollView style={styles.back}>
        <Header />
        <Image
          source={require('../../assets/step3.jpg')}
          style={gStyles.stepImg}
        />
        <Card>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 25, marginBottom: 15}}>
              Enter NIC Number
            </Text>
            <Text>Enter 14 Digit National Identity</Text>
            <Text style={{marginBottom: 40}}>Card Number</Text>
          </View>
          <View
            style={{alignSelf: 'center', marginHorizontal: 50, fontSize: 25}}>
            <TextInput
              style={{
                height: 40,
                fontSize: 20,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 50,
                marginTop: 15,
                paddingLeft: 15,
                backgroundColor: '#FEF8FF',
                width: 330,
              }}
              onChangeText={(text) => onChangeText(text)}
              keyboardType="numeric"
              value={value}
            />
          </View>
          <FlatButton text="Next" />
        </Card>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#B0389F',
  },
  header: {
    paddingLeft: 35,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  HeaderText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    letterSpacing: 1,
  },
  icon: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    flexDirection: 'row',
  },
  headerImage: {
    width: 26,
    height: 26,
    marginHorizontal: 10,
    marginTop: 7,
  },
});
