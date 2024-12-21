import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PanResponder,
  Dimensions,
} from "react-native";
import { useState, useRef } from "react";

export default function PlayVideoWithTimeLine({ navigation, route }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [timelineLength, setTimelineLength] = useState(0);
  const [scriptArray, setScriptArray] = useState([33, 80, 130, 155, 300]);
  const [videoDuration, setVideoDuration] = useState(400); // Example duration

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const positionX = Math.min(
          Math.max(gestureState.moveX, 0),
          timelineLength
        );
        const newPosition = (positionX / timelineLength) * videoDuration;
        setCurrentTime(newPosition); // Update visually as the user drags
      },
      onPanResponderRelease: (event, gestureState) => {
        const positionX = Math.min(
          Math.max(gestureState.moveX, 0),
          timelineLength
        );
        const newPosition = (positionX / timelineLength) * videoDuration;
        handleSeek(newPosition); // Seek the video
      },
    })
  ).current;

  const handleSeek = (newPosition) => {
    console.log("Seeking to:", newPosition);
    setCurrentTime(newPosition);
  };

  const calculateTimelineLength = (event) => {
    const { width } = event.nativeEvent.layout;
    setTimelineLength(width);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>Play video with custom timeline</Text>

      <View style={styles.vwTimelineContainer}>
        <TouchableOpacity
          style={styles.touchOpTimelineContainer}
          activeOpacity={1}
          onPress={(event) => {
            console.log(
              `event.nativeEvent.locationX: ${event.nativeEvent.locationX}`
            );

            const touchPosition = event.nativeEvent.locationX;
            const newPosition =
              (touchPosition / timelineLength) * videoDuration;
            handleSeek(newPosition);
          }}
          onLayout={calculateTimelineLength}
        >
          <View style={styles.vwTimeline}>
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
              {...panResponder.panHandlers}
            />
            {scriptArray.map((time, index) => {
              const position = (time / videoDuration) * 100;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.touchOpScriptMarker,
                    { left: `${position}%`, marginLeft: -5 },
                  ]}
                  onPress={() => handleSeek(time)}
                >
                  <View style={styles.vwScriptMarker} />
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  txtTitle: { fontSize: 20, marginBottom: 20 },
  vwTimelineContainer: {
    width: "90%",
    justifyContent: "center",
  },
  touchOpTimelineContainer: {
    width: "100%",
    height: 30,
    justifyContent: "center",
  },
  vwTimeline: {
    width: "100%",
    height: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
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
  touchOpScriptMarker: {
    position: "absolute",
    top: "50%",
    width: 10,
    height: 10,
    transform: [{ translateY: -5 }],
    zIndex: 2,
  },
  vwScriptMarker: {
    width: "100%",
    height: "100%",
    backgroundColor: "green",
    borderRadius: 5,
  },
});
