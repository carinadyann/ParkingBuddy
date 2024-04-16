import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Font from 'expo-font';
import BoxContainer from '../BoxContainer';
import DisplayComponent from '../DisplayComponent';
//import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export default function HomeScreen({ navigation }) {
    const [time, setTime] = React.useState({ms: 0, s: 0, m: 0, h: 0});
    return (
        <View style={styles.container}>
            <BoxContainer style={styles.clock}>
                <BoxContainer style={styles.clockHolder}>
                    <BoxContainer style={styles.stopwatch}>
                        {/* clock held here */}
                        {/* <Text onPress={() => alert('This is the "Home" screen.')}>Home Screen</Text> */}
                        <DisplayComponent time={time}/>
                    </BoxContainer>
                </BoxContainer>
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
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
    },
    parking: {
        backgroundColor: "#49C6E5",
    },
    clockHolder: {
        width: 100,
        background: "black",
        margin: 'auto',
        // position: 'relative',
    }, 
    stopwatch: {
        padding: 60,
        textAlign: 'center',
    },
});
