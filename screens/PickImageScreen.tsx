import { showToast } from "@/utils/toast";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  CameraPictureOptions,
  CameraCapturedPicture,
} from "expo-camera";
import { useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "expo-router";
import { StackNavigation } from "@/navigation/AppNavigator";

const PickImageScreen = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);
  const { navigate } = useNavigation<StackNavigation>();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    if (!cameraReady) {
      showToast("Camera is not ready, Please wait until the camera is ready.");
      return;
    }
    if (!cameraRef.current) {
      showToast("Camera is not accessible. Please try again.");
      return;
    }
    try {
      const options: CameraPictureOptions = {
        quality: 0.5,
        base64: false,
        exif: true,
      };

      const picture: CameraCapturedPicture | undefined =
        await cameraRef.current.takePictureAsync(options);

      if (picture && picture.uri) {
        const tempUri = picture.uri;

        const permanentUri = `${FileSystem.documentDirectory}photo.jpg`;

        await FileSystem.copyAsync({
          from: tempUri,
          to: permanentUri,
        });

        navigate("PostStoryScreen", {
          uri: permanentUri,
        });
      } else {
        showToast("Failed to capture the picture.");
      }
    } catch (error: any) {
      console.error("Error taking picture:", error);
      showToast("An error occurred while taking the picture.");
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        onCameraReady={() => setCameraReady(true)}
      >
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={[styles.headerButton, { backgroundColor: "#E9EBFE" }]}
          >
            <Image
              style={styles.headerButtonIcon}
              source={require("@/assets/images/gallery-icon.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
            <View style={styles.circle} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headerButton, { backgroundColor: "#E9EBFE" }]}
            onPress={toggleCameraFacing}
          >
            <Image
              style={styles.headerButtonIcon}
              source={require("@/assets/images/swap-icon.png")}
            />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  headerButton: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginStart: 12,
  },
  captureButton: {
    backgroundColor: "#E9EBFE",
    borderRadius: "50%",
    height: 72,
    width: 72,
    alignItems: "center",
    justifyContent: "center",
    marginStart: 12,
  },
  headerButtonIcon: {
    height: 24,
    width: 24,
  },
  circle: {
    height: 56,
    width: 56,
    backgroundColor: "#5265FF",
    borderRadius: "50%",
  },
  buttonSection: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 40,
  },
});

export default PickImageScreen;
