import React from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';
import {Card, Title, IconButton} from 'react-native-paper';

const SupportSection = React.forwardRef(({navigation}, ref) => {
  const supportRequests = [
    {
      id: 1,
      type: 'Debugging',
      date: 'Today, 2:30 PM',
      status: 'Scheduled',
      engineer: 'Alex Johnson',
    },
    {
      id: 2,
      type: 'Deployment',
      date: 'Yesterday',
      status: 'Completed',
      rating: 4.5,
    },
  ];

  const supportCategories = [
    {
      id: 1,
      name: 'Debugging',
      icon: 'bug',
      description: 'Get help with code debugging',
    },
    {
      id: 2,
      name: 'Deployment',
      icon: 'cloud-upload',
      description: 'Deployment support',
    },
    {
      id: 3,
      name: 'Performance',
      icon: 'speedometer',
      description: 'Performance optimization',
    },
    {
      id: 4,
      name: 'Architecture',
      icon: 'sitemap',
      description: 'System design consulting',
    },
    {
      id: 5,
      name: 'Security',
      icon: 'shield',
      description: 'Security reviews',
    },
  ];

  return (
    <Card style={styles.sectionCard} ref={ref}>
      <Card.Content>
        <Title>Technical Support</Title>
        {supportRequests.map((request, index) => (
          <View
            key={request.id}
            style={[
              styles.supportItem,
              index < supportRequests.length - 1 && styles.supportItemBorder,
            ]}>
            <View style={styles.supportTypeIcon}>
              <IconButton
                icon={request.status === 'Completed' ? 'check-circle' : 'clock'}
                color={request.status === 'Completed' ? '#4CAF50' : '#FFA500'}
                size={20}
              />
            </View>
            <View style={styles.supportDetails}>
              <Text style={styles.supportType}>{request.type}</Text>
              <Text style={styles.supportDate}>{request.date}</Text>
              {request.status === 'Completed' && (
                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <IconButton
                      key={star}
                      icon={star <= request.rating ? 'star' : 'star-outline'}
                      size={16}
                      color="#FFD700"
                    />
                  ))}
                </View>
              )}
              {request.status !== 'Completed' && (
                <Text style={styles.supportEngineer}>
                  With: {request.engineer}
                </Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.supportAction}
              onPress={() =>
                navigation.navigate('SupportDetails', {requestId: request.id})
              }>
              <Text style={styles.supportActionText}>
                {request.status === 'Completed' ? 'View' : 'Details'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          style={styles.newSupportButton}
          onPress={() => navigation.navigate('NewSupportRequest')}>
          <Text style={styles.newSupportButtonText}>+ New Support Request</Text>
        </TouchableOpacity>

        <View style={styles.categoriesHeader}>
          <Title style={styles.categoriesTitle}>Support Categories</Title>
          <TouchableOpacity
            onPress={() => navigation.navigate('AllSupportCategories')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}>
          {supportCategories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() =>
                navigation.navigate('SupportCategoryDetails', {category})
              }>
              <View style={styles.categoryIconContainer}>
                <IconButton
                  icon={category.icon}
                  size={28}
                  color="#2196F3"
                  style={styles.categoryIcon}
                />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryDescription} numberOfLines={2}>
                {category.description}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Card.Content>
    </Card>
  );
});

const styles = {
  sectionCard: {
    marginBottom: 16,
    borderRadius: 10,
    elevation: 2,
  },
  supportItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
  },
  supportItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  supportTypeIcon: {
    marginRight: 10,
  },
  supportDetails: {
    flex: 1,
  },
  supportType: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  supportDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  supportEngineer: {
    fontSize: 12,
    color: '#2196F3',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  supportAction: {
    marginLeft: 10,
  },
  supportActionText: {
    color: '#2196F3',
    fontSize: 14,
  },
  newSupportButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    alignItems: 'center',
  },
  newSupportButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionCard: {
    marginBottom: 16,
    borderRadius: 10,
    elevation: 2,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoriesTitle: {
    fontSize: 16,
  },
  viewAllText: {
    color: '#2196F3',
    fontSize: 14,
  },
  categoriesScroll: {
    marginBottom: 16,
  },
  categoryCard: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    elevation: 1,
    alignItems: 'center',
  },
  categoryIconContainer: {
    backgroundColor: '#e3f2fd',
    borderRadius: 50,
    padding: 8,
    marginBottom: 8,
  },
  categoryIcon: {
    margin: 0,
  },
  categoryName: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  supportRequestsTitle: {
    marginTop: 16,
  },
};

export default SupportSection;
