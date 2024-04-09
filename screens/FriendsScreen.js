import { View, Text } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { MAIN_API_APP } from "../misc/constants";
import { UserType } from "../context/UseContext";

const FriendsScreen = () => {
    const { userId, setUserId } = useContext(UserType);
    const [friendRequests, setFriendRequests] = useState([]);

    const fetchFriendRequests = async () => {
        try {
            const response = await axios.get(
                `${MAIN_API_APP}/friend-request/${userId}`
            );

            if (response.status === 200) {
                const friendRequestsData = response.data.map(
                    (friendRequest) => ({
                        _id: friendRequest._id,
                        name: friendRequest.name,
                        email: friendRequest.email,
                        image: friendRequest.image,
                    })
                );

                setFriendRequests(friendRequestsData);
            }
        } catch (err) {
            console.log("Error", err);
        }
    };

    useEffect(() => {
        fetchFriendRequests();
    }, []);

    return (
        <View>
            <Text>Hello From Friends List</Text>
        </View>
    );
};

export default FriendsScreen;
