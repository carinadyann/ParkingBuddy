import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
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
    button: {
        color: "white",
        fontFamily: 'Arial Rounded MT Bold',
    }
});