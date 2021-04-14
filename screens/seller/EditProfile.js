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

export default function yourBid() {
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
      {/* {console.log('To test')} */}
      <View>
        <View>
          <View
            style={{
              marginHorizontal: 30,
              marginVertical: 10,
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
                  <View
                    style={{
                      alignSelf: 'center',
                      marginHorizontal: 50,
                      fontSize: 25,
                    }}>
                    <Text style={{marginBottom: 5, fontSize: 20}}>Name</Text>
                    <TextInput
                      style={styles.input}
                      onChangeBudget={(text) => onChangeBudget(text)}
                      // value={props.values.budget}
                      onBlur={props.handleBlur('budget')}
                    />
                  </View>
                  <View
                    style={{
                      alignSelf: 'center',
                      marginHorizontal: 50,
                      fontSize: 25,
                    }}>
                    <Text style={{marginBottom: 5, fontSize: 20}}>Title</Text>
                    <TextInput
                      style={styles.input}
                      onChangeBudget={(text) => onChangeBudget(text)}
                      // value={props.values.budget}
                      onBlur={props.handleBlur('budget')}
                    />
                  </View>
                  <View
                    style={{
                      alignSelf: 'center',
                      fontSize: 25,
                    }}>
                    <Text style={{fontSize: 20}}>Bio</Text>
                    <View style={styles.option}>
                      <TextInput style={{fontSize: 16}} />
                    </View>
                  </View>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 5,
                      }}>
                      <Text style={{fontSize: 20, alignSelf: 'center'}}>
                        Expertise
                      </Text>
                      <MaterialIcons
                        name="plus"
                        size={20}
                        style={{alignSelf: 'center'}}
                      />
                    </View>
                    <View style={{flexDirection: 'row', height: 100}}>
                      <ImageBackground
                        source={require('../../assets/i.jpg')}
                        style={{
                          flexDirection: 'column',
                          borderRadius: 20,
                          width: 90,
                          margin: 8,
                          backgroundColor: 'white',
                          overflow: 'hidden',
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            height: 100,
                            textAlign: 'center',
                            color: 'white',
                            textAlignVertical: 'center',
                            fontWeight: 'bold',
                          }}>
                          Hair Cutting
                        </Text>
                      </ImageBackground>
                      <ImageBackground
                        source={require('../../assets/i.jpg')}
                        style={{
                          flexDirection: 'column',
                          borderRadius: 20,
                          width: 90,
                          margin: 8,
                          backgroundColor: 'white',
                          overflow: 'hidden',
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 15,
                            textAlign: 'center',
                            height: 100,
                            fontWeight: 'bold',
                            textAlignVertical: 'center',
                          }}>
                          Makeup
                        </Text>
                      </ImageBackground>
                      <ImageBackground
                        source={require('../../assets/i.jpg')}
                        style={{
                          flexDirection: 'column',
                          borderRadius: 20,
                          width: 90,
                          margin: 8,
                          backgroundColor: 'white',
                          overflow: 'hidden',
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontSize: 15,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            height: 100,
                          }}>
                          Facial
                        </Text>
                      </ImageBackground>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 5,
                      }}>
                      <Text style={{fontSize: 20, alignSelf: 'center'}}>
                        Samples
                      </Text>
                      <MaterialIcons
                        name="plus"
                        size={20}
                        style={{alignSelf: 'center'}}
                      />
                    </View>
                    <View style={{flexDirection: 'row', height: 100}}>
                      <ImageBackground
                        source={require('../../assets/i.jpg')}
                        style={{
                          flexDirection: 'column',
                          borderRadius: 20,
                          width: 90,
                          margin: 8,
                          padding: 15,
                          backgroundColor: 'white',
                          overflow: 'hidden',
                        }}
                      />
                      <ImageBackground
                        source={require('../../assets/i.jpg')}
                        style={{
                          flexDirection: 'column',
                          borderRadius: 20,
                          width: 90,
                          margin: 8,
                          padding: 15,
                          backgroundColor: 'white',
                          overflow: 'hidden',
                        }}
                      />
                      <ImageBackground
                        source={require('../../assets/i.jpg')}
                        style={{
                          borderRadius: 20,
                          width: 90,
                          margin: 8,
                          padding: 15,
                          backgroundColor: 'white',
                          overflow: 'hidden',
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      margin: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        alignSelf: 'center',
                        color: '#C543B3',
                      }}>
                      Cancel
                    </Text>
                    <View style={styles.button}>
                      <MaterialIcons name="save" size={20} />
                      <Text style={styles.buttonText}>Save</Text>
                    </View>
                  </View>
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
  button: {
    flexDirection: 'row',
    borderRadius: 20,
    paddingVertical: 10,
    // marginHorizontal: 70,
    paddingHorizontal: 15,
    backgroundColor: '#B0389F',
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
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
    backgroundColor: '#F1F1F1',
    marginTop: 5,
    marginBottom: 15,
    width: 320,
    height: 100,
  },
  input: {
    height: 40,
    backgroundColor: '#F1F1F1',
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
