import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Card, Title, TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const BookSupportSlotScreen = ({route, navigation}) => {
  const {category} = route.params;
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    supportType: '',
    notes: '',
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supportTypes = [
    {label: 'Full Time Support', value: 'Full Time', icon: 'calendar'},
    {label: 'Part Time Support', value: 'Part Time', icon: 'calendar-clock'},
    {label: 'Contract Based', value: 'Contract', icon: 'file-sign'},
    {label: 'Consultation', value: 'Consultation', icon: 'comment-question'},
    {label: 'Emergency Support', value: 'Emergency', icon: 'alert-circle'},
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userDoc = await firestore()
            .collection('users')
            .doc(user.uid)
            .get();
          setUserData({
            uid: user.uid,
            name: userDoc.data()?.name || user.displayName || '',
            email: user.email || '',
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async () => {
    if (!formData.supportType) {
      Alert.alert('Error', 'Please select a support type');
      return;
    }

    setIsSubmitting(true);
    try {
      const user = auth().currentUser;
      if (!user) {
        Alert.alert('Error', 'You must be logged in to book support');
        return;
      }

      // const supportRef = await firestore().collection('rvit_support').add({
      //   userId: user.uid,
      //   categoryId: category.id,
      //   categoryName: category.name,
      //   supportType: formData.supportType,
      //   userName: userData.name,
      //   userEmail: userData.email,
      //   notes: formData.notes,
      //   status: 'Pending',
      //   createdAt: firestore.FieldValue.serverTimestamp(),
      // });

      // ✅ Reset formData
      setFormData({
        supportType: '',
        notes: '',
      });

      // ✅ Then navigate
      navigation.navigate('ConfirmSupport', {
        // supportId: supportRef.id,
        userData,
        category,
        formData,
      });
    } catch (error) {
      console.error('Error creating job:', error);
      Alert.alert('Error', 'Failed to book support. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Icon name="arrow-left" size={24} color="#2196F3" />
            </TouchableOpacity>
            <Title style={styles.title}>Book Support</Title>
          </View>

          {/* Support Type Dropdown */}
          <Text style={styles.label}>
            Type of Support <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setDropdownOpen(!dropdownOpen)}>
            <View style={styles.dropdownButtonContent}>
              {formData.supportType ? (
                <>
                  <Icon
                    name={
                      supportTypes.find(t => t.value === formData.supportType)
                        ?.icon || 'help-circle'
                    }
                    size={20}
                    color="#2196F3"
                    style={styles.dropdownIcon}
                  />
                  <Text style={styles.dropdownButtonText}>
                    {
                      supportTypes.find(t => t.value === formData.supportType)
                        ?.label
                    }
                  </Text>
                </>
              ) : (
                <Text style={styles.dropdownPlaceholder}>
                  Select support type
                </Text>
              )}
              <Icon
                name={dropdownOpen ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#666"
              />
            </View>
          </TouchableOpacity>

          {dropdownOpen && (
            <View style={styles.dropdownOptions}>
              {supportTypes.map((type, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownOption}
                  onPress={() => {
                    setFormData({...formData, supportType: type.value});
                    setDropdownOpen(false);
                  }}>
                  <Icon
                    name={type.icon}
                    size={20}
                    color="#2196F3"
                    style={styles.optionIcon}
                  />
                  <Text style={styles.optionText}>{type.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* User Details (non-editable) */}
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputContainer}>
            <Icon
              name="account"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <Text style={styles.readOnlyInput}>
              {userData?.name || 'Not available'}
            </Text>
          </View>

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <Icon
              name="email"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <Text style={styles.readOnlyInput}>
              {userData?.email || 'Not available'}
            </Text>
          </View>

          {/* Additional Notes */}
          <Text style={styles.label}>Additional Notes</Text>
          <TextInput
            mode="outlined"
            multiline
            numberOfLines={8}
            placeholder="Describe your specific needs or requirements"
            placeholderTextColor="#666"
            value={formData.notes}
            onChangeText={text => setFormData({...formData, notes: text})}
            style={styles.notesInput}
            outlineColor="#ddd"
            activeOutlineColor="#2196F3"
          />

          {/* Submit Button */}
          <Button
            mode="contained"
            style={styles.submitButton}
            onPress={handleSubmit}
            loading={isSubmitting}
            disabled={isSubmitting || !formData.supportType}>
            <Icon
              name="calendar-check"
              size={20}
              color="#fff"
              style={styles.buttonIcon}
            />
            <Text style={styles.submitButtonText}>Book Support Slot</Text>
          </Button>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 12,
    elevation: 3,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
    marginTop: 12,
  },
  required: {
    color: 'red',
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  dropdownButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownIcon: {
    marginRight: 12,
  },
  dropdownButtonText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  dropdownPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#999',
  },
  dropdownOptions: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    marginRight: 12,
  },
  readOnlyInput: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  notesInput: {
    marginBottom: 24,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#2196F3',
    marginVertical: 10,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  buttonIcon: {
    marginRight: 10,
  },
  submitButtonText: {
    color: '#fff',
    paddingVertical: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BookSupportSlotScreen;
