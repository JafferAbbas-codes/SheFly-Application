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

export default class PostReq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      bio: [],
    };
  }
  // state = {
  //   selectedItems: [],
  //   bio: [],
  // };
  onSelectedItemsChange = (selectedItems) => {
    this.setState({selectedItems});
  };
  render() {
    // const {selectedItems} = this.state;
    return (
      <ScrollView>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            // justifyContent: 'center',
            alignContent: 'center',
            alignContent: 'center',
          }}>
          <View style={{flexDirection: 'column', alignSelf: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 22}}>
              Post a Request
            </Text>
            <View style={styles.option}>
              <TextInput
                style={{fontSize: 18}}
                // value={this.state.bio}
                multiline={true}
                placeholder={'Description'}
                onChangeText={(text) => this.setState({bio: text})}
              />
            </View>
            <View style={styles.container}>
              <Text style={{fontSize: 18}}>Choose a Category</Text>
              <View style={styles.multisel}>
                <MultiSelect
                  hideTags
                  items={items}
                  uniqueKey="id"
                  // ref={(component => this.multiSelect(component))}
                  onSelectedItemsChange={this.onSelectedItemsChange}
                  selectedItems={this.state.selectedItems}
                  selectText="Pick Items"
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
                <View style={{marginVertical: 10}}>
                  <Text style={{fontSize: 18, marginVertical: 5}}>
                    Day and Time
                  </Text>
                  <TextInput
                    onChangeText={''}
                    value={''}
                    onBlur={''}
                    style={{borderWidth: 1, marginVertical: 5}}
                  />
                </View>
                <View style={{marginVertical: 10}}>
                  <Text style={{fontSize: 18, marginVertical: 5}}>Address</Text>
                  <TextInput
                    onChangeText={''}
                    value={''}
                    onBlur={''}
                    style={{borderWidth: 1, marginVertical: 5}}
                  />
                </View>
                <View>
                  <Text>Budget</Text>
                  <View
                    style={
                      (styles.multisel,
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 10,
                      })
                    }>
                    <View style={{flex: 1}}>
                      <MultiSelect
                        hideTags
                        items={items}
                        uniqueKey="id"
                        // ref={(component => this.multiSelect(component))}
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={this.state.selectedItems}
                        selectText="Price"
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
                    </View>
                    <View style={{flex: 1}}>
                      <MultiSelect
                        hideTags
                        items={items}
                        uniqueKey="id"
                        // ref={(component => this.multiSelect(component))}
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={this.state.selectedItems}
                        selectText="/hr"
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
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <FlatButton text="Submit" />
          </View>
        </View>
      </ScrollView>
    );
  }
}
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
