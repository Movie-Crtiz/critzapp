import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const carouselWidth = screenWidth * 0.9; 
const movieItemWidth = screenWidth * 0.4; 

const MovieFavoriteScreen = ({ navigation }) => {

  const [activeDotIndex, setActiveDotIndex] = useState(0); 

  const favoriteMovies = [
    { id: '1', title: 'Favorite Movie 1', imageUrl: require('../assets/Movie.png'), description: 'Description of Favorite Movie 1', rating: 4.5 },
    { id: '2', title: 'Favorite Movie 2', imageUrl: require('../assets/Movie.png'), description: 'Description of Favorite Movie 2', rating: 3.8 },
    { id: '3', title: 'Favorite Movie 3', imageUrl: require('../assets/Movie.png'), description: 'Description of Favorite Movie 3', rating: 4.2 },
  ];

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.topRatedItem}
      onPress={() => navigation.navigate('MovieDetail', { movie: item })}
    >
      <Image style={styles.topRatedPoster} source={item.imageUrl} />
      <View style={styles.topRatedInfo}>
        <Text style={styles.topRatedTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.topRatedDescription}>{item.description}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        

        <View style={styles.sectionContainer}>
       
          <FlatList
            data={favoriteMovies}
            renderItem={renderFavoriteItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>

      </ScrollView>

      <View style={styles.bottomNavBar}>
        <TouchableOpacity onPress={() => navigation.navigate('MoviesHome')}>
          <Icon name="home" size={screenWidth * 0.06} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MovieSearch')}>
          <Icon name="search" size={screenWidth * 0.06} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MainScreen')}>
          <Icon name="gamepad" size={screenWidth * 0.06} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MovieFavorite')}>
          <Icon name="heart" size={screenWidth * 0.06} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: screenHeight * 0.03,
  },
  content: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: screenWidth * 0.05,
    paddingTop: screenHeight * 0.03,
    paddingBottom: screenHeight * 0.015,
  },
  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: screenHeight * 0.015,
  },
  sectionContainer: {
    paddingVertical: screenHeight * 0.02,
    paddingHorizontal: screenWidth * 0.05,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginBottom: screenHeight * 0.03,
  },
  sectionTitle: {
    fontSize: screenWidth * 0.06,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: screenHeight * 0.01,
  },
  movieItem: {
    marginRight: screenWidth * 0.02,
    width: movieItemWidth,
    alignItems: 'center',
  },
  moviePoster: {
    width: movieItemWidth,
    height: movieItemWidth * 1.5,
    borderRadius: 5,
  },
  movieTitle: {
    color: '#FFF',
    marginTop: screenHeight * 0.01,
    fontSize: screenWidth * 0.04,
    textAlign: 'center',
  },
  topRatedItem: {
    flexDirection: 'row',
    marginBottom: screenHeight * 0.02,
    alignItems: 'center',
  },
  topRatedPoster: {
    width: movieItemWidth * 0.8,
    height: (movieItemWidth * 0.8) * 1.5,
    borderRadius: 5,
  },
  topRatedInfo: {
    flex: 1,
    marginLeft: screenWidth * 0.02,
  },
  topRatedTitle: {
    color: '#FFF',
    fontSize: screenWidth * 0.05,
    fontWeight: 'bold',
  },
  topRatedDescription: {
    color: '#FFF',
    fontSize: screenWidth * 0.04,
    marginTop: screenHeight * 0.01,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screenHeight * 0.01,
  },
  rating: {
    color: '#FFF',
    fontSize: screenWidth * 0.04,
    marginLeft: screenWidth * 0.01,
  },
  paginationContainer: {
    paddingVertical: screenHeight * 0.01,
  },
  paginationDot: {
    width: screenWidth * 0.02,
    height: screenWidth * 0.02,
    borderRadius: screenWidth * 0.01,
    marginHorizontal: screenWidth * 0.015,
    backgroundColor: '#FFF',
  },
  paginationInactiveDot: {
    // Style for inactive dots
  },
  title: {
    color: '#FFF',
    fontSize: screenWidth * 0.06,
    fontWeight: 'bold',
  },
});

export default MovieFavoriteScreen;
