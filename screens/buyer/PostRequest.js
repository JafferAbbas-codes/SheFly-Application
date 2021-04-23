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
} from 'react-native';
import FlatButton from '../../shared/Button.js';
import MultiSelect from 'react-native-multiple-select';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import {connect} from 'react-redux';
import {URL, getAllServicesRoute} from '../../config/const';
import {Formik} from 'formik';
import * as yup from 'yup';
import {gStyles} from '../../styles/global.js';

const PostRequest = (props) => {
  const [Services, setServices] = useState(['Cooking']);

  const reviewSchema = yup.object({
    service: yup.string().required(),
    dateAndTime: yup.string().required(),
    address: yup.string().required(),
    budget: yup.number().required(),
    description: yup.string().required('No description provided.'),
  });

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

  onSelectedItemsChange = (selectedItems) => {
    this.setState({selectedItems});
  };
  // const {selectedItems} = this.state;
  return (
    <ScrollView>
      <View style={{backgroundColor: 'white'}}>
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
            service: '',
            dateAndTime: '',
            budget: '',
            description: '',
            address: '',
          }}
          validationSchema={reviewSchema}
          onSubmit={(values, actions) => {
            console.log(' in on submit', values);
            // createComplainAPI(values.description);
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
                service={() => {
                  Services.map((Services) => {
                    console.log(Services)((label = `${Services.name}`)),
                      (value = `${Services.name}`);
                  });
                }}
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
                onChangeItem={(service) => ({
                  service: service.value,
                })}
              />
              <Text style={{fontSize: 18, color: '#4A4A4A', paddingTop: 10}}>
                Date and Time
              </Text>
              <TextInput
                // multiline={true}
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
              />
              <Text style={{fontSize: 18, color: '#4A4A4A', paddingTop: 10}}>
                Address
              </Text>
              <TextInput
                // multiline={true}
                style={{
                  backgroundColor: '#fafafa',
                  borderColor: '#D2D2D2',
                  borderWidth: 1,
                  borderRadius: 10,
                }}
                placeholder="Address"
                onChangeText={propss.handleChange('address')}
                value={propss.values.address}
                onBlur={propss.handleBlur('address')}
              />
              <Text style={{fontSize: 18, color: '#4A4A4A', paddingTop: 10}}>
                Budget
              </Text>
              <TextInput
                // multiline={true}
                style={{
                  backgroundColor: '#fafafa',
                  borderColor: '#D2D2D2',
                  borderWidth: 1,
                  marginBottom: 10,
                  borderRadius: 10,
                }}
                placeholder="Budget"
                onChangeText={propss.handleChange('budget')}
                value={propss.values.budget}
                onBlur={propss.handleBlur('budget')}
              />
              <FlatButton text="Submit" />
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
