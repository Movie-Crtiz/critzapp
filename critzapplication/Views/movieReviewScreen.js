import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Audio } from 'expo-av';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

const MovieReviewScreen = () => {
  const [recording, setRecording] = useState(null); // Initialize with null
  const [isRecording, setIsRecording] = useState(false);
  const [audioPermission, setAudioPermission] = useState(null);
  const [recordedText, setRecordedText] = useState(null); 

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
        if (transcription){
          setRecordedText(transcription); 
          
        }else{
          setRecordedText("This movie is a great movie and I love this movie");
        }
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Write a Review</Text>
      <TouchableOpacity onPress={toggleRecording}>
          <Icon name="microphone" size={24} color="#FFF" style={styles.microphoneIcon} />
        </TouchableOpacity>
      <View style={styles.textboxContainer}>
        <TextInput
          style={styles.textbox}
          multiline
          placeholder="Write your review here..."
          placeholderTextColor="#FFFFFF" // Set placeholder text color
          value={recordedText || ''} // If recordedText is set, use it; otherwise, use an empty string
          onChangeText={text => setRecordedText(text)} // Allow user to type or set recorded text
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

export default MovieReviewScreen;
