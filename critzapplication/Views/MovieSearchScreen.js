import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Dimensions, Alert, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MovieSearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#FFF" style={styles.searchIcon} />
        <TextInput
          placeholder="Search movies..."
          placeholderTextColor="#999"
          style={styles.searchInput}
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/search.jpg')}
          style={styles.image}
        />
      </View>

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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    paddingHorizontal: 20,
    marginTop: 50, // Adjust marginTop to bring the search bar down
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 18,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
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
});

export default MovieSearchScreen;
