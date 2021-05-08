import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import FlatButton from '../../shared/Button.js';
import MultiSelect from 'react-native-multiple-select';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import {connect} from 'react-redux';
import {URL, getAllServicesRoute, createOrder} from '../../config/const';
import {Formik} from 'formik';
import * as yup from 'yup';
import {gStyles} from '../../styles/global.js';
import {StackActions, NavigationActions} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import {Icon} from 'react-native-elements';
var moment = require('moment');

const PostRequest = (props) => {
  const [selectedService, setSelectedService] = useState('');
  const [Services, setServices] = useState([{_id: '', name: ''}]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [timeInputVisible, setTimeInputVisible] = useState(false);
  const [date, setDate] = useState(moment(Date.now()).format('L'));
  const [dateAndTime, setDateAndTime] = useState(new Date());

  const reviewSchema = yup.object({
    // service: yup.string().required(),
    // dateAndTime: yup.string().required(),
    address: yup.string().required(),
    budget: yup.number().required(),
    description: yup.string().required('No description provided.'),
  });

  const createRequestAPI = async (
    service,
    // dateAndTime,
    address,
    budget,
    description,
  ) => {
    try {
      console.log('props in createOrderAPI', props);
      setButtonLoading(true);
      let response = await axios.post(
        `${URL}${createOrder}`,
        {
          service: selectedService,
          dateAndTime: dateAndTime.getTime(),
          address,
          budget,
          description,
          buyer: props.user._id,
          type: 'request',
        },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      );
      setButtonLoading(false);
      console.log('response of createOrderAPI', response.data.result);
      displayModal(true);
    } catch (error) {
      setButtonLoading(false);
      console.log('propss in createOrderAPI', error);
      if (error?.response?.data?.result) {
        console.log('propss in createOrderAPI', error);
        console.log('error123 createOrderAPI : ', error.response.data);
        return {error: error.response.data.result};
      }
    }
  };

  const displayModal = (show) => {
    setIsVisible(show);
    setIsVisible(false);
    // setTimeout(() => {
    //   setIsVisible(false);
    //   props.navigation.navigate(
    //     'YourRequestsStackScreen',
    //     {},
    //     NavigationActions.navigate({
    //       routeName: 'BuyerRequests',
    //     }),
    //   );
    // }, 2000);
    props.navigation.navigate('Home', {
      ...props.route.params,
    });
  };

  const getAllServices = async () => {
    try {
      let response = await axios.get(`${URL}${getAllServicesRoute}`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      setServices(response.data.result);
      return response.data.result;
    } catch (error) {
      if (error?.response?.data?.result) {
        return {error: error.response.data.result};
      }
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  const dateChange = async (date) => {
    console.log('date is here', date);
    setDate(date);

    let myDate = date.split('/');
    let newDate = new Date(myDate[2], myDate[0] - 1, myDate[1]);
    console.log('newDate is here', newDate.getTime());
    setTimeInputVisible(true);
  };
  const timeChange = (time) => {
    console.log('time is here', time.nativeEvent.timestamp);
    if (time.type == 'set') {
      setDateAndTime(time.nativeEvent.timestamp);
    }

    setTimeInputVisible(false);
  };

  return (
    <ScrollView>
      <View style={{backgroundColor: 'white'}}>
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
              Request Posted
            </Text>
          </View>
        </Modal>
        <Text
          style={{
            paddingHorizontal: 40,
            paddingTop: 40,
            paddingBottom: 10,
            fontSize: 24,
            fontWeight: 'bold',
            // textAlign: 'center',
            color: '#4A4A4A',
          }}>
          Post a Request
        </Text>
        <Formik
          initialValues={{
            // service: '',
            // dateAndTime: '05-15-2021',
            address: '',
            budget: '',
            description: '',
          }}
          validationSchema={reviewSchema}
          onSubmit={(values, actions) => {
            console.log(
              ' in on submit',
              typeof Number(values.budget),
              'and service',
              selectedService,
            );
            if (selectedService != '') {
              createRequestAPI(
                selectedService,
                // values.dateAndTime,
                values.address,
                Number(values.budget),
                values.description,
              );
            }
          }}>
          {(propss) => (
            <View style={{paddingHorizontal: 40}}>
              {/* <Text>Description</Text> */}
              <TextInput
                multiline={true}
                style={{
                  backgroundColor: '#F1F1F1',
                  height: 200,
                  borderColor: '#F1F1F1',
                  borderRadius: 10,
                }}
                placeholder="Description... Please write complete details of your request here."
                onChangeText={propss.handleChange('description')}
                value={propss.values.description}
                onBlur={propss.handleBlur('description')}
              />
              <Text
                style={{fontSize: 18, color: '#4A4A4A', paddingVertical: 10}}>
                Choose a category
              </Text>
              <DropDownPicker
                items={Services.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
                defaultValue={'Cooking'}
                containerStyle={{height: 40}}
                style={{
                  backgroundColor: '#fafafa',
                  borderColor: '#D2D2D2',
                  borderWidth: 1,
                  borderRadius: 10,
                }}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={
                  (item) => setSelectedService(item.value)
                  // (item) =>
                  // ({
                  // propss.handleChange('service')
                  // service: item.value,
                  // })
                }
              />
              <Text style={{fontSize: 18, color: '#4A4A4A', paddingTop: 10}}>
                Date and Time
              </Text>
              {/* <TextInput
                style={{
                  backgroundColor: '#fafafa',
                  borderColor: '#D2D2D2',
                  borderWidth: 1,
                  borderRadius: 10,
                }}
                placeholder="Date and Time"
                onChangeText={propss.handleChange('dateAndTime')}
                value={propss.values.dateAndTime}
                onBlur={propss.handleBlur('dateAndTime')}
              /> */}
              <DatePicker
                style={{flex: 3, flexDirection: 'row'}}
                date={date}
                mode="date"
                // android="calendar"
                placeholder="select date"
                format="MM/DD/YYYY"
                minDate="05-05-2021"
                maxDate="05-05-2031"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                  // ... You can check the source to find the other keys.
                }}
                style={{flex: 1}}
                onDateChange={(date) => dateChange(date)}
              />
              {timeInputVisible && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateAndTime}
                  mode={'time'}
                  is24Hour={true}
                  display="default"
                  onChange={(time) => timeChange(time)}
                />
              )}
              <Text style={{fontSize: 18, color: '#4A4A4A', paddingTop: 10}}>
                Address
              </Text>

              <View style={{paddingVertical: 5, flexDirection: 'row'}}>
                <View
                  style={
                    {
                      // backgroundColor: 'red',
                      // flexDirection: 'row',
                      // alignSelf: 'center',
                      // alignContent: 'center',
                      // alignItems: 'center',
                      // justifyContent: 'center',
                    }
                  }>
                  <Icon
                    // raised
                    name="map-marker"
                    type="font-awesome"
                    color="green"
                    size={33}
                    style={{
                      paddingleft: 5,
                      paddingRight: 15,
                      paddingVertical: 5,
                      // backgroundColor: 'yellow',
                    }}
                  />
                </View>

                <TextInput
                  // multiline={true}
                  style={{
                    backgroundColor: '#fafafa',
                    borderColor: '#D2D2D2',
                    borderWidth: 1,
                    borderRadius: 10,
                    flex: 3,
                    paddingVertical: 5,
                    // height: 200,
                  }}
                  placeholder="Address"
                  onChangeText={propss.handleChange('address')}
                  value={propss.values.address}
                  onBlur={propss.handleBlur('address')}
                />
              </View>

              <Text style={{fontSize: 18, color: '#4A4A4A', paddingTop: 10}}>
                Budget
              </Text>
              <View style={{paddingVertical: 5, flexDirection: 'row'}}>
                <View
                  style={{
                    // backgroundColor: 'red',
                    // flexDirection: 'row',
                    alignSelf: 'center',
                    // alignContent: 'center',
                    // alignItems: 'center',
                    // justifyContent: 'center',
                  }}>
                  <Icon
                    // raised
                    name="payments"
                    type="material"
                    color="green"
                    size={30}
                    style={{
                      paddingRight: 5,
                      paddingVertical: 5,
                    }}
                  />
                </View>
                <TextInput
                  // multiline={true}
                  style={{
                    backgroundColor: '#fafafa',
                    borderColor: '#D2D2D2',
                    borderWidth: 1,
                    borderRadius: 10,
                    flex: 3,
                    paddingVertical: 5,
                    // height: 200,
                  }}
                  placeholder="Budget"
                  keyboardType="numeric"
                  onChangeText={propss.handleChange('budget')}
                  value={propss.values.budget}
                  onBlur={propss.handleBlur('budget')}
                />
              </View>
              <View style={{marginBottom: 50}}>
                <FlatButton
                  text="Submit"
                  loading={buttonLoading}
                  onPress={propss.handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  option: {
    backgroundColor: '#F1F1F1',
    marginVertical: 20,
    width: 300,
    height: 130,
    padding: 10,
  },
  multisel: {
    marginVertical: 40,
  },
});

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(PostRequest);
