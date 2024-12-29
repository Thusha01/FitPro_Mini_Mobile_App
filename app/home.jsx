import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import CardView from '../components/CardView'; // Assuming CardView is a custom component
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the icons
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState('user@example.com'); // Replace with actual user email if available.
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingText, setGreetingText] = useState('');
  const [showInstructions, setShowInstructions] = useState(false); // To manage the visibility of instructions
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://exercisedb.p.rapidapi.com/exercises',
          {
            method: 'GET',
            headers: {
              'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
              'X-RapidAPI-Key': '398edb2606mshfad14ec690027d1p177d21jsn81f0cd042290', // Replace with your actual API key
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch exercises.');
        }
        const data = await response.json();
        setExercises(data.slice(0, 30)); // Load initial exercises (10 items)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        console.log('Fetched username:', storedUsername); // Debugging log
        if (storedUsername) {
          setUserEmail(storedUsername); // Set the username for display
        } else {
          console.log('Username not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };   

    fetchUserData();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() === '') {
      setFilteredExercises(exercises);
    } else {
      const filtered = exercises.filter((exercise) =>
        exercise.target.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredExercises(filtered);
    }
  };


  const handleFavorite = (item) => {
    if (!favorites.some((fav) => fav.id === item.id)) {
      setFavorites([...favorites, item]);
      Alert.alert('Added to Favorites', `${item.name} added to your favorites.`);
    } else {
      Alert.alert('Already Favorited', `${item.name} is already in your favorites.`);
    }
  };

  const handleViewMore = (item) => {
    setClickCount(clickCount + 1);
    setShowInstructions(!showInstructions); // Toggle instructions visibility
  };

  const handleFloatingButtonPress = () => {
    setGreetingText(`You've viewed ${clickCount} exercises! Keep it up, you're amazing! 💪`);
    setShowGreeting(true);
    setTimeout(() => {
      setShowGreeting(false);
      setGreetingText('');
    }, 2000); // Hide greeting after 3 seconds
  };

  // Navigate to the login page (logout functionality)
  const handleLogoutPress = async () => {
    try {
      await AsyncStorage.removeItem('userData'); // Clear user data
      router.push('/'); // Navigate to login page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <Text style={styles.navBarIcon}>🏋️</Text>
        <Text style={styles.navBarEmail}>{userEmail || 'Guest'}</Text> {/* Display username or 'Guest' */}
      <View style={styles.navIcons}>
      <TouchableOpacity onPress={handleLogoutPress} style={styles.navIcon}>
        <Ionicons name="log-out-outline" size={24} color="white" />
      </TouchableOpacity>
      </View>
    </View>


      {/* Search Section */}
      <View style={styles.searchSection}>
        <Ionicons name="search-outline" size={20} color="#333" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by target area"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      {/* Exercises List */}
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text>Loading...</Text>
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      ) : (
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardView
              item={item}
              onFavorite={handleFavorite}
              onViewMore={handleViewMore}
              showInstructions={showInstructions} // Pass the state for visibility
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={handleFloatingButtonPress}>
        <Text style={styles.floatingButtonText}>{clickCount}</Text>
      </TouchableOpacity>

      {/* Greeting Modal */}
      {showGreeting && (
      <View style={styles.greetingOverlay}>
        <Text style={styles.greetingOverlayText}>{greetingText}</Text>
      </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#4CAF50',
  },
  navBarIcon: {
    fontSize: 24,
    color: '#fff',
    marginRight: 10,
  },
  navBarEmail: {
    fontSize: 16,
    color: '#fff',
  },
  navIcons: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  navIcon: {
    marginLeft: 15,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e8f5e9',
    borderRadius: 5,
    margin: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  greetingSection: {
    padding: 16,
    backgroundColor: '#e8f5e9',
    alignItems: 'center',
  },
  greetingMessage: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  greetingOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  greetingOverlayText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
  loadMoreButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  loadMoreButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  list: {
    paddingBottom: 80,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  greetingOverlay: {
    position: 'absolute',
    bottom: 100,
    left: 50,
    right: 50,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
  greetingOverlayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default Home;
