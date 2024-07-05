import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        backgroundColor: "white",
        padding: 20,
        height: '100%',
        flex: 1,
    },
    boxLight: {
        backgroundColor: "#54DEFD",
        padding: 20,
        margin: 10,
        color: "white",
        fontFamily: 'Arial Rounded MT Bold',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
    },
    boxDark: {
        backgroundColor: "#49C6E5",
        padding: 20,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
    },
    infoContainer: {
        padding: 0,
    },
    containerFAQ: {
        padding: 0,
        borderBottomWidth: 2,
        borderBottomColor: '#A9E2DF',
    },
    parking: {
        backgroundColor: "#49C6E5",
    },
    clockHolder: {
        width: 100,
        background: "black",
        margin: 'auto',
        // position: 'relative',
    }, 
    stopwatch: {
        padding: 60,
        textAlign: 'center',
    },
    text: {
        color: "white",
        fontFamily: 'Arial Rounded MT Bold',
        padding: 5,
        fontSize: 17,
    },
    formText: {
        color: "#D4F6FF",
        fontFamily: 'Arial Rounded MT Bold',
        padding: 5,
        fontSize: 17,
    },
    textT: {
        color: "white",
        fontFamily: 'Arial Rounded MT Bold',
        padding: 10,
        fontSize: 26,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    textQ: {
        color: "black",
        fontSize: 20,
    },
    textA: {
        color: "black",
        fontSize: 15,
    },
    textTDark: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    textEnd: {
        color: "white",
        fontFamily: 'Arial Rounded MT Bold',
        padding: 5,
        textAlign: 'right',
        marginTop: -26,
    },
    textSpace: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: "white",
        fontFamily: 'Arial Rounded MT Bold',
        padding: 10,
        fontSize: 20,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    stopwatchText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        color: "white",
        fontFamily: 'Arial Rounded MT Bold',
        backgroundColor: "#8BD7D2",
        margin: 10,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
    },
    buttonEdit: {
        alignItems: 'center',
        justifyContent: 'center',
        color: "white",
        fontFamily: 'Arial Rounded MT Bold',
        backgroundColor: "#A9E2DF",
        margin: 10,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
    },
    buttonMore: {
        backgroundColor: "#49C6E5",
        padding: 20,
        margin: 10,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
    },
    logoCenter: {
        width: 70,
        height: 70,
        alignSelf: 'center',
    },
    profile: {
        width: 70,
        height: 70,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 50,
    },
    // modal container
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        elevation: 5,
        borderRadius: 10,
        maxHeight: 450,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
});