import React, { useContext, useLayoutEffect, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import colors from "../misc/colors";
import { UserType } from "../context/UseContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { axios } from "axios";
import { MAIN_API_APP } from "../misc/constants";

const HomeScreen = () => {
    const { userId, setUserId } = useContext(UserType);
    const [users, setUsers] = useState([]);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerLeft: () => (
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Swift Chat
                </Text>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <Ionicons
                        name="chatbox-ellipses-outline"
                        size={24}
                        color={colors.black}
                    />
                    <MaterialIcons
                        name="people-outline"
                        size={24}
                        color={colors.black}
                    />
                </View>
            ),
        });
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = await AsyncStorage.getItem("authToken");
            const decodeToken = jwt_decode(token);
            const userId = decodeToken.userId;
            setUserId(userId);

            axios
                .get(`${MAIN_API_APP}/users/${userId}`)
                .then((response) => {
                    setUsers(response.data);
                })
                .catch((err) => {
                    console.log("Error Retrieving Users", err);
                });
        };

        fetchUsers();
    }, []);

    if (!users) {
        return (
            <View>
                <Text>There Is No Users</Text>
            </View>
        );
    }

    return (
        <View>
            <Text>Hello From Home Screen</Text>
        </View>
    );
};

export default HomeScreen;
