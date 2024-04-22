import * as React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import * as Font from 'expo-font';
import BoxContainer from '../BoxContainer';
//import DisplayComponent from '../DisplayComponent';
import {styles} from '../style';

export default function LocatorScreen({navigation}) {
    return (
        <View style={styles.containerAdjust}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Parking Locator Screen</Text>
        </View>
    );
}