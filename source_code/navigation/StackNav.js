import * as React from "react";
import { View, Button, Text, Animated } from "react-native";
import { NavigatioonContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function Settings({ navigation }) {
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
            <Button 
                title="Go to Contact"
                onPress={() => navigation.navigate("Contact")}
            />
        </View>
    );
}