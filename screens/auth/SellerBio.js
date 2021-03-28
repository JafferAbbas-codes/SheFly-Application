import React, {Component} from 'react';
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
import FlatButton from '../../shared/button.js';
import MultiSelect from 'react-native-multiple-select';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';

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

export default class MultiSelectExample extends Component {
  state = {
    selectedItems: [],
  };
  onSelectedItemsChange = (selectedItems) => {
    this.setState({selectedItems});
  };
  render() {
    const {selectedItems} = this.state;
    return (
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
            <TextInput style={{fontSize: 16}} />
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 22}}>Select Skills</Text>
          <View style={styles.container}>
            <View style={styles.multisel}>
              <MultiSelect
                hideTags
                items={items}
                uniqueKey="id"
                // ref={(component => this.multiSelect(component))}
                onSelectedItemsChange={this.onSelectedItemsChange}
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
              />
              <View>
                {/* {this.multiSelect.getSelectedItemsExt(selectedItems)} */}
              </View>
            </View>
          </View>
          <FlatButton text="Continue" />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  option: {
    backgroundColor: 'white',
    borderColor: '#B0389F',
    borderWidth: 2,
    marginVertical: 20,
    width: 300,
    height: 130,
    borderRadius: 20,
  },
  multisel: {
    marginVertical: 40,
  },
});
