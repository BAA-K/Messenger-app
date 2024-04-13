import {
    ScrollView,
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    Image,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import colors from "../misc/colors";
import { Entypo, Feather } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import { UserType } from "../context/UseContext";
import { MAIN_API_APP } from "../misc/constants";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ChatMessageScreen = () => {
    const [showEmojiSelector, setShowEmojiSelector] = useState(false);
    const [message, setMessage] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [recipientData, setRecipientData] = useState();

    const navigation = useNavigation();
    const route = useRoute();
    const { userId, setUserId } = useContext(UserType);

    const { recipientId } = route.params;

    const handleEmojiSelector = () => {
        setShowEmojiSelector(!showEmojiSelector);
    };

    const handleSend = async (messageType, imageUri) => {
        try {
            const formData = new FormData();
            formData.append("senderId", userId);
            formData.append("recipientId", recipientId);

            if (messageType === "image") {
                formData.append("messageType", "image");
                formData.append("imageFile", {
                    uri: imageUri,
                    name: "image.jpg",
                    type: "image/jpeg",
                });
            } else {
                formData.append("messageType", "text");
                formData.append("imageFile", message);
            }

            const response = await fetch(`${MAIN_API_APP}/messages`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setMessage("");
                setSelectedImage("");
            }
        } catch (err) {
            console.log("Error In Sending The Message", err);
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerLeft: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={colors.black}
                        onPress={navigation.goBack()}
                    />

                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Image
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                resizeMode: "cover",
                            }}
                            source={{ uri: recipientData?.image }}
                        />

                        <Text
                            style={{
                                marginLeft: 5,
                                fontSize: 15,
                                fontWeight: "bold",
                            }}
                        >
                            {recipientData?.name}
                        </Text>
                    </View>
                </View>
            ),
        });
    }, [recipientData]);

    useEffect(() => {
        const fetchRecipientData = async () => {
            try {
                const response = await fetch(
                    `${MAIN_API_APP}/user/${recipientId}`
                );

                const data = response.json();
                setRecipientData(data);
            } catch (err) {
                console.log("Error Retrieving Details", err);
            }

            fetchRecipientData();
        };
    }, []);

    console.log(recipientData);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.screenBG }}
        >
            <ScrollView></ScrollView>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderTopWidth: 1,
                    borderTopColor: "#dddddd",
                    marginBottom: showEmojiSelector ? 0 : 25,
                }}
            >
                <Entypo
                    onPress={handleEmojiSelector}
                    style={{ marginRight: 15 }}
                    name="emoji-happy"
                    size={24}
                    color={colors.gray}
                />

                <TextInput
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    style={{
                        flex: 1,
                        height: 40,
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        borderRadius: 20,
                        paddingHorizontal: 10,
                    }}
                    placeholder="Type Your Message..."
                />

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 7,
                        marginHorizontal: 8,
                    }}
                >
                    <Entypo name="camera" size={24} color={colors.gray} />

                    <Feather name="mic" size={24} color={colors.gray} />
                </View>

                <Pressable
                    onPress={() => handleSend("text")}
                    style={{
                        backgroundColor: colors.secondBlue,
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 20,
                        marginLeft: 10,
                    }}
                >
                    <Text style={{ color: colors.white, fontWeight: "bold" }}>
                        Send
                    </Text>
                </Pressable>
            </View>

            {showEmojiSelector && (
                <EmojiSelector
                    onPress={(emoji) =>
                        setMessage((preMessage) => preMessage + emoji)
                    }
                    style={{ height: 250 }}
                />
            )}
        </KeyboardAvoidingView>
    );
};

export default ChatMessageScreen;
