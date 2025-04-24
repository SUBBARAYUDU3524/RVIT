import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import user from '../assets/user.jpg';

const CourseDetails = ({route, navigation}) => {
  const {course} = route.params;

  const handleBookSlot = () => {
    navigation.navigate('BookingForm', {courseId: course.id});
  };

  // Function to calculate next batch date (3 weeks from now)
  const getNextBatchDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 21); // Add 3 weeks
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Course Header Image */}
        <Image
          source={{uri: course.imageUrl}}
          style={styles.headerImage}
          resizeMode="cover"
        />

        {/* Course Main Content */}
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={20} color="#FFD700" />
              <Text style={styles.ratingText}>{course.rating}</Text>
              <Text style={styles.reviewsText}>
                ({Math.floor(course.students / 3)} reviews)
              </Text>
            </View>
          </View>

          {/* Instructor Card */}
          <Card style={styles.instructorCard}>
            <Card.Content style={styles.instructorContent}>
              <Image source={user} style={styles.instructorImage} />
              <View style={styles.instructorInfo}>
                <Text style={styles.instructorName}>{course.instructor}</Text>
                <Text style={styles.instructorTitle}>Senior Instructor</Text>
                <View style={styles.socialIcons}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL('https://linkedin.com')}>
                    <Icon name="linkedin" size={20} color="#0077B5" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Linking.openURL('https://twitter.com')}>
                    <Icon
                      name="twitter"
                      size={20}
                      color="#1DA1F2"
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Linking.openURL('https://github.com')}>
                    <Icon
                      name="github"
                      size={20}
                      color="#333"
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Course Details */}
          <Card style={styles.detailsCard}>
            <Card.Content>
              <View style={styles.detailsHeader}>
                <Icon name="information-outline" size={24} color="#2196F3" />
                <Text style={styles.detailsTitle}>Course Details</Text>
              </View>
              <Text style={styles.descriptionText}>{course.description}</Text>

              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Icon name="clock-outline" size={20} color="#666" />
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>Duration:</Text>
                    <Text style={styles.detailValue}>{course.duration}</Text>
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <Icon name="calendar" size={20} color="#666" />
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>Next Batch:</Text>
                    <Text style={styles.detailValue}>{getNextBatchDate()}</Text>
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <Icon name="cash" size={20} color="#666" />
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>Fee:</Text>
                    <Text style={styles.detailValue}>${course.fee}</Text>
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <Icon name="certificate" size={20} color="#666" />
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>Certificate:</Text>
                    <Text style={styles.detailValue}>Included</Text>
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Testimonials */}
          <Card style={styles.testimonialCard}>
            <Card.Content>
              <View style={styles.detailsHeader}>
                <Icon name="account-group" size={24} color="#2196F3" />
                <Text style={styles.detailsTitle}>Student Testimonials</Text>
              </View>

              <View style={styles.testimonialItem}>
                <Image source={user} style={styles.testimonialImage} />
                <View style={styles.testimonialContent}>
                  <Text style={styles.testimonialText}>
                    "This course completely transformed my approach to mobile
                    development. The instructor's expertise is exceptional."
                  </Text>
                  <Text style={styles.testimonialAuthor}>- Robert Johnson</Text>
                  <View style={styles.testimonialRating}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Icon key={star} name="star" size={16} color="#FFD700" />
                    ))}
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      {/* Fixed Booking Button */}
      <View style={styles.bookingContainer}>
        <Button
          mode="contained"
          style={styles.bookButton}
          labelStyle={styles.bookButtonLabel}
          onPress={handleBookSlot}>
          Book Your Slot Now
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingBottom: 80, // Space for fixed button
  },
  headerImage: {
    width: '100%',
    height: 220,
  },
  contentContainer: {
    padding: 16,
  },
  titleContainer: {
    marginBottom: 20,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewsText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  instructorCard: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 1,
  },
  instructorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  instructorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  instructorTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  socialIcons: {
    flexDirection: 'row',
  },
  socialIcon: {
    marginLeft: 12,
  },
  detailsCard: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 1,
  },
  testimonialCard: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 1,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333',
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
    marginBottom: 16,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailTextContainer: {
    flex: 1,
    marginLeft: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  testimonialItem: {
    flexDirection: 'row',
  },
  testimonialImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  testimonialContent: {
    flex: 1,
  },
  testimonialText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
    marginBottom: 4,
  },
  testimonialAuthor: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  testimonialRating: {
    flexDirection: 'row',
    marginTop: 4,
  },
  bookingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  bookButton: {
    borderRadius: 8,
    paddingVertical: 10,
    backgroundColor: '#2196F3',
  },
  bookButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CourseDetails;
