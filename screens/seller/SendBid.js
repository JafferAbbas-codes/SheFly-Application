import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Header from '../../shared/Header2';
import Card from '../../shared/Card';
import FlatButton from '../../shared/Button.js';
import {gStyles} from '../../styles/global';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import MultiSelect from 'react-native-multiple-select';
import * as yup from 'yup';

export default function yourBid(props) {
  // const [value, onChangeText] = React.useState('42|');
  const reviewSchema = yup.object({
    budget: yup.string().required(),
    description: yup.string().required('No description provided.'),
  });

  const [Servises, setServises] = useState([
    {
      bookingno: '1',
      status: 'completed',
      serviceprovider: 'Narjis',
      date: '6-06-2021',
      service: 'Cooking',
      user: 'Salman',
      key: '1',
    },
    {
      bookingno: '1',
      status: 'completed',
      serviceprovider: 'Narjis',
      date: '6-06-2021',
      service: 'Nursing',
      user: 'Salman',
      key: '2',
    },
    {
      bookingno: '1',
      status: 'completed',
      serviceprovider: 'Narjis',
      date: '6-06-2021',
      service: 'Cooking',
      user: 'Salman',
      key: '3',
    },
    {
      bookingno: '1',
      status: 'completed',
      serviceprovider: 'Narjis',
      date: '6-06-2021',
      service: 'Cooking',
      user: 'Salman',
      key: '4',
    },
  ]);
  const renderItem = ({item}) => (
    <Item
      text={item.text}
      bookingno={item.bookingno}
      date={item.date}
      serviceprovider={item.serviceprovider}
      status={item.status}
      user={item.user}
      service={item.service}
    />
  );

  const OnPressBack = () => {
    console.log('in on Press Back');
    props.navigation.navigate('ViewJobDetails', {
      ...props.route.params,
    });
  };

  const onPressSendOffer = () => {
    // console.log('in on Press Back');
    props.navigation.navigate('OfferSent', {
      ...props.route.params,
    });
  };

  const [name, onChangeName] = useState('');
  const [email, onChangeBudget] = useState('');
  const [pass, onChangePass] = useState('');
  const [confirmpass, onChangeConf] = useState('');
  const changeNameHandler = (val) => {
    setText(val);
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            marginHorizontal: 30,
            justifyContent: 'space-between',
          }}>
          <MaterialIcons
            onPress={() => OnPressBack()}
            name="arrow-left"
            size={20}
            color="#4A4A4A"
          />
        </View>
        <View>
          <View
            style={{
              margin: 30,
              padding: 10,
              borderWidth: 1,
              borderColor: '#707070',
            }}>
            <Text
              style={{
                color: '#000000',
                fontWeight: 'bold',
                fontSize: 24,
                // margin: 25,
              }}>
              Job Details
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 10, marginRight: 10, color: '#A28FA1'}}>
                {props.route.params.service}
              </Text>
              <MaterialIcons
                name="map-marker"
                size={10}
                /*onPress={openMenu}*/
                style={{marginTop: 2}}
                color="#A28FA1"
              />
              <Text style={{fontSize: 10, color: '#A28FA1'}}>
                {' ' + props.route.params.location}
              </Text>
            </View>
            <Text style={{fontSize: 16, marginVertical: 20}}>
              {props.route.params.description}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              marginHorizontal: 30,
              borderColor: '#707070',
              // marginVertical: 5,
              padding: 15,
            }}>
            <Formik
              initialValues={{budget: '', description: ''}}
              validationSchema={reviewSchema}
              onSubmit={(values, actions) => {
                actions.resetForm();
              }}>
              {(props) => (
                <View>
                  <Text
                    style={{
                      color: '#000000',
                      fontWeight: 'bold',
                      fontSize: 20,
                      marginBottom: 25,
                    }}>
                    Your bidding
                  </Text>
                  <Text style={{marginBottom: 5, color: '#A28FA1'}}>
                    Budget
                  </Text>
                  <View
                    style={{
                      alignSelf: 'center',
                      marginHorizontal: 50,
                      fontSize: 25,
                    }}>
                    <TextInput
                      style={styles.input}
                      onChangeBudget={(text) => onChangeBudget(text)}
                      // value={props.values.budget}
                      onBlur={props.handleBlur('budget')}
                    />
                  </View>
                  <Text style={{marginBottom: 5, color: '#A28FA1'}}>
                    Description
                  </Text>
                  <View
                    style={{
                      alignSelf: 'center',
                      fontSize: 25,
                    }}>
                    <View style={styles.option}>
                      <TextInput style={{fontSize: 16}} />
                    </View>
                  </View>
                  <FlatButton
                    text="Send Offer"
                    onPress={() => {
                      onPressSendOffer();
                    }}
                  />
                </View>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#B0389F',
  },
  headerImage: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 50,
  },
  container: {
    borderRadius: 20,
    // marginVertical: 30,
  },
  option: {
    borderColor: '#D2D2D2',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 15,
    width: 320,
    height: 130,
  },
  input: {
    height: 40,
    borderColor: '#D2D2D2',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
    width: 320,
  },
  item: {
    // backgroundColor: '#f9c2ff',
    // padding: 20,
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
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
    // position: 'absolute',
  },
  headerTitle: {},
});
