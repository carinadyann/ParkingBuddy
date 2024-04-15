import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Font from 'expo-font';
import BoxContainer from '../BoxContainer';
//import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <BoxContainer style={styles.clock}>
                <Text onPress={() => alert('This is the "Home" screen.')}>Home Screen</Text>
            </BoxContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
    },
    clock: {
        backgroundColor: "#54DEFD",
        padding: 10,
        margin: 10,
        color: "white",
        fontFamily: 'Arial Rounded MT Bold',
    },
});
