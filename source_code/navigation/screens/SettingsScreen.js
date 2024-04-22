import * as React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import * as Font from 'expo-font';
import BoxContainer from '../BoxContainer';
//import DisplayComponent from '../DisplayComponent';
import {styles} from '../style';

export default function SettingsScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text
                onPress={() => alert('This is the "Settings" screen.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Settings Screen</Text>
        </View>
    );
}