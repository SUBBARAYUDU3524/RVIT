import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const NewSupportRequest = () => {
  const [formData, setFormData] = useState({
    supportType: '',
    fullName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const supportTypes = [
    {label: 'Full Time Support', value: 'Full Time', icon: 'calendar'},
    {label: 'Part Time Support', value: 'Part Time', icon: 'calendar-clock'},
    {label: 'Contract Based', value: 'Contract', icon: 'file-sign'},
    {label: 'Consultation', value: 'Consultation', icon: 'comment-question'},
    {label: 'Emergency Support', value: 'Emergency', icon: 'alert-circle'},
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    Animated.timing(rotateAnim, {
      toValue: dropdownOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const selectSupportType = type => {
    setFormData({...formData, supportType: type});
    setDropdownOpen(false);
    Animated.timing(rotateAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.supportType)
      newErrors.supportType = 'Support type is required';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.description.trim())
      newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const user = auth().currentUser;
      if (!user) {
        Alert.alert(
          'Error',
          'You must be logged in to submit a support request',
        );
        return;
      }

      await firestore()
        .collection('supportRequests')
        .add({
          ...formData,
          userId: user.uid,
          userEmail: user.email,
          createdAt: firestore.FieldValue.serverTimestamp(),
          status: 'Pending',
        });

      Alert.alert(
        'Success',
        'Your support request has been submitted successfully',
      );

      setFormData({
        supportType: '',
        fullName: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        description: '',
      });

      navigation.navigate('SupportRequestDetails', {
        supportRequest: formData, // or the data you get back from Firestore
      });
    } catch (error) {
      console.error('Error submitting support request:', error);
      Alert.alert(
        'Error',
        'Failed to submit support request. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>New Support Request</Title>

          {/* Support Type Dropdown */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Type of Support <Text style={styles.required}>*</Text>
            </Text>
            <TouchableWithoutFeedback onPress={toggleDropdown}>
              <View
                style={[
                  styles.inputWrapper,
                  dropdownOpen && styles.dropdownOpen,
                ]}>
                <Icon
                  name={
                    formData.supportType
                      ? supportTypes.find(t => t.value === formData.supportType)
                          ?.icon || 'help-circle'
                      : 'help-circle'
                  }
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <Text
                  style={[
                    styles.input,
                    !formData.supportType && styles.placeholderText,
                  ]}>
                  {formData.supportType
                    ? supportTypes.find(t => t.value === formData.supportType)
                        ?.label
                    : 'Select support type'}
                </Text>
                <Animated.View
                  style={{transform: [{rotate: rotateInterpolate}]}}>
                  <Icon name="chevron-down" size={20} color="#666" />
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>
            {errors.supportType && (
              <Text style={styles.errorText}>{errors.supportType}</Text>
            )}

            {dropdownOpen && (
              <View style={styles.dropdownContainer}>
                {supportTypes.map(type => (
                  <TouchableOpacity
                    key={type.value}
                    style={[
                      styles.dropdownItem,
                      formData.supportType === type.value &&
                        styles.dropdownItemSelected,
                    ]}
                    onPress={() => selectSupportType(type.value)}>
                    <Icon
                      name={type.icon}
                      size={18}
                      color="#2196F3"
                      style={styles.dropdownIcon}
                    />
                    <Text style={styles.dropdownItemText}>{type.label}</Text>
                    {formData.supportType === type.value && (
                      <Icon
                        name="check"
                        size={18}
                        color="#2196F3"
                        style={styles.dropdownCheck}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Full Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Full Name <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputWrapper}>
              <Icon
                name="account"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="#999"
                value={formData.fullName}
                onChangeText={text =>
                  setFormData({...formData, fullName: text})
                }
              />
            </View>
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Email <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputWrapper}>
              <Icon
                name="email"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="john.doe@example.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={text => setFormData({...formData, email: text})}
              />
            </View>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          {/* Phone */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Phone Number <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputWrapper}>
              <Icon
                name="phone"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="+1 234 567 8900"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={text => setFormData({...formData, phone: text})}
              />
            </View>
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}
          </View>

          {/* Company */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Company/Organization</Text>
            <View style={styles.inputWrapper}>
              <Icon
                name="office-building"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="ABC Corporation (Optional)"
                placeholderTextColor="#999"
                value={formData.company}
                onChangeText={text => setFormData({...formData, company: text})}
              />
            </View>
          </View>

          {/* Subject */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Subject/Title <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputWrapper}>
              <Icon
                name="format-title"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Brief title of your request"
                placeholderTextColor="#999"
                value={formData.subject}
                onChangeText={text => setFormData({...formData, subject: text})}
              />
            </View>
            {errors.subject && (
              <Text style={styles.errorText}>{errors.subject}</Text>
            )}
          </View>

          {/* Description */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Description <Text style={styles.required}>*</Text>
            </Text>
            <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
              <Icon
                name="text"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe your issue in detail..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                value={formData.description}
                onChangeText={text =>
                  setFormData({...formData, description: text})
                }
              />
            </View>
            {errors.description && (
              <Text style={styles.errorText}>{errors.description}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              loading && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Icon
                  name="send"
                  size={20}
                  color="#fff"
                  style={styles.submitIcon}
                />
                <Text style={styles.submitButtonText}>Submit Request</Text>
              </>
            )}
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  card: {
    borderRadius: 12,
    elevation: 3,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  required: {
    color: 'red',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    height: 48,
  },
  dropdownOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: '#2196F3',
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#333',
    fontSize: 14,
    paddingVertical: 0,
  },
  placeholderText: {
    color: '#999',
  },
  inputIcon: {
    marginRight: 10,
  },
  textAreaWrapper: {
    alignItems: 'flex-start',
    height: 120,
    paddingTop: 12,
  },
  textArea: {
    height: '100%',
    textAlignVertical: 'top',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#2196F3',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    zIndex: 1000,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemSelected: {
    backgroundColor: '#f0f7ff',
  },
  dropdownIcon: {
    marginRight: 12,
  },
  dropdownItemText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  dropdownCheck: {
    marginLeft: 'auto',
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    flexDirection: 'row',
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  submitIcon: {
    marginRight: 8,
  },
  errorText: {
    color: '#f44336',
    fontSize: 12,
    marginTop: 4,
  },
});

export default NewSupportRequest;
