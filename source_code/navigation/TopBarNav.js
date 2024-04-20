import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MainContainer from './MainContainer';

import Ionicons from 'react-native-vector-icons/Ionicons';

import SettingsScreen from './screens/SettingsScreen';
import HomeScreen from './screens/HomeScreen';

const homeName = "Home";
const settingsName = "Settings";

function Settings() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#8BD7D2",
            }}
        >
            <Text style={{ fontSize: 20, color: '#00BD9D', fontWeight: "800" }}>
                Settings is here!
            </Text>
        </View>
    );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
        const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            initialRouteName={homeName}
            //initialRouteName='Home'
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;
                    
                    if (rn == homeName) {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (rn == settingsName) {
                        iconName = focused ? 'settings' : 'settings-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
            })}

            tabBarOptions={{
                activeTintColor: 'white',
                inactiveTintColor: '#00BD9D',
                labelStyle: { fontSize: 10 },
                style: { backgroundColor: '#8BD7D2', marginTop: insets.top },
            }}
        >
        
            <Tab.Screen name={homeName} component={HomeScreen}/>
            <Tab.Screen name={settingsName} component={SettingsScreen}/>

        </Tab.Navigator>
    );
}

export default function TopBarNavigator() {
    return <MyTabs />
}