import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, Image, Modal, TouchableOpacity, Button } from 'react-native';
//import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
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
        zone: 'N/A', // pick random from database
        parkingSpot: 'N/A', // pick random from database
        durationType: 'N/A' // Default duration option
    });

    // Temporary state for modal inputs
    const [tempModalData, setTempModalData] = React.useState({
        zone: 'N/A', // pick random from database
        parkingSpot: 'N/A', // pick random from database
        durationType: 'N/A' // Default duration option
    });

    const handleSubmit = () => {
        setModalVisible(false);
    };

    const handleCancel = () => {
        setFormData(prevState => ({
            ...tempModalData,
        }));
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
        {/* <Image style={styles.logoCenter} source={require('Users/carinaadrianzen/Documents/source_code/assets/logoName.png')}/> */}
            <BoxContainer style={styles.boxLight}>
            {/* <Image style={styles.profile} source={require('Users/carinaadrianzen/Documents/source_code/assets/logo.png')}/> */}
                
                <BoxContainer style={styles.clockHolder}>
                    <BoxContainer style={styles.stopwatch}>
                        {/* clock held here */}
                        <DisplayComponent time={time}/>
                    </BoxContainer>
                </BoxContainer>
            </BoxContainer>

            <BoxContainer style={styles.boxDark}>
                <Text style={styles.textT}>Setup Parking</Text>
                <BoxContainer style={styles.infoContainer}>
                    <Text style={styles.text}>Zone: <Text style={styles.formText}>{formData.zone}</Text>{'\n'}</Text>
                    <Text style={styles.text}>Parking Spot: <Text style={styles.formText}>{formData.parkingSpot}</Text>{'\n'}</Text>
                    <Text style={styles.text}>Duration Type: <Text style={styles.formText}>{formData.durationType}</Text>{'\n'}</Text>
                </BoxContainer>

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
                            <Text style={styles.textTDark}>Tap to Change Selection</Text>
                            <Text>{'\n'}</Text>
                            
                            {/* Dropdown for Zone */}
                            <Text style={styles.modalText}>Zone: </Text>
                            <RNPickerSelect
                                value={formData.zone}
                                onValueChange={(itemValue) => handleChange('zone', itemValue)}
                                placeholder={{
                                label: "Select a Zone ...",
                                value: null,
                                color: 'white', // Customize the placeholder color here
                                }}
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
                                    placeholder: {
                                        color: 'white',
                                    },
                                    iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}
                            
                                items={[
                                    { label: "Zone 1", value: "Zone 1" },
                                    { label: "Zone 2", value: "Zone 2" },
                                    // add more here
                                ]}
                                
                            />
                            <Text>{'\n'}</Text>

                            <Text style={styles.modalText}>Parking Spot: </Text>
                            <RNPickerSelect
                                value={formData.parkingSpot}
                                onValueChange={(itemValue) => handleChange('parkingSpot', itemValue)}
                                placeholder={{
                                label: "Select a Spot ...",
                                value: null,
                                color: 'white', // Customize the placeholder color here
                                }}
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
                                    placeholder: {
                                        color: 'white',
                                    },
                                    iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}
                            
                                items={[
                                    { label: "A1", value: "A1" },
                                    { label: "A2", value: "A2" },
                                    // add more here
                                ]}

                            />
                            <Text>{'\n'}</Text>

                            <Text style={styles.modalText}>Duration Type: </Text>
                            <RNPickerSelect
                                value={formData.durationType}
                                onValueChange={(itemValue) => handleChange('durationType', itemValue)}
                                placeholder={{
                                label: "Select a Duration ...",
                                value: null,
                                color: 'white', // Customize the placeholder color here
                                }}
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
                                    placeholder: {
                                        color: 'white',
                                    },
                                    iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}
                        
                                items={[
                                    { label: "30 Minutes", value: "30 Minutes" },
                                    { label: "1 Hour", value: "1 Hour" },
                                    { label: "1 Hour 30 Minutes", value: "1 Hour 30 Minutes" },
                                    { label: "Day Pass", value: "Day Pass" },
                                ]}
                            />
                            <Text>{'\n'}</Text>
                            <TouchableOpacity title="Submit" onPress={handleSubmit} style={styles.button}>
                                <Text style={styles.text}>Submit</Text>
                            </TouchableOpacity>

                        </ScrollView>
                        
                        <TouchableOpacity title="Cancel" onPress={handleCancel} style={styles.button}>
                                <Text style={styles.text}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </Modal>

                <Pressable style={styles.button} onPress={() => navigation.navigate('Payment', {
                    parkingSpot: formData.parkingSpot,
                    duration: formData.durationType,
                })
                }
                >
                <Text style={styles.text}>Submit</Text>
            </Pressable>
            </BoxContainer>

            <Text>{'\n'}{'\n'}{'\n'}</Text>

        </ScrollView>
    );
}