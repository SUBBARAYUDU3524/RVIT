import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import rvit from '../assets/rvit.jpeg';
import UserContext from '../context/UserContext';

const ProfileScreen = () => {
  const {logout} = useContext(UserContext);

  // Dummy user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    bio: 'Senior Software Engineer | React Native Expert | Coffee Enthusiast',
    location: 'San Francisco, CA',
    joinDate: 'Member since March 2018',
    stats: {
      posts: 142,
      followers: 1280,
      following: 530,
    },
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    coverPhoto: rvit,
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cover Photo */}
      <View style={styles.coverContainer}>
        <Image source={user.coverPhoto} style={styles.coverPhoto} />
        <View style={styles.overlay} />
      </View>

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={{uri: user.avatar}} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.bio}>{user.bio}</Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.stats.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.stats.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.stats.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      {/* User Info */}
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Icon name="email" size={20} color="#555" />
          <Text style={styles.infoText}>{user.email}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="location-on" size={20} color="#555" />
          <Text style={styles.infoText}>{user.location}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="calendar-today" size={20} color="#555" />
          <Text style={styles.infoText}>{user.joinDate}</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>

      {/* Additional Content Placeholder */}
      <View style={styles.contentPlaceholder}>
        <Text style={styles.sectionTitle}>Your Activity</Text>
        <View style={styles.activityItem}>
          <Icon name="history" size={24} color="#4a90e2" />
          <View style={styles.activityTextContainer}>
            <Text style={styles.activityTitle}>Recent Viewed Items</Text>
            <Text style={styles.activitySubtitle}>12 items</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <Icon name="favorite" size={24} color="#e74c3c" />
          <View style={styles.activityTextContainer}>
            <Text style={styles.activityTitle}>Saved Favorites</Text>
            <Text style={styles.activitySubtitle}>24 items</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  coverContainer: {
    height: 200,
    position: 'relative',
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: -60,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  bio: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 30,
    marginTop: 5,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#555',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#e74c3c',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  contentPlaceholder: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityTextContainer: {
    marginLeft: 15,
  },
  activityTitle: {
    fontSize: 16,
    color: '#333',
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 3,
  },
});
