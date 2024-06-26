import * as React from "react";
import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Text } from "react-native-paper";

export default function CharacterCard({ id, image, name }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        width: 380,
        margin: 5,
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10,
      }}
      onPress={() => navigation.navigate("Detail", { id })}
    >
      {/* <Image style={{ width: 128, height: 128 }} source={{ uri: image }} /> */}
      <Avatar.Image size={128} source={{ uri: image }} />
      <Text variant="headlineSmall" style={{ flex: 1 }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}
