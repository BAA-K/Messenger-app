import { Pressable, Text, View, Image } from "react-native";
import React, { useContext, useState } from "react";
import colors from "../misc/colors";
import { UserType } from "../context/UseContext";
import { MAIN_API_APP } from "../misc/constants";

const User = ({ item }) => {
    const [requestSent, setRequestSent] = useState(false);

    const { userId, setUserId } = useContext(UserType);

    const sendFriendRequest = async (currentUserId, selectedUserId) => {
        try {
            const response = await fetch(`${MAIN_API_APP}/friend-request`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ currentUserId, selectedUserId }),
            });

            if (response.ok) {
                setRequestSent(true);
            }
        } catch (err) {
            console.log("Error", err);
        }
    };

    return (
        <Pressable
            style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
            }}
        >
            <View>
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        resizeMode: "cover",
                    }}
                    source={{ uri: item.image }}
                />
            </View>

            <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>{item?.name}</Text>
                <Text style={{ marginTop: 4, color: colors.gray }}>
                    {item?.email}
                </Text>
            </View>

            <Pressable
                onPress={() => sendFriendRequest(userId, item._id)}
                style={{
                    backgroundColor: "#5671189",
                    padding: 10,
                    borderRadius: 6,
                    width: 105,
                }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        color: colors.white,
                        fontSize: 13,
                    }}
                >
                    Add Friend
                </Text>
            </Pressable>
        </Pressable>
    );
};

export default User;
