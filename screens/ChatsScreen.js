import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../context/UseContext";
import { useNavigation } from "@react-navigation/native";
import { MAIN_API_APP } from "../misc/constants";

const ChatScreen = () => {
    const [acceptedFriends, setAcceptedFriends] = useState([]);

    const { userId, setUserId } = useContext(UserType);
    const navigation = useNavigation();

    useEffect(() => {
        const acceptedFriendsList = async () => {
            try {
                const response = await fetch(
                    `${MAIN_API_APP}/accepted-friends/${userId}`
                );
                const data = await response.json();

                if (response.ok) {
                    setAcceptedFriends(data);
                }
            } catch (err) {
                console.log("Error Showing The Accepted Friends");
            }
        };

        acceptedFriendsList();
    });

    console.log("friends", acceptedFriends);

    return (
        <View>
            <Text>Chat</Text>
        </View>
    );
};

export default ChatScreen;
