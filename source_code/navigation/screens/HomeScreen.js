import * as React from 'react';
import { StyleSheet, View, Text, Pressable, Image, Modal, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import BoxContainer from '../BoxContainer';
import DisplayComponent from '../DisplayComponent';
import { styles } from '../style';
//import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export default function HomeScreen({ navigation }) {
    const [time, setTime] = React.useState({ms: 0, s: 0, m: 0, h: 0});
    //for modal
    const [modalVisible, setModalVisible] = React.useState(false);
    return (
        <View style={styles.container}>
            <BoxContainer style={styles.boxLight}>
            <Image style={styles.logoCenter} source={require('/Users/carinaadrianzen/Documents/GitHub/ParkingBuddy/source_code/assets/logo.png')}/>
                
                <BoxContainer style={styles.clockHolder}>
                    <BoxContainer style={styles.stopwatch}>
                        {/* clock held here */}
                        <DisplayComponent time={time}/>
                    </BoxContainer>
                </BoxContainer>
            </BoxContainer>

            <BoxContainer style={styles.boxDark}>
                <Text style={styles.text}>Zone: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Parking Spot: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Duration Type: <Text>(Replace With Function)</Text></Text>
                <Text>{'\n'}</Text>

                <TouchableOpacity style={styles.buttonEdit} onPress={() => setModalVisible(true)}>
                    <Text style={styles.text}>Edit</Text>
                </TouchableOpacity>

                {/* Modal Component */}
                <Modal 
                    animationType='none'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        {/* Modal Content */}
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>This is a modal</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.button}>
                                <Text style={styles.text}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Modal>

                <Pressable style={styles.button} onPress={() => alert('This is the "Home" screen.')}>
                    <Text style={styles.text}>Submit</Text>
                </Pressable>
            </BoxContainer>
        </View>
    );
}