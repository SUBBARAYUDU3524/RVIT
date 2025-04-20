import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChattingScreen = ({route}) => {
  const {user} = route.params;
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hey there!',
      time: '10:30 AM',
      sent: true,
      read: true,
    },
    {
      id: '2',
      text: 'Hi! How are you?',
      time: '10:31 AM',
      sent: false,
      read: true,
    },
    {
      id: '3',
      text: 'I was wondering if we could meet tomorrow?',
      time: '10:32 AM',
      sent: true,
      read: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: Date.now().toString(),
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      sent: true,
      read: false,
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');

    // Simulate reply after 1 second
    setTimeout(() => {
      const replyMsg = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message!',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        sent: false,
        read: true,
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1000);
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  const renderItem = ({item}) => (
    <View
      style={[
        styles.messageContainer,
        item.sent ? styles.sentMessage : styles.receivedMessage,
      ]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <View style={styles.messageTimeContainer}>
        <Text style={styles.messageTime}>{item.time}</Text>
        {item.sent && (
          <Icon
            name={item.read ? 'done-all' : 'done'}
            size={16}
            color={item.read ? '#4FC3F7' : '#888'}
            style={styles.statusIcon}
          />
        )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}>
      <View style={styles.header}>
        <Image source={user.avatar} style={styles.headerAvatar} />
        <View style={styles.headerText}>
          <Text style={styles.headerName}>{user.name}</Text>
          <Text style={styles.headerStatus}>Online</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Icon
              name="videocam"
              size={24}
              color="#075E54"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="call" size={24} color="#075E54" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="more-vert"
              size={24}
              color="#075E54"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({animated: true})
        }
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachmentButton}>
          <Icon name="attach-file" size={24} color="#075E54" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraButton}>
          <Icon name="camera-alt" size={24} color="#075E54" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={newMessage.trim() === ''}>
          <Icon
            name={newMessage.trim() === '' ? 'mic' : 'send'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5ded8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#075E54',
    elevation: 4,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  headerText: {
    flex: 1,
  },
  headerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerStatus: {
    fontSize: 12,
    color: '#eee',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
  },
  messagesContainer: {
    padding: 15,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderTopRightRadius: 0,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  messageTimeContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  messageTime: {
    fontSize: 12,
    color: '#555',
    marginRight: 5,
  },
  statusIcon: {
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  attachmentButton: {
    marginRight: 10,
  },
  cameraButton: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#075E54',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default ChattingScreen;
