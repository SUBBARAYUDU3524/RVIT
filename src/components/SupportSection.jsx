import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

const SupportSection = React.forwardRef(({navigation}, ref) => {
  const [supportCategories, setSupportCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSupportCategories = async () => {
      try {
        const snapshot = await firestore().collection('support').limit(3).get();
        const categoriesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSupportCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching support categories:', err);
        setError('Failed to load support categories. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSupportCategories();
  }, []);

  if (error) {
    return (
      <Card style={styles.sectionCard} ref={ref}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Support Categories</Title>
          <Text style={styles.errorText}>{error}</Text>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card style={styles.sectionCard} ref={ref}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <Title style={styles.sectionTitle}>Technical Support</Title>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => navigation.navigate('AllSupportCategories')}>
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
            contentContainerStyle={styles.categoriesContainer}>
            {supportCategories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() =>
                  navigation.navigate('SupportCategoryDetails', {category})
                }>
                <View style={styles.categoryIconContainer}>
                  {category.imageUrl ? (
                    <Image
                      source={{uri: category.imageUrl}}
                      style={styles.categoryImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <Icon name="help-circle" size={30} color="#2196F3" />
                  )}
                </View>
                <Text style={styles.categoryName} numberOfLines={1}>
                  {category.name ||
                    category.mainTopics?.[0]?.title ||
                    'Support Category'}
                </Text>
                <Text style={styles.categoryDescription} numberOfLines={2}>
                  {category.description ||
                    'Expert support for your technical needs'}
                </Text>
                {category.experts?.length > 0 && (
                  <View style={styles.expertsContainer}>
                    <Text style={styles.expertsLabel}>
                      {category.experts.length}{' '}
                      {category.experts.length > 1 ? 'Experts' : 'Expert'}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* <TouchableOpacity
          style={styles.newSupportButton}
          onPress={() => navigation.navigate('NewSupportRequest')}>
          <Text style={styles.newSupportButtonText}>+ New Support Request</Text>
        </TouchableOpacity> */}
      </Card.Content>
    </Card>
  );
});

const styles = {
  sectionCard: {
    backgroundColor: '#fff',
    marginBottom: 80,
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
  categoriesContainer: {
    paddingVertical: 4,
  },
  categoryCard: {
    width: 180,
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
  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    alignSelf: 'center',
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  categoryDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 16,
  },
  expertsContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  expertsLabel: {
    fontSize: 11,
    color: '#666',
  },
  newSupportButton: {
    marginTop: 16,
    padding: 14,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  newSupportButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
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

export default SupportSection;
