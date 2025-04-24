import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, ActivityIndicator} from 'react-native';

import UserContext from '../context/UserContext';
import HomeTabs from './HomeTabs';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import SignupScreen from '../screens/AuthScreens/SignupScreen';
import ChattingScreen from '../screens/ChattingScreen';
import AllCourses from '../screens/AllCourses';
import CourseDetails from '../screens/CourseDetails';
import BookingForm from '../screens/BookingForm';
import AllJobsScreen from '../screens/AllJobsScreen';
import JobDetailsScreen from '../screens/JobDetailsScreen';
import JobApplicationScreen from '../screens/JobApplicationScreen';
import AllSupportCategoriesScreen from '../screens/AllSupportCategoriesScreen';
import SupportCategoryDetailsScreen from '../screens/SupportCategoryDetailsScreen';
import BookSupportSlotScreen from '../screens/BookSupportSlotScreen';
import NewSupportRequestScreen from '../screens/NewSupportRequestScreen';
import SupportRequestDetails from '../screens/SupportRequestDetails';
import ConfirmSupportScreen from '../screens/ConfirmSupportScreen';

const Stack = createNativeStackNavigator();

// 🔐 Auth Stack (Login & Signup)
const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

// 🏠 Home Stack (Tabs + Additional Screens)
const HomeStack = () => (
  <Stack.Navigator
    initialRouteName="HomeTabs"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="HomeTabs" component={HomeTabs} />
    <Stack.Screen name="ChatScreen" component={ChattingScreen} />
    <Stack.Screen name="AllCourses" component={AllCourses} />
    <Stack.Screen name="CourseDetails" component={CourseDetails} />
    <Stack.Screen name="BookingForm" component={BookingForm} />
    <Stack.Screen name="AllJobs" component={AllJobsScreen} />
    <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
    <Stack.Screen
      name="SupportRequestDetails"
      component={SupportRequestDetails}
    />
    <Stack.Screen
      name="NewSupportRequest"
      component={NewSupportRequestScreen}
    />
    <Stack.Screen
      name="AllSupportCategories"
      component={AllSupportCategoriesScreen}
    />
    <Stack.Screen name="JobApplication" component={JobApplicationScreen} />
    <Stack.Screen name="BookSupportSlot" component={BookSupportSlotScreen} />
    <Stack.Screen name="ConfirmSupport" component={ConfirmSupportScreen} />
    <Stack.Screen
      name="SupportCategoryDetails"
      component={SupportCategoryDetailsScreen}
    />
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

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;
