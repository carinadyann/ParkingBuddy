import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, Image, Modal, TouchableOpacity, Button, TextInput } from 'react-native';
//import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import * as Font from 'expo-font';
import BoxContainer from '../BoxContainer';
import DisplayComponent from '../DisplayComponent';
import { styles } from '../style';

export default function ProfileScreen({navigation}) {
    //for modal
    const [modalVisible, setModalVisible] = React.useState(false);

    //for form
    const [formData, setFormData] = React.useState({
        fname: 'N/A', // first name
        lname: 'N/A', // last name
        payment: 'N/A', // take from other form
        school: 'N/A', // school campus
        membership: 'N/A', // may not use
    });

    // Temporary state for modal inputs
    const [tempModalData, setTempModalData] = React.useState({
        fname: '', // first name
        lname: '', // last name
        payment: '', // take from other form
        school: '', // school campus
        membership: '', // may not use
    });

    const handleSubmit = () => {
        setFormData(prevState => ({
            ...prevState,
            ...tempModalData
        }));
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
            {/* <Image style={styles.logoCenter} source={require('Users/carinaadrianzen/Documents/source_code/assets/logoName.png')}/> */}
            <BoxContainer style={styles.boxDark}>
            <Text style={styles.textT}>My Profile</Text>
                {/* <Image style={styles.profile} source={require('Users/carinaadrianzen/Documents/source_code/assets/logo.png')}/> */}

                <Text>{'\n'}</Text>
                <BoxContainer style={styles.infoContainer}>
                    <Text style={styles.text}>First Name: <Text>{formData.fname}</Text>{'\n'}</Text>
                    <Text style={styles.text}>Last Name: <Text>{formData.lname}</Text>{'\n'}</Text>
                    {/* <Text style={styles.text}>Preferred Payment: <Text>{formData.payment}</Text></Text> */}
                    <Text style={styles.text}>Saved School Campus: <Text>{formData.school}</Text>{'\n'}</Text>
                    {/* <Text style={styles.text}>Membership: <Text>{formData.membership}</Text></Text> */}
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
                        {/* Modal Content */}
                        <ScrollView style={styles.modalContent}>
                            <Text style={styles.textTDark}>Profile Details</Text>
                            <Text>{'\n'}</Text>

                            {/* Text Input for First Name */}
                            <Text style={styles.modalText}>First Name: </Text>
                            <TextInput
                                style={{
                                    backgroundColor: '#A9E2DF',
                                    color: 'black',
                                    padding: 10,
                                    borderRadius: 5,
                                }}
                                value={formData.fname}
                                onChangeText={(text) => handleChange('fname', text)}
                                placeholder="Enter your first name"
                                placeholderTextColor='white'
                            />
                            <Text>{'\n'}</Text>

                            {/* Text Input for Last Name */}
                            <Text style={styles.modalText}>Last Name: </Text>
                            <TextInput
                                style={{
                                    backgroundColor: '#A9E2DF',
                                    color: 'black',
                                    padding: 10,
                                    borderRadius: 5,
                                }}
                                value={formData.lname}
                                onChangeText={(text) => handleChange('lname', text)}
                                placeholder="Enter your last name"
                                placeholderTextColor='white'
                            />
                            <Text>{'\n'}</Text>

                            {/* Dropdown for Saved School Campus */}
                            <Text style={styles.modalText}>Saved School Campus: </Text>
                            <RNPickerSelect
                                value={formData.zone}
                                onValueChange={(itemValue) => handleChange('school', itemValue)}
                                placeholder={{
                                label: "Select a School ...",
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
                                    { label: "California State University Fullerton", value: "CSUF" },
                                    { label: "San Diego State University", value: "SDSU" },
                                    // add more here
                                ]}
                                
                            />
                            <Text>{'\n'}</Text>

                            <TouchableOpacity title="Submit" onPress={handleSubmit} style={styles.button}>
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