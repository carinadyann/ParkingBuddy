import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
    },
    containerAdjust: {
        paddingTop: 60,
        flex: 1,
        backgroundColor: "white",
        padding: 20,
    },
    boxLight: {
        backgroundColor: "#54DEFD",
        padding: 10,
        margin: 10,
        color: "white",
        fontFamily: 'Arial Rounded MT Bold',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
    },
    boxDark: {
        backgroundColor: "#49C6E5",
        padding: 20,
        margin: 10,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
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
    },
    textT: {
        color: "white",
        fontFamily: 'Arial Rounded MT Bold',
        padding: 10,
        fontSize: 20,
        textDecorationLine: 'underline',
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
});