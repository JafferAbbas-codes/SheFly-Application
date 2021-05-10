import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import Header from '../../shared/SfbHead';
import Card from '../../shared/AppStackCard';

export default function sellerProfileBuyer(propss) {
  const props = propss.route.params.index;
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderItem = (item, i) => <Item item={item.item} i={i} />;
  const Item = ({item, i}) => (
    <ImageBackground
      source={{
        uri: i == 0 ? item.image : item,
      }}
      style={{
        flexDirection: 'column',
        borderRadius: 24,
        width: 88,
        height: 88,
        marginHorizontal: 5,
        overflow: 'hidden',
        backgroundColor: 'black',
        opacity: 0.9,
      }}>
      <Text
        style={{
          fontSize: 15,
          height: 90,
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
    <ScrollView style={styles.back}>
      <Header profile={propss} />
      <Card>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#F4F9FE']}
              progressBackgroundColor={'#B0389F'}
            />
          }>
          <Text style={{fontWeight: 'bold', fontSize: 24, marginBottom: 20}}>
            Expertise
          </Text>
          <View style={{flexDirection: 'row'}}>
            {/* <SafeAreaView style={styles.container}> */}
            <FlatList
              horizontal
              data={props.services}
              renderItem={(item) => renderItem(item, 0)}
              keyExtractor={(item) => item._id}
            />
            {/* </SafeAreaView> */}
          </View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              marginBottom: 20,
              marginTop: 28,
            }}>
            Samples
          </Text>
          <SafeAreaView style={{flexDirection: 'row'}}>
            <FlatList
              horizontal
              data={props.samples}
              renderItem={(item) => renderItem(item, 1)}
              keyExtractor={(item) => item.index}
            />
          </SafeAreaView>
        </ScrollView>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#B0389F',
  },
});
