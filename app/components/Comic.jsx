import { View, Text, Image } from "react-native";

export default function Comic({ name, image }) {
  return (
    <View>
      <Image source={{ uri: image }} style={{ width: 380, height: 540 }} />
      <Text>{name}</Text>
    </View>
  );
}
