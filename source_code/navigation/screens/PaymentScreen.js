import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, Image, Modal, TouchableOpacity, Button } from 'react-native';
//import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import * as Font from 'expo-font';
import BoxContainer from '../BoxContainer';
import DisplayComponent from '../DisplayComponent';
import { styles } from '../style';
import { GestureHandlerRefContext } from '@react-navigation/stack';

export default function PaymentScreen({navigation}) {
    //for modal
    const [modalVisible1, setModalVisible1] = React.useState(false);
    const [modalVisible2, setModalVisible2] = React.useState(false);

    //for form
    const [formData, setFormData] = React.useState({
        cardFile: 'N/A', // according to database
        cardType: 'N/A', // pick random from database
    });

    const handleSubmit = () => {
        //alert(`Card on File: ${formData.cardFile}, Payment Type: ${formData.cardType}`);
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible2(false);
    };

    const handleChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    return (
        <ScrollView style={styles.container}>
            <Image style={styles.logoCenter} source={require('/Users/carinaadrianzen/Documents/GitHub/ParkingBuddy/source_code/assets/logoName.png')}/>
            <BoxContainer style={styles.boxDark}>
                <Text style={styles.text}>Payment Due: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Parking Spot: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Duration: <Text>(Ex: 01:00:00)</Text></Text>

                <Pressable style={styles.button} onPress={() => alert('This is the "Payment screen.')}>
                    <Text style={styles.text}>Pay</Text>
                </Pressable>

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
                            <Text>This is modal 1</Text>
                        </ScrollView>
                        <TouchableOpacity onPress={() => setModalVisible1(false)} style={styles.button}>
                                <Text style={styles.text}>Close</Text>
                        </TouchableOpacity>
                    </View>

                </Modal>

            </BoxContainer>
            
            <BoxContainer style={styles.boxDark}>
                <Text style={styles.text}>Card on File: <Text>{formData.cardFile}</Text></Text>
                <Text style={styles.text}>Payment Type: <Text>{formData.cardType}</Text></Text>

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
                            <Text style={styles.textTDark}>Change Payment</Text>
                            <Text>{'\n'}</Text>

                            {/* Dropdown for Card */}
                            <Text style={styles.modalText}>Card on File: </Text>
                            <RNPickerSelect
                                value={formData.cardFile}
                                onValueChange={(itemValue) => handleChange('cardFile', itemValue)}
                                style={{
                                    inputIOS: {
                                    backgroundColor: '#A9E2DF',
                                        color: 'black',
                                        padding: 10,
                                        borderRadius: 5,
                                    },
                                    inputAndroid: {
                                        backgroundColor: '#A9E2DF',
                                        color: 'black',
                                        padding: 10,
                                        borderRadius: 5,
                                    },
                                    iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}
                                items={[
                                    { label: "XXXX XXXX XXXX XXXX", value: "XXXX XXXX XXXX XXXX" },
                                    { label: "XXXX XXXX XXXX XXXX", value: "XXXX XXXX XXXX XXXX" },
                                    // Add more options here
                                ]}
                            />

                            {/* Dropdown for Payment Type */}
                            <Text style={styles.modalText}>Payment Type: </Text>
                            <RNPickerSelect
                                value={formData.cardType}
                                onValueChange={(itemValue) => handleChange('cardType', itemValue)}
                                style={{
                                    inputIOS: {
                                        backgroundColor: '#A9E2DF',
                                        color: 'black',
                                        padding: 10,
                                        borderRadius: 5,
                                    },
                                    inputAndroid: {
                                        backgroundColor: '#A9E2DF',
                                        color: 'black',
                                        padding: 10,
                                        borderRadius: 5,
                                    },
                                    iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}
                                items={[
                                    { label: "Mastercard", value: "Mastercard" },
                                    { label: "Visa", value: "Visa" },
                                    // Add more options here
                                ]}
                            />

                            <Text>{'\n'}</Text>
                            <TouchableOpacity title="Submit" onPress={handleSubmit} style={styles.button}>
                                <Text style={styles.text}>Submit</Text>
                            </TouchableOpacity>

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