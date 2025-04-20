import React from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';
import {Card, Title, Paragraph, IconButton} from 'react-native-paper';

const JobsSection = React.forwardRef(({navigation}, ref) => {
  const recommendedJobs = [
    {
      id: 1,
      title: 'Senior React Native Developer',
      company: 'Tech Solutions Inc.',
      location: 'Remote',
      type: 'Full-Time',
    },
    {
      id: 2,
      title: 'Node.js Backend Engineer',
      company: 'Digital Innovations',
      location: 'Hybrid',
      type: 'Contract',
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'Creative Minds',
      location: 'On-site',
      type: 'Part-Time',
    },
  ];

  return (
    <Card style={styles.sectionCard} ref={ref}>
      <Card.Content>
        <Title>Your Active Applications</Title>
        <View style={styles.applicationItem}>
          <View>
            <Paragraph>Senior React Developer</Paragraph>
            <Paragraph style={styles.statusText}>Interview Scheduled</Paragraph>
          </View>
          <IconButton
            icon="chevron-right"
            onPress={() => navigation.navigate('ApplicationStatus')}
          />
        </View>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Applications</Text>
        </TouchableOpacity>

        <Title style={{marginTop: 16}}>Recommended Jobs For You</Title>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('AllJobs')}>
          <Text style={styles.viewAllText}>View All Jobs</Text>
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recommendedJobs.map((job, index) => (
            <TouchableOpacity
              key={index}
              style={styles.jobCard}
              onPress={() =>
                navigation.navigate('JobDetails', {jobId: job.id})
              }>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.jobCompany}>{job.company}</Text>
              <Text style={styles.jobLocation}>{job.location}</Text>
              <Text style={styles.jobType}>{job.type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Card.Content>
    </Card>
  );
});

const styles = {
  sectionCard: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 10,
    elevation: 2,
  },
  applicationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statusText: {
    color: '#FFA500',
    fontSize: 12,
  },
  viewAllButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  viewAllText: {
    color: '#2196F3',
    fontSize: 12,
  },
  jobCard: {
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    elevation: 1,
  },
  jobTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  jobLocation: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  jobType: {
    fontSize: 12,
    color: '#2196F3',
  },
};

export default JobsSection;
