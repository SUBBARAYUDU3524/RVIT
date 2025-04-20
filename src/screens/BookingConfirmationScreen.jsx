import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Title, Button, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BookingConfirmationScreen = ({route, navigation}) => {
  const {category, date, timeSlot} = route.params;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <View style={styles.iconContainer}>
            <Icon name="check-circle" size={80} color="#4CAF50" />
          </View>
          <Title style={styles.title}>Booking Confirmed!</Title>

          <View style={styles.bookingDetails}>
            <Text style={styles.detailLabel}>Support Type:</Text>
            <Text style={styles.detailValue}>{category.name}</Text>

            <Text style={styles.detailLabel}>Date:</Text>
            <Text style={styles.detailValue}>{date.toLocaleDateString()}</Text>

            <Text style={styles.detailLabel}>Time Slot:</Text>
            <Text style={styles.detailValue}>{timeSlot}</Text>
          </View>

          <Text style={styles.message}>
            Our support engineer will contact you before the session. You'll
            receive a calendar invite shortly.
          </Text>

          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate('Home')}>
            Back to Home
          </Button>
          <Button
            mode="outlined"
            style={styles.button}
            onPress={() => navigation.navigate('Support')}>
            View My Support Requests
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    borderRadius: 10,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  bookingDetails: {
    width: '100%',
    marginBottom: 24,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  detailValue: {
    fontSize: 16,
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#666',
    lineHeight: 24,
  },
  button: {
    width: '100%',
    marginBottom: 16,
    paddingVertical: 8,
  },
});

export default BookingConfirmationScreen;
