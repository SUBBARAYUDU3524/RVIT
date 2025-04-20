import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PermissionsAndroid,
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

  const handleChange = (name, value) => {
    setFormData(prev => ({...prev, [name]: value}));
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: ''}));
    }
  };

  const pickResume = async () => {
    try {
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

  const handleSubmit = () => {
    if (validate()) {
      console.log('Submitted data:', formData);
      navigation.navigate('ApplicationConfirmation');
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

          <Button
            mode="contained"
            style={styles.submitButton}
            onPress={handleSubmit}>
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
});

export default JobApplicationScreen;
