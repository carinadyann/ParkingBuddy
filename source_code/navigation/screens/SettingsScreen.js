import * as React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import * as Font from 'expo-font';
import BoxContainer from '../BoxContainer';
import {styles} from '../style';

export default function SettingsScreen({navigation}) {
    return (
        <View style={styles.container}>
            <BoxContainer style={styles.boxDark}>
                <Text style={styles.textT}>Vehicles</Text>
                <Text style={styles.text}>License Plate: (Replace With Function)</Text>
                <Text style={styles.text}>Make/Model: (Replace With Function)</Text>
                <Text style={styles.text}>Year: (Replace With Function)</Text>
                <Text style={styles.text}>Color: (Replace With Function)</Text>
                <Pressable style={styles.button} onPress={() => alert('This is the "Settings" screen.')}>
                    <Text style={styles.text}>Edit</Text>
                </Pressable>
            </BoxContainer>
            <Pressable style={styles.boxDark} onPress={() => alert('This is the "Settings" screen.')}>
                <Text style={styles.text}>Privacy Policy</Text>
            </Pressable>
            <Pressable style={styles.boxDark} onPress={() => alert('This is the "Settings" screen.')}>
                <Text style={styles.text}>Terms of Conditions</Text>
            </Pressable>
            <Pressable style={styles.boxDark} onPress={() => alert('This is the "Settings" screen.')}>
                <Text style={styles.text}>Help</Text>
            </Pressable>
            {/* Sign out */}
            <Pressable style={styles.button} onPress={() => alert('This is the "Settings" screen.')}>
                <Text style={styles.text}>Sign Out</Text>
            </Pressable>
        </View>
    );
}