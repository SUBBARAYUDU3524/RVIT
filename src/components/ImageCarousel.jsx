import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const carouselImages = [
  require('../assets/carousal.jpg'),
  require('../assets/rvit.jpeg'),
  require('../assets/carousal.jpg'),
  require('../assets/carousal.jpg'),
];

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef(null);

  // Reset interval when component unmounts or dependencies change
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Auto-scroll with proper cleanup
  useEffect(() => {
    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        const newIndex = (currentIndex + 1) % carouselImages.length;
        flatListRef.current?.scrollToIndex({
          index: newIndex,
          animated: true,
        });
      }, 3000);
    };

    startAutoScroll();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex]);

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({item}) => (
    <View style={styles.carouselItem}>
      <Image
        source={item}
        style={styles.carouselImage}
        resizeMode="cover"
        onError={e => console.log('Image load error:', e.nativeEvent.error)}
      />
    </View>
  );

  const scrollToIndex = index => {
    // Reset auto-scroll timer when manually navigating
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    flatListRef.current?.scrollToIndex({index, animated: true});

    // Restart auto-scroll after manual navigation
    setTimeout(() => {
      intervalRef.current = setInterval(() => {
        const newIndex = (currentIndex + 1) % carouselImages.length;
        flatListRef.current?.scrollToIndex({
          index: newIndex,
          animated: true,
        });
      }, 3000);
    }, 5000); // Longer delay after manual interaction
  };

  // Get animated dot opacity
  const getDotOpacity = index => {
    return scrollX.interpolate({
      inputRange: [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={carouselImages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{itemVisiblePercentThreshold: 50}}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={1}
        getItemLayout={(data, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })} // Properly calculate item layout for FlatList
        onScrollToIndexFailed={info => {
          console.warn('Scroll to index failed', info);
          // Scroll to the nearest possible index
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          }, 500); // Retry after a short delay
        }} // Handle scrolling failures gracefully
      />

      <View style={styles.dotsContainer}>
        {carouselImages.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => scrollToIndex(index)}
            activeOpacity={0.7}>
            <Animated.View
              style={[
                styles.dot,
                {opacity: getDotOpacity(index)},
                currentIndex === index && styles.activeDot,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.arrowBtn, styles.leftArrow]}
        onPress={() => {
          const prevIndex =
            (currentIndex - 1 + carouselImages.length) % carouselImages.length;
          scrollToIndex(prevIndex);
        }}>
        <Icon name="chevron-left" size={30} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.arrowBtn, styles.rightArrow]}
        onPress={() => {
          const nextIndex = (currentIndex + 1) % carouselImages.length;
          scrollToIndex(nextIndex);
        }}>
        <Icon name="chevron-right" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: -15,
    position: 'relative',
    backgroundColor: '#fff', // Fallback background
  },
  carouselItem: {
    width: SCREEN_WIDTH,
    padding: 20,
    height: 250, // More standard height
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8, // Slightly rounded corners
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 12,
    backgroundColor: '#4a90e2', // Blue for active dot
  },
  arrowBtn: {
    position: 'absolute',
    top: '50%',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{translateY: -20}],
  },
  leftArrow: {
    left: 30,
  },
  rightArrow: {
    right: 30,
  },
});

export default ImageCarousel;
