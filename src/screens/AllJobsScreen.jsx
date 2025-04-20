import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Card, Title, IconButton, Chip} from 'react-native-paper';

const AllJobsScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  const jobTypes = ['Full-Time', 'Part-Time', 'Contract', 'Remote', 'Hybrid'];
  const experienceLevels = ['Entry', 'Mid', 'Senior', 'Executive'];
  const salaryRanges = ['<50k', '50k-100k', '100k-150k', '150k+'];

  const allJobs = [
    {
      id: 1,
      title: 'Senior React Native Developer',
      company: 'Tech Solutions Inc.',
      location: 'Remote',
      type: 'Full-Time',
      salary: '$120,000 - $150,000',
      posted: '2 days ago',
      description:
        'We are looking for an experienced React Native developer...',
      requirements: [
        '5+ years of React Native experience',
        'Strong JavaScript/TypeScript skills',
        'Experience with Redux/MobX',
      ],
    },
    // Add more jobs...
  ];

  const filteredJobs = allJobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchText.toLowerCase()) ||
      job.company.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.includes(job.type) ||
      selectedFilters.includes(job.experience);
    return matchesSearch && matchesFilters;
  });

  const toggleFilter = filter => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter],
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for jobs..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <IconButton icon="magnify" size={24} />
      </View>

      {/* Filters */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Job Type</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {jobTypes.map(type => (
            <Chip
              key={type}
              mode={selectedFilters.includes(type) ? 'flat' : 'outlined'}
              onPress={() => toggleFilter(type)}
              style={styles.chip}>
              {type}
            </Chip>
          ))}
        </ScrollView>

        <Text style={styles.filterTitle}>Experience Level</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {experienceLevels.map(level => (
            <Chip
              key={level}
              mode={selectedFilters.includes(level) ? 'flat' : 'outlined'}
              onPress={() => toggleFilter(level)}
              style={styles.chip}>
              {level}
            </Chip>
          ))}
        </ScrollView>

        <Text style={styles.filterTitle}>Salary Range</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {salaryRanges.map(range => (
            <Chip
              key={range}
              mode={selectedFilters.includes(range) ? 'flat' : 'outlined'}
              onPress={() => toggleFilter(range)}
              style={styles.chip}>
              {range}
            </Chip>
          ))}
        </ScrollView>
      </View>

      {/* Job Listings */}
      <View style={styles.jobsContainer}>
        <Text style={styles.resultsText}>{filteredJobs.length} jobs found</Text>

        {filteredJobs.map(job => (
          <TouchableOpacity
            key={job.id}
            onPress={() => navigation.navigate('JobDetails', {job})}>
            <Card style={styles.jobCard}>
              <Card.Content>
                <View style={styles.jobHeader}>
                  <View>
                    <Title style={styles.jobTitle}>{job.title}</Title>
                    <Text style={styles.jobCompany}>{job.company}</Text>
                  </View>
                  <IconButton icon="bookmark-outline" size={24} />
                </View>
                <View style={styles.jobMeta}>
                  <Text style={styles.jobLocation}>{job.location}</Text>
                  <Text style={styles.jobType}>{job.type}</Text>
                  <Text style={styles.jobSalary}>{job.salary}</Text>
                </View>
                <Text style={styles.jobPosted}>{job.posted}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 8,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  jobsContainer: {
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  jobCard: {
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 14,
    color: '#666',
  },
  jobMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  jobLocation: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 12,
  },
  jobType: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 12,
  },
  jobSalary: {
    backgroundColor: '#fff3e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 12,
  },
  jobPosted: {
    fontSize: 12,
    color: '#999',
  },
});

export default AllJobsScreen;
