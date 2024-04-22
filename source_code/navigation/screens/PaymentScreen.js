import * as React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import * as Font from 'expo-font';
import BoxContainer from '../BoxContainer';
//import DisplayComponent from '../DisplayComponent';
import {styles} from '../style';

export default function PaymentScreen({navigation}) {
    return (
        <View style={styles.containerAdjust}>
            <BoxContainer style={styles.boxDark}>
                <Text style={styles.text}>Payment Due: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Parking Spot: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Duration Type: <Text>(Ex: Per Hour or Per Day)</Text></Text>
                <Text style={styles.text}>Duration: <Text>(Ex: 01:00:00)</Text></Text>
                <Text>{'\n'}</Text>
                <Pressable style={styles.buttonEdit}>
                    <Text style={styles.text} onPress={() => alert('This is the "Payment" screen.')}>Edit</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => alert('This is the "Payment screen.')}>
                    <Text style={styles.text}>Pay</Text>
                </Pressable>
            </BoxContainer>
            
            <BoxContainer style={styles.boxDark}>
                <Text style={styles.text}>Card on File: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Payment Type: <Text>(Replace With Function)</Text></Text>
                <Text>{'\n'}</Text>
                <Pressable style={styles.button} onPress={() => alert('This is the "Payment screen.')}>
                    <Text style={styles.text}>Change Payment Method</Text>
                </Pressable>
            </BoxContainer>
        </View>
    );
}