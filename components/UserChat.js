import { Pressable, Image, View, Text } from "react-native";
import React from "react";
import colors from "../misc/colors";
import { useNavigation } from "@react-navigation/native";

const UserChat = ({ item }) => {
    const navigation = useNavigation();

    return (
        <Pressable
            onPress={() =>
                navigation.navigate("Messages", {
                    recipientId: item._id,
                })
            }
            style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                borderWidth: 0.7,
                borderColor: "#d0d0d0",
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                padding: 10,
            }}
        >
            <Image
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    resizeMode: "cover",
                }}
                source={{ uri: item?.image }}
            />

            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWight: "500" }}>
                    {item?.name}
                </Text>
                <Text
                    style={{
                        marginTop: 3,
                        color: colors.gray,
                        fontWight: "500",
                    }}
                >
                    Last Message Comes Here
                </Text>
            </View>

            <View>
                <Text
                    style={{
                        fontSize: 11,
                        fontWight: "400",
                        color: colors.lightGray,
                    }}
                >
                    3:00 pm
                </Text>
            </View>
        </Pressable>
    );
};

export default UserChat;
