import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import LocatorScreen from './screens/LocatorScreen';
import PaymentScreen from './screens/PaymentScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

// Screen names
const homeName = "Home";
const locatorName = "Locator";
const paymentName = "Payment";
const profileName = "Profile";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

function MainContainer({ onLogout }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          headerShown: false,  // Ensure header is hidden
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === locatorName) {
              iconName = focused ? 'compass' : 'compass-outline';
            } else if (rn === paymentName) {
              iconName = focused ? 'card' : 'card-outline';
            } else if (rn === profileName) {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#00BD9D',
          tabBarLabelStyle: {
            paddingBottom: 3,
            fontSize: 10,
          },
          tabBarItemStyle: {
            backgroundColor: '#8BD7D2',
          },
          tabBarStyle: {
            padding: 0,
            height: 80,
          },
        })}
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={locatorName} component={LocatorScreen} />
        <Tab.Screen name={paymentName} component={PaymentScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
        <Tab.Screen name={settingsName}>
          {() => <SettingsScreen onLogout={onLogout} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
