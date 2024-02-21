import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ReviewScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Write a Review</Text>
      <View style={styles.textboxContainer}>
        <TextInput
          style={styles.textbox}
          multiline
          placeholder="Write your review here..."
          placeholderTextColor="#FFFFFF" // Set placeholder text color
        />
      </View>
      <Text style={styles.sectionTitle}>Rate the Movie</Text>
      <View style={styles.ratingContainer}>
        <TouchableOpacity style={styles.starButton}>
          <Icon name="star" size={20} color="#FFD700" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.starButton}>
          <Icon name="star" size={20} color="#FFD700" />
          <Icon name="star" size={20} color="#FFD700" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.starButton}>
          <Icon name="star" size={20} color="#FFD700" />
          <Icon name="star" size={20} color="#FFD700" />
          <Icon name="star" size={20} color="#FFD700" />
        </TouchableOpacity>
      </View>
      <View style={styles.ratingContainer}>
        <TouchableOpacity style={styles.starButton}>
          <Icon name="star" size={20} color="#FFD700" />
          <Icon name="star" size={20} color="#FFD700" />
          <Icon name="star" size={20} color="#FFD700" />
          <Icon name="star" size={20} color="#FFD700" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.starButton}>
          <Icon name="star" size={20} color="#FFD700" />
          <Icon name="star" size={20} color="#FFD700" />
          <Icon name="star" size={20} color="#FFD700" />
          <Icon name="star" size={20} color="#FFD700" />
          <Icon name="star" size={20} color="#FFD700" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textboxContainer: {
    width: '100%',
    height: '50%',
    marginBottom: 20,
  },
  textbox: {
    flex: 1,
    backgroundColor: 'transparent', // Transparent background
    borderRadius: 5,
    borderWidth: 1, // Add border
    borderColor: '#FFF', // Border color
    padding: 10,
    textAlignVertical: 'top',
    color: '#FFF', // Text color
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  starButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Grey transparent background
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
});

export default ReviewScreen;
