import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Card, Title, Button, RadioButton, TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const BookSupportSlotScreen = ({route, navigation}) => {
  const {category} = route.params;
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeSlot, setTimeSlot] = useState('');
  const [notes, setNotes] = useState('');

  const availableSlots = [
    '9:00 AM - 10:00 AM',
    '11:00 AM - 12:00 PM',
    '2:00 PM - 3:00 PM',
    '4:00 PM - 5:00 PM',
  ];

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleBooking = () => {
    // Handle booking logic
    navigation.navigate('BookingConfirmation', {
      category,
      date,
      timeSlot,
      notes,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Book {category.name} Support</Title>

          <Title style={styles.sectionTitle}>Select Date</Title>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}

          <Title style={styles.sectionTitle}>Available Time Slots</Title>
          <RadioButton.Group
            onValueChange={value => setTimeSlot(value)}
            value={timeSlot}>
            {availableSlots.map((slot, index) => (
              <View key={index} style={styles.radioItem}>
                <RadioButton value={slot} />
                <Text style={styles.radioLabel}>{slot}</Text>
              </View>
            ))}
          </RadioButton.Group>

          <Title style={styles.sectionTitle}>Additional Notes</Title>
          <TextInput
            mode="outlined"
            multiline
            numberOfLines={4}
            placeholder="Describe your issue or specific needs"
            value={notes}
            onChangeText={setNotes}
            style={styles.notesInput}
          />

          <Button
            mode="contained"
            style={styles.bookButton}
            onPress={handleBooking}
            disabled={!timeSlot}>
            Confirm Booking
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioLabel: {
    fontSize: 14,
    marginLeft: 8,
  },
  notesInput: {
    marginBottom: 16,
  },
  bookButton: {
    marginTop: 16,
    paddingVertical: 10,
    backgroundColor: '#2196F3',
  },
});

export default BookSupportSlotScreen;
