import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Card, Title, Divider, Button} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const JobDetailsScreen = ({route, navigation}) => {
  const {job} = route.params;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <View style={styles.headerContent}>
              <Title style={styles.jobTitle}>{job.title}</Title>
              <Text style={styles.company}>{job.company}</Text>

              <View style={styles.metaContainer}>
                <View style={styles.metaItem}>
                  <MaterialIcons name="location-on" size={16} color="#4E8AF4" />
                  <Text style={styles.metaText}>{job.location}</Text>
                </View>

                <View style={styles.metaItem}>
                  <MaterialIcons name="work" size={16} color="#4E8AF4" />
                  <Text style={styles.metaText}>{job.type}</Text>
                </View>

                <View style={styles.metaItem}>
                  <MaterialIcons
                    name="attach-money"
                    size={16}
                    color="#4E8AF4"
                  />
                  <Text style={styles.metaText}>{job.salary}</Text>
                </View>
              </View>

              <View style={styles.postedContainer}>
                <MaterialIcons name="access-time" size={14} color="#718096" />
                <Text style={styles.postedDate}>
                  Posted: {new Date(job.posted).toDateString()}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.detailCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="description" size={20} color="#4E8AF4" />
              <Title style={styles.sectionTitle}>Job Description</Title>
            </View>
            <Divider style={styles.divider} />
            <Text style={styles.descriptionText}>{job.description}</Text>

            <View style={styles.sectionHeader}>
              <MaterialIcons name="list-alt" size={20} color="#4E8AF4" />
              <Title style={styles.sectionTitle}>Requirements</Title>
            </View>
            <Divider style={styles.divider} />
            {job.requirements.map((req, index) => (
              <View key={index} style={styles.listItem}>
                <MaterialIcons
                  name="check-circle"
                  size={16}
                  color="#4E8AF4"
                  style={styles.bulletIcon}
                />
                <Text style={styles.listText}>{req}</Text>
              </View>
            ))}

            <View style={styles.sectionHeader}>
              <MaterialIcons name="assignment" size={20} color="#4E8AF4" />
              <Title style={styles.sectionTitle}>Responsibilities</Title>
            </View>
            <Divider style={styles.divider} />
            {job.responsibilities.map((res, index) => (
              <View key={index} style={styles.listItem}>
                <MaterialIcons
                  name="play-arrow"
                  size={16}
                  color="#4E8AF4"
                  style={styles.bulletIcon}
                />
                <Text style={styles.listText}>{res}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="contained"
          style={styles.applyButton}
          labelStyle={styles.applyButtonLabel}
          onPress={() => navigation.navigate('JobApplication', {jobId: job.id})}
          icon="send">
          Apply Now
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  scrollContainer: {
    padding: 16,
  },
  headerCard: {
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#4E8AF4',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContent: {
    padding: 8,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
    color: '#2D3748',
  },
  company: {
    fontSize: 18,
    color: '#4A5568',
    marginBottom: 16,
    fontWeight: '500',
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  metaText: {
    marginLeft: 4,
    color: '#4A5568',
    fontSize: 14,
  },
  postedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  postedDate: {
    fontSize: 12,
    color: '#718096',
    marginLeft: 4,
  },
  detailCard: {
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#4E8AF4',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#2D3748',
  },
  divider: {
    marginVertical: 12,
    backgroundColor: '#E2E8F0',
    height: 1,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4A5568',
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bulletIcon: {
    marginTop: 3,
    marginRight: 8,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#4A5568',
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EDF2F7',
    shadowColor: '#1A365D',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  applyButton: {
    borderRadius: 8,
    paddingVertical: 10,
    backgroundColor: '#4E8AF4',
    shadowColor: '#4E8AF4',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  applyButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default JobDetailsScreen;
