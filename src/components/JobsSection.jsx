import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const JobsSection = React.forwardRef(({navigation}, ref) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const snapshot = await firestore()
          .collection('rvit_jobs')
          .limit(3)
          .get();

        const jobsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobsData);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (error) {
    return (
      <Card style={styles.sectionCard} ref={ref}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Recommended Jobs For You</Title>
          <Text style={styles.errorText}>{error}</Text>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card style={styles.sectionCard} ref={ref}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <Title style={styles.sectionTitle}>Recommended Jobs For You</Title>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => navigation.navigate('AllJobs')}>
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
            contentContainerStyle={styles.jobsContainer}>
            {jobs.map(job => (
              <TouchableOpacity
                key={job.id}
                style={styles.jobCard}
                onPress={() => navigation.navigate('JobDetails', {job})}>
                <Text style={styles.jobTitle} numberOfLines={1}>
                  {job.title}
                </Text>
                <Text style={styles.jobCompany} numberOfLines={1}>
                  <Icon name="office-building" size={12} color="#666" />{' '}
                  {job.company}
                </Text>
                <Text style={styles.jobLocation} numberOfLines={1}>
                  <Icon name="map-marker" size={12} color="#666" />{' '}
                  {job.location}
                </Text>
                <View style={styles.jobMeta}>
                  <Text style={styles.jobType}>{job.type}</Text>
                  <Text style={styles.jobSalary}>{job.salary}</Text>
                </View>
                <Text style={styles.jobDescription} numberOfLines={2}>
                  {job.description}
                </Text>
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
  jobsContainer: {
    paddingVertical: 4,
  },
  jobCard: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginRight: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  jobCompany: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  jobLocation: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  jobMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  jobType: {
    fontSize: 12,
    color: '#2196F3',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  jobSalary: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  jobDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginTop: 4,
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

export default JobsSection;
