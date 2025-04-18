import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, ActivityIndicator} from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

import UserContext from '../context/UserContext';
import HomeTabs from './HomeTabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 🔐 Auth Stack (Login & Signup)
const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

// 🌐 Main Navigation Switcher
const AppNavigation = () => {
  const {isLoggedIn, loading} = useContext(UserContext);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return isLoggedIn ? <HomeTabs /> : <AuthStack />;
};

export default AppNavigation;
