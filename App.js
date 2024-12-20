import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Home from "./screens/Home";
import SetButtonDown from "./screens/SetButtonDown";
import DownloadVideo from "./screens/DownloadVideo";
import PlayVideo from "./screens/PlayVideo";
import PlayVideoWithAV from "./screens/PlayVideoWithAV";
import Play from "./screens/PlayVideoStackoverflow";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SetButtonDown" component={SetButtonDown} />
          <Stack.Screen name="DownloadVideo" component={DownloadVideo} />
          <Stack.Screen name="PlayVideo" component={PlayVideo} />
          <Stack.Screen name="PlayVideoWithAV" component={PlayVideoWithAV} />
          <Stack.Screen name="Play" component={Play} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
