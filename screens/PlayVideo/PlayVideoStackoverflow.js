import { useEventListener } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function Player() {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
    player.timeUpdateEventInterval = 1; //< --- this is what you're missing
  });
  useEventListener(player, "timeUpdate", (payload) => {
    //< --- change here to payload
    console.log("Player status changed: ", payload.currentTime); //< --- ... and here change here
  });

  return (
    <SafeAreaView edges={["left", "right"]} style={styles.contentContainer}>
      <View>
        <VideoView style={styles.vwVideo} player={player} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.2)",
    alignItems: "center",
  },
  vwVideo: {
    width: Dimensions.get("window").width,
    height: 300,
  },
});
