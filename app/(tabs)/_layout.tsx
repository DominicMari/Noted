import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NotesProvider } from '../../context/NotesContext';

export default function TabLayout() {
  return (
    <NotesProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#ffd33d',
          headerStyle: {
            backgroundColor: '#25292e',
          },
          headerShadowVisible: false,
          headerTintColor: '#fff',
          tabBarStyle: {
            backgroundColor: '#25292e',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="notes"
          options={{
            title: 'Notes',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'book' : 'book-outline'} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'settings' : 'settings-outline'} color={color} size={24} />
            ),
          }}
        />
      </Tabs>
    </NotesProvider>
  );
}
