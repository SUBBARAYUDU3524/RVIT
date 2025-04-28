import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Card, Title, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {WebView} from 'react-native-webview';

const ConfirmSupportScreen = ({route, navigation}) => {
  const {userData, category, formData} = route.params;
  const [confirming, setConfirming] = useState(false);
  const [showPaypalWebview, setShowPaypalWebview] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState('');
  const [orderId, setOrderId] = useState(null);
  const BACKEND_URL = 'http://localhost:5000';
  console.log(userData, 'userDatat');
  console.log(category, 'categort');
  console.log(formData, 'formData');
  const createPaypalOrder = async () => {
    try {
      setConfirming(true);
      const response = await fetch(
        'http://localhost:5000/api/create-paypal-order',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            supportType: formData.supportType,
            category: category.name,
            userEmail: userData.email,
          }),
        },
      );

      const data = await response.json();
      if (data.id) {
        setOrderId(data.id);
        const approvalUrl = data.links.find(
          link => link.rel === 'approve',
        ).href;
        setPaypalUrl(approvalUrl);
        setShowPaypalWebview(true);
      }
    } catch (error) {
      console.error('PayPal order creation error:', error);
      Alert.alert('Error', 'Failed to initialize PayPal payment');
    } finally {
      setConfirming(false);
    }
  };

  const handleWebViewNavigationStateChange = newNavState => {
    const {url} = newNavState;
    if (!url) return;

    if (url.includes('paypal-success')) {
      setShowPaypalWebview(false);
      handlePaymentSuccess();
    }

    if (url.includes('paypal-cancel')) {
      setShowPaypalWebview(false);
      Alert.alert('Payment Cancelled', 'You cancelled the PayPal payment.');
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/capture-paypal-order',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({orderID: orderId}),
        },
      );

      const data = await response.json();
      console.log(data, 'data');
      if (data.success) {
        await firestore().collection('supportBookings').add({
          userId: userData.uid,
          userName: userData.name,
          userEmail: userData.email,
          supportType: formData.supportType,
          category: category.name,
          status: 'confirmed',
          paymentStatus: 'completed',
          paymentAmount: 1.0,
          paymentMethod: 'PayPal',
          paymentId: data.capture.id,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

        Alert.alert(
          'Booking Confirmed',
          'Your support booking has been confirmed. We will contact you soon.',
          [{text: 'OK', onPress: () => navigation.navigate('Home')}],
        );
      } else {
        throw new Error('Payment capture failed');
      }
    } catch (error) {
      console.error('Payment confirmation error:', error);
      Alert.alert(
        'Payment Error',
        'Your booking was created but we encountered an issue confirming payment. Please contact support.',
      );
    }
  };

  if (showPaypalWebview) {
    return (
      <WebView
        source={{uri: paypalUrl}}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        style={{flex: 1}}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      />
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <Title style={styles.title}>Confirm Your Booking</Title>
          </View>

          <View style={styles.paymentNotice}>
            <Icon name="information" size={20} color="#2196F3" />
            <Text style={styles.paymentNoticeText}>
              A $1.00 payment is required to confirm your support booking
            </Text>
          </View>

          <View style={styles.statusBadge}>
            <Icon
              name="clock-outline"
              size={20}
              color="#FFC107"
              style={styles.statusIcon}
            />
            <Text style={styles.statusText}>Pending Confirmation</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support Details</Text>
            <View style={styles.detailRow}>
              <Icon
                name={
                  formData.supportType === 'Full Time'
                    ? 'calendar'
                    : formData.supportType === 'Part Time'
                    ? 'calendar-clock'
                    : formData.supportType === 'Contract'
                    ? 'file-sign'
                    : formData.supportType === 'Consultation'
                    ? 'comment-question'
                    : 'alert-circle'
                }
                size={20}
                color="#2196F3"
                style={styles.detailIcon}
              />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Support Type</Text>
                <Text style={styles.detailValue}>{formData.supportType}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Icon
                name={category.icon || 'help-circle'}
                size={20}
                color="#2196F3"
                style={styles.detailIcon}
              />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Category</Text>
                <Text style={styles.detailValue}>{category.name}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Information</Text>
            <View style={styles.detailRow}>
              <Icon
                name="account"
                size={20}
                color="#2196F3"
                style={styles.detailIcon}
              />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Name</Text>
                <Text style={styles.detailValue}>{userData.name}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Icon
                name="email"
                size={20}
                color="#2196F3"
                style={styles.detailIcon}
              />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Email</Text>
                <Text style={styles.detailValue}>{userData.email}</Text>
              </View>
            </View>
          </View>

          {formData.notes && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Additional Notes</Text>
              <View style={styles.notesContainer}>
                <Icon
                  name="text"
                  size={20}
                  color="#2196F3"
                  style={styles.detailIcon}
                />
                <Text style={styles.notesText}>{formData.notes}</Text>
              </View>
            </View>
          )}

          <Button
            mode="contained"
            style={styles.confirmButton}
            onPress={createPaypalOrder}
            loading={confirming}
            disabled={confirming}>
            <Icon
              name="credit-card"
              size={20}
              color="#fff"
              style={styles.buttonIcon}
            />
            <Text style={styles.confirmButtonText}>
              {confirming ? 'Processing...' : 'Pay $1.00 & Confirm Booking'}
            </Text>
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    borderRadius: 12,
    elevation: 3,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  paymentNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  paymentNoticeText: {
    marginLeft: 10,
    color: '#0D47A1',
    fontSize: 14,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    justifyContent: 'center',
  },
  statusIcon: {
    marginRight: 8,
  },
  statusText: {
    color: '#FFA000',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailIcon: {
    marginRight: 16,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notesText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  buttonIcon: {
    marginRight: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ConfirmSupportScreen;
