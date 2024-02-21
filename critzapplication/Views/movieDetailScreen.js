import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: screenWidth } = Dimensions.get('window');
const movieDetailScreen = ({ route,navigation }) => {
  const { movie } = route.params;

  const cast = [
    { id: '1', name: 'Cast Member 1', imageUrl: require('../assets/Movie.png') },
    { id: '2', name: 'Cast Member 2', imageUrl: require('../assets/Movie.png') },
    { id: '3', name: 'Cast Member 3', imageUrl: require('../assets/Movie.png') },
  ];

  const renderCastItem = ({ item }) => (
    <View style={styles.castItem}>
      <Image style={styles.castImage} source={item.imageUrl} />
      <Text style={styles.castName}>{item.name}</Text>
    </View>
  );

  const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ante ut mauris blandit euismod. Vivamus auctor nulla id magna ultricies, nec fermentum mauris tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ante ut mauris blandit euismod. Vivamus auctor nulla id magna ultricies, nec fermentum mauris tincidunt.';

  return (
    <View style={styles.container}>
    <Image style={styles.poster} source={movie.imageUrl} />
    <Text style={styles.title}>{movie.title}</Text>
    <View style={styles.ratingContainer}>
      <Icon name="star" size={20} color="#FFD700" />
      <Text style={styles.rating}>{movie.rating}/10</Text>
    </View>
    <Text style={styles.sectionTitle}>Description</Text>
    <Text style={styles.description}>{loremIpsum}</Text>
  
    <Text style={styles.sectionTitle}>Cast</Text>
    <Carousel
      data={cast}
      renderItem={renderCastItem}
      sliderWidth={screenWidth}
      itemWidth={200}
      loop
      autoplay
      autoplayInterval={3000}
    />
    <View style={styles.addButtonContainer}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('MovieReview')}
      >
        <Text style={styles.addButtonTitle}>Add a Review</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      padding: 20,
      paddingBottom: 60, // Adjust the bottom padding to accommodate the fixed button
    },
    poster: {
      width: '100%',
      height: 300,
      borderRadius: 5,
      marginBottom: 20,
    },
    title: {
      color: '#FFF',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    rating: {
      color: '#FFF',
      fontSize: 16,
      marginLeft: 5,
    },
    description: {
      color: '#FFF',
      fontSize: 16,
      marginBottom: 20,
    },
    sectionTitle: {
      color: '#FFF',
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    castItem: {
      alignItems: 'center',
      marginRight: 20,
    },
    castImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 10,
    },
    castName: {
      color: '#FFF',
      fontSize: 16,
    },
    addButtonContainer: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
    },
    addButton: {
        backgroundColor: '#780000',
        //width: 336, // Set fixed width to 336px
        //padding: '10px 12px', // Set padding: top 10px, right 12px, bottom 10px, left 12px
        borderRadius: 8, // Set border radius to 8px
        paddingVertical: 10,
      },
    addButtonTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500', // Set font weight to 500
        fontFamily: 'Roboto', // Set font family to Roboto
        lineHeight: 22, // Set line height to 22
        letterSpacing: 0, // Set letter spacing to 0
        textAlign: 'center',
      },
  });
  

export default movieDetailScreen;
