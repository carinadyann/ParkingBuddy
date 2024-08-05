import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, Image, Modal, TouchableOpacity, Button, TextInput } from 'react-native';
//import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import * as Font from 'expo-font';
import BoxContainer from '../BoxContainer';
import DisplayComponent from '../DisplayComponent';
import { styles } from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen({ onLogout }) {
    // const navigation = useNavigation();

    //for modals
    const [modalVisible1, setModalVisible1] = React.useState(false);
    const [modalVisible2, setModalVisible2] = React.useState(false);
    const [modalVisible3, setModalVisible3] = React.useState(false);
    const [modalVisible4, setModalVisible4] = React.useState(false);

    //for form
    const [formData, setFormData] = React.useState({
        plate: 'N/A', // input
        model: 'N/A', // input
        year: 'N/A', // input
        color: 'N/A', // dropdown
    });

    // Temporary state for modal inputs
    const [tempModalData, setTempModalData] = React.useState({
        plate: 'N/A', // input
        model: 'N/A', // input
        year: 'N/A', // input
        color: 'N/A', // dropdown
    });

    const handleSubmit = () => {
        setFormData(prevState => ({
            ...prevState,
        }));
        setModalVisible1(false);
    };

    const handleCancel = () => {
        setFormData(prevState => ({
            ...tempModalData,
        }));
        setModalVisible1(false);
    };

    const handleChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleLogout = async () => {
        // await AsyncStorage.removeItem('userToken');
        onLogout();
    };
    
    //   React.useEffect(() => {
    //     navigation.setOptions({
    //       headerRight: () => <Button onPress={handleLogout} title="Logout" />,
    //     });
    //   }, [navigation]);
    
    const generateYearRange = (startYear, endYear) => {
        const years = [];
        for (let year = startYear; year <= endYear; year++) {
            years.push({ label: year.toString(), value: year.toString() });
        }
        return years;
    }

    const yearOptions = generateYearRange(1980, new Date().getFullYear());
    
    return (
        <ScrollView style={styles.container}>
            {/* Logo Here */}
            <Image source={require('../../assets/logo.png')} style={styles.logoCenter} />
            
            <BoxContainer style={styles.boxDark}>
                <Text style={styles.textT}>Vehicle</Text>
                <BoxContainer style={styles.infoContainer}>
                    <Text style={styles.text}>License Plate: <Text style={styles.formText}>{formData.plate}</Text>{'\n'}</Text>
                    <Text style={styles.text}>Make/Model: <Text style={styles.formText}>{formData.model}</Text>{'\n'}</Text>
                    <Text style={styles.text}>Year: <Text style={styles.formText}>{formData.year}</Text>{'\n'}</Text>
                    <Text style={styles.text}>Color: <Text style={styles.formText}>{formData.color}</Text>{'\n'}</Text>
                </BoxContainer>
                
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
                        <ScrollView style={styles.modalContent}>
                            <Text style={styles.textTDark}>Vehicle Details</Text>
                            <Text>{'\n'}</Text>

                            {/* Text Input for License Plate */}
                            <Text style={styles.modalText}>License Plate: </Text>
                            <TextInput
                                style={{
                                    backgroundColor: '#A9E2DF',
                                    color: 'black',
                                    padding: 10,
                                    borderRadius: 5,
                                    placeholderTextColor: 'white',
                                }}
                                onChangeText={(text) => handleChange('plate', text)}
                                placeholder="Enter your license plate number ..."
                                placeholderTextColor='white'
                            />
                            <Text>{'\n'}</Text>

                            {/* Text Input for Make/Model */}
                            <Text style={styles.modalText}>Make/Model: </Text>
                            <TextInput
                                style={{
                                    backgroundColor: '#A9E2DF',
                                    color: 'black',
                                    padding: 10,
                                    borderRadius: 5,
                                    placeholderTextColor: 'white',
                                }}
                                onChangeText={(text) => handleChange('model', text)}
                                placeholder="Enter your make/model ..."
                                placeholderTextColor='white'
                            />
                            <Text>{'\n'}</Text>

                            {/* Dropdown for Year */}
                            <Text style={styles.modalText}>Year: </Text>
                            <RNPickerSelect
                                onValueChange={(value) => handleChange('year', value)}
                                placeholder={{
                                    label: "Select Year...",
                                    value: null,
                                    color: 'white',
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
                                items={yearOptions}
                            />
                            <Text>{'\n'}</Text>

                            {/* Dropdown for Color */}
                            <Text style={styles.modalText}>Color: </Text>
                            <RNPickerSelect
                                onValueChange={(itemValue) => handleChange('color', itemValue)}
                                placeholder={{
                                label: "Select a Color ...",
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
                                    { label: "White", value: "White" },
                                    { label: "Black", value: "Black" },
                                    { label: "Gray", value: "Gray" },
                                    { label: "Silver", value: "Silver" },
                                    { label: "Red", value: "Red" },
                                    { label: "Blue", value: "Blue" },
                                    { label: "Green", value: "Green" },
                                    { label: "Yellow", value: "Yellow" },
                                    { label: "Orange", value: "Orange" },
                                    { label: "Brown", value: "Brown" },
                                    { label: "Beige", value: "Beige" },
                                    { label: "Gold", value: "Gold" },
                                    { label: "Purple", value: "Purple" },
                                ]}
                                
                            />
                            <Text>{'\n'}</Text>

                            <TouchableOpacity title="Submit" onPress={handleSubmit} style={styles.button}>
                                <Text style={styles.text}>Submit</Text>
                            </TouchableOpacity>

                            <Text>{'\n'}</Text>
                        </ScrollView>

                        <TouchableOpacity onPress={() => setModalVisible1(false)} style={styles.button}>
                                <Text style={styles.text}>Close</Text>
                        </TouchableOpacity>
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
                        <ScrollView style={styles.modalContent}>
                            <Text style={styles.textTDark}>Privacy Policy</Text>
                            <Text>{'\n'}</Text>
                            <Text style={styles.modalText}>
                            Privacy Policy for Parking Buddy

This Privacy Policy describes how we collect, use, and share information when you use our Parking Buddy mobile application (the "App").

Information We Collect

Personal Information: When you use the App, we may collect certain personal information such as your name, email address, phone number, and payment information. We collect this information when you register an account, make a purchase, or communicate with us through the App.
Location Information: We may collect and store information about your location when you use the App, such as GPS coordinates or information about nearby Wi-Fi access points and cell towers. This information is used to provide location-based services, such as finding nearby parking spots or navigating to your destination.
Usage Information: We collect information about how you use the App, such as the features you use, the pages you visit, and the actions you take. This information helps us improve the App and provide better services to our users.
How We Use Your Information

We use the information we collect to operate and improve the App, personalize your experience, communicate with you, process transactions, and provide customer support.
We may also use your information to send you promotional emails or notifications about new features or offers, but you can opt out of receiving these communications at any time.
Sharing Your Information

We may share your personal information with third-party service providers who help us operate the App, such as payment processors, cloud storage providers, and analytics services. These service providers are contractually obligated to only use your information to provide services to us and to protect it in accordance with this Privacy Policy.
We may also share your information if we believe it is necessary to comply with applicable laws, regulations, or legal processes, or to protect the rights, property, or safety of our users or others.
Security

We take reasonable measures to protect the security of your information, but no method of transmission over the Internet or electronic storage is 100% secure. Therefore, we cannot guarantee its absolute security.
Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page.
Contact Us

If you have any questions or concerns about this Privacy Policy or our privacy practices, you can contact us at carinadyann@csu.fullerton.edu and/or avences@csu.fullerton.edu.

                            </Text>
                            <Text>{'\n'}</Text>
                            
                        </ScrollView>

                        <TouchableOpacity onPress={() => setModalVisible2(false)} style={styles.button}>
                                <Text style={styles.text}>Close</Text>
                        </TouchableOpacity>
                    </View>

            </Modal>

            <TouchableOpacity style={styles.boxDark} onPress={() => setModalVisible3(true)}>
                <Text style={styles.text}>Terms and Conditions</Text><Text style={styles.textEnd}>{'>'}</Text>
            </TouchableOpacity>

            {/* Modal Component 2 */}
            <Modal
                    animationType='none'
                    transparent={true}
                    visible={modalVisible3}
                    onRequestClose={() => setModalVisible3(false)}
                >
                    <View style={styles.modalContainer}>
                        {/* Modal Content */}
                        <ScrollView style={styles.modalContent}>
                            <Text style={styles.textTDark}>Terms of Service</Text>
                            <Text>{'\n'}</Text>
                            <Text style={styles.modalText}>
                            Terms of Service

These Terms of Service ("Terms") govern your use of the Parking Buddy mobile application (the "App"). By accessing or using the App, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the App.

Use of the App

You must be at least 18 years old to use the App. By using the App, you represent that you are at least 18 years old.
You are responsible for maintaining the confidentiality of your account and password and for restricting access to your device. You agree to accept responsibility for all activities that occur under your account or password.
You agree not to use the App for any illegal or unauthorized purpose. You may not violate any laws in your jurisdiction (including but not limited to copyright laws) when using the App.
Intellectual Property

The App and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
You may not modify, reproduce, distribute, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on the App except as necessary for your own personal, non-commercial use.
User Content

You retain ownership of any content you submit or upload to the App ("User Content"). However, by submitting or uploading User Content, you grant us a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform your User Content in connection with the App and our business.
You represent and warrant that you own or have the necessary licenses, rights, consents, and permissions to grant the foregoing license to us.
Disclaimer

The App is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
We do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the App or otherwise relating to such materials or on any sites linked to the App.
Limitation of Liability

In no event shall we, nor our directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the App; (ii) any conduct or content of any third party on the App; (iii) any content obtained from the App; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
Governing Law

These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
Changes to These Terms

We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
Contact Us

If you have any questions about these Terms, please contact us at carinadyann@csu.fullerton.edu and/or avences@csu.fullerton.edu.
                            </Text>
                            <Text>{'\n'}</Text>
                        </ScrollView>

                        <TouchableOpacity onPress={() => setModalVisible3(false)} style={styles.button}>
                                <Text style={styles.text}>Close</Text>
                        </TouchableOpacity>
                    </View>

            </Modal>

            <TouchableOpacity style={styles.boxDark} onPress={() => setModalVisible4(true)}>
                <Text style={styles.text}>Help</Text><Text style={styles.textEnd}>{'>'}</Text>
            </TouchableOpacity>

            {/* Modal Component 4 */}
            <Modal
                    animationType='none'
                    transparent={true}
                    visible={modalVisible4}
                    onRequestClose={() => setModalVisible4(false)}
                >
                    <View style={styles.modalContainer}>
                        {/* Modal Content */}
                        <ScrollView style={styles.modalContent}>
                            <Text style={styles.modalText}>
                                <Text style={styles.textTDark}>FAQs</Text>
                                <Text>{'\n'}{'\n'}</Text>
                                <BoxContainer style={styles.containerFAQ}>
                                    <Text style={styles.textQ}>Q: What is the Parking Buddy app?{'\n'}</Text>
                                    <Text style={styles.textA}>A: The Parking Buddy app is designed to help you easily find, claim, and pay for parking spots. It also allows you to manage your profile and app settings seamlessly.{'\n'}</Text>
                                </BoxContainer>
                                <BoxContainer style={styles.containerFAQ}>
                                    <Text style={styles.textQ}>Q: How does the time elapsed feature work?{'\n'}</Text>
                                    <Text style={styles.textA}>A: The time elapsed feature on the Home screen tracks the duration of your current parking session. It shows how much time you have left until your session expires, helping you manage your parking time effectively.{'\n'}</Text>
                                </BoxContainer>
                                <BoxContainer style={styles.containerFAQ}>
                                    <Text style={styles.textQ}>Q: What should I do if the app is not working correctly?{'\n'}</Text>
                                    <Text style={styles.textA}>A: First, ensure that you have the latest version of the app installed. If the problem persists, try restarting your device. For further assistance, contact our customer support at carinadyann@csu.fullerton.edu .{'\n'}</Text>
                                </BoxContainer>
                                <BoxContainer style={styles.containerFAQ}>
                                    <Text style={styles.textQ}>Q: How do I update my personal information?{'\n'}</Text>
                                    <Text style={styles.textA}>A: Go to the Profile screen, tap on the edit button to edit any information you wish to update, make the necessary changes, and save your updates.{'\n'}</Text>
                                </BoxContainer>
                                <BoxContainer style={styles.infoContainer}>
                                    <Text style={styles.textQ}>Q: How do I pay for parking?{'\n'}</Text>
                                    <Text style={styles.textA}>A: On the Payment screen, you can add your preferred payment method (credit/debit card, digital wallet, etc.). When you claim a spot or pay for parking, the app will use your saved payment method for a quick and easy transaction.{'\n'}</Text>
                                </BoxContainer>
                            </Text>
                            
                        </ScrollView>

                        <TouchableOpacity onPress={() => setModalVisible4(false)} style={styles.button}>
                            <Text style={styles.text}>Close</Text>
                        </TouchableOpacity>
                    </View>

            </Modal>

            {/* Sign out */}
            <Pressable style={styles.button} onPress={handleLogout}>
                <Text style={styles.text}>Sign Out</Text>
            </Pressable>

            <Text>{'\n'}{'\n'}{'\n'}</Text>

        </ScrollView>
    );
}