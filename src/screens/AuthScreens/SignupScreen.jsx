import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Import Firestore

const SignupScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to handle Signup
  const handleSignup = async () => {
    if (!email || !password || !username) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      // Create user in Firebase Auth
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      // Update Firebase user profile
      await user.updateProfile({displayName: username});

      // Store user data in Firestore
      await firestore().collection('users').doc(user.uid).set({
        username: username,
        email: email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      setLoading(false);
      Alert.alert('Success', 'Signup successful!');
      navigation.navigate('Login');
    } catch (error) {
      setLoading(false);
      console.error('Signup error:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Top Image */}

        {/* Signup Form */}
        <View style={styles.signupBox}>
          <Image
            source={require('../../assets/signup.jpg')} // Replace with your image path
            style={styles.topImage}
            resizeMode="contain"
          />

          {/* Username Input */}
          <TextInput
            label="Username"
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />

          {/* Email Input */}
          <TextInput
            label="Email"
            mode="outlined"
            left={<TextInput.Icon icon="email" />}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          {/* Password Input */}
          <TextInput
            label="Password"
            mode="outlined"
            left={<TextInput.Icon icon="lock" />}
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            right={
              <TextInput.Icon
                icon={passwordVisible ? 'eye' : 'eye-off'}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />

          {/* Confirm Password Input */}
          <TextInput
            label="Confirm Password"
            mode="outlined"
            left={<TextInput.Icon icon="lock" />}
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
            right={
              <TextInput.Icon
                icon={confirmPasswordVisible ? 'eye' : 'eye-off'}
                onPress={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              />
            }
          />

          {/* Signup Button */}
          <Button
            mode="contained"
            loading={loading}
            onPress={handleSignup}
            labelStyle={styles.buttonLabel}
            style={styles.signupButton}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>

          {/* Login Link */}
          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}>
              Login
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  topImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  signupBox: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 5},
    elevation: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  signupButton: {
    width: '100%',
    backgroundColor: '#007BFF',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  loginText: {
    marginTop: 15,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  loginLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
