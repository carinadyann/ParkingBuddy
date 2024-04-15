import React from 'react';
import { StyleSheet, View } from 'react-native';

const BoxContainer = props => {
    return (
        <View style={{...styles.boxContainer, ...props.style}}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    boxContainer: {
        margin: 10,
        padding: 10,
    }
})

export default BoxContainer;