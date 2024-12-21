import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import TemplateView from "../subcomponents/TemplateView";
import { useVideoPlayer, VideoView } from "expo-video";
import { useState } from "react";
import { useEventListener } from "expo";

export default function PlayVideoWithTimeLine({ navigation, route }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [timelineLength, setTimelineLength] = useState(0);
  const [userReducerSetTimeStampArray, setUserReducerSetTimeStampArray] =
    useState([0, 100, 200]);
  const [scriptArray, setScriptArray] = useState([33, 50, 80, 130, 155, 300]);

  const calculateTimelineLength = (event) => {
    const { width } = event.nativeEvent.layout;
    setTimelineLength(width);
  };
  const [videoDuration, setVideoDuration] = useState(
    userReducerSetTimeStampArray[1]
    // userReducer.video.setTimeStamps[1]
  );

  const handleSeek = (positionMillis) => {
    console.log("positionMmillis: ", positionMillis);
    player.currentTime = positionMillis;
  };

  const videoSource = route.params.videoUri.startsWith("file://")
    ? route.params.videoUri.replace("file://", "")
    : route.params.videoUri;

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
    player.timeUpdateEventInterval = 1; //< --- this is what you're missing
  });
  useEventListener(player, "timeUpdate", (payload) => {
    //<--- just play payload in the parentheses
    const modifiedSecondIncrement = timelineLength / videoDuration;
    // console.log(payload.currentTime * modifiedSecondIncrement, timelineLength);
    // const adjVideoDuration = videoDuration * timelineLength
    setCurrentTime(payload.currentTime);
    if (payload.currentTime * modifiedSecondIncrement > timelineLength) {
      // console.log("Time is beyond length of tvide");
      player.pause();
    }
  });

  // Dynamic Styles
  const videoViewStyle = {
    width: Dimensions.get("screen").width,
    height: 300,
  };
  const bottomContainerDynamic = {
    width: Dimensions.get("screen").width,
  };

  return (
    <TemplateView navigation={navigation}>
      <View style={styles.container}>
        <View style={styles.vwTitle}>
          <Text style={styles.txtTitle}>Play video with custom imeline</Text>
        </View>

        <View style={styles.vwVideo}>
          <VideoView
            style={[videoViewStyle]} // must be dynamic
            player={player}
          />
        </View>
        <View style={styles.vwButtons}>
          <View>
            <Text>Time is : {currentTime}</Text>
          </View>
        </View>
        <View style={[styles.containerBottom, bottomContainerDynamic]}>
          <View style={styles.vwTimelineContainer}>
            <TouchableOpacity
              style={styles.touchOpTimelineContainer}
              activeOpacity={1}
              onPress={(event) => {
                const touchPosition = event.nativeEvent.locationX;
                // console.log(`touchPosition: ${touchPosition}`);
                const newPosition =
                  (touchPosition / timelineLength) * videoDuration;
                handleSeek(newPosition);
              }}
            >
              <View
                style={styles.vwTimeline}
                onLayout={calculateTimelineLength}
              >
                <View
                  style={[
                    styles.vwTimelineProgress,
                    { width: `${(currentTime / videoDuration) * 100}%` },
                  ]}
                />
                {/* Gray circle at progress bar end */}
                <View
                  style={[
                    styles.circle,
                    {
                      left: `${(currentTime / videoDuration) * 100}%`,
                      marginLeft: -5, // Center the circle
                    },
                  ]}
                />
                {/* Green circles for scriptArray */}
                {scriptArray.map((time, index) => {
                  const position = (time / videoDuration) * 100;
                  return (
                    <View
                      key={index}
                      style={[
                        styles.marker,
                        { left: `${position}%`, marginLeft: -3 },
                      ]}
                    />
                  );
                })}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.2)",
    alignItems: "center",
    // justifyContent: "center",
  },
  vwTitle: {
    paddingTop: 50,
    paddingBottom: 100,
  },
  txtTitle: { fontSize: 30 },
  vwButtons: {
    gap: 5,
    padding: 10,
  },

  vwVideo: {
    backgroundColor: "purple",
    width: Dimensions.get("window").width,
    height: 300,
  },

  touchOpNav: {
    backgroundColor: "black",
    padding: 5,
    width: 250,
    borderRadius: 12,
  },
  txtTouchOpNav: {
    color: "gray",
    alignSelf: "center",
    fontSize: 20,
  },

  // ---- Timeline ---
  vwTimelineContainer: {
    flex: 1,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  touchOpTimelineContainer: {
    width: "90%",
    height: 10,
    // backgroundColor: "blue",
    justifyContent: "center",
  },
  vwTimeline: {
    width: "100%",
    height: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
    position: "relative",
    overflow: "visible", // Allow elements to overflow
  },
  vwTimelineProgress: {
    height: "100%",
    backgroundColor: "#888",
  },
  circle: {
    position: "absolute",
    top: "50%",
    width: 20, // Larger than the timeline
    height: 20, // Larger than the timeline
    backgroundColor: "gray",
    borderRadius: 10, // Full circle
    transform: [{ translateY: -10 }], // Center the circle vertically
  },
  marker: {
    position: "absolute",
    top: "50%",
    width: 6,
    height: 6,
    backgroundColor: "green",
    borderRadius: 3,
    transform: [{ translateY: -3 }],
  },
});
