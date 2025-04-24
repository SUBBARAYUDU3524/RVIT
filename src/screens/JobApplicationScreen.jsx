import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {
  Card,
  Title,
  TextInput,
  Button,
  RadioButton,
  HelperText,
} from 'react-native-paper';
import {pick} from '@react-native-documents/picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';

const JobApplicationScreen = ({route, navigation}) => {
  const {jobId} = route.params;
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: '',
    resume: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to upload files',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const pickResume = async () => {
    try {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        throw new Error('Storage permission denied');
      }

      const [result] = await pick({
        mode: 'open',
        allowMultiSelection: false,
        type: ['application/pdf'],
      });

      if (result) {
        setFormData(prev => ({
          ...prev,
          resume: {
            name: result.name,
            uri: result.uri,
            type: result.type,
            size: result.size,
          },
        }));
      }
    } catch (err) {
      console.log('Document pick cancelled or error:', err);
    }
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({...prev, [name]: value}));
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: ''}));
    }
  };

  const uploadResume = async () => {
    if (!formData.resume) return null;

    const user = auth().currentUser;
    if (!user) throw new Error('User not authenticated');

    const filename = `resumes/${user.uid}/${Date.now()}_${
      formData.resume.name
    }`;
    const reference = storage().ref(filename);

    try {
      let path = formData.resume.uri;
      let tempFilePath = null;

      // Handle Android content URIs
      if (Platform.OS === 'android' && path.startsWith('content://')) {
        // Create a temporary file path
        tempFilePath = `${RNFS.CachesDirectoryPath}/${Date.now()}_${
          formData.resume.name
        }`;

        // Copy the content URI to a temporary file
        await RNFS.copyFile(path, tempFilePath);
        path = `file://${tempFilePath}`;
      } else if (Platform.OS === 'android' && !path.startsWith('file://')) {
        path = `file://${path}`;
      }

      // Upload the file
      await reference.putFile(path);

      // Clean up temporary file if we created one
      if (tempFilePath) {
        RNFS.unlink(tempFilePath).catch(() => {});
      }

      return await reference.getDownloadURL();
    } catch (error) {
      console.error('Error uploading resume:', error);
      throw error;
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (!formData.resume) newErrors.resume = 'Resume is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const user = auth().currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Upload resume to storage and get download URL
      const resumeUrl = await uploadResume();

      // Prepare application data
      const applicationData = {
        jobId,
        userId: user.uid,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        experience: formData.experience,
        coverLetter: formData.coverLetter,
        resume: {
          name: formData.resume.name,
          url: resumeUrl,
          size: formData.resume.size,
        },
        createdAt: firestore.FieldValue.serverTimestamp(),
        status: 'pending',
      };

      // Add to Firestore
      await firestore().collection('jobApplications').add(applicationData);

      // ✅ Clear form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        experience: '',
        coverLetter: '',
        resume: null,
      });

      setErrors({}); // Clear any validation errors

      Alert.alert('Success', 'Job applied successfully');
    } catch (error) {
      console.error('Error submitting application:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to submit application. Please try again.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Job Application</Title>

          <TextInput
            label="Full Name"
            mode="outlined"
            value={formData.fullName}
            onChangeText={text => handleChange('fullName', text)}
            error={!!errors.fullName}
            style={styles.input}
          />
          <HelperText type="error" visible={!!errors.fullName}>
            {errors.fullName}
          </HelperText>

          <TextInput
            label="Email"
            mode="outlined"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={text => handleChange('email', text)}
            error={!!errors.email}
            style={styles.input}
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email}
          </HelperText>

          <TextInput
            label="Phone Number"
            mode="outlined"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={text => handleChange('phone', text)}
            error={!!errors.phone}
            style={styles.input}
          />
          <HelperText type="error" visible={!!errors.phone}>
            {errors.phone}
          </HelperText>

          <Text style={styles.sectionLabel}>Years of Experience</Text>
          <RadioButton.Group
            onValueChange={value => handleChange('experience', value)}
            value={formData.experience}>
            <View style={styles.radioGroup}>
              <View style={styles.radioOption}>
                <RadioButton value="0-2" />
                <Text>0-2 years</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="3-5" />
                <Text>3-5 years</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="5+" />
                <Text>5+ years</Text>
              </View>
            </View>
          </RadioButton.Group>
          {errors.experience && (
            <HelperText type="error">{errors.experience}</HelperText>
          )}

          <TextInput
            label="Cover Letter"
            mode="outlined"
            multiline
            numberOfLines={4}
            value={formData.coverLetter}
            onChangeText={text => handleChange('coverLetter', text)}
            style={styles.input}
          />

          <Text style={styles.sectionLabel}>Upload Resume (PDF only)</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={pickResume}>
            <Text style={styles.uploadButtonText}>
              {formData.resume ? formData.resume.name : 'Select Resume File'}
            </Text>
          </TouchableOpacity>
          {errors.resume && (
            <HelperText type="error">{errors.resume}</HelperText>
          )}

          {formData.resume && (
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>{formData.resume.name}</Text>
              <Text style={styles.fileSize}>
                {Math.round(formData.resume.size / 1024)} KB
              </Text>
            </View>
          )}

          {errors.submit && (
            <HelperText type="error" style={styles.submitError}>
              {errors.submit}
            </HelperText>
          )}

          <Button
            mode="contained"
            style={styles.submitButton}
            onPress={handleSubmit}
            loading={isSubmitting}
            disabled={isSubmitting}>
            Submit Application
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#f5f5f5'},
  card: {borderRadius: 8},
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {marginBottom: 8},
  sectionLabel: {fontSize: 16, marginTop: 8, marginBottom: 8, color: '#333'},
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  radioOption: {flexDirection: 'row', alignItems: 'center'},
  uploadButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  uploadButtonText: {color: '#666'},
  fileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  fileName: {flex: 1, color: '#333'},
  fileSize: {color: '#666'},
  submitButton: {marginTop: 16, paddingVertical: 8, backgroundColor: '#2196F3'},
  submitError: {marginBottom: 16, textAlign: 'center'},
});

export default JobApplicationScreen;
