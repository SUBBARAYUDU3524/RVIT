import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, ActivityIndicator} from 'react-native';

import UserContext from '../context/UserContext';
import HomeTabs from './HomeTabs';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import SignupScreen from '../screens/AuthScreens/SignupScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 🔐 Auth Stack (Login & Signup)
const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

// 🌐 Main Navigation Switcher
const AppNavigation = () => {
  const {isLoggedIn, loading} = useContext(UserContext);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return <>{isLoggedIn ? <HomeTabs /> : <AuthStack />}</>;
};

export default AppNavigation;
