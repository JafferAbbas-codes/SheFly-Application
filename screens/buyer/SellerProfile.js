import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, ImageBackground} from 'react-native';
import Header from '../../shared/ProfileHead';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import {SearchBar} from 'react-native-elements';
import Card from '../../shared/Card';
import {connect} from 'react-redux';

const SellerProfile = (props) => {
  return (
    <View style={styles.back}>
      {console.log(props.user)}
      <View style={{margin: 20}}>
        <MaterialIcons
          name="arrow-left"
          size={32}
          color="white"
          /*onPress={openMenu}*/ style={styles.icon}
        />
      </View>
      <View style={{alignSelf: 'center', margin: 40}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../assets/i.jpg')}
            style={styles.headerImage}
          />
          <View style={{margin: 5}}>
            <Text style={{fontSize: 15, color: 'white', margin: 2}}>
              Hello,
            </Text>
            <Text
              style={{
                fontSize: 25,
                color: 'white',
                fontWeight: 'bold',
                margin: 2,
              }}>
              Ibrahim
            </Text>
            <Text style={{fontSize: 15, color: 'white', margin: 2}}>
              Make Up Artist
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 15, color: 'white', margin: 2}}>
                kdkdfjkdf
              </Text>
              <Text style={{fontSize: 15, color: 'white', margin: 2}}>
                <MaterialIcons
                  name="star"
                  size={15}
                  /*onPress={openMenu}*/ style={styles.icon}
                />
                5.0
              </Text>
            </View>
          </View>
          <View>
            <MaterialIcons
              name="edit"
              size={20}
              /*onPress={openMenu}*/ style={styles.icon}
            />
            <Text
              style={{
                fontSize: 20,
                width: 130,
                textAlign: 'right',
                textAlignVertical: 'center',
                fontWeight: 'bold',
                margin: 5,
              }}></Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 20,
            textAlignVertical: 'center',
            margin: 10,
            color: 'white',
          }}>
          I am a professional
        </Text>
      </View>
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
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#B0389F',
  },
  icon: {
    position: 'absolute',
  },
});

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
  loading: state.userDetails.loading,
  token: state.userDetails.token,
});

export default connect(mapStateToProps)(SellerProfile);
