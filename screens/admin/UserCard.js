import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-paper';
const DATA = [
  {
    _id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b32',
    name: 'Musfira',
    type: 'Buyer',
    cnicNo: '42101-732884-8',
    contact: '0300-3474383',
    createdAt: '03-01-2021',
    ratings: '5.0',
  },
  {
    _id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b323',
    name: 'Musfira',
    type: 'Buyer',
    cnicNo: '42101-732884-8',
    contact: '0300-34743843',
    createdAt: '03-01-2021',
    ratings: '5.0',
  },
  {
    _id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Musfira',
    type: 'Buyer',
    cnicNo: '42101-732884-8',
    contact: '0300-34789433',
    createdAt: '03-01-2021',
    ratings: '5.0',
  },
  {
    _id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb2856',
    name: 'Musfira',
    type: 'Buyer',
    cnicNo: '42101-732884-8',
    contact: '0300-34789433',
    createdAt: '03-01-2021',
    ratings: '5.0',
  },
  {
    _id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb2843',
    name: 'Musfira',
    type: 'Buyer',
    cnicNo: '42101-732884-8',
    contact: '0300-347893',
    createdAt: '03-01-2021',
    ratings: '5.0',
  },
  {
    _id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb2812',
    name: 'Musfira',
    type: 'Buyer',
    cnicNo: '42101-732884-8',
    contact: '0300-3478943',
    createdAt: '03-01-2021',
    ratings: '5.0',
  },
];

const Item = ({item}) => (
  <View style={styles.user}>
    <View style={styles.avatar}>
      <Avatar.Image
        source={require('../../assets/girl.jpg')}
        size={60}
        borderColor="purple"
      />
    </View>

    <View style={styles.details}>
      <View style={[styles.userdetails, {justifyContent: 'space-between'}]}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Text style={styles.highlightedText}>Name:</Text>
          <Text>{item.name}</Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Text style={styles.highlightedText}>
            {' '}
            <Icon name="star" color="#ae379d" size={16} />
            {item.ratings}
          </Text>
        </View>
      </View>
      <View style={styles.userdetails}>
        <Text style={styles.highlightedText}>type:</Text>
        <Text>{item.type}</Text>
      </View>
      <View style={styles.userdetails}>
        <Text style={styles.highlightedText}>CNIC:</Text>
        <Text>{item.cnicNo}</Text>
      </View>
      <View style={styles.userdetails}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Text style={styles.highlightedText}>Contact:</Text>
          <Text>{item.contact}</Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
          <TouchableOpacity style={styles.update}>
            <Text
              style={{
                color: '#fff',
                fontSize: 12,
              }}>
              Block
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);
export default function UserCard() {
  const renderItem = ({item}) => <Item item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#daecfd',
  },
  tabContainer: {
    margin: 15,
    flex: 1,
  },
  user: {
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 13.97,
    elevation: 10,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 3,
    borderColor: '#e2e2e2',
    borderWidth: 1,
    paddingBottom: 5,
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  details: {
    alignItems: 'baseline',
    justifyContent: 'space-between',
    borderBottomWidth: 2.5,
    borderColor: '#e2e2e2',
    paddingHorizontal: 7,
    paddingTop: 5,
    paddingBottom: 2,
    flexDirection: 'row',
  },
  confirm: {
    fontSize: 12,
    fontWeight: '700',
    flexDirection: 'row',
  },
  details: {
    width: '100%',
  },
  update: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,

    elevation: 10,
    backgroundColor: '#d21b1b',
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 25,
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginLeft: 8,
  },
  userdetails: {
    alignItems: 'baseline',
    paddingHorizontal: 7,
    width: '100%',
    flexDirection: 'row',
    paddingTop: 2,
  },
  highlightedText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
