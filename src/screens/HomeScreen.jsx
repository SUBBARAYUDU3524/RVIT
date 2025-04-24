import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import {Card, Title, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ImageCarousel from '../components/ImageCarousel';
import JobsSection from '../components/JobsSection';
import TrainingsSection from '../components/TrainingsSection';
import SupportSection from '../components/SupportSection';

const HomeScreen = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [jobsCount, setJobsCount] = useState(0);
  const [membersCount, setMembersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const jobsRef = useRef(null);
  const trainingsRef = useRef(null);
  const supportRef = useRef(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Get jobs count
        const jobsQuery = await firestore().collection('rvit_jobs').get();
        setJobsCount(jobsQuery.size);

        // Get users count
        const usersQuery = await firestore().collection('RVIT_USERS').get();
        setMembersCount(usersQuery.size);
      } catch (error) {
        console.error('Error fetching counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();

    // Optional: Set up real-time listeners if you want counts to update in real-time
    const jobsListener = firestore()
      .collection('rvit_jobs')
      .onSnapshot(querySnapshot => {
        setJobsCount(querySnapshot.size);
      });

    const usersListener = firestore()
      .collection('RVIT_USERS')
      .onSnapshot(querySnapshot => {
        setMembersCount(querySnapshot.size);
      });

    return () => {
      jobsListener();
      usersListener();
    };
  }, []);

  const scrollToRef = ref => {
    ref.current?.measureLayout(
      scrollViewRef.current,
      (x, y) => {
        scrollViewRef.current?.scrollTo({y: y + 10, animated: true});
      },
      () => console.log('measurement failed'),
    );
  };

  return (
    <ScrollView
      style={styles.container}
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}>
      {/* User Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileHeader}>
          {user?.photoURL ? (
            <Image source={{uri: user.photoURL}} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Icon name="account" size={30} color="#fff" />
            </View>
          )}
          <View style={styles.profileText}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>
              {user?.displayName || 'Guest User'}
            </Text>
            <Text style={styles.userEmail}>{user?.email || ''}</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationBtn}
            onPress={() => navigation.navigate('Notifications')}>
            <Icon name="bell-outline" size={24} color="#555" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Motivational Quote */}
        <Text style={styles.quoteText}>
          "Your next opportunity is waiting for you!"
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Search jobs, trainings..."
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.filterBtn}>
          <Icon name="tune" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Image Carousel */}
      <View style={styles.carouselContainer}>
        <ImageCarousel />
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => scrollToRef(jobsRef)}>
          <View style={[styles.actionIcon, {backgroundColor: '#e3f2fd'}]}>
            <Icon name="briefcase-outline" size={28} color="#1976d2" />
          </View>
          <Text style={styles.actionText}>Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => scrollToRef(trainingsRef)}>
          <View style={[styles.actionIcon, {backgroundColor: '#e8f5e9'}]}>
            <Icon name="school-outline" size={28} color="#388e3c" />
          </View>
          <Text style={styles.actionText}>Trainings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => scrollToRef(supportRef)}>
          <View style={[styles.actionIcon, {backgroundColor: '#f3e5f5'}]}>
            <Icon name="headset" size={28} color="#8e24aa" />
          </View>
          <Text style={styles.actionText}>Support</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, {backgroundColor: '#e3f2fd'}]}>
          <Icon name="chart-line" size={24} color="#1976d2" />
          {loading ? (
            <Text style={styles.statNumber}>...</Text>
          ) : (
            <Text style={styles.statNumber}>{jobsCount}</Text>
          )}
          <Text style={styles.statLabel}>Jobs Posted</Text>
        </View>
        <View style={[styles.statCard, {backgroundColor: '#fff8e1'}]}>
          <Icon name="account-group" size={24} color="#ffa000" />
          {loading ? (
            <Text style={styles.statNumber}>...</Text>
          ) : (
            <Text style={styles.statNumber}>{membersCount}</Text>
          )}
          <Text style={styles.statLabel}>Members</Text>
        </View>
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
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  avatarPlaceholder: {
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  notificationBtn: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff3d00',
  },
  quoteText: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: '#333',
  },
  filterBtn: {
    backgroundColor: '#6200ee',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '30%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // ✅ Center content
    alignItems: 'center',
    justifyContent: 'center',
  },

  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
});

export default HomeScreen;
