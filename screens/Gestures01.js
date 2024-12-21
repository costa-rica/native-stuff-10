import React from "react";
import { View, StyleSheet, Text, Alert, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import TemplateView from "../screens/subcomponents/TemplateView";

export default function Gesture01({ navigation }) {
  const bottomGestAlert = (strType, strInfo) => {
    alert(`${strType} - ${strInfo}`);
  };
  // Pan gesture for swipe detection
  const swipeGesture = Gesture.Pan().onEnd((event) => {
    const { translationX, translationY } = event;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        bottomGestAlert("Swiped", "right");
        // Alert.alert("Swipe", "Swiped Right");
      } else {
        // Alert.alert("Swipe", "Swiped Left");
        bottomGestAlert("Swiped", "left");
      }
    } else {
      if (translationY > 0) {
        // Alert.alert("Swipe", "Swiped Down");
        bottomGestAlert("Swiped", "down");
      } else {
        bottomGestAlert("Swiped", "up");
      }
    }
  });

  // Tap gesture for tap detection
  const tapGesture = Gesture.Tap().onEnd(() => {
    // Alert.alert("Tap", "Tapped the area");
    bottomGestAlert("Tapped", "once");
  });
  // Tap gesture for tap detection
  const tapGesturePurple = Gesture.Tap().onEnd(() => {
    // Alert.alert("Tap", "Tapped the area");
    bottomGestAlert("Tapped on purple", "once");
  });

  // Combine swipe and tap gestures
  const combinedGesture = Gesture.Race(swipeGesture, tapGesture);

  return (
    <TemplateView navigation={navigation}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <GestureDetector gesture={combinedGesture}>
            <View style={styles.swipeTapArea}>
              <Text style={styles.text}>Swipe or Tap in this area</Text>
            </View>
          </GestureDetector>
          <GestureDetector gesture={tapGesturePurple}>
            <View style={styles.containerBottom}></View>
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  swipeTapArea: {
    width: "80%",
    height: "100%",
    backgroundColor: "#d3d3d3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  // --- Container Bottom: Timeline ----
  containerBottom: {
    position: "absolute", // Overlay the container
    bottom: 0, // Distance from the bottom of the screen
    left: 0, // Distance from the right of the screen
    flexDirection: "row",
    backgroundColor: "purple",
    width: Dimensions.get("screen").width,
    height: 200,
  },
});
