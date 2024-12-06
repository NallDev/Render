import { StyleSheet, Text, View } from "react-native";

const EmptyText = ({ text }: { text: string }) => {
  return (
    <View style={styles.content}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    position: "absolute",
  },
  text: {
    textAlign: "center",
    fontSize: 12,
    color: "#9EA1AE",
  },
});

export default EmptyText;
