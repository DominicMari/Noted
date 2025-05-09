import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NotesContext } from '../../context/NotesContext';

type RootStackParamList = {
  Home: undefined;
  Notes: undefined;
  Settings: undefined;
};

type NotesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type NotesScreenProps = {
  navigation: NotesScreenNavigationProp;
};

const NotesScreen: React.FC<NotesScreenProps> = ({ navigation }) => {
  const notesContext = useContext(NotesContext);
  if (!notesContext) {
    throw new Error('NotesContext must be used within a NotesProvider');
  }
  const { personalNotes, sharedNotes, addNote, editNote, deleteNote } = notesContext;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'personal' | 'shared'>('personal');

  const filteredPersonalNotes = personalNotes.filter(
    note =>
      note.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSharedNotes = sharedNotes.filter(
    note =>
      note.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderNotes = (type: 'personal' | 'shared') => {
    const notes = type === 'personal' ? filteredPersonalNotes : filteredSharedNotes;
    return (
      <ScrollView contentContainerStyle={styles.notesContainer}>
        {notes.map(note => (
          <View key={note.id} style={styles.card}>
            <Ionicons
              name={type === 'personal' ? 'document-text-outline' : 'people-outline'}
              size={24}
              color="#000"
            />
            <TextInput
              style={styles.labelInput}
              value={note.label}
              onChangeText={text => editNote(type, note.id, 'label', text)}
            />
            <TextInput
              style={styles.messageInput}
              value={note.message}
              onChangeText={text => editNote(type, note.id, 'message', text)}
            />
            <TouchableOpacity
              onPress={() => deleteNote(type, note.id)}
              style={styles.deleteBtn}
            >
              <Ionicons name="trash-outline" size={22} color="#900" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/icon.png')}
          style={styles.logo}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Welcome Back, Dominic!"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.iconGroup}>
          <Ionicons
            name="person-circle-outline"
            size={28}
            color="#000"
            style={styles.icon}
          />
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#000"
            style={styles.icon}
          />
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'personal' && styles.activeTab]}
          onPress={() => setActiveTab('personal')}
        >
          <Text style={[styles.tabText, activeTab === 'personal' && styles.activeTabText]}>
            Personal Notes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'shared' && styles.activeTab]}
          onPress={() => setActiveTab('shared')}
        >
          <Text style={[styles.tabText, activeTab === 'shared' && styles.activeTabText]}>
            Shared Notes
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addButtons}>
        <TouchableOpacity onPress={() => addNote(activeTab)}>
          <Ionicons name="add-circle-outline" size={30} color="#444" />
          <Text style={styles.addText}>Add {activeTab === 'personal' ? 'Personal' : 'Shared'}</Text>
        </TouchableOpacity>
      </View>

      {renderNotes(activeTab)}
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 10,
  },
  tabButton: { paddingVertical: 10, paddingHorizontal: 20 },
  activeTab: { borderBottomWidth: 3, borderBottomColor: '#007AFF' },
  tabText: { fontSize: 16, color: '#555' },
  activeTabText: { color: '#007AFF', fontWeight: 'bold' },
  addButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  addText: { textAlign: 'center', fontSize: 12 },
  notesContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fbe3bb',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1.5,
    borderColor: '#444',
  },
  labelInput: {
    fontWeight: 'bold',
    backgroundColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 6,
  },
  messageInput: {
    backgroundColor: '#fff5e1',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 6,
  },
  deleteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

export default NotesScreen;
