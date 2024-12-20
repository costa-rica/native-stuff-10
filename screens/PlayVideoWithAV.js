import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import TemplateView from "./subcomponents/TemplateView";
//   import { useVideoPlayer, VideoView } from "expo-video";
import { Video, ResizeMode } from "expo-av";
import { useEvent } from "expo";
import { useState, useEffect, useRef } from "react";
import { useEventListener } from "expo";
export default function PlayVideoWithAV({ navigation, route }) {
  const [currentTime, setCurrentTime] = useState(0);
  const video = useRef(null);
  const [status, setStatus] = useState({});
  //   const videoSource = route.params.videoUri.startsWith("file://")
  //     ? route.params.videoUri.replace("file://", "")
  //     : route.params.videoUri;

  //   const player = useVideoPlayer(videoSource, (player) => {
  //     console.log("do we initiate player and state?");
  //     player.loop = true;
  //     player.play();
  //   });

  // Dynamic Styles
  const videoViewStyle = {
    width: Dimensions.get("screen").width,
    height: 300,
  };

  return (
    <TemplateView navigation={navigation}>
      <View style={styles.container}>
        <View style={styles.vwTitle}>
          <Text style={styles.txtTitle}>Play Video</Text>
        </View>

        <View style={styles.vwVideo}>
          {/* <VideoView
              style={[videoViewStyle]} // must be dynamic
              player={player}
              nativeControls={false}
            /> */}

          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        </View>
        <View style={styles.vwButtons}>
          <TouchableOpacity
            style={styles.touchOpNav}
            onPress={() => {
              console.log("Do somethinging ");
              //   player.play();
            }}
          >
            <Text style={styles.txtTouchOpNav}>Do somethinthgin </Text>
          </TouchableOpacity>
          <View>
            <Text>Time is : {currentTime}</Text>
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
});
