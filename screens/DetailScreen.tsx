import { RootStackParamList, StackNavigation } from "@/navigation/AppNavigator";
import { formatDateString } from "@/utils/dateFormatter";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

const DetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "DetailScreen">>();
  const { goBack } = useNavigation<StackNavigation>();
  const { name, description, photoUrl, createdAt } = route.params;
  const navigateBack = () => goBack();

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={navigateBack}
          style={[styles.headerButton, { backgroundColor: "#E9EBFE" }]}
        >
          <Image
            style={styles.headerButtonIcon}
            source={require("@/assets/images/arrow-left-icon.png")}
          />
        </TouchableOpacity>

        <Text
          style={{
            marginStart: 16,
            fontSize: 20,
            fontWeight: 500,
            color: "#000",
          }}
        >
          Story
        </Text>
      </View>
      <ScrollView>
        <View style={styles.contentView}>
          <View style={styles.userInfo}>
            <Image
              style={{ width: 40, height: 40 }}
              source={require("@/assets/images/person-icon.png")}
            />
            <View style={styles.userInfoDetail}>
              <Text style={{ fontSize: 16, fontWeight: 500, color: "#000" }}>
                {name}
              </Text>
              <Text style={{ fontSize: 12, color: "#9EA1AE" }}>
                {formatDateString(createdAt)}
              </Text>
            </View>
          </View>
          <Text style={{ marginTop: 16 }}>{description}</Text>
          <Image
            style={{
              marginTop: 16,
              width: "100%",
              height: 242,
              borderRadius: 12,
            }}
            source={{ uri: photoUrl }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  headerButton: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  headerButtonIcon: {
    height: 24,
    width: 24,
  },
  contentView: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  userInfo: {
    width: "100%",
    flexDirection: "row",
  },
  userInfoDetail: {
    marginStart: 16,
    flexDirection: "column",
  },
});

export default DetailScreen;
