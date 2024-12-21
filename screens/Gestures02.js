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
import { useVideoPlayer, VideoView } from "expo-video";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import TemplateView from "./subcomponents/TemplateView";
const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function Gesture02({ navigation }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [timelineLength, setTimelineLength] = useState(0);
  const [scriptArray, setScriptArray] = useState([33, 80, 130, 155, 300]);
  const [videoDuration, setVideoDuration] = useState(400); // Example duration
  const [timelineLayout, setTimelineLayout] = useState(null);
  const [timelineIncrement, setTimelineIncrement] = useState(null);

  useEffect(() => {
    const subscriptionToVideoTimeUpdate = player.addListener(
      "timeUpdate",
      (payload) => {
        // console.log("Player status changed: ", payload.currentTime);
        setCurrentTime(payload.currentTime);
      }
    );
    return () => {
      subscriptionToVideoTimeUpdate.remove;
    };
  }, []);

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
    player.timeUpdateEventInterval = 1; //< --- this is what you're missing
  });
  // const calculateTimelineLength = (event) => {
  //   const { width } = event.nativeEvent.layout;
  //   setTimelineLength(width);
  // };
  const calculateTimelineLength = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setTimelineLayout({ x, y, width, height });
    setTimelineIncrement(videoDuration / width);
  };

  const bottomGestAlert = (strType, strInfo) => {
    alert(`${strType} - ${strInfo}`);
  };
  // Pan gesture for swipe detection
  const swipeGesture = Gesture.Pan().onEnd((event) => {
    const { translationX, translationY } = event;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        bottomGestAlert("Swiped", "right");
      } else {
        bottomGestAlert("Swiped", "left");
      }
    } else {
      if (translationY > 0) {
        bottomGestAlert("Swiped", "down");
      } else {
        bottomGestAlert("Swiped", "up");
      }
    }
  });

  // Tap gesture for tap
  const tapGesture = Gesture.Tap().onEnd(() => {
    bottomGestAlert("Tapped", "once");
  });
  // Tap gesture for Timeline tap
  const gestureTapTimeline = Gesture.Tap().onEnd((event) => {
    if (!timelineLayout) return;

    // const timelineIncrement = videoDuration / timelineLayout.width;
    const relativeX = event.absoluteX - timelineLayout.x;
    console.log(`timeline POS: ${relativeX * timelineIncrement}`);
    const playerCurrentTimeSet = relativeX * timelineIncrement;
    player.currentTime = playerCurrentTimeSet;
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
        (relativeX / timelineLayout.width) * videoDuration;
      setCurrentTime(playerCurrentTimeSet); // Update the progress visually
      player.currentTime = playerCurrentTimeSet; // Update the video time
    })
    .onEnd(() => {
      console.log("Pan gesture ended");
    });

  // Combine swipe and tap gestures
  const combinedGesture = Gesture.Race(swipeGesture, tapGesture);

  const combinedTimelineGesture = Gesture.Race(
    gestureTapTimeline,
    gestureSwipeTimeline
  );

  return (
    <TemplateView navigation={navigation}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <GestureDetector gesture={combinedGesture}>
            <View style={styles.swipeTapArea}>
              <Text style={styles.text}>Swipe or Tap in this area</Text>
              <VideoView
                style={styles.vwVideo}
                player={player}
                nativeControls={false}
              />
            </View>
          </GestureDetector>

          <View style={styles.containerBottom}>
            <GestureDetector gesture={combinedTimelineGesture}>
              <View
                key={1}
                style={styles.vwTimeline}
                onLayout={calculateTimelineLength}
              >
                <View
                  style={[
                    styles.vwTimelineProgress,
                    { width: `${(currentTime / videoDuration) * 100}%` },
                  ]}
                />
                <View
                  style={[
                    styles.vwProgressCircle,
                    {
                      left: `${(currentTime / videoDuration) * 100}%`,
                      marginLeft: -10, // Adjust for centering
                    },
                  ]}
                />
                {scriptArray.map((time, index) => {
                  const position = (time / videoDuration) * 100;
                  return (
                    <View
                      style={[
                        styles.vwScriptMarker,
                        { left: `${position}%`, marginLeft: -5 },
                      ]}
                    />
                  );
                })}
              </View>
            </GestureDetector>
          </View>
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
  vwVideo: {
    width: Dimensions.get("window").width,
    height: 300,
  },
  // --- Container Bottom: Timeline ----
  containerBottom: {
    position: "absolute",
    bottom: "30%",
    left: 0,
    flexDirection: "row",
    backgroundColor: "rgba(100,100,100,0.85)",
    width: Dimensions.get("screen").width,
    height: 100,
    // justifyContent: "center",
    alignItems: "center",
  },
  vwTimeline: {
    width: 200,
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
