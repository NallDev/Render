import Loading from "@/components/Loading";
import { AddStoryRequest } from "@/model/AddStoryModel";
import { RootStackParamList, StackNavigation } from "@/navigation/AppNavigator";
import { useAddStoryMutation } from "@/services/story";
import { showToast } from "@/utils/toast";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  Keyboard,
} from "react-native";

interface StoryForm {
  userDescription: string;
}

const PostStoryScreen = () => {
  const { goBack, reset } = useNavigation<StackNavigation>();
  const route = useRoute<RouteProp<RootStackParamList, "PostStoryScreen">>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StoryForm>();

  const navigateBack = () => goBack();
  const [addStory, { isLoading }] = useAddStoryMutation();

  const onSubmit: SubmitHandler<StoryForm> = async (data) => {
    Keyboard.dismiss();
    try {
      const file = {
        uri: route.params.uri,
        name: `${btoa(`${route.params.uri}-${Date.now()}`)}.jpg`,
        type: "image/jpeg",
      } as unknown as File;

      console.log(`${data.userDescription} dan ${file}`);
      if (!file) {
        throw new Error("Invalid image file.");
      }

      const request: AddStoryRequest = {
        description: data.userDescription,
        photo: file,
      };
      await addStory(request).unwrap();

      reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
    } catch (err: any) {
      if (err.data) {
        showToast(
          `Error: ${err.data.message || "An unexpected error occurred"}`
        );
      } else if (err.message) {
        showToast(`Error: ${err.message}`);
      } else {
        showToast("An unknown error occurred.");
      }
      console.log(err.message);
    }
  };

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
        <TouchableOpacity
          style={[styles.postingButton, { backgroundColor: "#E9EBFE" }]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.postingText}>Posting</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.contentView}>
          <Image
            style={styles.imageProfile}
            source={require("@/assets/images/person-icon.png")}
          />
          <View style={styles.contentForm}>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Description must be fill out",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Saya sangat senang hari ini..."
                  placeholderTextColor={"#9EA1AE"}
                  inputMode="text"
                  multiline={true}
                  textAlignVertical="top"
                  textAlign="left"
                />
              )}
              name="userDescription"
            />
            {errors.userDescription && (
              <Text style={styles.errorMessage}>
                {errors.userDescription.message}
              </Text>
            )}

            <Image
              style={styles.imageForm}
              source={{ uri: route.params.uri }}
            />
          </View>
        </View>
      </ScrollView>
      {isLoading && <Loading />}
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
    justifyContent: "space-between",
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
  postingButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  postingText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#5265FF",
  },
  headerButtonIcon: {
    height: 24,
    width: 24,
  },
  contentView: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  imageProfile: {
    width: 48,
    height: 48,
  },
  contentForm: {
    flex: 1,
    marginStart: 24,
  },
  imageForm: {
    height: 242,
    width: "100%",
    borderRadius: 12,
    marginTop: 16,
  },
  errorMessage: {
    fontSize: 12,
    color: "#FF6B6B",
    marginBottom: 16,
  },
});

export default PostStoryScreen;
