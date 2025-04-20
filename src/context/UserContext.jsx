import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [fullProfile, setFullProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if token exists in AsyncStorage and fetch profile
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('RVIT_Token');
        console.log(token, 'token');

        if (token) {
          setIsLoggedIn(true);
          await fetchFullProfile();
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const fetchFullProfile = async () => {
    try {
      const user = auth().currentUser;
      if (user && user.uid) {
        const userDoc = await firestore()
          .collection('RVIT_USERS')
          .doc(user.uid)
          .get();

        if (userDoc.exists) {
          setFullProfile(userDoc.data());
        } else {
          console.warn('User document does not exist');
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('RVIT_Token');
    await auth().signOut();
    setIsLoggedIn(false);
    setFullProfile(null);
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        fullProfile,
        setFullProfile,
        loading,
        fetchFullProfile,
        logout,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
