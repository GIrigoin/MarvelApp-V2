import { View, Image } from "react-native";
import { Text, Card } from "react-native-paper";

export default function Information({ image, name, description }) {
  return (
    <Card
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 420,
        padding: 20,
      }}
    >
      <Card.Title title={name} />
      <Card.Cover style={{ width: 380, height: 380 }} source={{ uri: image }} />
      {/* <Image style={{ width: 380, height: 380 }} source={{ uri: image }} /> */}

      <Card.Content>
        <Text variant="bodyMedium">{description}</Text>
      </Card.Content>
    </Card>
  );
}
