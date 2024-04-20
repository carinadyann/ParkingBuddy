import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import * as Font from 'expo-font';
import BoxContainer from '../BoxContainer';
import DisplayComponent from '../DisplayComponent';
import {styles} from '../style';
//import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export default function HomeScreen({ navigation }) {
    const [time, setTime] = React.useState({ms: 0, s: 0, m: 0, h: 0});
    return (
        <View style={styles.container}>
            <BoxContainer style={styles.boxLight}>
                <BoxContainer style={styles.clockHolder}>
                    <BoxContainer style={styles.stopwatch}>
                        {/* clock held here */}
                        {/* <Text onPress={() => alert('This is the "Home" screen.')}>Home Screen</Text> */}
                        <DisplayComponent time={time}/>
                    </BoxContainer>
                </BoxContainer>
            </BoxContainer>
            <BoxContainer style={styles.boxDark}>
                <Text style={styles.text}>Zone: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Parking Spot: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Duration Type: <Text>(Replace With Function)</Text></Text>
                <Button onPress={() => alert('This is the "Home" screen.')} title="Submit" style={styles.button}/>
            </BoxContainer>
        </View>
    );
}