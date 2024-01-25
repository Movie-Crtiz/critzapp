import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { useUser } from './userContext';

const dummyData = [
    {
        userID: '1',
        name: 'John ',
        username: '@username',
        score: 120,
        iconUrl: '',
    },
    {
        userID: '1',
        name: 'John ',
        username: '@username',
        score: 120,
        iconUrl: '',
    },
    {
        userID: '1',
        name: 'John ',
        username: '@username',
        score: 100,
        iconUrl: '',
    },
    {
        userID: '2',
        name: 'z Doe',
        username: '@username',
        score: 105,
        iconUrl: '',
    },
    {
        userID: '3',
        name: 'Alice ',
        username: '@username',
        score: 90,
        iconUrl: '',
    },
    {
        userID: '4',
        name: 'Jane Doe',
        username: '@username',
        score: 105,
        iconUrl: '',
    },
    {
        userID: '5',
        name: 'a Smith',
        username: '@username',
        score: 105,
        iconUrl: '',
    },
];

const LeaderboardScreen = () => {
    const [scores, setScores] = useState([]);
    const { userData } = useUser();
    const [currentUserRank, setCurrentUserRank] = useState(0);

    useEffect(() => {
        // Fetch data from the server
        // const fetchData = async () => {
        //   try {
        //     const response = await axios.get('https://api.example.com/scores'); // Replace with your API endpoint
        //     setScores(response.data);
        //   } catch (error) {
        //     console.error('Error fetching scores:', error);
        //   }
        // };

        // fetchData();
        setScores(dummyData);
        placeCounter = 0
        console.log('Score :', scores)
    }, [scores]);

    useEffect(() => {
        const currentUserIndex = sortedScores.findIndex((item) => item.userID === '5'); // Replace '5' with userData?._id
        setCurrentUserRank(currentUserIndex !== -1 ? sortedScores[currentUserIndex].placeCounter : null);
    }, [sortedScores,currentUserRank]);

    const highestAndLatestScores = {};

    scores.forEach((score) => {
        const userID = score.userID;
        if (!(userID in highestAndLatestScores) || score.score > highestAndLatestScores[userID].score) {
            highestAndLatestScores[userID] = score;
        } else if (score.score === highestAndLatestScores[userID].score && new Date(score.date) > new Date(highestAndLatestScores[userID].date)) {
            highestAndLatestScores[userID] = score;
        }
    });

    const sortedScores = Object.values(highestAndLatestScores);

    sortedScores.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        return new Date(b.date) - new Date(a.date);
    });

    let placeCounter = 0;
    let previousScore = null;

    sortedScores.forEach((score, index) => {
        // Increment placeCounter only when the current score is different from the previous one
        if (score.score !== previousScore) {
            placeCounter++;
        }
        score.placeCounter = placeCounter;
        previousScore = score.score;
    });

    const renderLeaderboardItem = ({ item }) => {
        return (
            <View style={styles.leaderboardItem}>
                <Text style={styles.placeCounter}>{item.placeCounter}</Text>
                <Image source={item.iconUrl ? { uri: item.iconUrl } : require('../assets/user.png')} style={styles.userIcon} />
                <View style={styles.userInfo}>
                    <View>
                        <Text style={styles.userInfoText}>{item.name}</Text>
                        <Text style={styles.userInfoText}>{item.username}</Text>
                    </View>
                    <Text style={styles.userInfoScore}>{item.score}</Text>
                </View>
            </View>
        );
    };
    

    return (
        <View style={styles.container}>
           
            <Text style={styles.userRank}>{`Your Rank: ${currentUserRank}`}</Text>
            <FlatList
                data={sortedScores}
                keyExtractor={(item) => item.userID}
                renderItem={renderLeaderboardItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#423378', // Background color for the entire screen
        padding: 16,
    },
    userInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Align items at the ends of the container
        width: '100%',
    },
    leaderboardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        borderBottomWidth: 1, // Add a horizontal line between items
        borderBottomColor: '#B7B3B3', // Set the color of the line
        paddingBottom: 8, // Add some padding between the line and the next item
    },
    placeCounter: {
        color: '#B7B3B3', // Text color for the place counter
        marginRight: 8,
    },
    userIcon: {
        borderRadius: 50,
        width: 30,
        height: 30,
        marginHorizontal: 8,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between', // Align items at the ends of the container
    },
    userInfoText: {
        color: 'white', // Text color for user information
        marginBottom: 4, // Add some margin to the bottom
    },
    userInfoScore: {
        color: 'white', // Text color for user score
    },
    userRank: {
        color: 'white', // Text color for user rank
        marginBottom: 16, // Add some margin between user rank and the list
    },
});


export default LeaderboardScreen;
