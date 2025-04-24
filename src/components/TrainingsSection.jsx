import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

const TrainingsSection = React.forwardRef(({navigation}, ref) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const snapshot = await firestore().collection('courses').limit(3).get();

        const coursesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesData);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (error) {
    return (
      <Card style={styles.sectionCard} ref={ref}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Recommended Courses</Title>
          <Text style={styles.errorText}>{error}</Text>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card style={styles.sectionCard} ref={ref}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <Title style={styles.sectionTitle}>Recommended Courses</Title>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => navigation.navigate('AllCourses')}>
            <Text style={styles.viewAllText}>View All</Text>
            <Icon name="chevron-right" size={16} color="#2196F3" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator
            size="small"
            color="#2196F3"
            style={styles.loader}
          />
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.coursesContainer}>
            {courses.map(course => (
              <TouchableOpacity
                key={course.id}
                style={styles.courseCard}
                onPress={() => navigation.navigate('CourseDetails', {course})}>
                {course.imageUrl ? (
                  <Image
                    source={{uri: course.imageUrl}}
                    style={styles.courseImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.courseImagePlaceholder}>
                    <Icon name="book" size={32} color="#666" />
                  </View>
                )}
                <Text style={styles.courseTitle} numberOfLines={2}>
                  {course.title}
                </Text>
                <Text style={styles.courseInstructor} numberOfLines={1}>
                  <Icon name="account" size={12} color="#666" />{' '}
                  {course.instructor}
                </Text>
                <View style={styles.courseMeta}>
                  <View style={styles.metaItem}>
                    <Icon name="clock-outline" size={12} color="#666" />
                    <Text style={styles.metaText}>{course.duration}</Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Icon name="star" size={12} color="#FFC107" />
                    <Text style={styles.ratingText}>{course.rating}</Text>
                  </View>
                </View>
                <Text style={styles.courseFee}>$ {course.fee}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </Card.Content>
    </Card>
  );
});

const styles = {
  sectionCard: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#2196F3',
    fontSize: 14,
    marginRight: 4,
  },
  coursesContainer: {
    paddingVertical: 4,
  },
  courseCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  courseImage: {
    width: '100%',
    height: 100,
    borderRadius: 6,
    marginBottom: 8,
  },
  courseImagePlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    minHeight: 36,
  },
  courseInstructor: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  courseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 11,
    color: '#FFA000',
    marginLeft: 2,
    fontWeight: 'bold',
  },
  courseFee: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#388E3C',
  },
  loader: {
    paddingVertical: 20,
  },
  errorText: {
    color: '#f44336',
    textAlign: 'center',
    paddingVertical: 10,
  },
};

export default TrainingsSection;
