import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native";
import { type StackNavigation } from "@/app";

const LoginScreen = () => {
  const { navigate } = useNavigation<StackNavigation>();

  const navigateToRegister = () => navigate("Register");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.textTitle}>Sign In</Text>
      </View>
      <View style={styles.viewRounded}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.infoText}>
          To keep connected with us please login with your personal info
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder={"Email Address"}
          inputMode={"email"}
          placeholderTextColor={"#A6A6A6"}
        />
        <TextInput
          style={styles.textInput}
          placeholder={"Password"}
          placeholderTextColor={"#A6A6A6"}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.containerRow}>
          <Text style={styles.text}>Don't have an account? </Text>
          <Text
            style={[styles.text, styles.linkText]}
            onPress={navigateToRegister}
          >
            Sign Up
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#70C1B3",
  },
  headerSection: {
    flexGrow: 0.15,
    justifyContent: "center",
  },
  viewRounded: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginStart: 24,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  textInput: {
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
    color: "#333",
    backgroundColor: "#F9F9F9",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#70C1B3",
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  containerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  linkText: {
    color: "#70C1B3",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
