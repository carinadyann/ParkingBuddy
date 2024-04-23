import * as React from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import * as Font from 'expo-font';
import BoxContainer from '../BoxContainer';
import {styles} from '../style';

export default function ProfileScreen({navigation}) {
    return (
        <View style={styles.containerAdjust}>
            <BoxContainer style={styles.boxDark}>
                <Image style={styles.profile} source={require('/Users/carinaadrianzen/Documents/GitHub/ParkingBuddy/source_code/assets/logo.png')}/>

                <Text>{'\n'}</Text>

                <Text style={styles.text}>First Name: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Last Name: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Preferred Payment: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Saved School Campus: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Membership: <Text>(Replace With Function)</Text></Text>
                <Text>{'\n'}</Text>
                <Pressable style={styles.button} onPress={() => alert('This is the "Profile" screen.')}>
                    <Text style={styles.text}>Edit</Text>
                </Pressable>
            </BoxContainer>
        </View>
    );
}