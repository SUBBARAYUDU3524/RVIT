import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const AllSupportCategoriesScreen = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await firestore().collection('support').get();
        const categoriesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories: ', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4E8AF4" />
        <Text style={styles.loadingText}>Loading Support Options...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Expert Support Categories</Title>
          <Text style={styles.subtitle}>
            Tap any category to get specialized assistance
          </Text>

          <View style={styles.gridContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.gridItem,
                  index % 2 === 0 ? styles.gridItemLeft : styles.gridItemRight,
                ]}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('SupportCategoryDetails', {category})
                }>
                <View style={styles.imageContainer}>
                  <Image
                    source={
                      category.imageUrl
                        ? {uri: category.imageUrl}
                        : require('../assets/user.jpg')
                    }
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                  <View style={styles.imageOverlay} />
                </View>
                <Text style={styles.itemName} numberOfLines={1}>
                  {category.name || 'Support Category'}
                </Text>
                <Text style={styles.priceText}>$1.00 booking fee</Text>
                <Text style={styles.itemDescription} numberOfLines={2}>
                  {category.description || 'Get expert support for your issues'}
                </Text>
                <View style={styles.learnMoreContainer}>
                  <Text style={styles.learnMoreText}>Learn More →</Text>
                </View>
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
    backgroundColor: '#F8FAFF',
  },
  scrollContent: {
    padding: 20,
  },
  priceText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#4E8AF4',
    fontFamily: 'System',
    fontWeight: '500',
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#4E8AF4',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    color: '#2D3748',
    fontFamily: 'System',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#718096',
    marginBottom: 24,
    fontFamily: 'System',
    fontWeight: '400',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  gridItem: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#1A365D',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  gridItemLeft: {
    marginRight: 2,
  },
  gridItemRight: {
    marginLeft: 2,
  },
  imageContainer: {
    width: 72,
    height: 72,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    alignSelf: 'center',
    position: 'relative',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(78, 138, 244, 0.1)',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  itemName: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
    color: '#2D3748',
    fontFamily: 'System',
  },
  itemDescription: {
    fontSize: 13,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 18,
    fontFamily: 'System',
  },
  learnMoreContainer: {
    alignSelf: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#EBF4FF',
  },
  learnMoreText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4E8AF4',
    fontFamily: 'System',
  },
});

export default AllSupportCategoriesScreen;
