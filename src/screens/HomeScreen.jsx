import React, {useRef} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Card, Title, IconButton} from 'react-native-paper';
import ImageCarousel from '../components/ImageCarousel';
import JobsSection from '../components/JobsSection';
import TrainingsSection from '../components/TrainingsSection';
import SupportSection from '../components/SupportSection';

const HomeScreen = ({navigation}) => {
  const jobsRef = useRef(null);
  const trainingsRef = useRef(null);
  const supportRef = useRef(null);

  const scrollToRef = ref => {
    ref.current?.measureLayout(
      scrollViewRef.current,
      (x, y) => {
        scrollViewRef.current?.scrollTo({y, animated: true});
      },
      () => console.log('measurement failed'),
    );
  };

  const scrollViewRef = useRef(null);

  return (
    <ScrollView style={styles.container} ref={scrollViewRef}>
      {/* User Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{uri: 'https://example.com/user-avatar.jpg'}}
          style={styles.avatar}
        />
        <View style={styles.profileText}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>Venkatesh</Text>
        </View>
        <IconButton
          icon="bell-outline"
          size={24}
          onPress={() => navigation.navigate('Notifications')}
        />
      </View>

      <ImageCarousel />

      {/* Quick Actions Bar */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.quickActionItem}
          onPress={() => scrollToRef(jobsRef)}>
          <IconButton icon="briefcase-outline" size={28} />
          <Text style={styles.quickActionText}>Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickActionItem}
          onPress={() => scrollToRef(trainingsRef)}>
          <IconButton icon="school-outline" size={28} />
          <Text style={styles.quickActionText}>Trainings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickActionItem}
          onPress={() => scrollToRef(supportRef)}>
          <IconButton icon="headset" size={28} />
          <Text style={styles.quickActionText}>Support</Text>
        </TouchableOpacity>
      </View>

      {/* Sections */}
      <JobsSection navigation={navigation} ref={jobsRef} />
      <TrainingsSection navigation={navigation} ref={trainingsRef} />
      <SupportSection navigation={navigation} ref={supportRef} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 70,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  profileText: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
  },
  quickActionItem: {
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 12,
    marginTop: -8,
  },
});

export default HomeScreen;
