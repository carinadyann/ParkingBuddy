import * as React from 'react';
import { StyleSheet, View, Text, Pressable, Image, Modal, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import BoxContainer from '../BoxContainer';
import { styles } from '../style';

export default function PaymentScreen({navigation}) {
    //for modal
    const [modalVisible, setModalVisible] = React.useState(false);
    return (
        <View style={styles.containerAdjust}>
            <BoxContainer style={styles.boxDark}>
                <Text style={styles.text}>Payment Due: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Parking Spot: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Duration Type: <Text>(Ex: Per Hour or Per Day)</Text></Text>
                <Text style={styles.text}>Duration: <Text>(Ex: 01:00:00)</Text></Text>
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