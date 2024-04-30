import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, Image, Modal, TouchableOpacity, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Font from 'expo-font';
import BoxContainer from '../BoxContainer';
import DisplayComponent from '../DisplayComponent';
import { styles } from '../style';
//import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'\

export default function HomeScreen({ navigation }) {
    const [time, setTime] = React.useState({ms: 0, s: 0, m: 0, h: 0});

    //for modal
    const [modalVisible, setModalVisible] = React.useState(false);

    //for form
    const [formData, setFormData] = React.useState({
        zone: '', // pick random from database
        parkingSpot: '', // pick random from database
        durationType: '30 minutes' // Default duration option
    });

    const handleSubmit = () => {
        // can replace the alert with different action using the form data
        alert('Zone: ${formData.zone}, Parking Spot: ${formData.parkingSpot}, Duration Type: ${formData.durationType}');
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
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
            <BoxContainer style={styles.boxLight}>
            <Image style={styles.profile} source={require('/Users/carinaadrianzen/Documents/GitHub/ParkingBuddy/source_code/assets/logo.png')}/>
                
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
                        <ScrollView style={styles.modalContent}>

                            {/* Dropdown for Zone */}
                            <Text style={styles.modalText}>Zone: </Text>
                            <Picker
                                selectedValue={formData.zone}
                                style={{ height: 50, width: 150 }}
                                onValueChange={(itemValue, itemIndex) => handleChange('zone', itemValue)}
                            >
                                <Picker.Item label="Zone 1" value="Zone 1"/>
                                <Picker.Item label="Zone 2" value="Zone 2"/>
                                {/* add more here */}
                            </Picker>

                            <Text style={styles.modalText}>Parking Spot: </Text>
                            <Picker
                                selectedValue={formData.parkingSpot}
                                style={{ height: 50, width: 150 }}
                                onValueChange={(itemValue, itemIndex) => handleChange('parkingSpot', itemValue)}
                            >
                                <Picker.Item label="A1" value="A1"/>
                                <Picker.Item label="A2" value="A2"/>
                                {/* add more here */}
                            </Picker>

                            <Text style={styles.modalText}></Text>
                            <Picker
                                selectedValue={formData.durationType}
                                style={{ height: 50, width: 150 }}
                                onValueChange={(itemValue, itemIndex) => handleChange('durationType', itemValue)}
                            >
                                <Picker.Item label="30 Minutes" value="30 Minutes"/>
                                <Picker.Item label="1 Hour" value="1 Hour"/>
                                <Picker.Item label="1 Hour 30 Minutes" value="1 Hour 30 Minutes"/>
                                {/* add more here */}
                            </Picker>
    
                            <Button title="Submit" onPress={handleSubmit}/>
                            <Button title="Cancel" onPress={handleCancel}/>
                        </ScrollView>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.button}>
                                <Text style={styles.text}>Close</Text>
                        </TouchableOpacity>
                    </View>

                </Modal>

                <Pressable style={styles.button} onPress={() => alert('This is the "Home" screen.')}>
                    <Text style={styles.text}>Submit</Text>
                </Pressable>
            </BoxContainer>
        </ScrollView>
    );
}