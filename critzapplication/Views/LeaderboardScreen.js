import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import axios from 'axios';
import { useUser } from './userContext';

const dummyData = [
    {
        userID: '1',
        name: 'John ',
        date: '2022-01-01',
        score: 120,
        iconUrl: '',
    },
    {
        userID: '1',
        name: 'John ',
        date: '2022-01-09',
        score: 120,
        iconUrl: '',
    },
    {
        userID: '1',
        name: 'John ',
        date: '2022-01-10',
        score: 100,
        iconUrl: '',
    },
    {
        userID: '2',
        name: 'z Doe',
        date: '2022-01-02',
        score: 105,
        iconUrl: '',
    },
    {
        userID: '3',
        name: 'Alice ',
        date: '2022-01-03',
        score: 90,
        iconUrl: '',
    },
    {
        userID: '4',
        name: 'Jane Doe',
        date: '2022-01-02',
        score: 105,
        iconUrl: '',
    },
    {
        userID: '5',
        name: 'a Smith',
        date: '2022-01-03',
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
        const currentUserIndex = sortedScores.findIndex((item) => item.userID === '5'); // Replace '1' with the actual current user ID
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
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
                <Text>{item.placeCounter}</Text>
                <Image source={item.iconUrl ? {uri:item.iconUrl} : require('../assets/user.png')} style={{ borderRadius: 50, width: 30, height: 30, marginHorizontal: 8 }} />
                <Text>{item.name}</Text>
                <Text>{item.date}</Text>
                <Text>{item.score}</Text>
            </View>
        );
    };

    return (
        <View>
            <Text>{`Your Rank: ${currentUserRank}`}</Text>
            <FlatList
                data={sortedScores}
                keyExtractor={(item) => item.userID}
                renderItem={renderLeaderboardItem}
            />
        </View>
    );
};

export default LeaderboardScreen;
