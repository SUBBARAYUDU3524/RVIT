import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  RefreshControl,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native'; // For Dark/Light theme support

// Dummy Notification Data
const notifications = [
  {
    id: '1',
    title: 'New Message',
    message: 'John Doe sent you a message: "Hey, how are you doing?"',
    time: '10 mins ago',
    read: false,
    icon: 'message',
    iconColor: '#4a90e2',
  },
  {
    id: '2',
    title: 'Order Shipped',
    message: 'Your order #12345 has been shipped and will arrive soon.',
    time: '2 hours ago',
    read: false,
    icon: 'local-shipping',
    iconColor: '#2ecc71',
  },
  {
    id: '3',
    title: 'Security Alert',
    message: 'A new device logged into your account. Check now.',
    time: '5 hours ago',
    read: true,
    icon: 'security',
    iconColor: '#e74c3c',
  },
  {
    id: '4',
    title: 'Payment Received',
    message: 'You received $250 from Sarah Williams.',
    time: 'Yesterday',
    read: true,
    icon: 'payment',
    iconColor: '#9b59b6',
  },
  {
    id: '5',
    title: 'Event Reminder',
    message: 'Your meeting starts in 30 minutes. Join now!',
    time: 'Yesterday',
    read: true,
    icon: 'event',
    iconColor: '#f39c12',
  },
  {
    id: '6',
    title: 'New Follower',
    message: 'Alex Johnson started following you.',
    time: '2 days ago',
    read: true,
    icon: 'person-add',
    iconColor: '#3498db',
  },
];

// Group notifications by time (Today, Yesterday, Earlier)
const groupNotifications = data => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const grouped = {
    today: [],
    yesterday: [],
    earlier: [],
  };

  data.forEach(item => {
    const itemDate = new Date(item.time);
    if (itemDate >= today) {
      grouped.today.push(item);
    } else if (itemDate >= yesterday) {
      grouped.yesterday.push(item);
    } else {
      grouped.earlier.push(item);
    }
  });

  return grouped;
};

const groupedNotifications = groupNotifications(notifications);

// Notification Item Component
const NotificationItem = React.memo(({item, onPress}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const {colors} = useTheme();

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <ScrollView>
      <Animated.View
        style={[
          styles.notificationItem,
          {opacity: fadeAnim, backgroundColor: colors.card},
        ]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          <View style={styles.notificationContent}>
            <View
              style={[
                styles.iconContainer,
                {backgroundColor: `${item.iconColor}20`},
              ]}>
              <Icon name={item.icon} size={24} color={item.iconColor} />
            </View>
            <View style={styles.textContainer}>
              <Text
                style={[styles.notificationTitle, {color: colors.text}]}
                numberOfLines={1}>
                {item.title}
              </Text>
              <Text
                style={[styles.notificationMessage, {color: colors.text}]}
                numberOfLines={2}>
                {item.message}
              </Text>
              <Text style={styles.notificationTime}>{item.time}</Text>
            </View>
            {!item.read && <View style={styles.unreadIndicator} />}
          </View>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
});

// Notification Section Header
const SectionHeader = ({title}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, {color: colors.text}]}>{title}</Text>
    </View>
  );
};

// Main Notification Screen
const NotificationScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const {colors} = useTheme();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderItem = ({item}) => (
    <NotificationItem item={item} onPress={() => markAsRead(item.id)} />
  );

  const markAsRead = id => {
    // Logic to mark notification as read (API call or state update)
    console.log(`Marked notification ${id} as read.`);
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <FlatList
        data={groupedNotifications.today}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            {groupedNotifications.today.length > 0 && (
              <SectionHeader title="Today" />
            )}
          </>
        }
        ListFooterComponent={
          <>
            {groupedNotifications.yesterday.length > 0 && (
              <>
                <SectionHeader title="Yesterday" />
                <FlatList
                  data={groupedNotifications.yesterday}
                  keyExtractor={item => item.id}
                  renderItem={renderItem}
                />
              </>
            )}
            {groupedNotifications.earlier.length > 0 && (
              <>
                <SectionHeader title="Earlier" />
                <FlatList
                  data={groupedNotifications.earlier}
                  keyExtractor={item => item.id}
                  renderItem={renderItem}
                />
              </>
            )}
          </>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4a90e2']}
            tintColor={colors.text}
          />
        }
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  notificationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },
  notificationMessage: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: '#888',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4a90e2',
    marginLeft: 10,
  },
});
