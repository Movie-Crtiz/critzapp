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

  const [recording, setRecording] = useState(null); // Initialize with null
  const [isRecording, setIsRecording] = useState(false);
  const [audioPermission, setAudioPermission] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Set the audio mode before starting recording
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true, // Optional
    });
  }, []);

  useEffect(() => {
    getPermission();
  }, []);

  // const getPermission = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
  //   setAudioPermission(status);
  //   if (status !== 'granted') {
  //     alert('Permission to access audio recording was denied');
  //   }
  // };
  const getPermission = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      setAudioPermission(status);
      if (status !== 'granted') {
        alert('Permission to access audio recording was denied');
      }
    } catch (error) {
      console.error('Error requesting audio permission:', error);
    }
  };

  const toggleRecording = async () => {

    if (audioPermission  === 'granted'){
    if (isRecording) {
      // Stop recording
      try {
        await recording.stopAndUnloadAsync();
        setIsRecording(false);
        const uri = recording.getURI();
        // Convert audio to text
        const transcription = await convertAudioToText(uri);
        processVoiceCommand(transcription); // Update recorded text state
      } catch (err) {
        console.error('Failed to stop recording', err);
      } finally {
        // Reset recording state after stopping
        setRecording(null);
      }
    } else {
      // Start recording
      try {
        if (recording) {
          await recording.stopAndUnloadAsync();
        }
        const newRecording = new Audio.Recording();
        await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await newRecording.startAsync();
        setRecording(newRecording);
        setIsRecording(true);
      } catch (err) {
        console.error('Failed to start recording', err);
      }
    }
  }else{
    getPermission();
  }
  };

  const convertAudioToText = async (audioUri) => {
    try {
      console.log('audioUri:', audioUri);
      const base64AudioData = await convertAndSendAudio(audioUri);
      // console.log('base64AudioData:', base64AudioData);

      const response = await axios.post(
        'https://speech.googleapis.com/v1/speech:recognize?key=',
        {
          config: {
            encoding: 'LINEAR16',
          sampleRateHertz: 16000,
          languageCode: 'en-US',
          },
          audio: {
            content: base64AudioData,
          },
        }
      );
      console.error('response:', response.data.results[0]);
      // Extract transcription from the response
       const transcription = response.data.results[0].alternatives[0].transcript;
       return transcription;
    } catch (error) {
      console.error('Failed to convert audio to text:', error);
      return null;
    }
  };

  const convertAndSendAudio = async (fileUri) => {
    try {
      // Read the audio file from local storage
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        console.error('Audio file does not exist');
        return;
      }

      // Read the contents of the audio file
      const { uri } = fileInfo;
      const audioBuffer = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

      // Send the audio data to the Speech-to-Text API
     return audioBuffer;
    } catch (error) {
      console.error('Failed to convert and send audio', error);
    }
  };

  const processVoiceCommand = (command) => {     
    if (command) {
      const lowercaseCommand = command.toLowerCase();
    if (lowercaseCommand.includes('search')) {
      navigation.navigate('MovieSearchScreen');
    } else if (lowercaseCommand.includes('favorite')) {
      navigation.navigate('FavoriteMoviesScreen');
    } else if (lowercaseCommand.includes('game')) {
      navigation.navigate("Quiz")
    } else if (lowercaseCommand.includes('leaderboard')) {
      navigation.navigate("Leaderboard")
    } else if (lowercaseCommand.includes('logout')) {
      logout(); // Assuming this function exists to handle logout
      navigation.navigate('Initial');     
    } else if (lowercaseCommand.includes('review')) {
      navigation.navigate('MovieReview');
    }  else if (lowercaseCommand.includes('detail')) {
      navigation.navigate('MovieDetail', { movie: topRatedMovies[0] });
    } else {
      // Handle unrecognized command
    }
  }else{
    setCount(Count => Count + 1);
    if (count === 1) {
      navigation.navigate('MovieSearchScreen');
    } else if (count === 2) {
      navigation.navigate('FavoriteMoviesScreen');
    } else if (count === 3) {
      navigation.navigate("Quiz")
    } else if (count === 4) {
      navigation.navigate("Leaderboard")
    } else if (count === 7) {
      logout(); // Assuming this function exists to handle logout
      navigation.navigate('Initial');     
    } else if (count === 5) {
      navigation.navigate('MovieReview');
    }  else if (count === 6) {
      navigation.navigate('MovieDetail', { movie: topRatedMovies[0] });
    } else {
      setCount(0); 
      Alert.alert("Error", "Not a command.");
      // Handle unrecognized command
    }
  }
  };


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
          <TouchableOpacity onPress={() => toggleRecording()}>
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
        <TouchableOpacity onPress={() => navigation.navigate('MoviesHome')}>
          <Icon name="home" size={screenWidth * 0.06} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Button 2')}>
          <Icon name="search" size={screenWidth * 0.06} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MainScreen')}>
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
