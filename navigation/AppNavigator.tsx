import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@/screens/LoginScreen";
import RegisterScreen from "@/screens/RegisterScreen";
import HomeScreen from "@/screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import PickImageScreen from "@/screens/PickImageScreen";
import PostStoryScreen from "@/screens/PostStoryScreen";
import { NavigationProp } from "@react-navigation/native";

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  PickImageScreen: undefined;
  PostStoryScreen: { uri: string };
};
export type StackNavigation = NavigationProp<RootStackParamList>;
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParamList | null
  >(null);

  useEffect(() => {
    const checkToken = async () => {
      const hasToken = await AsyncStorage.getItem("token");
      setInitialRoute(hasToken ? "HomeScreen" : "LoginScreen");
    };
    checkToken();
  }, []);

  console.log(initialRoute);

  if (initialRoute === null) {
    return <></>;
  }

  return (
    <Provider store={store}>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PickImageScreen"
          component={PickImageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PostStoryScreen"
          component={PostStoryScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Provider>
  );
};

export default AppNavigator;
