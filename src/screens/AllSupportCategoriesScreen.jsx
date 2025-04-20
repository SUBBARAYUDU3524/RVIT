import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Card, Title, IconButton} from 'react-native-paper';

const AllSupportCategoriesScreen = ({navigation}) => {
  const allCategories = [
    {
      id: 1,
      name: 'Technical Support',
      description: 'Get help with technical issues and troubleshooting.',
      icon: 'tools',
    },
    {
      id: 2,
      name: 'Billing Support',
      description: 'Assistance with billing and payment inquiries.',
      icon: 'credit-card',
    },
    {
      id: 3,
      name: 'Account Support',
      description: 'Help with account creation, login, and settings.',
      icon: 'account-circle',
    },
    {
      id: 4,
      name: 'Product Support',
      description: 'Guidance on product features and usage.',
      icon: 'shopping-cart',
    },
    {
      id: 5,
      name: 'Feedback',
      description: 'Submit your feedback and suggestions.',
      icon: 'message',
    },
    {
      id: 6,
      name: 'FAQs',
      description: 'Find answers to frequently asked questions.',
      icon: 'help-circle',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>All Support Categories</Title>

          <View style={styles.gridContainer}>
            {allCategories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={styles.gridItem}
                onPress={() =>
                  navigation.navigate('SupportCategoryDetails', {category})
                }>
                <View style={styles.iconContainer}>
                  <IconButton
                    icon={category.icon}
                    size={32}
                    color="#2196F3"
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.itemName}>{category.name}</Text>
                <Text style={styles.itemDescription}>
                  {category.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#e3f2fd',
    borderRadius: 50,
    padding: 12,
    marginBottom: 12,
  },
  icon: {
    margin: 0,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'center',
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default AllSupportCategoriesScreen;
