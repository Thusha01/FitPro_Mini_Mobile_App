import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create the AppContext
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Global States
  const [username, setUsername] = useState(null); // Stores the logged-in username
  const [favorites, setFavorites] = useState([]); // Stores favorite items
  const [count, setCount] = useState(0); // Tracks the number of interactions

  // Load username, favorites, and count from AsyncStorage on app load
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        const storedFavorites = await AsyncStorage.getItem("favorites");
        const storedCount = await AsyncStorage.getItem("count");

        if (storedUsername) {
          setUsername(storedUsername);
        }
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
        if (storedCount) {
          setCount(parseInt(storedCount, 10));
        }
      } catch (error) {
        console.error("Error loading data from storage:", error);
      }
    };

    loadData();
  }, []);

  // Add to favorites and increment count
  const addToFavorites = async (item) => {
    const updatedFavorites = [...favorites, item];
    setFavorites(updatedFavorites);

    // Increment count
    const newCount = count + 1;
    setCount(newCount);

    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      await AsyncStorage.setItem("count", newCount.toString());
    } catch (error) {
      console.error("Error saving favorites or count to storage:", error);
    }
  };

  // Remove from favorites (count remains unchanged)
  const removeFromFavorites = async (itemId) => {
    const updatedFavorites = favorites.filter((item) => item.id !== itemId);
    setFavorites(updatedFavorites);

    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error removing favorites from storage:", error);
    }
  };

  // Reset count (optional function for a reset button)
  const resetCount = async () => {
    setCount(0);
    try {
      await AsyncStorage.setItem("count", "0");
    } catch (error) {
      console.error("Error resetting count in storage:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        username,
        setUsername,
        favorites,
        addToFavorites,
        removeFromFavorites,
        count,
        resetCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
