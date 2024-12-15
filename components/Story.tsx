import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Story = ({
  name,
  description,
  photoUrl,
  onStoryPress,
}: {
  name: string;
  description: string;
  photoUrl: string;
  onStoryPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onStoryPress}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={require("@/assets/images/person-icon.png")}
        />
        <View style={styles.content}>
          <Text style={styles.textName} numberOfLines={2} ellipsizeMode="tail">
            {name}
          </Text>
          <Text
            style={styles.textDescription}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {description}
          </Text>
          <Image style={styles.contentImage} source={{ uri: photoUrl }} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  content: {
    flex: 1,
    marginStart: 16,
  },
  textName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#090D20",
  },
  textDescription: {
    fontSize: 12,
    color: "#9EA1AE",
    marginTop: 4,
  },
  contentImage: {
    width: "100%",
    height: 155,
    borderRadius: 12,
    resizeMode: "cover",
    marginTop: 8,
  },
});

export default Story;
