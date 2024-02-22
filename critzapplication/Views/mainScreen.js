import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Title, Paragraph } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "./userContext";
import VoiceRecognition from "../Models/VoiceRecognition";
import * as Speech from "expo-speech-recognition";

const mainScreen = () => {
  const navigation = useNavigation();
  const { userData } = useUser();
  const [user, setUser] = useState(null);
  const primaryColor = "#423378"; // Minsk
  const secondaryColor = "#F2BDA1"; // Mandys Pink
  const shadowColor = "#C48F7A"; // Shadow color for the decorative circle
  const voiceRecognition = new VoiceRecognition(navigation);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    gradient: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    cardContainer: {
      width: "85%",
      height: "11%",
      borderRadius: 10,
      overflow: "hidden",
      elevation: 5,
      backgroundColor: "rgba(255,255,255,0.2)",
      position: "relative",
      // padding: 20,
      justifyContent: "center",
    },
    backgroundImage: {
      width: "100%",
      height: "50%",
    },
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginVertical: 10,
      position: "absolute",
      top: 10,
      right: 10,
    },
    rankingImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginVertical: 10,
      position: "absolute",
      top: 10,
      left: 10,
    },
    titleText: {
      fontSize: 24,
      fontWeight: "bold",
      color: primaryColor,
      alignSelf: "center",
    },
    rankingText: {
      fontSize: 14,
      color: primaryColor,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: "white",
      textAlign: "center",
    },
    buttonsContainer: {
      backgroundColor: "#26A0AE",
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginVertical: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 18,
    },
    headerButtons: {
      flexDirection: "row",
      justifyContent: "flex-end",
      width: "100%",
      paddingHorizontal: 20,
      position: "absolute",
      top: 10,
      zIndex: 1,
    },
    headerIcon: {
      marginTop: 25,
      marginTop: 30,
      fontSize: 35,
      color: "white",
    },
    decorativeCircle: {
      position: "absolute",
      top: "50%",
      right: 20,
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: secondaryColor,
      shadowColor: shadowColor,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 8,
    },
    decorativeCircle2: {
      position: "absolute",
      top: "30%",
      left: 40,
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: secondaryColor,
      opacity: 0.7,
      shadowColor: shadowColor,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 8,
    },
    decorativeCircle3: {
      position: "absolute",
      top: "70%",
      left: 20,
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: secondaryColor,
      opacity: 0.5,
      shadowColor: shadowColor,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 8,
    },
    decorativeCircle1: {
      position: "absolute",
      top: -150,
      right: -150,
      backgroundColor: "rgba(255,255,255,0.2)",
      borderRadius: 300,
      width: 300,
      height: 300,
    },
    decorativeCircle4: {
      position: "absolute",
      top: "40%",
      right: 80,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: secondaryColor,
      opacity: 0.2,
      shadowColor: shadowColor,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 8,
    },
    decorativeCircle5: {
      position: "absolute",
      top: "60%",
      left: 120,
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: secondaryColor,
      opacity: 0.2,
      shadowColor: shadowColor,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 8,
    },
    decorativeCircle2: {
      position: "absolute",
      bottom: -100,
      left: -100,
      backgroundColor: "rgba(255,255,255,0.2)",
      borderRadius: 200,
      width: 200,
      height: 200,
    },
  });

  useEffect(() => {
    console.log(userData);
    const user = {
      name: userData?.firstName
        ? userData?.firstName.charAt(0).toUpperCase() +
          userData?.firstName.slice(1)
        : "Guest",
      profileImage: require("../assets/icon.png"),
      ranking: 42,
    };
    setUser(user);
  }, [userData]);

  return (
    <LinearGradient
      colors={[secondaryColor, primaryColor, primaryColor]}
      style={styles.container}
    >
      <View style={styles.headerButtons}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" style={styles.headerIcon} />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate("Leaderboard")}>
          <FontAwesome name="trophy" style={styles.headerIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        {/* <Image
          source={require("../assets/ranking.png")}
          style={styles.rankingImage}
        /> */}
        <Image
          source={require("../assets/avatar.png")}
          style={styles.profileImage}
        />
        <Title style={styles.titleText}>
          Welcome {user ? user.name : "Guest"} !!
        </Title>
        {/* <Paragraph style={styles.rankingText}>
          Ranking: {user.ranking}
        </Paragraph> */}
      </View>

      <View style={styles.decorativeCircle}></View>
      <View style={styles.decorativeCircle2}></View>
      <View style={styles.decorativeCircle3}></View>
      <View style={styles.decorativeCircle4}></View>
      <View style={styles.decorativeCircle5}></View>

      <View style={styles.decorativeCircle2}></View>

      <Paragraph style={styles.subtitle}>Get ready for the Quiz!</Paragraph>
      <Image
        source={require("../assets/QuizImage.png")}
        style={styles.backgroundImage}
      />
      <TouchableOpacity
        style={styles.buttonsContainer}
        onPress={() => navigation.navigate("Quiz")}
      >
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default mainScreen;
