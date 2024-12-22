import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

export default function Timeline(props) {
  const [timelineLayout, setTimelineLayout] = useState(null);
  const [timelineIncrement, setTimelineIncrement] = useState(null);

  const calculateTimelineLength = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setTimelineLayout({ x, y, width, height });
    setTimelineIncrement(props.videoDuration / width);
  };

  // Tap gesture for Timeline tap
  const gestureTapTimeline = Gesture.Tap().onEnd((event) => {
    if (!timelineLayout) return;

    // const timelineIncrement = videoDuration / timelineLayout.width;
    const relativeX = event.absoluteX - timelineLayout.x;
    console.log(`timeline POS: ${relativeX * timelineIncrement}`);
    const playerCurrentTimeSet = relativeX * timelineIncrement;
    props.player.currentTime = playerCurrentTimeSet;
  });

  const gestureSwipeTimeline = Gesture.Pan()
    .onUpdate((event) => {
      if (!timelineLayout) return;

      // Calculate the relative X position and update the player's current time
      const relativeX = Math.min(
        Math.max(event.absoluteX - timelineLayout.x, 0),
        timelineLayout.width
      );
      const playerCurrentTimeSet =
        (relativeX / timelineLayout.width) * props.videoDuration;
      props.setCurrentTime(playerCurrentTimeSet); // Update the progress visually
      props.player.currentTime = playerCurrentTimeSet; // Update the video time
    })
    .onEnd(() => {
      console.log("Pan gesture ended");
    });

  const combinedTimelineGesture = Gesture.Race(
    gestureTapTimeline,
    gestureSwipeTimeline
  );
  return (
    <GestureDetector gesture={combinedTimelineGesture}>
      <View
        key={1}
        style={[styles.vwTimeline, { width: props.timelineWidth }]}
        onLayout={calculateTimelineLength}
      >
        <View
          style={[
            styles.vwTimelineProgress,
            { width: `${(props.currentTime / props.videoDuration) * 100}%` },
          ]}
        />
        <View
          style={[
            styles.vwProgressCircle,
            {
              left: `${(props.currentTime / props.videoDuration) * 100}%`,
              marginLeft: -10, // Adjust for centering
            },
          ]}
        />
        {props.scriptArray.map((time, index) => {
          const position = (time / props.videoDuration) * 100;
          return (
            <View
              key={index} // Adding a unique key here based on the index
              style={[
                styles.vwScriptMarker,
                { left: `${position}%`, marginLeft: -5 },
              ]}
            />
          );
        })}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  vwTimeline: {
    height: 15,
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    overflow: "visible",
    position: "relative",
  },
  vwTimelineProgress: {
    height: "100%",
    backgroundColor: "#888",
  },
  vwProgressCircle: {
    position: "absolute",
    top: "50%",
    width: 20,
    height: 20,
    backgroundColor: "gray",
    borderRadius: 10,
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },

  vwScriptMarker: {
    backgroundColor: "green",
    borderRadius: 5,
    width: 10,
    height: 10,
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -5 }],
    zIndex: 2,
  },
});
