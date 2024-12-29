import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const CardView = ({ item, onFavorite, onViewMore }) => {
  // State to track if the item has been viewed
  const [isViewed, setIsViewed] = useState(false);

  // Log the item data for debugging
  console.log(item);

  // Ensure item contains necessary fields
  if (!item || !item.gifUrl || !item.name || !item.instructions || !item.bodyPart || !item.equipment) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>No data available</Text>
      </View>
    );
  }

  // Handle button press
  const handleViewMore = () => {
    setIsViewed(true); // Mark the item as viewed
    if (onViewMore) {
      onViewMore(item); // Call the parent callback if provided
    }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.gifUrl }} style={styles.image} />
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>{item.name}</Text>
        {/* Body Part */}
        <Text style={styles.description}>Target Area: {item.bodyPart}</Text>
        {/* Equipment */}
        <Text style={styles.description}>Equipment: {item.equipment}</Text>
        {/* Instructions */}
        <Text style={styles.instructionsTitle}>Instructions:</Text>
        {item.instructions.map((instruction, index) => (
          <Text key={index} style={styles.instructionText}>{`${index + 1}. ${instruction}`}</Text>
        ))}

        <TouchableOpacity
          style={[styles.button, isViewed && styles.viewedButton]} // Change style if viewed
          onPress={handleViewMore}
          disabled={isViewed} // Disable the button if viewed
        >
          <Text style={styles.buttonText}>
            {isViewed ? 'Viewed' : 'Mark as View'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  instructionText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#FFA726',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  viewedButton: {
    backgroundColor: '#4CAF50', // Change to green when viewed
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CardView;
