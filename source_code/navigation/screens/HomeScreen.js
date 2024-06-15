import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, Modal, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import BoxContainer from '../BoxContainer';
import DisplayComponent from '../DisplayComponent'; // Make sure this import is correct
import { styles } from '../style';

export default function HomeScreen({ navigation }) {
    const [stopwatchRunning, setStopwatchRunning] = React.useState(false);
    const [stopwatchTime, setStopwatchTime] = React.useState({ h: 0, m: 0, s: 0, ms: 0 });

    // For modal
    const [modalVisible, setModalVisible] = React.useState(false);

    // For form
    const [formData, setFormData] = React.useState({
        zone: 'N/A',
        parkingSpot: 'N/A',
        durationType: 'N/A'
    });

    React.useEffect(() => {
        let interval;
        if (stopwatchRunning) {
            interval = setInterval(() => {
                setStopwatchTime(prevTime => {
                    let updatedMs = prevTime.ms + 10;
                    let updatedS = prevTime.s;
                    let updatedM = prevTime.m;
                    let updatedH = prevTime.h;

                    if (updatedMs >= 100) {
                        updatedS++;
                        updatedMs = 0;
                    }
                    if (updatedS >= 60) {
                        updatedM++;
                        updatedS = 0;
                    }
                    if (updatedM >= 60) {
                        updatedH++;
                        updatedM = 0;
                    }

                    return { h: updatedH, m: updatedM, s: updatedS, ms: updatedMs };
                });
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [stopwatchRunning]);

    const handleSubmit = () => {
        setStopwatchTime({ h: 0, m: 0, s: 0, ms: 0 });
        setStopwatchRunning(true);
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

    const generateTimeRange = () => {
        const times = [];
        const increments = ['00', '30'];
        for (let hour = 0; hour <= 4; hour++) {
            for (let minute of increments) {
                let time = `${hour.toString().padStart(2, '0')}:${minute}`;
                times.push({ label: `${time}`, value: time });
            }
        }
        times.push({ label: "Day Pass", value: "Day Pass" });
        return times;
    };

    const timeOptions = generateTimeRange();

    const calculateAmount = (durationType) => {
        if (!durationType || durationType === 'N/A') {
            return 0;
        } else if (durationType === 'Day Pass') {
            return 9;
        } else {
            const index = timeOptions.findIndex(option => option.value === durationType);
            if (index !== -1) {
                return index;
            } else {
                return 0;
            }
        }
    };

    return (
        <ScrollView style={styles.container}>
            <BoxContainer style={styles.boxLight}>
                <BoxContainer>
                    {/* Ensure DisplayComponent is properly receiving props */}
                    <Text style={styles.textT}>Setup Parking</Text>
                    <DisplayComponent time={stopwatchTime} />
                </BoxContainer>
            </BoxContainer>

            <BoxContainer style={styles.boxDark}>
                <Text style={styles.textT}>Setup Parking</Text>
                <BoxContainer style={styles.infoContainer}>
                    <Text style={styles.text}>Zone: <Text style={styles.formText}>{formData.zone}</Text>{'\n'}</Text>
                    <Text style={styles.text}>Parking Spot: <Text style={styles.formText}>{formData.parkingSpot}</Text>{'\n'}</Text>
                    <Text style={styles.text}>Duration Type: <Text style={styles.formText}>{formData.durationType + ' Hours'}</Text>{'\n'}</Text>
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
                            
                            {/* Dropdowns for Zone, Parking Spot, and Duration Type */}
                            <Text style={styles.modalText}>Zone: </Text>
                            <RNPickerSelect
                                value={formData.zone}
                                onValueChange={(itemValue) => handleChange('zone', itemValue)}
                                placeholder={{
                                    label: "Select a Zone ...",
                                    value: null,
                                    color: 'white',
                                }}
                                style={pickerSelectStyles}
                                items={[
                                    { label: "Zone 1", value: "Zone 1" },
                                    { label: "Zone 2", value: "Zone 2" },
                                    // Add more options as needed
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
                                    color: 'white',
                                }}
                                style={pickerSelectStyles}
                                items={[
                                    { label: "A1", value: "A1" },
                                    { label: "A2", value: "A2" },
                                    // Add more options as needed
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
                                    color: 'white',
                                }}
                                style={pickerSelectStyles}
                                items={timeOptions}
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
                    amount: calculateAmount(formData.durationType),
                })}>
                    <Text style={styles.text}>Submit</Text>
                </Pressable>
            </BoxContainer>
        </ScrollView>
    );
}

const pickerSelectStyles = StyleSheet.create({
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
});
