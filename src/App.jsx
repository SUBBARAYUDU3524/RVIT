import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {UserProvider} from './context/UserContext';
import AppNavigation from './Navigation/AppNavigation';

// Define a custom theme
const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#ffffff',
    surface: '#ffffff',
    text: '#000000',
    placeholder: '#888888',
  },
  roundness: 8, // You can customize the roundness of components
};

const App = () => {
  async function requestUserPermission() {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      } else {
        console.warn('Push notification permission denied.');
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  }

  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('Firebase Messaging Token:', token);
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
  }, []);

  return (
    <PaperProvider theme={customTheme}>
      <UserProvider>
        <AppNavigation />
      </UserProvider>
    </PaperProvider>
  );
};

export default App;
