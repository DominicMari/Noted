import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NotesContext } from '../../context/NotesContext';

type RootStackParamList = {
  Home: undefined;
  Notes: undefined;
  Settings: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

const reminders = [
  { id: 1, label: 'Notes for today', message: 'You have completed all your goals for today!' },
  { id: 2, label: '14/03/2025', message: 'Pending due for March 03, 2025' },
  { id: 3, label: '14/08/2025', message: 'You still have 15 days to accomplish' },
  { id: 4, label: 'Today!', message: 'Your friend Dominic shared a note with you!' },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const notesContext = useContext(NotesContext);
  if (!notesContext) {
    throw new Error('NotesContext must be used within a NotesProvider');
  }
  const { personalNotes, sharedNotes } = notesContext;

  const [searchQuery, setSearchQuery] = useState('');

  // Filter reminders based on the search query
  const filteredReminders = reminders.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
      </View>

      {/* Search Bar with "Welcome Back" message and icons */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Welcome Back, Dominic!"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.iconGroup}>
          <Ionicons name="person-circle-outline" size={28} color="#000" style={styles.icon} />
          <Ionicons name="notifications-outline" size={24} color="#000" style={styles.icon} />
        </View>
      </View>

      <Text style={styles.title}>Home</Text>

      {/* Reminders */}
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {filteredReminders.map(item => (
          <View key={item.id} style={styles.card}>
            <Ionicons name="notifications-outline" size={24} color="#000" />
            <TouchableOpacity style={styles.label}>
              <Text style={{ fontWeight: 'bold' }}>{item.label}</Text>
            </TouchableOpacity>
            <Text>{item.message}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#f5d7aa',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: { width: 40, height: 40 },
  searchBarContainer: {
    marginHorizontal: 20,
    marginTop: 15,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  iconGroup: { flexDirection: 'row', marginLeft: 10 },
  icon: { marginLeft: 10 },
  title: { textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  cardsContainer: { paddingHorizontal: 20 },
  card: {
    backgroundColor: '#fbe3bb',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#444',
  },
  label: {
    backgroundColor: '#ddd',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginVertical: 6,
  },
});

export default HomeScreen;
