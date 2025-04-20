import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Card, Title, Divider, Button} from 'react-native-paper';

const JobDetailsScreen = ({route, navigation}) => {
  const {job} = route.params;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <Title style={styles.jobTitle}>{job.title}</Title>
            <Text style={styles.company}>{job.company}</Text>
            <View style={styles.metaContainer}>
              <Text style={styles.metaText}>{job.location}</Text>
              <Text style={styles.metaText}>•</Text>
              <Text style={styles.metaText}>{job.type}</Text>
              <Text style={styles.metaText}>•</Text>
              <Text style={styles.metaText}>{job.salary}</Text>
            </View>
            <Text style={styles.postedDate}>Posted: {job.posted}</Text>
          </Card.Content>
        </Card>

        <Card style={styles.detailCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Job Description</Title>
            <Text style={styles.descriptionText}>{job.description}</Text>

            <Title style={styles.sectionTitle}>Requirements</Title>
            {job.requirements.map((req, index) => (
              <View key={index} style={styles.requirementItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.requirementText}>{req}</Text>
              </View>
            ))}

            <Title style={styles.sectionTitle}>Responsibilities</Title>
            {/* Add responsibilities list similar to requirements */}

            <Title style={styles.sectionTitle}>Benefits</Title>
            {/* Add benefits list */}
          </Card.Content>
        </Card>

        <Card style={styles.companyCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>About {job.company}</Title>
            <Text style={styles.descriptionText}>
              {/* Add company description */}
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="contained"
          style={styles.applyButton}
          onPress={() =>
            navigation.navigate('JobApplication', {jobId: job.id})
          }>
          Apply Now
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
  },
  headerCard: {
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  company: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    marginRight: 8,
    color: '#666',
  },
  postedDate: {
    fontSize: 12,
    color: '#999',
  },
  detailCard: {
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
    marginBottom: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bullet: {
    marginRight: 8,
  },
  requirementText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
  companyCard: {
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  applyButton: {
    borderRadius: 4,
    paddingVertical: 8,
    backgroundColor: '#2196F3',
  },
});

export default JobDetailsScreen;
