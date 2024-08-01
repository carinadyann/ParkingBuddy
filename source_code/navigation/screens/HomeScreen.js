import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, Modal, TouchableOpacity, Alert, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import BoxContainer from '../BoxContainer';
import DisplayComponent from '../DisplayComponent';
import { styles } from '../style';
import { PrivateValueStore } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
    const [durationType, setDurationType] = React.useState(null);
    const [stopwatchTime, setStopwatchTime] = React.useState({ h: 0, m: 0, s: 0, ms: 0 });
    const [stopwatchRunning, setStopwatchRunning] = React.useState(false);
    const [isTimerFinished, setIsTimerFinished] = React.useState(false);

    // For modal
    const [modalVisible, setModalVisible] = React.useState(false);

    // For form
    const [formData, setFormData] = React.useState({
        zone: null,
        parkingSpot: null,
        durationType: null,
    });

    // Temporary form data 
    const [tempFormData, setTempFormData] = React.useState({
        zone: "N/A",
        parkingSpot: "N/A",
        durationType: "N/A",
    });

    const handleSubmit = () => {
        const { zone, parkingSpot, durationType } = tempFormData;
    
        if (!zone || !parkingSpot || !durationType) {
            Alert.alert('Error', 'Please fill in all the required fields.');
            return;
        }
    
        if (durationType === 'Day Pass') {
            setStopwatchTime({ h: 24, m: 0, s: 0 });
        } else {
            const [hours, minutes] = durationType.split(':');
            setStopwatchTime({ h: parseInt(hours), m: parseInt(minutes), s: 0 });
        }
        setStopwatchRunning(true);
        setFormData({ ...tempFormData });
        setModalVisible(false);

        navigation.navigate('Payment', {
            parkingSpot: tempFormData.parkingSpot,
            duration: tempFormData.durationType,
            amount: calculateAmount(tempFormData.durationType),
            isTimerFinished: isTimerFinished
        });
    };
    

    const handleDurationTypeChange = (value) => {
        handleTempChange('durationType', value);
        setDurationType(value);
    };

    React.useEffect(() => {
        let timer;
        if (stopwatchRunning) {
            timer = setInterval(() => {
                setStopwatchTime(prevTime => {
                    let { h, m, s } = prevTime;
                    if (s > 0) {
                        return { h, m, s: s - 1 };
                    } else if (m > 0) {
                        return { h, m: m - 1, s: 59 };
                    } else if (h > 0) {
                        return { h: h - 1, m: 59, s: 59 };
                    } else {
                        clearInterval(timer);
                        setStopwatchRunning(false);
                        setIsTimerFinished(true);
                        return { h, m, s };
                    }
                });
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [stopwatchRunning]);

    const handleCancel = () => {
        setTempFormData({ ...formData });
        setModalVisible(false);
    };

    const handleEditPress = () => {
        setTempFormData({ ...formData });
        setModalVisible(true);
    };

    const handleTempChange = (field, value) => {
        setTempFormData(prevState => ({
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
        {/* Logo Here */}
        <Image source={require('../../assets/logoName.png')} style={styles.logoCenter} />
            <BoxContainer style={styles.boxLight}>
                <BoxContainer>
                    {/* Ensure DisplayComponent is properly receiving props */}
                    <Text style={styles.textT}>Stopwatch</Text>
                    <Text style={styles.stopwatchText}>
                    {`${stopwatchTime.h.toString().padStart(2, '0')}:${stopwatchTime.m.toString().padStart(2, '0')}:${stopwatchTime.s.toString().padStart(2, '0')}`}
                    </Text>
                </BoxContainer>
            </BoxContainer>

            <BoxContainer style={styles.boxDark}>
                <Text style={styles.textT}>Setup Parking</Text>
                <BoxContainer style={styles.infoContainer}>
                    <Text style={styles.text}>Zone: <Text style={styles.formText}>{tempFormData.zone}</Text>{'\n'}</Text>
                    <Text style={styles.text}>Parking Spot: <Text style={styles.formText}>{tempFormData.parkingSpot}</Text>{'\n'}</Text>
                    <Text style={styles.text}>Duration Type: <Text style={styles.formText}>{tempFormData.durationType ? tempFormData.durationType: 'N/A' + ' Hours'}</Text>{'\n'}</Text>
                </BoxContainer>

                <TouchableOpacity style={styles.buttonEdit} onPress={handleEditPress}>
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
                                value={tempFormData.zone}
                                onValueChange={(itemValue) => handleTempChange('zone', itemValue)}
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
                                value={tempFormData.parkingSpot}
                                onValueChange={(itemValue) => handleTempChange('parkingSpot', itemValue)}
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
                                value={tempFormData.durationType}
                                // onValueChange={(itemValue) => handleChange('durationType', itemValue)}
                                onValueChange={handleDurationTypeChange}
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

                {/* <Pressable style={styles.button} onPress={() => navigation.navigate('Payment', {
                    parkingSpot: formData.parkingSpot,
                    duration: formData.durationType,
                    amount: calculateAmount(formData.durationType),
                })}>
                    <Text style={styles.text}>Submit</Text>
                </Pressable> */}
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
