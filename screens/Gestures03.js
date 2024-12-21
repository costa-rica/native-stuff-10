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
import Timeline from "./subcomponents/Timeline";

const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function Gesture03({ navigation }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [scriptArray, setScriptArray] = useState([33, 80, 130, 155, 300]);
  const [videoDuration, setVideoDuration] = useState(400); // Example duration

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

  // Combine swipe and tap gestures
  const combinedGesture = Gesture.Race(swipeGesture, tapGesture);

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
            <Timeline
              player={player}
              videoDuration={videoDuration}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              scriptArray={scriptArray}
              timelineWidth={"50%"}
            />
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
    justifyContent: "center",
    alignItems: "center",
  },
});
