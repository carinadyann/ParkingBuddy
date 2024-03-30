import * as React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import LocatorScreen from './screens/LocatorScreen';
import PaymentScreen from './screens/PaymentScreen';
import ProfileScreen from './screens/ProfileScreen';
// import SettingsScreen from './screens/SettingsScreen';

// Screen names
const homeName = "Home";
const locatorName = "Locator";
const paymentName = "Payment";
const profileName = "Profile";
// const settingsName = "Settings";

const Tab = createBottomTabNavigator();

function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRoutName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn == homeName) {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (rn == locatorName) {
                        iconName = focused ? 'compass' : 'compass-outline'
                    } else if (rn == paymentName) {
                        iconName = focused ? 'card' : 'card-outline'
                    } else if (rn == profileName) {
                        iconName = focused ? 'person-circle' : 'person-circle-outline'
                    } else if (rn == settingsName) {
                        iconName = focused ? 'list' : 'list-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
            })}
            tabBarOptions={{
                actionTinitColor: 'tomato', // change color
                inactiveTinitColor: 'grey', // change color
                labelStyle: { paddingBottom: 10, fontSize: 10 },
                style: { padding:10, height: 70 }
            }}
        >

            <Tab.Screen name={homeName} component={HomeScreen}/>
            <Tab.Screen name={locatorName} component={LocatorScreen}/>
            <Tab.Screen name={paymentName} component={PaymentScreen}/>
            <Tab.Screen name={profileName} component={ProfileScreen}/>

            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MainContainer;