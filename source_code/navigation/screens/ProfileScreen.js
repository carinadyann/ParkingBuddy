import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import BoxContainer from '../BoxContainer';
import DisplayComponent from '../DisplayComponent';
import { styles } from '../style';
import { saveUserProfile } from '../../api'; // Ensure this is implemented

export default function ProfileScreen({ navigation }) {
    // For modal
    const [modalVisible, setModalVisible] = React.useState(false);

    // For form
    // Using "N/A" for fname, lname, and school just like HomeScreen does for its fields.
    const [formData, setFormData] = React.useState({
        fname: 'N/A', 
        lname: 'N/A', 
        school: 'N/A', 
    });

    const handleSubmit = () => {
        const { fname, lname, school } = formData;

        if (!fname || fname === 'N/A' || !lname || lname === 'N/A' || !school || school === 'N/A') {
            Alert.alert('Error', 'Please fill in all the required fields.');
            return;
        }

        saveUserProfile(fname, lname, school)
            .then(() => {
                Alert.alert('Success', 'User profile saved successfully!');
                // Now navigate to the Locator screen, passing the chosen campus
                navigation.navigate('Locator', { selectedSchool: school });
            })
            .catch((error) => {
                console.error('Error saving user profile:', error);
                Alert.alert('Error', 'There was a problem saving the user profile. Please try again.');
            });

    };

    const handleChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    // Define your array of items
    // Must match the ENUM in the database: 
    // ENUM('Arizona State University', 'California State University Los Angeles', 'San Diego State University')
    const schoolCampuses = [
        { label: "Arizona State University", value: "Arizona State University" },
        { label: "California State Polytechnic University Pomona", value: "California State Polytechnic University Pomona" },
        { label: "California State University Dominguez Hills", value: "California State University Dominguez Hills" },
        { label: "California State University Fullerton", value: "California State University Fullerton" },
        { label: "California State University Long Beach", value: "California State University Long Beach" },
        { label: "California State University Los Angeles", value: "California State University Los Angeles" },
        { label: "California State University Northridge", value: "California State University Northridge" },
        { label: "California State University San Bernardino", value: "California State University San Bernardino" },
        { label: "San Diego State University", value: "San Diego State University" },
        { label: "University of California Irvine", value: "University of California Irvine" },
        { label: "University of California Riverside", value: "University of California Riverside" },
    ];

    // Sort the array of items alphabetically by label
    const sortItemsAlphabetically = (items) => items.sort((a, b) => a.label.localeCompare(b.label));
    const sortedSchoolCampuses = sortItemsAlphabetically(schoolCampuses);
    //console.log('School Campuses:', sortedSchoolCampuses);

    return (
        <ScrollView style={styles.container}>
            {/* Logo */}
            <Image source={require('../../assets/logo.png')} style={styles.logoCenter} />

            <BoxContainer style={styles.boxDark}>
                <Text style={styles.textT}>My Profile</Text>
                <Text style={styles.break}>{'\n'}</Text>

                {/* Profile Image */}
                <Image source={require('../../assets/logo.png')} style={styles.profile} />

                <Text style={styles.break}>{'\n'}</Text>
                <BoxContainer style={styles.infoContainer}>
                    <Text style={styles.text}>First Name: <Text style={styles.formText}>{formData.fname}</Text>{'\n'}</Text>
                    <Text style={styles.text}>Last Name: <Text style={styles.formText}>{formData.lname}</Text>{'\n'}</Text>
                    <Text style={styles.text}>Saved School Campus: <Text style={styles.formText}>{formData.school}</Text>{'\n'}</Text>
                </BoxContainer>

                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
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
                        <ScrollView style={styles.modalContent}>
                            <Text style={styles.textTDark}>Profile Details</Text>
                            <Text>{'\n'}</Text>

                            <Text style={styles.modalText}>First Name: </Text>
                            <TextInput
                                style={{
                                    backgroundColor: '#A9E2DF',
                                    color: 'black',
                                    padding: 10,
                                    borderRadius: 5,
                                }}
                                onChangeText={(text) => handleChange('fname', text)}
                                placeholder="Enter your first name ..."
                                placeholderTextColor='white'
                            />
                            <Text>{'\n'}</Text>

                            <Text style={styles.modalText}>Last Name: </Text>
                            <TextInput
                                style={{
                                    backgroundColor: '#A9E2DF',
                                    color: 'black',
                                    padding: 10,
                                    borderRadius: 5,
                                }}
                                onChangeText={(text) => handleChange('lname', text)}
                                placeholder="Enter your last name"
                                placeholderTextColor='white'
                            />
                            <Text>{'\n'}</Text>

                            <Text style={styles.modalText}>Saved School Campus: </Text>
                            {/* Using a TouchableOpacity wrapper as in HomeScreen.js */}
                            <TouchableOpacity style={pickerSelectStyles}>
                                <RNPickerSelect
                                    value={formData.school}
                                    onValueChange={(itemValue) => handleChange('school', itemValue)}
                                    placeholder={{
                                        label: "Select a School ...",
                                        value: null,
                                        color: 'white',
                                    }}
                                    useNativeAndroidPickerStyle={false}
                                    style={pickerSelectStyles}
                                    items={sortedSchoolCampuses}
                                />
                            </TouchableOpacity>
                            <Text>{'\n'}</Text>

                            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                                <Text style={styles.text}>Submit</Text>
                            </TouchableOpacity>
                        </ScrollView>

                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.button}>
                            <Text style={styles.text}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </BoxContainer>

            <Text>{'\n'}{'\n'}{'\n'}</Text>
        </ScrollView>
    );
}

// Replicating HomeScreen logic for pickerSelectStyles
const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure text is never behind the icon
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
        paddingRight: 30,
        backgroundColor: 'white',
        marginVertical: 10,
    },
    placeholder: {
        color: 'gray',
    },
};
