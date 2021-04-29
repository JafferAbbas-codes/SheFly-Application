import React from "react";
import { StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import { Searchbar } from 'react-native-paper';
import MyTabs from "./topNavigation.js";
export default function BookingScreen() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                <Searchbar
                    placeholder="Search bookings"
                    value={searchQuery}
                    style={{ borderRadius: 20 }}
                />
            </View>
            <View style={styles.tabContainer}>
                <MyTabs />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#daecfd",
        flex: 1,
    },
    tabContainer: {
        margin: 15,
        flex: 1,
        height:"90%"
    },
    viewmore: {
        backgroundColor: "#ae379d",
        justifyContent: "center",
        alignItems: "center",
        width: "30%",
        paddingHorizontal: 3,
        paddingVertical: 5,
        borderRadius: 20,
        marginVertical:10,

      }
});