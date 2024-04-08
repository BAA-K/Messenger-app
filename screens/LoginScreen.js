import {
    KeyboardAvoidingView,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import React, { useState } from "react";
import colors from "../misc/colors";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <KeyboardAvoidingView>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            color: colors.mainBlue,
                            fontSize: 24,
                            fontWeight: "600",
                        }}
                    >
                        Sign In
                    </Text>
                    <Text
                        style={{
                            color: colors.black,
                            fontSize: 17,
                            fontWeight: "600",
                            marginTop: 15,
                        }}
                    >
                        Sign In To Your Account
                    </Text>
                </View>

                <View style={{ marginTop: 50 }}>
                    <View>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "600",
                                color: colors.gray,
                            }}
                        >
                            Email
                        </Text>
                        <TextInput
                            style={{
                                borderBottomColor: colors.gray,
                                borderBottomWidth: 1,
                                marginVertical: 10,
                                width: 300,
                                fontSize: 18,
                            }}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholder="Enter Your Email"
                            placeholderTextColor={"black"}
                        />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "600",
                                color: colors.gray,
                            }}
                        >
                            Password
                        </Text>
                        <TextInput
                            style={{
                                borderBottomColor: colors.gray,
                                borderBottomWidth: 1,
                                marginVertical: 10,
                                width: 300,
                                fontSize: 18,
                            }}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            placeholder="Enter Your Password"
                            placeholderTextColor={"black"}
                        />
                    </View>

                    <Pressable
                        style={{
                            width: 200,
                            backgroundColor: colors.mainBlue,
                            padding: 15,
                            marginTop: 50,
                            marginLeft: "auto",
                            marginRight: "auto",
                            borderRadius: 6,
                        }}
                    >
                        <Text
                            style={{
                                color: colors.white,
                                fontSize: 16,
                                fontWeight: "bold",
                                textAlign: "center",
                            }}
                        >
                            Login
                        </Text>
                    </Pressable>

                    <Pressable style={{ marginTop: 15 }}>
                        <Text
                            style={{
                                textAlign: "center",
                                color: colors.gray,
                                fontSize: 16,
                            }}
                            onPress={() => navigation.navigate("Register")}
                        >
                            Don't Have An Account? Sign Up
                        </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default LoginScreen;
