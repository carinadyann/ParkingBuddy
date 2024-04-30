import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, Image, Modal, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import BoxContainer from '../BoxContainer';
import { styles } from '../style';

//sample dataset
const dataset = ['Spot 1', 'Spot 2', 'Spot 3', 'Spot 4'];

export default function LocatorScreen({navigation}) {
    return (
        <ScrollView style={styles.container}>
            <Image style={styles.logoCenter} source={require('/Users/carinaadrianzen/Documents/GitHub/ParkingBuddy/source_code/assets/logoName.png')}/>
            <BoxContainer style={styles.boxDark}>
                <Text style={styles.textT}>Open Spots (Live)</Text>
                {dataset.map((item, index) => (
                    <BoxContainer>
                        <Text key={index} style={styles.text}>{item}
                            <Pressable>
                                <Text style={styles.button}>Claim</Text>
                            </Pressable>
                        </Text>
                    </BoxContainer>
                ))}
            </BoxContainer>
        </ScrollView>
    );
}