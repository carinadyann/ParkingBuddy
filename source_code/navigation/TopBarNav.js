import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

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
    return (
        <Tab.Navigator
            //initialRouteName='Home'
            tabBarOptions={{
                activeTintColor: 'white',
                inactiveTintColor: '#00BD9D',
                labelStyle: { paddingTap: 10, fontSize: 10 },
                style: { padding: 10, height: 70 },
                tabStyle: {
                    backgroundColor: '#8BD7D2',
                }
            }}
        >
        <Tab.Screen
            name="Settings"
            component={Settings}
            options={{ tabBarLabel: "Settings" }}
        />

        </Tab.Navigator>
    );
}

export default function TopBarNavigator() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    )
}