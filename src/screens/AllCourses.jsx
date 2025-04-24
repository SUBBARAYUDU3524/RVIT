import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Card, Title, Paragraph, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

const {width} = Dimensions.get('window');

const AllCourses = ({navigation}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await firestore().collection('courses').get();
        const coursesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses: ', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const renderCourseItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('CourseDetails', {course: item})}
      activeOpacity={0.9}>
      <Card style={styles.courseCard}>
        <Image
          source={{uri: item.imageUrl}}
          style={styles.courseImage}
          resizeMode="cover"
        />
        <View style={styles.courseBadge}>
          <Text style={styles.courseBadgeText}>{item.category}</Text>
        </View>
        <Card.Content style={styles.courseContent}>
          <Title style={styles.courseTitle}>{item.title}</Title>
          <Paragraph style={styles.courseInstructor}>
            <Icon name="account" size={14} color="#666" /> {item.instructor}
          </Paragraph>
          <View style={styles.courseMeta}>
            <View style={styles.metaItem}>
              <Icon name="clock-outline" size={14} color="#666" />
              <Text style={styles.metaText}>{item.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="currency-usd" size={14} color="#666" />
              <Text style={styles.metaText}>${item.fee}</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="star" size={14} color="#FFD700" />
              <Text style={styles.metaText}>{item.rating}</Text>
            </View>
          </View>
          <View style={styles.enrollmentContainer}>
            <Icon name="account-group" size={16} color="#2196F3" />
            <Text style={styles.enrollmentText}>
              {item.students.toLocaleString()} students
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Courses</Text>
        <View style={styles.filterContainer}>
          <IconButton
            icon="filter-variant"
            size={24}
            onPress={() => console.log('Filter pressed')}
          />
          <IconButton
            icon="magnify"
            size={24}
            onPress={() => console.log('Search pressed')}
          />
        </View>
      </View>

      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.categoriesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {['All', 'Mobile', 'Web', 'Cloud', 'Design', 'Data Science'].map(
                (category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.categoryButton,
                      index === 0 && styles.activeCategory,
                    ]}>
                    <Text
                      style={[
                        styles.categoryText,
                        index === 0 && styles.activeCategoryText,
                      ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </ScrollView>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No courses found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
  },
  listContent: {
    paddingBottom: 20,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
  },
  activeCategory: {
    backgroundColor: '#2196F3',
  },
  categoryText: {
    color: '#495057',
    fontWeight: '500',
  },
  activeCategoryText: {
    color: 'white',
  },
  courseCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    backgroundColor: 'white',
  },
  courseImage: {
    width: '100%',
    height: 160,
  },
  courseBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  courseBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  courseContent: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  courseInstructor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  courseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: 4,
    fontSize: 13,
    color: '#666',
  },
  enrollmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  enrollmentText: {
    marginLeft: 4,
    fontSize: 13,
    color: '#2196F3',
  },
});

export default AllCourses;
