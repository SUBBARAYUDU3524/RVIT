import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Card, Title, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

const ConfirmSupportScreen = ({route, navigation}) => {
  const {userData, category, formData} = route.params;
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = async () => {
    setConfirming(true);
    try {
    } catch (error) {
      console.error('Error confirming booking:', error);
      Alert.alert('Error', 'Failed to confirm booking. Please try again.');
    } finally {
      setConfirming(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <Title style={styles.title}>Confirm Your Booking</Title>
          </View>

          <View style={styles.statusBadge}>
            <Icon
              name="clock-outline"
              size={20}
              color="#FFC107"
              style={styles.statusIcon}
            />
            <Text style={styles.statusText}>Pending Confirmation</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support Details</Text>
            <View style={styles.detailRow}>
              <Icon
                name={
                  formData.supportType === 'Full Time'
                    ? 'calendar'
                    : formData.supportType === 'Part Time'
                    ? 'calendar-clock'
                    : formData.supportType === 'Contract'
                    ? 'file-sign'
                    : formData.supportType === 'Consultation'
                    ? 'comment-question'
                    : 'alert-circle'
                }
                size={20}
                color="#2196F3"
                style={styles.detailIcon}
              />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Support Type</Text>
                <Text style={styles.detailValue}>{formData.supportType}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Icon
                name={category.icon || 'help-circle'}
                size={20}
                color="#2196F3"
                style={styles.detailIcon}
              />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Category</Text>
                <Text style={styles.detailValue}>{category.name}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Information</Text>
            <View style={styles.detailRow}>
              <Icon
                name="account"
                size={20}
                color="#2196F3"
                style={styles.detailIcon}
              />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Name</Text>
                <Text style={styles.detailValue}>{userData.name}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Icon
                name="email"
                size={20}
                color="#2196F3"
                style={styles.detailIcon}
              />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Email</Text>
                <Text style={styles.detailValue}>{userData.email}</Text>
              </View>
            </View>
          </View>

          {formData.notes && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Additional Notes</Text>
              <View style={styles.notesContainer}>
                <Icon
                  name="text"
                  size={20}
                  color="#2196F3"
                  style={styles.detailIcon}
                />
                <Text style={styles.notesText}>{formData.notes}</Text>
              </View>
            </View>
          )}

          <Button
            mode="contained"
            style={styles.confirmButton}
            onPress={handleConfirm}
            loading={confirming}
            disabled={confirming}>
            <Icon
              name="check-circle"
              size={20}
              color="#fff"
              style={styles.buttonIcon}
            />
            <Text style={styles.confirmButtonText}>Confirm Booking</Text>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  jobIdContainer: {
    backgroundColor: '#e3f2fd',
    padding: 8,
    borderRadius: 4,
    alignSelf: 'center',
    marginBottom: 16,
  },
  jobIdText: {
    color: '#2196F3',
    fontWeight: '500',
    fontSize: 14,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    justifyContent: 'center',
  },
  statusIcon: {
    marginRight: 8,
  },
  statusText: {
    color: '#FFA000',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailIcon: {
    marginRight: 16,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notesText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  buttonIcon: {
    marginRight: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default ConfirmSupportScreen;
