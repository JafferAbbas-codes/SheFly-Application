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
    // const [value, onChangeText] = React.useState('42|');
    const [Servises, setServises] = useState([
        { text: 'Cooking', key: '1' },
        { text: 'Makeup', key: '2' },
        { text: 'Sewing', key: '3' },
        { text: 'Henna Arts', key: '4' },
        { text: 'Nursing', key: '5' },
        { text: 'Teaching', key: '6' },
    ]);
    const renderItem = ({ item }) => <Item text={item.text} />;
    const Item = ({ text }) => (
        <ImageBackground
            source={require('../../assets/i.jpg')}
            style={{
                height: 120,
                borderRadius: 20,
                margin: 10,
                flex: 1,
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
                                // marginBottom: 15,
                                // width: 200,
                            }}>
                            Services
            </Text>
                    </View>
                    <SafeAreaView style={styles.container}>
                        <FlatList
                            numColumns={2}
                            data={Servises}
                            renderItem={renderItem}
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
