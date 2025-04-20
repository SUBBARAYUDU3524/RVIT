import React, {useContext, useState} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {TextInput, Button, Text, Card} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import UserContext from '../../context/UserContext';
const LoginScreen = () => {
  const {setIsLoggedIn} = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const token = await userCredential.user.getIdToken();

      // Store token in AsyncStorage
      await AsyncStorage.setItem('RVIT_Token', token);

      // Update context state
      setIsLoggedIn(true);

      // Show success alert and navigate
      Alert.alert('Login Successful', 'Welcome back!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{name: 'HomeTabs'}],
            });
          },
        },
      ]);
    } catch (error) {
      let friendlyMessage = 'An error occurred. Please try again.';
      if (error.code === 'auth/invalid-email') {
        friendlyMessage = 'Invalid email address.';
      } else if (error.code === 'auth/user-not-found') {
        friendlyMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        friendlyMessage = 'Incorrect password.';
      }
      setErrorMessage(friendlyMessage);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Login Illustration */}
      <Image source={require('../../assets/Login.jpg')} style={styles.image} />

      {/* Login Card */}
      <Card style={styles.card}>
        <Card.Title title="Login" titleStyle={styles.title} />
        <Card.Content>
          {/* Error Message */}
          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}

          {/* Email Input */}
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            mode="outlined"
            style={styles.input}
          />

          {/* Password Input */}
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            mode="outlined"
            style={styles.input}
            right={
              <TextInput.Icon
                icon={passwordVisible ? 'eye' : 'eye-off'}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />

          {/* Login Button */}
          <Button
            mode="contained"
            loading={loading}
            onPress={handleLogin}
            style={styles.button}>
            Login
          </Button>

          {/* Signup Link */}
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text
              style={styles.signupLink}
              onPress={() => navigation.navigate('Signup')}>
              Sign up
            </Text>
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  card: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#007BFF',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  signupText: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  signupLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
