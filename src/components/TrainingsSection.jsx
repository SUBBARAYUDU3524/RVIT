import React from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';
import {Card, Title, Paragraph, IconButton} from 'react-native-paper';

const TrainingsSection = React.forwardRef(({navigation}, ref) => {
  const recommendedCourses = [
    {
      id: 1,
      title: 'React Native Masterclass',
      instructor: 'Jane Smith',
      duration: '12 hours',
      level: 'Intermediate',
    },
    {
      id: 2,
      title: 'Advanced JavaScript Patterns',
      instructor: 'John Doe',
      duration: '8 hours',
      level: 'Advanced',
    },
    {
      id: 3,
      title: 'UI/UX for Developers',
      instructor: 'Alex Johnson',
      duration: '6 hours',
      level: 'Beginner',
    },
    {
      id: 4,
      title: 'Node.js Backend Development',
      instructor: 'Sarah Williams',
      duration: '10 hours',
      level: 'Intermediate',
    },
  ];

  return (
    <Card style={styles.sectionCard} ref={ref}>
      <Card.Content>
        <Title style={{marginTop: 16}}>Your Ongoing Trainings</Title>
        <View style={styles.trainingItem}>
          <View>
            <Paragraph>Advanced React Native</Paragraph>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, {width: '65%'}]} />
              <Text style={styles.progressText}>65% Completed</Text>
            </View>
          </View>
          <IconButton
            icon="play-circle-outline"
            onPress={() => navigation.navigate('TrainingSession')}
          />
        </View>

        <Title style={{marginTop: 16}}>Upcoming Sessions</Title>
        <View style={styles.sessionItem}>
          <IconButton icon="calendar-clock" size={20} />
          <View style={styles.sessionDetails}>
            <Paragraph>React Native Performance</Paragraph>
            <Paragraph>Today, 3:00 PM - 4:30 PM</Paragraph>
          </View>
          <IconButton
            icon="video-outline"
            onPress={() => navigation.navigate('JoinSession')}
          />
        </View>
        <View style={styles.sessionItem}>
          <IconButton icon="calendar-clock" size={20} />
          <View style={styles.sessionDetails}>
            <Paragraph>Technical Interview</Paragraph>
            <Paragraph>Tomorrow, 10:00 AM - 10:45 AM</Paragraph>
          </View>
          <IconButton
            icon="video-outline"
            onPress={() => navigation.navigate('JoinSession')}
          />
        </View>
        <Title>Recommended Courses</Title>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.coursesContainer}>
          {recommendedCourses.map((course, index) => (
            <TouchableOpacity
              key={course.id}
              style={styles.courseCard}
              onPress={() =>
                navigation.navigate('CourseDetails', {courseId: course.id})
              }>
              <View style={styles.courseImagePlaceholder}>
                <IconButton icon="book" size={24} color="#666" />
              </View>
              <Text style={styles.courseTitle} numberOfLines={1}>
                {course.title}
              </Text>
              <Text style={styles.courseInstructor}>{course.instructor}</Text>
              <View style={styles.courseMeta}>
                <Text style={styles.courseDuration}>{course.duration}</Text>
                <Text style={styles.courseLevel}>{course.level}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('AllCourses')}>
          <Text style={styles.viewAllText}>View All Courses</Text>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );
});

const styles = {
  sectionCard: {
    marginBottom: 16,
    borderRadius: 10,
    elevation: 2,
  },
  coursesContainer: {
    paddingVertical: 8,
  },
  courseCard: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    elevation: 1,
  },
  courseImagePlaceholder: {
    height: 100,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  courseTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 14,
  },
  courseInstructor: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  courseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseDuration: {
    fontSize: 11,
    color: '#2196F3',
  },
  courseLevel: {
    fontSize: 11,
    color: '#666',
  },
  trainingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#4CAF50',
    borderRadius: 3,
    marginBottom: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  sessionDetails: {
    flex: 1,
    marginLeft: 8,
  },
  viewAllButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  viewAllText: {
    color: '#2196F3',
    fontSize: 12,
  },
};

export default TrainingsSection;
