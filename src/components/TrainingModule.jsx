import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TrainingModule = () => {
  const navigation = useNavigation();
  const items = [
    {
      icon: 'code',
      title: 'Course Listings',
      description:
        'Explore trainings by topic: Java, Python, Web Development and more.',
      route: 'Courses',
      color: '#4F46E5',
    },
    {
      icon: 'laptop',
      title: 'Live Projects Showcase',
      description:
        'Join real-time projects and apply your learning practically.',
      route: 'LiveProjects',
      color: '#10B981',
    },

    {
      icon: 'users',
      title: 'Trainer Assignment',
      description: 'Trainers are assigned automatically or manually by admin.',
      route: 'Trainers',
      color: '#8B5CF6',
    },
    {
      icon: 'video-camera',
      title: 'Live Session Integration',
      description: 'Integrated with Zoom / Google Meet for real-time sessions.',
      route: 'LiveSessions',
      color: '#EC4899',
    },
    {
      icon: 'line-chart',
      title: 'Progress Tracker',
      description:
        'Track your learning progress and training completion status.',
      route: 'Progress',
      color: '#3B82F6',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Training & Live Projects</Text>

      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, {borderLeftColor: item.color}]}
          onPress={() => navigation.navigate(item.route)}>
          <Icon
            name={item.icon}
            size={30}
            color={item.color}
            style={styles.icon}
          />
          <View style={styles.cardContent}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={[styles.link, {color: item.color}]}>
              Go to {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F9FAFB',
    marginBottom: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2563EB',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    flexDirection: 'row',
    elevation: 3,
    borderLeftWidth: 4,
  },
  icon: {
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  link: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TrainingModule;
