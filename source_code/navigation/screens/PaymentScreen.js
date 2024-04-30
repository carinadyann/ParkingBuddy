import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, Image, Modal, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import BoxContainer from '../BoxContainer';
import { styles } from '../style';

export default function PaymentScreen({navigation}) {
    //for modal
    const [modalVisible1, setModalVisible1] = React.useState(false);
    const [modalVisible2, setModalVisible2] = React.useState(false);
    return (
        <ScrollView style={styles.container}>
            <Image style={styles.logoCenter} source={require('/Users/carinaadrianzen/Documents/GitHub/ParkingBuddy/source_code/assets/logoName.png')}/>
            <BoxContainer style={styles.boxDark}>
                <Text style={styles.text}>Payment Due: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Parking Spot: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Duration Type: <Text>(Ex: Per Hour or Per Day)</Text></Text>
                <Text style={styles.text}>Duration: <Text>(Ex: 01:00:00)</Text></Text>
                <Text>{'\n'}</Text>

                <TouchableOpacity style={styles.buttonEdit} onPress={() => setModalVisible1(true)}>
                    <Text style={styles.text}>Edit</Text>
                </TouchableOpacity>

                {/* Modal Component 1 */}
                <Modal 
                    animationType='none'
                    transparent={true}
                    visible={modalVisible1}
                    onRequestClose={() => setModalVisible1(false)}
                >
                    <View style={styles.modalContainer}>
                        {/* Modal Content */}
                        <ScrollView style={styles.modalContent}>
                            <Text style={styles.modalText}>This is modal 1</Text>
                        </ScrollView>
                        <TouchableOpacity onPress={() => setModalVisible1(false)} style={styles.button}>
                                <Text style={styles.text}>Close</Text>
                        </TouchableOpacity>
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
                <Pressable style={styles.button} onPress={() => setModalVisible2(true)}>
                    <Text style={styles.text}>Change Payment Method</Text>
                </Pressable>

                {/* Modal Component 2 */}
                <Modal 
                    animationType='none'
                    transparent={true}
                    visible={modalVisible2}
                    onRequestClose={() => setModalVisible2(false)}
                >
                    <View style={styles.modalContainer}>
                        {/* Modal Content */}
                        <ScrollView style={styles.modalContent}>
                            <Text style={styles.modalText}>This is modal 2</Text>
                        </ScrollView>
                        <TouchableOpacity onPress={() => setModalVisible2(false)} style={styles.button}>
                                <Text style={styles.text}>Close</Text>
                        </TouchableOpacity>
                    </View>

                </Modal>

            </BoxContainer>
        </ScrollView>
    );
}