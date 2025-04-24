import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SupportRequestDetails = ({route, navigation}) => {
  // Get the support request data from navigation params
  const {supportRequest} = route.params;

  const handleBookSlot = () => {
    Alert.alert(
      'Slot Booking',
      'Your slot will be booked shortly. Our team will contact you to confirm the schedule.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  // Format the timestamp if available
  const formattedDate = supportRequest.createdAt
    ? new Date(supportRequest.createdAt.toDate()).toLocaleString()
    : 'Just now';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          {/* Header with back button */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Icon name="arrow-left" size={24} color="#2196F3" />
            </TouchableOpacity>
            <Title style={styles.title}>Request Details</Title>
          </View>

          {/* Status Badge */}
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    supportRequest.status === 'Pending'
                      ? '#FFC107'
                      : supportRequest.status === 'Approved'
                      ? '#4CAF50'
                      : '#F44336',
                },
              ]}>
              <Text style={styles.statusText}>{supportRequest.status}</Text>
            </View>
            <Text style={styles.dateText}>Submitted on: {formattedDate}</Text>
          </View>

          {/* Request Details */}
          <View style={styles.detailsContainer}>
            {/* Support Type */}
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Icon
                  name={
                    supportRequest.supportType === 'Full Time'
                      ? 'calendar'
                      : supportRequest.supportType === 'Part Time'
                      ? 'calendar-clock'
                      : supportRequest.supportType === 'Contract'
                      ? 'file-sign'
                      : supportRequest.supportType === 'Consultation'
                      ? 'comment-question'
                      : 'alert-circle'
                  }
                  size={20}
                  color="#2196F3"
                />
              </View>
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Support Type</Text>
                <Text style={styles.detailValue}>
                  {supportRequest.supportType || 'Not specified'}
                </Text>
              </View>
            </View>

            {/* User Information */}
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Requester Information</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Icon name="account" size={20} color="#2196F3" />
              </View>
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Full Name</Text>
                <Text style={styles.detailValue}>
                  {supportRequest.fullName}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Icon name="email" size={20} color="#2196F3" />
              </View>
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Email</Text>
                <Text style={styles.detailValue}>{supportRequest.email}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Icon name="phone" size={20} color="#2196F3" />
              </View>
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Phone</Text>
                <Text style={styles.detailValue}>{supportRequest.phone}</Text>
              </View>
            </View>

            {supportRequest.company && (
              <View style={styles.detailRow}>
                <View style={styles.detailIconContainer}>
                  <Icon name="office-building" size={20} color="#2196F3" />
                </View>
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Company</Text>
                  <Text style={styles.detailValue}>
                    {supportRequest.company}
                  </Text>
                </View>
              </View>
            )}

            {/* Request Information */}
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Request Information</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Icon name="format-title" size={20} color="#2196F3" />
              </View>
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Subject</Text>
                <Text style={styles.detailValue}>{supportRequest.subject}</Text>
              </View>
            </View>

            <View style={[styles.detailRow, {alignItems: 'flex-start'}]}>
              <View style={styles.detailIconContainer}>
                <Icon name="text" size={20} color="#2196F3" />
              </View>
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Description</Text>
                <Text style={styles.detailValue}>
                  {supportRequest.description}
                </Text>
              </View>
            </View>
          </View>

          {/* Book Slot Button */}
          <TouchableOpacity
            style={styles.bookSlotButton}
            onPress={handleBookSlot}>
            <Icon name="calendar-check" size={24} color="#fff" />
            <Text style={styles.bookSlotButtonText}>Book The Slot Now</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  detailsContainer: {
    marginBottom: 24,
  },
  sectionTitleContainer: {
    marginTop: 24,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
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
  bookSlotButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 24,
    elevation: 2,
    shadowColor: '#2196F3',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  bookSlotButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 12,
  },
});

export default SupportRequestDetails;
