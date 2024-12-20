import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, Modal, TouchableOpacity, Alert, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import BoxContainer from '../BoxContainer';
import DisplayComponent from '../DisplayComponent';
import { styles } from '../style';
import { PrivateValueStore } from '@react-navigation/native';
// Fixed the import path
import { saveParkingSetup } from '../../api/api.js';

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

<<<<<<< Updated upstream
        navigation.navigate('Payment', {
            parkingSpot: tempFormData.parkingSpot,
            duration: tempFormData.durationType,
            amount: calculateAmount(tempFormData.durationType),
            isTimerFinished: isTimerFinished
        });
=======
        // Call saveParkingSetup with separate arguments instead of passing tempFormData
        saveParkingSetup(zone, parkingSpot, durationType)
            .then(() => {
                navigation.navigate('Payment', {
                    parkingSpot: tempFormData.parkingSpot,
                    duration: tempFormData.durationType,
                    amount: calculateAmount(tempFormData.durationType),
                    isTimerFinished: isTimerFinished
                });
            })
            .catch((error) => {
                console.error('Error saving parking setup:', error);
                Alert.alert('Error', 'There was a problem saving the parking setup. Please try again.');
            });
    };

    const convertDurationToMinutes = (durationType) => {
        switch(durationType) {
            case "00:00":
                return 0;
            case "00:30":
                return 30;
            case "01:00":
                return 60;
            case "01:30":
                return 90;
            case "02:00":
                return 120;
            case "02:30":
                return 150;
            case "03:00":
                return 180;
            case "03:30":
                return 210;
            case "04:00":
                return 240;
            case "04:30":
                return 270;
            case "Day Pass":
                return 1440; // 24 hours in minutes
            default:
                return 0;
        }
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
        return [
            { label: "00:00", value: "00:00" },
            { label: "00:30", value: "00:30" },
            { label: "01:00", value: "01:00" },
            { label: "01:30", value: "01:30" },
            { label: "02:00", value: "02:00" },
            { label: "02:30", value: "02:30" },
            { label: "03:00", value: "03:00" },
            { label: "03:30", value: "03:30" },
            { label: "04:00", value: "04:00" },
            { label: "04:30", value: "04:30" },
            { label: "Day Pass", value: "Day Pass" },
        ];
>>>>>>> Stashed changes
    };
    

    const timeOptions = generateTimeRange();

    const calculateAmount = (durationType) => {
        if (!durationType || durationType === 'N/A') {
            return 0;
        } else if (durationType === 'Day Pass') {
            return 9;
        } else {
<<<<<<< Updated upstream
            const index = timeOptions.findIndex(option => option.value === durationType);
            if (index !== -1) {
                return index;
            } else {
                return 0;
=======
            switch (durationType) {
                case '00:00':
                    return 0; // Maybe no charge for 0 minutes?
                case '00:30':
                    return 1;
                case '01:00':
                    return 2;
                case '01:30':
                    return 3;
                case '02:00':
                    return 4;
                case '02:30':
                    return 5;
                case '03:00':
                    return 6;
                case '03:30':
                    return 7;
                case '04:00':
                    return 8;
                case '04:30':
                    return 9;
                case 'Day Pass':
                    return 10; // Assign a flat rate for Day Pass
                default:
                    return 0;
>>>>>>> Stashed changes
            }
        }
    };
    

    return (
        <ScrollView style={styles.container}>
        {/* Logo Here */}
        <Image source={require('../../assets/logo.png')} style={styles.logoCenter} />
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

                {/* <Pressable style={styles.button} onPress={() => navigation.navigate('Parking Setup')}>
                    <Text style={styles.text}>Next Screen</Text>
                </Pressable> */}
            </BoxContainer>
        </ScrollView>
    );
}

const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        backgroundColor: 'white',
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        backgroundColor: 'white',
    },
};

