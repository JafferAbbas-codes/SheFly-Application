import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, ImageBackground} from 'react-native';
import Header from '../../shared/ProfileHead';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {SearchBar} from 'react-native-elements';
import Card from '../../shared/Card';

export default function profileHead() {
  return (
    <View style={styles.back}>
      <Header />
      <Card>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'column',
              borderRadius: 20,
              width: 100,
              margin: 8,
              padding: 15,
              backgroundColor: 'white',
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
                textAlignVertical: 'bottom',
              }}>
              12
            </Text>
            <Text
              style={{
                fontSize: 13,
                textAlign: 'center',
                textAlignVertical: 'top',
              }}>
              Jobs Done
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              borderRadius: 20,
              width: 100,
              margin: 8,
              padding: 15,
              backgroundColor: 'white',
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
                textAlignVertical: 'bottom',
              }}>
              3
            </Text>
            <Text
              style={{
                fontSize: 13,
                textAlign: 'center',
                textAlignVertical: 'top',
              }}>
              In Progress
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              borderRadius: 20,
              width: 100,
              margin: 8,
              padding: 15,
              backgroundColor: 'white',
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
                textAlignVertical: 'bottom',
              }}>
              3
            </Text>
            <Text
              style={{
                fontSize: 13,
                textAlign: 'center',
                textAlignVertical: 'top',
              }}>
              Bids
            </Text>
          </View>
        </View>
        <Text style={{fontWeight: 'bold', fontSize: 25, margin: 10}}>
          Expertise
        </Text>
        <View style={{flexDirection: 'row', height: 100}}>
          <ImageBackground
            source={require('../../assets/i.jpg')}
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
              Hair Cutting
            </Text>
          </ImageBackground>
          <ImageBackground
            source={require('../../assets/i.jpg')}
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
              width: 100,
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

        <Text style={{fontWeight: 'bold', fontSize: 25, margin: 10}}>
          Samples
        </Text>
        <View style={{flexDirection: 'row', height: 100}}>
          <ImageBackground
            source={require('../../assets/i.jpg')}
            style={{
              flexDirection: 'column',
              borderRadius: 20,
              width: 100,
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
              width: 100,
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
              width: 100,
              margin: 8,
              padding: 15,
              backgroundColor: 'white',
              overflow: 'hidden',
            }}
          />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#B0389F',
  },
});
