import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Card, Title, Button, IconButton} from 'react-native-paper';

const SupportCategoryDetailsScreen = ({route, navigation}) => {
  const {category} = route.params;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Card style={styles.headerCard}>
          <Card.Content style={styles.headerContent}>
            <View style={styles.iconContainer}>
              <IconButton
                icon={category.icon}
                size={48}
                color="#2196F3"
                style={styles.icon}
              />
            </View>
            <Title style={styles.title}>{category.name}</Title>
            <Text style={styles.description}>{category.description}</Text>
          </Card.Content>
        </Card>

        <Card style={styles.detailsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>About This Support</Title>
            <Text style={styles.detailText}>
              Our expert {category.name.toLowerCase()} support helps you resolve
              issues quickly and efficiently. Get one-on-one sessions with our
              certified engineers.
            </Text>

            <Title style={styles.sectionTitle}>What's Included</Title>
            {[
              'Personalized 1:1 session',
              'Expert troubleshooting',
              'Best practice guidance',
              'Follow-up resources',
            ].map((item, index) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}

            <Title style={styles.sectionTitle}>Available Experts</Title>
            {[
              {name: 'Alex Johnson', experience: '8 years'},
              {name: 'Sarah Williams', experience: '6 years'},
              {name: 'Michael Chen', experience: '10 years'},
            ].map((expert, index) => (
              <View key={index} style={styles.expertCard}>
                <Text style={styles.expertName}>{expert.name}</Text>
                <Text style={styles.expertExp}>
                  {expert.experience} experience
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="contained"
          style={styles.bookButton}
          onPress={() => navigation.navigate('BookSupportSlot', {category})}>
          Book a Support Session
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
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: '#2196F3',
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50,
    padding: 16,
    marginBottom: 16,
  },
  icon: {
    margin: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
  },
  detailsCard: {
    borderRadius: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
    marginBottom: 16,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    marginRight: 8,
    color: '#2196F3',
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
  expertCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
  },
  expertName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  expertExp: {
    fontSize: 12,
    color: '#666',
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  bookButton: {
    borderRadius: 8,
    paddingVertical: 10,
    backgroundColor: '#2196F3',
  },
});

export default SupportCategoryDetailsScreen;
