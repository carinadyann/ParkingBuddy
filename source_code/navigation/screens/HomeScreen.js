import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, Modal, TouchableOpacity, Alert, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import BoxContainer from '../BoxContainer';
import DisplayComponent from '../DisplayComponent';
import { styles as existingStyles } from '../style';
import { saveParkingSetup } from '../../api';

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

        const timeInMinutes = convertDurationToMinutes(durationType);
        setStopwatchTime({ h: Math.floor(timeInMinutes / 60), m: timeInMinutes % 60, s: 0 });
        setStopwatchRunning(true);
        setFormData({ ...tempFormData });
        setModalVisible(false);

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
    };
    

    const timeOptions = generateTimeRange();

    const calculateAmount = (durationType) => {
        if (!durationType || durationType === 'N/A') {
            return 0;
        } else {
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
            }
        }
    };
    

    return (
        <ScrollView style={existingStyles.container}>
            <Image source={require('../../assets/logo.png')} style={existingStyles.logoCenter} />
            <BoxContainer style={existingStyles.boxLight}>
                <BoxContainer>
                    <Text style={existingStyles.textT}>Stopwatch</Text>
                    <Text style={existingStyles.stopwatchText}>
                        {`${stopwatchTime.h.toString().padStart(2, '0')}:${stopwatchTime.m.toString().padStart(2, '0')}:${stopwatchTime.s.toString().padStart(2, '0')}`}
                    </Text>
                </BoxContainer>
            </BoxContainer>

            <BoxContainer style={existingStyles.boxDark}>
                <Text style={existingStyles.textT}>Setup Parking</Text>
                <BoxContainer style={existingStyles.infoContainer}>
                    <Text style={existingStyles.text}>
                        Zone: <Text style={existingStyles.formText}>{tempFormData.zone}</Text>{'\n'}
                    </Text>
                    <Text style={existingStyles.text}>
                        Parking Spot: <Text style={existingStyles.formText}>{tempFormData.parkingSpot}</Text>{'\n'}
                    </Text>
                    <Text style={existingStyles.text}>
                        Duration Type: <Text style={existingStyles.formText}>{tempFormData.durationType ? tempFormData.durationType : 'N/A'}</Text>{'\n'}
                    </Text>
                </BoxContainer>

                <TouchableOpacity style={existingStyles.buttonEdit} onPress={handleEditPress}>
                    <Text style={existingStyles.text}>Edit</Text>
                </TouchableOpacity>

                <Modal
                    animationType='none'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={existingStyles.modalContainer}>
                        <ScrollView style={existingStyles.modalContent}>
                            <Text style={existingStyles.textTDark}>Tap to Change Selection</Text>
                            <Text>{'\n'}</Text>

                            <Text style={existingStyles.modalText}>Zone: </Text>
                            <TouchableOpacity style={pickerSelectStyles}>
                                <RNPickerSelect
                                    value={tempFormData.zone}
                                    onValueChange={(itemValue) => handleTempChange('zone', itemValue)}
                                    placeholder={{
                                        label: "Select a Zone ...",
                                        value: null,
                                        color: 'white',
                                    }}
                                    useNativeAndroidPickerStyle={false}
                                    style={pickerSelectStyles}
                                    items={[
                                        { label: "Zone 1", value: "Zone 1" },
                                        { label: "Zone 2", value: "Zone 2" },
                                    ]}
                                />
                            </TouchableOpacity>
                            <Text>{'\n'}</Text>
                            <Text style={existingStyles.modalText}>Parking Spot: </Text>
                            <TouchableOpacity style={pickerSelectStyles}>
                                <RNPickerSelect
                                    value={tempFormData.parkingSpot}
                                    onValueChange={(itemValue) => handleTempChange('parkingSpot', itemValue)}
                                    placeholder={{
                                        label: "Select a Spot ...",
                                        value: null,
                                        color: 'white',
                                    }}
                                    useNativeAndroidPickerStyle={false}
                                    style={pickerSelectStyles}
                                    items={[
                                        { label: "A1", value: "A1" },
                                        { label: "A2", value: "A2" },
                                    ]}
                                />
                            </TouchableOpacity>
                            <Text>{'\n'}</Text>

                            <Text style={existingStyles.modalText}>Duration Type: </Text>
                            <TouchableOpacity style={pickerSelectStyles}>
                                <RNPickerSelect
                                    value={tempFormData.durationType}
                                    onValueChange={(itemValue) => handleDurationTypeChange(itemValue)}
                                    placeholder={{
                                        label: "Select a Duration ...",
                                        value: null,
                                        color: 'white',
                                    }}
                                    useNativeAndroidPickerStyle={false}
                                    style={pickerSelectStyles}
                                    items={timeOptions}
                                />
                            </TouchableOpacity>
                            <Text>{'\n'}</Text>
                            <TouchableOpacity title="Submit" onPress={handleSubmit} style={existingStyles.button}>
                                <Text style={existingStyles.text}>Submit</Text>
                            </TouchableOpacity>
                        </ScrollView>

                        <TouchableOpacity title="Cancel" onPress={handleCancel} style={existingStyles.button}>
                            <Text style={existingStyles.text}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </BoxContainer>
        </ScrollView>
    );
}

// The styling part is omitted as requested

const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: 'white',
        marginVertical: 10,
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: 'white',
        marginVertical: 10,
    },
    placeholder: {
        color: 'gray',
    },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    logoCenter: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 20,
    },
    textT: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
    },
    stopwatchText: {
        fontSize: 48,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    text: {
        fontSize: 18,
        color: '#000',
    },
    textTDark: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    formText: {
        fontSize: 18,
        color: 'gray',
    },
    buttonEdit: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'center',
    },
    boxLight: {
        backgroundColor: '#F0F0F0',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    boxDark: {
        backgroundColor: '#D0D0D0',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    infoContainer: {
        marginVertical: 10,
    },
});