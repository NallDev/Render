import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color="#70C1B3" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "#1A252088",
  },
});

export default Loading;
