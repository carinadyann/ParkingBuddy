import * as React from 'react';
import { StyleSheet, View, Text, Pressable, Image, Modal, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import BoxContainer from '../BoxContainer';
import { styles } from '../style';

export default function SettingsScreen({navigation}) {
    //for modals
    const [modalVisible1, setModalVisible1] = React.useState(false);
    const [modalVisible2, setModalVisible2] = React.useState(false);
    const [modalVisible3, setModalVisible3] = React.useState(false);
    const [modalVisible4, setModalVisible4] = React.useState(false);
    return (
        <View style={styles.container}>
            <BoxContainer style={styles.boxDark}>
                <Text style={styles.textT}>Vehicles</Text>
                <Text style={styles.text}>License Plate: (Replace With Function)</Text>
                <Text style={styles.text}>Make/Model: (Replace With Function)</Text>
                <Text style={styles.text}>Year: (Replace With Function)</Text>
                <Text style={styles.text}>Color: (Replace With Function)</Text>
                
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
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>This is a modal 1</Text>
                            <TouchableOpacity onPress={() => setModalVisible1(false)} style={styles.button}>
                                <Text style={styles.text}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Modal>

            </BoxContainer>
            <TouchableOpacity style={styles.boxDark} onPress={() => setModalVisible2(true)}>
                <Text style={styles.text}>Privacy Policy</Text><Text style={styles.textEnd}>{'>'}</Text>
            </TouchableOpacity>
            {/* Modal Component 2 */}
            <Modal
                    animationType='none'
                    transparent={true}
                    visible={modalVisible2}
                    onRequestClose={() => setModalVisible2(false)}
                >
                    <View style={styles.modalContainer}>
                        {/* Modal Content */}
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>
                                This is modal 2
                            </Text>
                            <TouchableOpacity onPress={() => setModalVisible2(false)} style={styles.button}>
                                <Text style={styles.text}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

            </Modal>
            <Pressable style={styles.boxDark} onPress={() => alert('This is the "Settings" screen.')}>
                <Text style={styles.text}>Terms of Conditions</Text><Text style={styles.textEnd}>{'>'}</Text>
            </Pressable>
            <Pressable style={styles.boxDark} onPress={() => alert('This is the "Settings" screen.')}>
                <Text style={styles.text}>Help</Text><Text style={styles.textEnd}>{'>'}</Text>
            </Pressable>
            {/* Sign out */}
            <Pressable style={styles.button} onPress={() => alert('This is the "Settings" screen.')}>
                <Text style={styles.text}>Sign Out</Text>
            </Pressable>
        </View>
    );
}