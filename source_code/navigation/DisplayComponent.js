import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BoxContainer from './BoxContainer';

function DisplayComponent(props){
    return (
        <BoxContainer>
            <Text>{props.time.h}</Text>
        </BoxContainer>
    );
}

export default DisplayComponent;