import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const carouselWidth = screenWidth * 0.9; 
const movieItemWidth = screenWidth * 0.4; 

const movieHomeScreen = ({ navigation }) => {
  const trendingMovies = [
    { id: '1', title: 'Movie Title 1', rating: 4.5, imageUrl: require('../assets/Movie.png') },
    { id: '2', title: 'Movie Title 2', rating: 3.8, imageUrl: require('../assets/Movie.png') },
    { id: '3', title: 'Movie Title 3', rating: 4.2, imageUrl: require('../assets/Movie.png') },
  ];

  const [activeDotIndex, setActiveDotIndex] = useState(0); 

  const topRatedMovies = [
    { id: '1', title: 'Top Rated Movie 1', imageUrl: require('../assets/Movie.png'), description: 'Description of top rated movie 1', rating: 4.5 },
    { id: '2', title: 'Top Rated Movie 2', imageUrl: require('../assets/Movie.png'), description: 'Description of top rated movie 2', rating: 3.8 },
    { id: '3', title: 'Top Rated Movie 3', imageUrl: require('../assets/Movie.png'), description: 'Description of top rated movie 3', rating: 4.2 },
  ];

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('MovieDetail', { movie: item })}
    >
      <Image style={styles.moviePoster} source={item.imageUrl} />
      <Text style={styles.movieTitle} numberOfLines={2}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderTopRatedItem = ({ item }) => (
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
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Icon name="user" size={screenWidth * 0.06} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Movie Critz</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Icon name="microphone" size={screenWidth * 0.06} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <Carousel
            data={trendingMovies}
            renderItem={renderMovieItem}
            sliderWidth={carouselWidth}
            itemWidth={movieItemWidth}
            loop
            autoplay
            autoplayInterval={3000}
            onSnapToItem={(index) => setActiveDotIndex(index)}
          />
          <Pagination
            dotsLength={trendingMovies.length}
            activeDotIndex={activeDotIndex}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.paginationDot}
            inactiveDotStyle={styles.paginationInactiveDot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Top Rated</Text>
          <FlatList
            data={topRatedMovies}
            renderItem={renderTopRatedItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomNavBar}>
        <TouchableOpacity onPress={() => console.log('Button 1')}>
          <Icon name="home" size={screenWidth * 0.06} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Button 2')}>
          <Icon name="search" size={screenWidth * 0.06} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Button 3')}>
          <Icon name="plus-circle" size={screenWidth * 0.06} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Button 4')}>
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

export default movieHomeScreen;
