import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    TouchableWithoutFeedback,
    ImageBackground,
    Keyboard,
    ScrollView,
    FlatList,
    SafeAreaView,
} from 'react-native';
import Header from '../../shared/header2';
import Card from '../../shared/card';
import FlatButton from '../../shared/button';
import { gStyles } from '../../styles/global';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
export default function getStarted() {
    // const [value, onChangeText] = React.useState('42|');
    const [services, setServices] = useState([
        { text: 'Cooking', key: '1' },
        { text: 'Makeup', key: '2' },
        { text: 'Nursing', key: '3' },
    ]);
    const renderItem = ({ item }) => <Item text={item.text} />;
    const Item = ({ text }) => (
        <ImageBackground
            source={require('../../assets/i.jpg')}
            style={{
                width: 120,
                height: 120,
                borderRadius: 20,
                marginHorizontal: 5,
                overflow: 'hidden',

            }}>
            <Text
                style={{
                    fontSize: 25,
                    color: 'white',
                    fontWeight: 'bold',
                    width: 120,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    height: 120,
                }}>
                {text}
            </Text>
        </ImageBackground>
    );
    const [availableSellers, setAvailableSellers] = useState([
        {
            name: 'Mashama Hafeez',
            rating: '5.0',
            service: 'Make up Artist',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id placerat odio. ',
            text: 'Makeup',
            key: '1',
        },
        {
            name: 'Mashama Hafeez',
            rating: '5.0',
            service: 'Make up Artist',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id placerat odio.',
            text: 'Makeup',
            key: '2',
        },
        {
            name: 'Mashama Hafeez',
            rating: '5.0',
            service: 'Make up Artist',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
            text: 'Makeup',
            key: '3',
        },
    ]);
    const renderAvailableSellers = ({ item }) => (
        <ItemRecom
            name={item.name}
            description={item.description}
            rating={item.rating}
            service={item.service}
            text={item.text}
        />
    );
    const ItemRecom = ({
        name,
        service,
        rating,
        description,
        text,
        key,
    }) => (
        <View
            style={{
                height: 150,
                width: 300,
                borderRadius: 25,
                backgroundColor: 'white',
                marginHorizontal: 5,
            }}>
            <View style={{ height: 75, width: 300, flexDirection: 'row' }}>
                <Image
                    source={require('../../assets/i.jpg')}
                    style={styles.headerImage} />
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 6 }}>
                        {name}
                    </Text>
                    <Text style={{ fontSize: 10, color: '#C0C0C0', fontWeight: 'bold' }}>{service}</Text>
                    <Text style={{ fontSize: 10, color: '#FFB266' }}>
                        <MaterialIcons
                            name="star"
                            size={10}
              /*onPress={openMenu}*/ style={styles.icon}
                        />
                        {" " + rating}
                    </Text>
                </View>
                <View>
                    <MaterialIcons
                        name="comment"
                        size={22}
                        style={styles.icon}
                        style={{
                            margin: 22,
                            paddingLeft: 5,
                            paddingRight: 5,
                            paddingBottom: 4,
                            paddingTop: 1,
                            backgroundColor: '#BC53AE',
                            color: 'white',
                            borderRadius: 8,
                        }} />
                </View>
            </View>
            <Text style={{ fontSize: 15, textAlignVertical: 'center', margin: 10, marginTop: 0 }}>
                {description}
            </Text>
        </View>
    );
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}>
            <View style={styles.back}>
                <Header />
                <Card>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 25,
                                marginBottom: 15,
                                width: 200,
                            }}>
                            Popular Services
            </Text>
                        <Text style={{ textAlignVertical: 'center', marginLeft: 90 }}>
                            see all
            </Text>
                    </View>
                    <SafeAreaView style={styles.container}>
                        <FlatList
                            horizontal
                            data={services}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.key}
                            style={{ borderRadius: 20 }}
                        />
                    </SafeAreaView>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 25,
                                marginBottom: 15,
                                width: 200,
                            }}>
                            Available Sellers
            </Text>
                        <Text style={{ textAlignVertical: 'center', marginLeft: 90 }}>
                            see all
            </Text>
                    </View>
                    <SafeAreaView style={styles.container}>
                        <FlatList
                            horizontal
                            data={availableSellers}
                            renderItem={renderAvailableSellers}
                            keyExtractor={(item) => item.key}
                            style={{ borderRadius: 20 }}
                        />
                    </SafeAreaView>
                </Card>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    back: {
        backgroundColor: '#B0389F',
    },
    headerImage: {
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: 50,
    },
    container: {
        borderRadius: 20,
        marginVertical: 30,
    },
    item: {
        // backgroundColor: '#f9c2ff',
        // padding: 20,
        // marginVertical: 8,
        // marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    header: {
        paddingLeft: 35,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    HeaderText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        letterSpacing: 1,
    },
    icon: {
        position: 'absolute',
    },
    headerTitle: {},
});
