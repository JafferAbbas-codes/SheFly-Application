import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  // ScrollView,
} from 'react-native';
import Header from '../../shared/SfbHead';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {SearchBar} from 'react-native-elements';
import Card from '../../shared/Card';
import {ScrollView} from 'react-native';

export default function sellerProfileBuyer(propss) {
  console.log('In SFB,', propss);
  const props = propss.route.params.index;

  const renderItem = (item, i) => <Item item={item.item} i={i} />;
  const Item = ({item, i}) => (
    <ImageBackground
      source={{
        uri: i == 0 ? item.image : item,
      }}
      style={{
        flexDirection: 'column',
        borderRadius: 20,
        width: 100,
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
        {item.name}
      </Text>
    </ImageBackground>
  );
  return (
    <View style={styles.back}>
      <Header profile={propss} />
      <Card>
        <ScrollView>
          <Text style={{fontWeight: 'bold', fontSize: 25, margin: 10}}>
            Expertise
          </Text>
          <View style={{flexDirection: 'row'}}>
            {/* <SafeAreaView style={styles.container}> */}
            <FlatList
              horizontal
              data={props.services}
              renderItem={(item) => renderItem(item, 0)}
              keyExtractor={(item) => item._id}
              style={{borderRadius: 20}}
            />
            {/* </SafeAreaView> */}
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 25, margin: 10}}>
            Samples
          </Text>
          <View style={{flexDirection: 'row'}}>
            <FlatList
              horizontal
              data={props.samples}
              renderItem={(item) => renderItem(item, 1)}
              keyExtractor={(item) => item.index}
              style={{borderRadius: 20}}
            />
          </View>
        </ScrollView>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#B0389F',
  },
});
