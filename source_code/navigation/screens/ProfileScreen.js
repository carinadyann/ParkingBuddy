import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable, Image, Modal, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import BoxContainer from '../BoxContainer';
import { styles } from '../style';

export default function ProfileScreen({navigation}) {
    //for modal
    const [modalVisible, setModalVisible] = React.useState(false);
    return (
        <ScrollView style={styles.container}>
            <Image style={styles.logoCenter} source={require('/Users/carinaadrianzen/Documents/GitHub/ParkingBuddy/source_code/assets/logoName.png')}/>
            <BoxContainer style={styles.boxDark}>
                <Image style={styles.profile} source={require('/Users/carinaadrianzen/Documents/GitHub/ParkingBuddy/source_code/assets/logo.png')}/>

                <Text>{'\n'}</Text>

                <Text style={styles.text}>First Name: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Last Name: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Preferred Payment: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Saved School Campus: <Text>(Replace With Function)</Text></Text>
                <Text style={styles.text}>Membership: <Text>(Replace With Function)</Text></Text>
                <Text>{'\n'}</Text>

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
                            <Text style={styles.modalText}>This is a modal</Text>
                        </ScrollView>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.button}>
                                <Text style={styles.text}>Close</Text>
                        </TouchableOpacity>
                    </View>

                </Modal>

            </BoxContainer>
        </ScrollView>
    );
}