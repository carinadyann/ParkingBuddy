import * as React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import * as Font from 'expo-font';
import BoxContainer from '../BoxContainer';
import {styles} from '../style';

export default function LocatorScreen({navigation}) {
    return (
        <View style={styles.containerAdjust}>
            <BoxContainer style={styles.boxDark}>
                <Text style={styles.textT}>Open Spots (Live)</Text>
            </BoxContainer>
        </View>
    );
}