import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';

const Tab = createBottomTabNavigator();

const CustomHomeButton = ({children, onPress, isActive}) => {
  const buttonStyle = isActive ? styles.activeHomeButton : styles.homeButton;
  return (
    <TouchableOpacity style={styles.customButton} onPress={onPress}>
      <View style={buttonStyle}>{children}</View>
    </TouchableOpacity>
  );
};

const HomeTabs = () => {
  const [selectedTab, setSelectedTab] = useState('Home');

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Notifications') iconName = 'bell';
          else if (route.name === 'Profile') iconName = 'user';
          else if (route.name === 'Chat') iconName = 'wechat';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF4500',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      })}
      screenListeners={({route}) => ({
        tabPress: () => {
          setSelectedTab(route.name);
        },
      })}>
      {/* Common Screens for All Users */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarButton: props => (
            <CustomHomeButton {...props} isActive={selectedTab === 'Home'}>
              <Icon name="home" size={25} color="#FF4500" />
            </CustomHomeButton>
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarButton: props => (
            <CustomHomeButton
              {...props}
              isActive={selectedTab === 'Notifications'}>
              <Icon name="bell" size={25} color="#FF4500" />
            </CustomHomeButton>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarButton: props => (
            <CustomHomeButton {...props} isActive={selectedTab === 'Chat'}>
              <Icon name="wechat" size={25} color="#FF4500" />
            </CustomHomeButton>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarButton: props => (
            <CustomHomeButton {...props} isActive={selectedTab === 'Profile'}>
              <Icon name="user" size={25} color="#FF4500" />
            </CustomHomeButton>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',
    height: 55,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    left: 10,
    right: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 3,
  },
  customButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeButton: {
    top: 10,
  },
  activeHomeButton: {
    top: -10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFE4C4',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 6},
    shadowRadius: 6,
  },
});

export default HomeTabs;
