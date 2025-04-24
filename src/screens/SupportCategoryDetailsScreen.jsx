import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {Card, Title, Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SupportCategoryDetailsScreen = ({route, navigation}) => {
  const {category} = route.params;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Card style={styles.headerCard}>
          <Card.Content style={styles.headerContent}>
            {category.imageUrl && (
              <Image
                source={{uri: category.imageUrl}}
                style={styles.categoryImage}
                resizeMode="cover"
              />
            )}
            <Title style={styles.title}>
              {category.name || 'Support Category'}
            </Title>
            <Text style={styles.description}>
              {category.description || 'Expert support for your needs'}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.detailsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>About This Support</Title>
            <Text style={styles.detailText}>
              {category.about || 'Expert support tailored to your needs.'}
            </Text>

            <Title style={styles.sectionTitle}>What's Included</Title>
            <View style={styles.mainTopicsContainer}>
              {category.mainTopics &&
                category.mainTopics.map((topic, index) => (
                  <View key={index} style={styles.mainTopicItem}>
                    <Ionicons
                      name="arrow-forward-outline"
                      size={30}
                      color="#000"
                    />

                    <Text style={styles.mainTopicText}>{topic.title}</Text>
                  </View>
                ))}
            </View>

            <Title style={styles.sectionTitle}>Available Experts</Title>
            {category.experts &&
              category.experts.map((expert, index) => (
                <View key={index} style={styles.expertCard}>
                  <Text style={styles.expertName}>{expert.name}</Text>
                  <Text style={styles.expertExp}>
                    {expert.experience} years experience
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
    overflow: 'hidden',
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: 'white',
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
  mainTopicsContainer: {
    marginBottom: 16,
  },
  mainTopicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mainTopicImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  mainTopicText: {
    fontSize: 14,
    marginLeft: 5,
    color: '#333',
    flex: 1,
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
