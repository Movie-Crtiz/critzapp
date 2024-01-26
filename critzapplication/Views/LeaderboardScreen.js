import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import axios from "axios";
import { useUser } from "./userContext";
import { format } from "date-fns";

const LeaderboardScreen = () => {
  const [scores, setScores] = useState([]);
  const { userData } = useUser();
  const [currentUserRank, setCurrentUserRank] = useState(0);
  const [members, setMembers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scoresResponse = await axios.get("http://localhost:3000/scores");
        const membersResponse = await axios.get(
          "http://localhost:3000/members"
        );

        const membersMap = membersResponse.data.reduce((acc, member) => {
          acc[member._id] = member;
          return acc;
        }, {});

        const groupedScores = scoresResponse.data.reduce((acc, score) => {
          const playerId = score.playerId;
          if (!(playerId in acc) || score.score > acc[playerId].score) {
            acc[playerId] = score;
          }
          return acc;
        }, {});

        const scoresWithMembers = Object.values(groupedScores).map((score) => ({
          ...score,
          member: membersMap[score.playerId],
        }));

        scoresWithMembers.sort((a, b) => b.score - a.score);

        setScores(scoresWithMembers);
        setMembers(membersMap);

        const currentUserIndex = scoresWithMembers.findIndex(
          (item) => item.playerId === userData?._id
        );
        setCurrentUserRank(
          currentUserIndex !== -1 ? currentUserIndex + 1 : null
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userData]);

  useEffect(() => {
    const currentUserIndex = scores.findIndex(
      (item) => item.playerId === userData?._id
    );
    setCurrentUserRank(
      currentUserIndex !== -1 ? scores[currentUserIndex].placeCounter : null
    );
  }, [scores, userData]);

  const sortedScores = scores.slice().sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return new Date(b.date) - new Date(a.date);
  });

  let placeCounter = 0;
  let previousScore = null;

  const scoresWithPlaceCounter = sortedScores.map((score, index) => {
    if (score.score !== previousScore) {
      placeCounter++;
    }
    return { ...score, placeCounter };
  });

  const renderLeaderboardItem = ({ item }) => {
    const member = members[item.playerId] || {};
    const formattedDate = format(
      new Date(item.createdDate),
      "MMMM d, yyyy HH:mm:ss"
    );
    return (
      <View style={styles.leaderboardItem}>
        <Text style={styles.placeCounter}>{item.placeCounter}</Text>
        <Image source={require("../assets/user.png")} style={styles.userIcon} />
        <View style={styles.userInfo}>
          <View>
            <Text style={styles.userInfoText}>
              {member.firstName} {member.lastName}
            </Text>
            <Text style={styles.userInfoText}>{formattedDate}</Text>
          </View>
          <Text style={styles.userInfoScore}>{item.score}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
    <View style={styles.topImageContainer}>
        <Image source={require('../assets/crownn.png')} style={styles.smallImage}/>
    </View>
      <Text style={styles.userRank}>{`Your Rank: ${currentUserRank}`}</Text>
      <FlatList
        data={scoresWithPlaceCounter}
        keyExtractor={(item) => item._id}
        renderItem={renderLeaderboardItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#423378", // Background color for the entire screen
    padding: 16,
  },
  userInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Align items at the ends of the container
    width: "100%",
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    borderBottomWidth: 1, // Add a horizontal line between items
    borderBottomColor: "#B7B3B3", // Set the color of the line
    paddingBottom: 8, // Add some padding between the line and the next item
  },
  placeCounter: {
    color: "#B7B3B3", // Text color for the place counter
    marginRight: 8,
  },
  userIcon: {
    borderRadius: 50,
    width: 30,
    height: 30,
    marginHorizontal: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between", // Align items at the ends of the container
  },
  userInfoText: {
    color: "white", // Text color for user information
    marginBottom: 4, // Add some margin to the bottom
  },
  userInfoScore: {
    color: "white", // Text color for user score
  },
  userRank: {
    color: "white", // Text color for user rank
    marginBottom: 12, // Add some margin between user rank and the list
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30,
  },
  smallImage: {
    width: 100,
    height:100,
    alignSelf: 'center',
  },
});

export default LeaderboardScreen;
