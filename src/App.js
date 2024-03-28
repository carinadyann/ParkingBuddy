// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity } from 'react-native';

const HomeScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home Screen</Text>
    </View>
);

const MapScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Map Screen</Text>
    </View>
);

const PaymentScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Payment Screen</Text>
    </View>
);

const ProfileScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile Screen</Text>
    </View>
);

const ChatBox = () => (
    <TouchableOpacity
        style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 25,
            zIndex: 999,
        }}
    >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Chat</Text>
    </TouchableOpacity>
);

const Tab = createBottomTabNavigator();

const App = () => (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Payment" component={PaymentScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
        <ChatBox />
    </NavigationContainer>
);

export default App;

