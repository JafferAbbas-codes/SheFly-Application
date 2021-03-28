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
import {gStyles} from '../../styles/global';
import Header from '../../shared/header';
import Card from '../../shared/card';
import FlatButton from '../../shared/button.js';

// import MaterialIcons from 'react-native-vector-icons/FontAwesome';
export default function EnterCode() {
  const [value, onChangeText] = React.useState('');
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ScrollView style={styles.back}>
        <Header />
        <Image
          source={require('../../assets/step2.jpg')}
          style={gStyles.stepImg}
        />
        <Card>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 25, marginBottom: 10}}>
              Enter Code
            </Text>
            <Text>Enter 4 digit verification code just</Text>
            <Text style={{marginBottom: 25}}>sent to your phone</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              alignContent: 'space-around',
            }}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeText(text)}
              placeholder={'4'}
              keyboardType="numeric"
              value={value}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeText(text)}
              keyboardType="numeric"
              value={value}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeText(text)}
              keyboardType="numeric"
              value={value}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeText(text)}
              keyboardType="numeric"
              value={value}
            />
          </View>
          <Text>Send again</Text>
          <Text>Edit my number</Text>
          <Text style={{marginBottom: 25}}>Call me instead</Text>
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
  input: {
    height: 40,
    borderColor: 'gray',
    fontSize: 25,
    marginRight: 30,
    textAlign: 'center',
    alignContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 35,
    backgroundColor: '#FEF8FF',
    width: 50,
    height: 50,
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
