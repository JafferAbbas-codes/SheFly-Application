import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  // Image,
  // TouchableWithoutFeedback,
  // Keyboard,
  // ScrollView,
  TouchableOpacity,
  // Modal,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';
import FlatButton from '../../shared/Button.js';
import MultiSelect from 'react-native-multiple-select';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign';
import {ActionSheet, Root} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {URL, getAllServicesRoute} from '../../config/const';

import {createIconSetFromFontello} from 'react-native-vector-icons';
import axios from 'axios';
import {signup, setLoading} from '../../redux/authActions';
import {connect} from 'react-redux';

const width = Dimensions.get('window').width;

const SellerBio = (props) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  // const [selectedItems, setSelectedItems] = useState([]);
  const [Services, setServices] = useState([{_id: '', name: ''}]);
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  // const [pic, setPic] = useState([]);
  // const [avatarSource, setAvatarSource] = useState(null);
  // const [ModalOpen, setModaOpen] = useState(true);

  const [images, setImages] = useState([]);
  // 'https://api.adorable.io/avatars/80/abott@adorable.png',
  // const [imageSelected, setImageSelected] = useState('');
  // const onSelectedItemsChange = (selectedItems) => {
  // setSelectedItems(selectedItems);
  // };
  const getAllServices = async () => {
    try {
      let response = await axios.get(`${URL}${getAllServicesRoute}`, {
        // headers: {
        //   Authorization: `Bearer ${props.token}`,
        // },
      });
      console.log('response getAllSerices', response);
      setServices(response.data.result);
      return response.data.result;
    } catch (error) {
      console.log('error getAllSerices', error);

      if (error?.response?.data?.result) {
        console.log(
          'error getAllSerices from server',
          error.response.data.result,
        );
        return {error: error.response.data.result};
      }
    }
  };
  const signupFunction = async () => {
    try {
      // await props.setLoading(true);
      console.log('bio', bio);
      console.log('selectedImages', selectedImages);
      console.log('selectedServices', selectedServices);

      let body = {
        ...props.route.params,
        title: title,
        bio: bio,
        samples: selectedImages,
        services: selectedServices,
      };
      console.log('body is now', body);
      setButtonLoading(true);
      const result = await props.signup(body);
      setButtonLoading(false);
      if (result.error) {
        console.log('result.error', result.error);
      }
    } catch (error) {
      console.log('error d: ', error);
    }
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
    })
      .then(async (image) => {
        console.log(image, 'IMAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
        let newFile = {
          uri: image.path,
          type: `test/${image.path.split('.')[1]}`,
          name: `test${image.path.split('.')[1]}`,
        };
        setImages([...images, image.path]);
        console.log(newFile, 'newFile');
        await uploadImage(newFile);
        // setImage(image.path);
        // setImageSelected(image);
        // this.bs.current.snapTo(1);
      })
      .catch((e) => {
        console.log('error in take a photo', e);
      });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
    })
      .then(async (image) => {
        console.log('IMAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', image);
        let newFile = {
          uri: image.path,
          type: `test/${image.path.split('.')[1]}`,
          name: `test${image.path.split('.')[1]}`,
        };
        setImages([...images, image.path]);
        console.log('newFile', newFile);
        await uploadImage(newFile);
        // setImage(image.path);
        // setImageSelected(image);
        // this.bs.current.snapTo(1);
      })
      .catch((e) => {
        console.log('error in choose from lib', e);
      });
  };

  const uploadImage = async (file) => {
    try {
      const data = new FormData();
      console.log('upload image selecetd', file);
      data.append('file', file);
      data.append('upload_preset', 'shefly');
      data.append('cloud_name', 'jafferabbas');

      // data.append('api_key', 693824263367388);
      // formData.append('api_secret', '3bBhmYVxuJxFW_QfvukSXm95oSs');

      console.log('form data', data);

      const cloudinaryURL =
        'https://api.cloudinary.com/v1_1/jafferabbas/image/upload';
      let response = await fetch(cloudinaryURL, {
        method: 'post',
        body: data,
      });
      let responseData = await response.json();
      console.log('cloudinary data  ', responseData);
      if (responseData) {
        setSelectedImages((selectedImages) => [
          ...selectedImages,
          responseData.secure_url,
        ]);
      }
      //   // setImage(response.data.secure_url);
      //   // setPublic_id(response.data.secure_url);
    } catch (e) {
      console.log('error while uploading picture to cloudinary', e);
    }

    // .then(async (response) => {
    //   console.log('couldinary response', response.json());
    //   let res = await response.json();
    //   console.log('res', res);
    //   // console.log(
    //   //   'urlllllllllllllllllllllllllllllllllllllllllllll',
    //   //   response.json()._W.secure_url,
    //   // );
    //   // setImage(response.data.secure_url);
    //   // setPublic_id(response.data.secure_url);
    // })
    // // .then((data) => {
    // //   console.log('couldinary data', data);
    // // })
    // .catch((e) => {
    //   console.log('error while uploading picture to cloudinary', e);
    // });
  };

  useEffect(() => {
    getAllServices();
  }, []);

  const onClickAddImage = () => {
    console.log('1234');
    const BUTTONS = ['Take Photo', 'Choose Photo from the library', 'Cancel'];
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 2,
        title: 'Select a Photo',
      },
      (buttonIndex) => {
        console.log('1234', buttonIndex);
        switch (buttonIndex) {
          case 1:
            console.log('Choose from library');
            choosePhotoFromLibrary();
            break;
          case 0:
            console.log('Take a photo');
            takePhotoFromCamera();
            break;
          default:
            break;
        }
      },
    );
    console.log('second paramter');
  };
  const renderItem = (item) => <Item item={item.item} />;
  const Item = ({item}) => (
    // console.log('item in Item', item);
    <ImageBackground
      source={{
        uri: item,
      }}
      style={{
        height: 100,
        width: 100,
        marginRight: 5,
      }}
      imageStyle={{borderRadius: 15}}>
      {/* <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}></View> */}
    </ImageBackground>
  );
  return (
    <Root>
      <View
        style={{
          backgroundColor: '#DADDE3',
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{flexDirection: 'column', alignSelf: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 22}}>Your Title</Text>
          <View style={styles.option1}>
            <TextInput
              style={{fontSize: 18}}
              value={title}
              // multiline={true}
              onChangeText={(text) => setTitle(text)}
            />
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 22}}>
            Write a short bio
          </Text>
          <View style={styles.option}>
            <TextInput
              style={{fontSize: 18}}
              value={bio}
              multiline={true}
              onChangeText={(text) => setBio(text)}
            />
          </View>
          <View style={styles.container1}>
            <Text style={{fontWeight: 'bold', fontSize: 22}}>
              Select Skills
            </Text>

            <View style={styles.multisel}>
              <DropDownPicker
                items={Services.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
                placeholder="Select your service(s)"
                multiple={true}
                min={0}
                max={Services.length}
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
                  (item) => setSelectedServices(item)
                  // (item) =>
                  // ({
                  // propss.handleChange('service')
                  // service: item.value,
                  // })
                }
              />
              {/* <MultiSelect
                hideTags
                items={items}
                uniqueKey="id"
                // ref={(component => this.multiSelect(component))}
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="   Pick Items"
                searchInputPlaceholderText="Search Items..."
                onChangeInput={(text) => console.log(text)}
                altFontFamily="ProximaNova-Light"
                tagRemoveIconColor="#CCC"
                tagBorderColor="red"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{color: '#CCC'}}
                submitButtonColor="#CCC"
                submitButtonText="Submit"
                styleDropdownMenuSubsection={{borderRadius: 20}}
              /> */}
              <View>
                {/* {this.multiSelect.getSelectedItemsExt(selectedItems)} */}
              </View>
            </View>
          </View>
          <View style={styles.UploadImageFullBox}>
            <View style={styles.UploadImagelayerOne}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                  marginTop: 30,
                }}>
                <Text style={styles.UploadImageHeading}>Add Samples</Text>
                <View>
                  <TouchableOpacity>
                    <Icon
                      size={30}
                      color="black"
                      name="plus"
                      onPress={onClickAddImage}></Icon>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Text>images will appear here</Text>

            {/* {images.map((image) => ( */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: width * 0.8,
              }}>
              <SafeAreaView style={styles.container}>
                <FlatList
                  horizontal
                  data={images}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.index}
                />
              </SafeAreaView>
            </View>
            {/* ))} */}
          </View>
          <FlatButton
            text="Continue"
            loading={buttonLoading}
            onPress={signupFunction}
          />
        </View>
      </View>
    </Root>
  );
};

const mapStateToProps = (state) => ({
  temp: state,
  user: state.userDetails.user,
  loading: state.userDetails.loading,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (body) => dispatch(setLoading(body)),
    signup: (body) => dispatch(signup(body)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerBio);
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginVertical: 30,
  },
  option: {
    backgroundColor: 'white',
    borderColor: '#B0389F',
    borderWidth: 2,
    marginVertical: 20,
    width: width * 0.8,
    height: 130,
    borderRadius: 20,
    padding: 10,
  },
  option1: {
    backgroundColor: 'white',
    borderColor: '#B0389F',
    borderWidth: 2,
    marginVertical: 20,
    width: width * 0.8,
    // height: 130,
    borderRadius: 20,
    padding: 10,
  },
  container1: {
    marginTop: 20,
  },
  multisel: {
    marginVertical: 20,
  },
  UploadImageHeading: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  UploadImagelayerOne: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
  },
  UploadImageFullBox: {
    display: 'flex',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#115454',
    borderRadius: 5,
    padding: 15,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
  },
  modalTextHeading: {
    marginBottom: 15,
    fontWeight: 'bold',
    // fontSize: "16px"
  },
  btnPressStyle: {
    backgroundColor: '#0080FF',
    height: 50,
    width: width - 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage: {
    backgroundColor: '#2F455C',
    height: 150,
    width: width - 60,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  itemViewImage: {
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
});
