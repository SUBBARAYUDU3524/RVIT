import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  RadioButton,
  HelperText,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BookingForm = ({route, navigation}) => {
  const {courseId} = route.params;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'beginner',
    preferredDate: new Date(),
    showDatePicker: false,
    paymentMethod: 'credit_card',
    specialRequests: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.preferredDate;
    setFormData(prev => ({
      ...prev,
      showDatePicker: Platform.OS === 'ios',
      preferredDate: currentDate,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Phone is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Submit form logic here
      console.log('Form submitted:', formData);
      navigation.navigate('BookingConfirmation', {
        bookingData: formData,
        courseId: courseId,
      });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Card style={styles.courseSummaryCard}>
        <Card.Content>
          <Title style={styles.summaryTitle}>Course Summary</Title>
          <View style={styles.summaryItem}>
            <Icon name="book" size={20} color="#666" />
            <Text style={styles.summaryText}>Advanced React Native</Text>
          </View>
          <View style={styles.summaryItem}>
            <Icon name="clock-outline" size={20} color="#666" />
            <Text style={styles.summaryText}>
              6 Weeks (Starting June 15, 2023)
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Icon name="cash" size={20} color="#666" />
            <Text style={styles.summaryText}>Total: $299</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.formCard}>
        <Card.Content>
          <Title style={styles.formTitle}>Personal Information</Title>

          <TextInput
            label="Full Name"
            mode="outlined"
            style={styles.input}
            value={formData.name}
            onChangeText={text => handleChange('name', text)}
            error={!!errors.name}
          />
          <HelperText type="error" visible={!!errors.name}>
            {errors.name}
          </HelperText>

          <TextInput
            label="Email Address"
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={text => handleChange('email', text)}
            error={!!errors.email}
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email}
          </HelperText>

          <TextInput
            label="Phone Number"
            mode="outlined"
            style={styles.input}
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={text => handleChange('phone', text)}
            error={!!errors.phone}
          />
          <HelperText type="error" visible={!!errors.phone}>
            {errors.phone}
          </HelperText>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Experience Level</Text>
            <RadioButton.Group
              onValueChange={value => handleChange('experience', value)}
              value={formData.experience}>
              <View style={styles.radioOption}>
                <RadioButton value="beginner" />
                <Text style={styles.radioLabel}>Beginner</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="intermediate" />
                <Text style={styles.radioLabel}>Intermediate</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="advanced" />
                <Text style={styles.radioLabel}>Advanced</Text>
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferred Start Date</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => handleChange('showDatePicker', true)}>
              <Icon
                name="calendar"
                size={20}
                color="#666"
                style={styles.dateIcon}
              />
              <Text style={styles.dateText}>
                {formData.preferredDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {formData.showDatePicker && (
              <DateTimePicker
                value={formData.preferredDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <RadioButton.Group
              onValueChange={value => handleChange('paymentMethod', value)}
              value={formData.paymentMethod}>
              <View style={styles.radioOption}>
                <RadioButton value="credit_card" />
                <Text style={styles.radioLabel}>Credit Card</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="paypal" />
                <Text style={styles.radioLabel}>PayPal</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="bank_transfer" />
                <Text style={styles.radioLabel}>Bank Transfer</Text>
              </View>
            </RadioButton.Group>
          </View>

          <TextInput
            label="Special Requests (Optional)"
            mode="outlined"
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
            value={formData.specialRequests}
            onChangeText={text => handleChange('specialRequests', text)}
          />
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        style={styles.submitButton}
        labelStyle={styles.submitButtonLabel}
        onPress={handleSubmit}>
        Confirm Booking
      </Button>

      <View style={styles.securePayment}>
        <Icon name="lock" size={16} color="#4CAF50" />
        <Text style={styles.securePaymentText}>
          All payments are secure and encrypted
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  courseSummaryCard: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 1,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#555',
  },
  formCard: {
    borderRadius: 10,
    elevation: 1,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    marginBottom: 8,
    backgroundColor: 'white',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    color: '#333',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 15,
    color: '#555',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    backgroundColor: 'white',
  },
  dateIcon: {
    marginRight: 12,
  },
  dateText: {
    fontSize: 15,
    color: '#555',
  },
  submitButton: {
    borderRadius: 8,
    paddingVertical: 10,
    backgroundColor: '#2196F3',
    marginBottom: 16,
  },
  submitButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  securePayment: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  securePaymentText: {
    marginLeft: 8,
    fontSize: 13,
    color: '#666',
  },
});

export default BookingForm;
