import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BoxContainer from './BoxContainer';

export default function DisplayComponent(props){
    return (
        <BoxContainer>
            <Text>{props.time.h}</Text>
        </BoxContainer>
    );
}