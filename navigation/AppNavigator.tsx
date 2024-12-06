import React, { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@/screens/LoginScreen";
import RegisterScreen from "@/screens/RegisterScreen";
import HomeScreen from "@/screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export type ScreenNames = "Login" | "Register" | "Home";
export type RootStackParamList = Record<ScreenNames, undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<ScreenNames | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const hasToken = await AsyncStorage.getItem("token");
      setInitialRoute(hasToken ? "Home" : "Login");
    };
    checkToken();
  }, []);

  if (initialRoute === null) {
    return <></>;
  }

  return (
    <Provider store={store}>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Provider>
  );
};

export default AppNavigator;
