import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  // Image,
  // TouchableWithoutFeedback,
  // Keyboard,
  // ScrollView,
  TouchableOpacity,
  // Modal,
  // FlatList,
  ImageBackground,
  FlatList,
  SafeAreaView,
  Dimensions,
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
// import RNFetchBlob from 'rn-fetch-blob';|

// console.log('dimension screen', Dimensions.get('screen'));
// console.log('dimension window', Dimensions.get('window'));
var width = Dimensions.get('window').width;

const items = [
  {
    id: '92iijs7yta',
    name: 'Ondo',
  },
  {
    id: 'a0s0a8ssbsd',
    name: 'Ogun',
  },
  {
    id: '16hbajsabsd',
    name: 'Calabar',
  },
  {
    id: 'nahs75a5sg',
    name: 'Lagos',
  },
  {
    id: '667atsas',
    name: 'Maiduguri',
  },
  {
    id: 'hsyasajs',
    name: 'Anambra',
  },
  {
    id: 'djsjudksjd',
    name: 'Benue',
  },
  {
    id: 'sdhyaysdj',
    name: 'Kaduna',
  },
  {
    id: 'suudydjsjd',
    name: 'Abuja',
  },
];
const SellerBio = () => {
  const [selectedService, setSelectedService] = useState('');
  const [Services, setServices] = useState([{_id: '', name: ''}]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [bio, setBio] = useState('');
  const [pic, setPic] = useState([]);
  const [avatarSource, setAvatarSource] = useState(null);
  const [ModalOpen, setModaOpen] = useState(true);
  const [images, setImages] = useState([
    // 'https://api.adorable.io/avatars/80/abott@adorable.png',
  ]);
  const [imageSelected, setImageSelected] = useState('');
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };
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
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then((image) => {
        console.log(image, 'IMAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
        setImages([...images, image.path]);
        setImageSelected(image);
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
    })
      .then((image) => {
        console.log(image, 'IMAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
        setImages([...images, image.path]);
        setImageSelected(image);
        this.bs.current.snapTo(1);
      })
      .catch((e) => {
        console.log('error in choose from lib', e);
      });
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', 'd10ahcp2');
    formData.append('cloud_name', 'ddoon1hy6');
    console.log(formData, 'form data');
    let ImageData = {
      file: imageSelected,
      upload_preset: 'd10ahcp2',
    };
    const data = async () => {
      await axios
        .post(
          'https://api.cloudinary.com/v1_1/ddoon1hy6/image/upload',
          formData,
        )
        .then((response) => {
          console.log(response.data, 'couldinary response');
          setImage(response.data.secure_url);
          setPublic_id(response.data.secure_url);
        })
        .catch((e) => {
          console.log(e, 'errorrrrrrrrrrrrrrrrrr');
        });
    };
    data();
    // await fetch(route, {
    //   method: 'post',
    //   headers,
    //   body: formData && JSON.stringify(formData),
    // })
    //   .then((response) => {
    //     console.log(response.data, 'couldinary response');
    //     setImage(response.data.secure_url);
    //     setPublic_id(response.data.secure_url);
    //   })
    //   .catch((e) => {
    //     console.log(e, 'errorrrrrrrrrrrrrrrrrr');
    //   });
  };
  useEffect(() => {
    if (imageSelected !== '') {
      console.log(imageSelected, 'image selected');
      uploadImage();
    }
  }, [imageSelected]);

  useEffect(() => {
    getAllServices();
  }, []);

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
        backgroundColor: 'yellow',
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
          <Text style={{fontWeight: 'bold', fontSize: 22}}>Select Skills</Text>
          <View style={styles.container}>
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
                  (item) => setSelectedService(item.value)
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
              <View>
                <Text style={styles.UploadImageHeading}>Add Samples</Text>
              </View>
              <View>
                <TouchableOpacity>
                  <Icon
                    size={28}
                    color="black"
                    name="plus"
                    onPress={onClickAddImage}></Icon>
                </TouchableOpacity>
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
          <FlatButton text="Continue" />
        </View>
      </View>
    </Root>
  );
};
export default SellerBio;
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
  multisel: {
    marginVertical: 40,
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
