import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, Image, Modal, TouchableOpacity, Button } from 'react-native';
//import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import * as Font from 'expo-font';
import BoxContainer from '../BoxContainer';
import DisplayComponent from '../DisplayComponent';
import { styles } from '../style';
import { GestureHandlerRefContext } from '@react-navigation/stack';
import { RawButton, TextInput } from 'react-native-gesture-handler';
import { savePaymentMethod } from '../../api'; // Import the API function


const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // To ensure the text is never behind the icon
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
        paddingRight: 30, // To ensure the text is never behind the icon
        backgroundColor: 'white',
        marginVertical: 10,
    },
    placeholder: {
        color: 'gray',
    },
};


export default function PaymentScreen({navigation, route}) {
    const { parkingSpot = 'N/A', duration = 'N/A', amount = 0, isTimerFinished = false } = route.params || {};

    const [isPressed, setIsPressed] = React.useState(false);

    //for modal
    const [modalVisible1, setModalVisible1] = React.useState(false);
    const [modalVisible2, setModalVisible2] = React.useState(false);
    const [modalVisible3, setModalVisible3] = React.useState(false);

    //for card payment
    const [paymentModalVisible, setPaymentModalVisible] = React.useState(null);
    const [selectedCard, setSelectedCard] = React.useState(null);

    const [newCardLabel, setNewCardLabel] = React.useState('');
    const [newCardValue, setNewCardValue] = React.useState('');
    const [newCardExpirationDate, setNewCardExpirationDate] = React.useState('');
    const [newCardCvv, setNewCardCvv] = React.useState('');

    const [cardItems, setCardItems] = React.useState([
        { label: "Placeholder: XXXX XXXX XXXX 1234", value: "placeholder_1234", placeholder: true },
        { label: "Placeholder: XXXX XXXX XXXX 5678", value: "placeholder_5678", placeholder: true },
    ]);
    

    //for form
    const [formData, setFormData] = React.useState({
        cardFile: 'N/A', // according to database
        cardType: 'N/A', // pick random from database
    });

    const handlePayment = () => {
        alert(`Payment made using card ending in ${formData.cardFile}`);
        setPaymentModalVisible(false);
    };

    const handleNewCard = () => {
        alert(`New Payment Method Added`);
        setPaymentModalVisible(false);
    };

    const addCard = (newCard) => {
        setCardItems(prevItems => [...prevItems, newCard]);
    };

    const deleteCard = (cardValue) => {
        setCardItems(prevItems => prevItems.filter(card => card.value !== cardValue));
    };

    const handleAddCard = () => {
        addNewCard();
        setModalVisible1(false);
        setModalVisible2(true);
        if (newCardLabel.trim() !== '' && newCardValue.trim() !== '') {
            addCard({  label: newCardLabel, value: newCardValue });
            setNewCardValue('');
            setNewCardValue('');
        }
    };

    const handleDeleteCard = (cardValue) => {
        deleteCard(cardValue);
    };

    const handleSubmit = () => {
        //alert(`Card on File: ${formData.cardFile}, Payment Type: ${formData.cardType}`);
        if (
            formData.cardFile === 'N/A' || // No card selected
            formData.cardFile.startsWith('placeholder_') // Placeholder card selected
        ) {
            alert('Please select a valid card and payment type before proceeding.');
            return;
        }
    
        console.log('Submitting payment with:', formData);
        // Proceed with payment processing...
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

    const handleNewCardChange = (field, value) => {
        setNewCardData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const addNewCard = async () => {
        console.log('Adding a new card with:', {
            cardholderName: newCardLabel,
            cardNumber: newCardValue,
            expirationDate: newCardExpirationDate,
            cvv: newCardCvv,
            cardType: formData.cardType,
        });

        if (
            newCardLabel.trim() === '' ||
            newCardValue.trim() === '' ||
            newCardExpirationDate.trim() === '' ||
            newCardCvv.trim() === '' ||
            formData.cardType === 'N/A'
        ) {
            alert('Please fill all card details and select a valid payment type.');
            return;
        }

        try {
            const userId = 1 // Replace with actual user ID
            const response = await savePaymentMethod({
                userId,
                cardholderName: newCardLabel,
                cardNumber: newCardValue,
                expirationDate: newCardExpirationDate,
                cvv: newCardCvv,
                cardType: formData.cardType,
            });

            if (response.success) {
                alert('Card added successfully.');
                setFormData(prev => ({
                    ...prev,
                    cardFile: `Card ending in ${newCardValue.slice(-4)}`,
                    cardType: formData.cardType,
                }));
            } else {
                alert('Failed to add card.');
            }
        } catch (error) {
            console.error('Error adding new card:', error);
            alert('An error occurred while adding the card.');
        }

        setNewCardLabel('');
        setNewCardValue('');
        setNewCardExpirationDate('');
        setNewCardCvv('');
        setFormData(prev => ({ ...prev, cardType: 'N/A' }));
        setModalVisible1(false);
    };
    

    return (
        <ScrollView style={styles.container}>
            {/* Logo Here */}
            <Image source={require('../../assets/logo.png')} style={styles.logoCenter} />
            <BoxContainer style={styles.boxDark}>
                <Text style={styles.textT}>Make Payment</Text>
                <BoxContainer style={styles.infoContainer}>
                    <Text style={styles.textBold}>Payment Due: <Text style={styles.formText}>${amount}</Text>{'\n'}</Text>
                    <Text style={styles.textBold}>Parking Spot: <Text style={styles.formText}>{parkingSpot}</Text>{'\n'}</Text>
                    <Text style={styles.textBold}>Duration: <Text style={styles.formText}>{duration  + ' Hours'}</Text></Text>
                </BoxContainer>

                <Pressable 
                    style={styles.button}
                    onPress={() => {
                        if (isTimerFinished) {
                            if (formData.cardFile === 'N/A') {
                                alert("Please select a card before preceeding to payment.");
                            } else {
                                setPaymentModalVisible(true);
                            }
                        } else {
                            alert('Please wait until the timer is finished before making a payment.');
                        }
                    }}
                >
                    <Text style={styles.text}>Pay</Text>
                </Pressable>

            </BoxContainer>
            
            <BoxContainer style={styles.boxDark}>
                <Text style={styles.textT}>Card Information</Text>
                <BoxContainer style={styles.infoContainer}>
                    <Text style={styles.text}>Card on File: <Text style={styles.formText}>{formData.cardFile}</Text>{'\n'}</Text>
                    <Text style={styles.text}>Payment Type: <Text style={styles.formText}>{formData.cardType}</Text>{'\n'}</Text>
                </BoxContainer>

                <Pressable style={styles.button} onPress={() => setModalVisible2(true)}>
                    <Text style={styles.text}>Change Payment Method</Text>
                </Pressable>

                {/* Payment Modal */}
                <Modal
                    transparent={true}
                    visible={paymentModalVisible}
                    onRequestClose={() => setPaymentModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.textTDark}>Confirm Payment</Text>
                            <Text>{'\n'}</Text>
                            
                            <Text style={styles.modalText}>Card on File: <Text style={styles.modalUserData}>{formData.cardFile}</Text></Text>
                            <Text>{'\n'}</Text>

                            <Text style={styles.modalText}>Card Type: <Text style={styles.modalUserData}>{formData.cardType}</Text></Text>
                            <Text>{'\n'}</Text>

                            <Text style={styles.modalText}>Payment Charge: <Text style={styles.modalUserData}>${amount}</Text></Text>
                            <Text>{'\n'}</Text>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={handlePayment}
                            >
                                <Text style={styles.text}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setPaymentModalVisible(false)} style={styles.button}>
                            <Text style={styles.text}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

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
                                placeholder={{
                                label: "Select a Card ...",
                                value: null,
                                color: 'white', // Customize the placeholder color here
                                }}
                                style={pickerSelectStyles}
                                items={[
                                    { label: "XXXX XXXX XXXX 1234", value: "XXXX XXXX XXXX 1234" },
                                    { label: "XXXX XXXX XXXX 5678", value: "XXXX XXXX XXXX 5678" },
                                    // Add more options here
                                ]}
                            />

                            <Text>{'\n'}</Text>

                            {/* Dropdown for Payment Type */}
                            <Text style={styles.modalText}>Payment Type: </Text>
                            <RNPickerSelect
                                value={formData.cardType}
                                onValueChange={(itemValue) => handleChange('cardType', itemValue)}
                                placeholder={{
                                label: "Select a Type ...",
                                value: null,
                                color: 'white', // Customize the placeholder color here
                                }}
                                style={pickerSelectStyles}
                                items={[
                                    { label: "Mastercard", value: "Mastercard" },
                                    { label: "Visa", value: "Visa" },
                                    // Add more options here
                                ]}
                            />

                            <Text>{'\n'}</Text>

                            <Pressable style={styles.buttonLink} onPress={() => {
                                setModalVisible2(false);
                                setModalVisible1(true);
                                }}
                            >
                                <Text style={styles.buttonLink}>Add a Card +</Text>
                            </Pressable>


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

                {/* Add Card Modal */}
<Modal 
    animationType='none'
    transparent={true}
    visible={modalVisible1}
    onRequestClose={() => setModalVisible1(false)}
>
    
    <View style={styles.modalContainer}>
        {/* Modal Content */}
        <ScrollView style={styles.modalContent}>
            <Text style={styles.textTDark}>Add a New Card</Text>
            <Text>{'\n'}</Text>

            {/* Cardholder Name Input */}
            <Text style={styles.modalText}>Cardholder Name:</Text>
            <TextInput
                placeholder="Enter cardholder name"
                placeholderTextColor="#CBEEF7"
                style={[styles.inputCustom, { color: 'white' }]}
                value={newCardLabel}
                onChangeText={setNewCardLabel}
            />
            <Text>{'\n'}</Text>

            {/* Card Number */}
            <Text style={styles.modalText}>Card Number:</Text>
            <TextInput
                placeholder='Enter card number'
                placeholderTextColor="#CBEEF7"
                keyboardType='numeric'
                style={[styles.inputCustom, { color: 'white' }]}
                value={newCardValue}
                onChangeText={setNewCardValue}
            />
            <Text>{'\n'}</Text>

            {/* Expiration Date Input */}
            <Text style={styles.modalText}>Expiration Date:</Text>
            <TextInput
                placeholder='MM/YY'
                placeholderTextColor="#CBEEF7"
                style={[styles.inputCustom, { color: 'white' }]}
                value={newCardExpirationDate}
                onChangeText={setNewCardExpirationDate}
            />
            <Text>{'\n'}</Text>

            {/* CVV Input */}
            <Text style={styles.modalText}>CVV:</Text>
            <TextInput
                placeholder='Enter CVV'
                placeholderTextColor="#CBEEF7"
                keyboardType='numeric'
                style={[styles.inputCustom, { color: 'white' }]}
                value={newCardCvv}
                onChangeText={setNewCardCvv}
            />
            <Text style={styles.break}>{'\n'}</Text>

            {/* Payment Type Scroll Wheel */}
            <Text style={styles.modalText}>Payment Type:</Text>
            <TouchableOpacity style={pickerSelectStyles}>
                <RNPickerSelect
                    value={formData.cardType === 'N/A' ? null : formData.cardType}
                    onValueChange={(itemValue) => setFormData(prev => ({ ...prev, cardType: itemValue }))}
                    placeholder={{
                        label: "Select a Payment Type ...",
                        value: null,
                        color: 'gray',
                    }}
                    useNativeAndroidPickerStyle={false}
                    style={pickerSelectStyles}
                    items={[
                        { label: "Visa", value: "Visa" },
                        { label: "Mastercard", value: "Mastercard" },
                    ]}
                />
            </TouchableOpacity>
            <Text>{'\n'}</Text>

            <TouchableOpacity title="Submit" onPress={handleSubmit} style={styles.button}>
                <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
            <Text>{'\n'}</Text>
        </ScrollView>

        <TouchableOpacity onPress={() => {
            setModalVisible1(false);
            setModalVisible2(true);
        }} 
        style={styles.button}
        >
            <Text style={styles.text}>Close</Text>
        </TouchableOpacity>
    </View>
</Modal>
            </BoxContainer>

            <Text>{'\n'}{'\n'}{'\n'}</Text>
            
        </ScrollView>
    );
    
}
