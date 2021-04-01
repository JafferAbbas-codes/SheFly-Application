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
import FlatButton from '../../shared/button.js';
import { gStyles } from '../../styles/global';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
export default function getStarted() {
    const [Recommendation, setRecommendation] = useState([
        {
            name: 'Mashama Hafeez',
            rating: '5.0',
            service: 'Make up Artist',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor consectetur adipiscing. Sed id placerat odio.',
            text: 'Makeup',
            key: '1',
        },
        {
            name: 'Mashama Hafeez',
            rating: '5.0',
            service: 'Make up Artist',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id placerat odio. ',
            text: 'Makeup',
            key: '2',
        },
        {
            name: 'Mashama Hafeez',
            rating: '5.0',
            service: 'Make up Artist',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id placerat odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id placerat odio. ',
            text: 'Makeup',
            key: '4',
        },
        {
            name: 'Mashama Hafeez',
            rating: '5.0',
            service: 'Make up Artist',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id placerat odio.  ',
            text: 'Makeup',
            key: '5',
        },
    ]);
    const renderRecommendation = ({ item }) => (
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
                // height: 150,
                // width: 300,
                borderRadius: 15,
                backgroundColor: 'white',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 9.51,

                elevation: 5,
                margin: 5,
            }}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={require('../../assets/i.jpg')}
                    style={styles.headerImage}
                />
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
            <ScrollView>
                <View style={styles.back}>
                    <Header />
                    <Card>

                        <View style={{ flexDirection: 'row' }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 25,
                                    // marginBottom: 10,
                                    // width: 200,
                                }}>
                                Makeup Artists
            </Text>
                        </View>
                        <SafeAreaView style={styles.container}>
                            <FlatList
                                data={Recommendation}
                                renderItem={renderRecommendation}
                                keyExtractor={(item) => item.key}
                                style={{ borderRadius: 20 }}
                            />
                        </SafeAreaView>
                    </Card>
                </View>
            </ScrollView>
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
    title: {
        fontSize: 32,
    },
    icon: {
        position: 'absolute',
    },
});
