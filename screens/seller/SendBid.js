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
  Alert,
  Modal,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import Header from '../../shared/Header2';
import Card from '../../shared/Card';
import FlatButton from '../../shared/Button.js';
import {gStyles} from '../../styles/global';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import MultiSelect from 'react-native-multiple-select';
import * as yup from 'yup';
import {URL, createBid} from '../../config/const';
import axios from 'axios';
import {connect, useDispatch} from 'react-redux';

const SendBid = (props) => {
  // const [value, onChangeText] = React.useState('42|');
  const [buttonLoading, setButtonLoading] = useState(false);
  console.log('props in sendBidd', props);
  const reviewSchema = yup.object({
    budget: yup.string().required(),
    description: yup.string().required('No description provided.'),
  });

  const [isVisible, setIsVisible] = useState(false);
  const createBidAPI = async (budget, description) => {
    try {
      console.log('props in createBidAPI', props);
      setButtonLoading(true);
      let response = await axios.post(
        `${URL}${createBid}`,
        {
          seller: props.user._id,
          order: props.route.params.orderId,
          budget,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      );
      setButtonLoading(false);
      console.log('response of createBidAPI', response.data.result);
      displayModal(true);
    } catch (error) {
      setButtonLoading(false);
      console.log('propss in createBidAPI', error);
      if (error?.response?.data?.result) {
        console.log('propss in createBidAPI', error);
        console.log('error123 createBidAPI : ', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };

  const displayModal = (show) => {
    setIsVisible(show);
    setTimeout(() => {
      setIsVisible(false);
      props.navigation.dispatch(StackActions.popToTop());
    }, 2000);
    // props.navigation.navigate('Home', {
    //   ...props.route.params,
    // });
  };

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

  const [name, onChangeName] = useState('');
  const [budget, setBudget] = useState('');
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
        <Modal
          animationType={'fade'}
          transparent={false}
          visible={isVisible}
          onRequestClose={() => {
            Alert.alert('Modal has now been closed.');
          }}>
          {/* <Text
            style={styles.closeText}
            onPress={() => {
              displayModal(!isVisible);
            }}>
            {' '}
            x{' '}
          </Text> */}
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <MaterialIcons
              name="check-circle"
              size={180}
              style={{
                color: '#AD379D',
              }}
            />
            <Text style={{textAlign: 'center', fontSize: 30}}>
              Bid Successful
            </Text>
          </View>
        </Modal>
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
                console.log('valuesss', values);
                createBidAPI(values.budget, values.description);

                // console.log('form values', values);
                // actions.resetForm();
              }}>
              {(propss) => (
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
                      onChangeText={propss.handleChange('budget')}
                      value={propss.values.budget}
                      onBlur={propss.handleBlur('budget')}
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
                      <TextInput
                        style={{fontSize: 16}}
                        onChangeText={propss.handleChange('description')}
                        value={propss.values.description}
                        onBlur={propss.handleBlur('description')}
                      />
                    </View>
                  </View>
                  <FlatButton
                    text="Submit"
                    loading={buttonLoading}
                    onPress={propss.handleSubmit}
                  />
                </View>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
  closeText: {
    fontSize: 24,
    color: '#00479e',
    textAlign: 'right',
    paddingVertical: 50,
    paddingHorizontal: 20,
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
  image: {
    // marginTop: 150,
    marginBottom: 10,
    // width: 100,
    // height: 350,
  },
  text: {
    fontSize: 24,
    // marginBottom: 30,
    // padding: 40,
  },
  headerTitle: {},
});
const mapStateToProps = (state) => ({
  temp: state,
  user: state.userDetails.user,
  token: state.userDetails.token,
  loading: state.userDetails.loading,
});

export default connect(mapStateToProps)(SendBid);
