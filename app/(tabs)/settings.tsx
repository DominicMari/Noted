import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const SettingsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'terms' | 'privacy'>('general');
  const router = useRouter();

  const handleLogout = () => {
    console.log('User logged out');
    router.push('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>General Settings</Text>
            <Button title="Log Out" onPress={handleLogout} color="#d9534f" />
          </View>
        );
      case 'terms':
        return (
          <ScrollView style={styles.contentContainer}>
            <Text style={styles.contentTitle}>Terms and Conditions</Text>
            <Text style={styles.contentText}>
              {/* Placeholder terms content */}
              Welcome to Noted. These Terms govern your access to and use of the Noted application and any related services provided by LianCorp.
              By accessing or using Noted, you agree to be bound by these Terms. If you do not agree, please do not use the app.
            </Text>
            <Text style={styles.contentTitle}>Services</Text>
            <Text style={styles.contentText}>
              {/* Placeholder terms content */}
              Noted is a digital note-taking application designed to help users create, organize, and manage their notes efficiently. It offers features such as rich text editing, cloud syncing, and cross-device access to ensure your notes are always available when you need them.
              Whether you're jotting down quick ideas or managing detailed to-do lists, Noted provides a simple and reliable platform for capturing your thoughts. Additional premium features may be available through a subscription plan.
            </Text>
          </ScrollView>
        );
      case 'privacy':
        return (
          <ScrollView style={styles.contentContainer}>
            <Text style={styles.contentTitle}>Privacy Policy</Text>
            <Text style={styles.contentText}>
              {/* Placeholder privacy content */}
              Your privacy is important to us. We do not share your data with third parties without your consent.
              At Noted, we take your privacy seriously. We collect only the information necessary to provide and improve our services, such as your email address and any notes you choose to save. Your personal data and content are never sold, shared, or accessed without your permission, except when required by law or to provide technical support.
              All your notes are securely stored, and we use encryption and other industry-standard security measures to protect your information. By using Noted, you agree to this Privacy Policy and the way we handle your data.
            </Text>
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'general' && styles.activeTab]}
          onPress={() => setActiveTab('general')}
        >
          <Text style={[styles.tabText, activeTab === 'general' && styles.activeTabText]}>General</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'terms' && styles.activeTab]}
          onPress={() => setActiveTab('terms')}
        >
          <Text style={[styles.tabText, activeTab === 'terms' && styles.activeTabText]}>Terms</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'privacy' && styles.activeTab]}
          onPress={() => setActiveTab('privacy')}
        >
          <Text style={[styles.tabText, activeTab === 'privacy' && styles.activeTabText]}>Privacy</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 1, borderBottomColor: '#ccc' },
  tabButton: { paddingVertical: 10, paddingHorizontal: 20 },
  activeTab: { borderBottomWidth: 3, borderBottomColor: '#007AFF' },
  tabText: { fontSize: 16, color: '#555' },
  activeTabText: { color: '#007AFF', fontWeight: 'bold' },
  contentContainer: { flex: 1, padding: 20 },
  contentTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  contentText: { fontSize: 14, lineHeight: 20, marginBottom: 10 },
});

export default SettingsScreen;
