import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import TemplateView from "./subcomponents/TemplateView";
import React, { useState, useEffect, useRef } from "react";
import * as FileSystem from "expo-file-system";

export default function Home({ navigation }) {
  const [isDownloadModalVisible, setIsDownloadModalVisible] = useState(false);
  const [downloadStatuses, setDownloadStatuses] = useState({});
  const [downloadProgress, setDownloadProgress] = useState("");

  useEffect(() => {
    checkDownloadStatus();
  }, []);
  const videoFilename = "1734625264586-JTvPAN_01_withSetIdentifiers.mp4";

  const checkDownloadStatus = async () => {
    const statuses = {};
    console.log(`checking for: ${videoFilename} `);
    const fileUri = `${FileSystem.documentDirectory}${videoFilename}`;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    statuses[videoFilename] = fileInfo.exists; // Save download status (true/false)
    console.log(`this file exists: ${fileInfo.exists} `);
    setDownloadStatuses(statuses);
  };

  const downloadVideo = async () => {
    console.log("--- in downloadVideo");
    const videoUrl = `${process.env.EXPO_PUBLIC_API_URL}/videos/${videoFilename}`;
    console.log(`calling: ${videoUrl}`);
    const fileUri = `${FileSystem.documentDirectory}${videoFilename}`;

    const downloadResumable = FileSystem.createDownloadResumable(
      videoUrl,
      fileUri,
      {},
      (downloadProgress) => {
        const progress =
          downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite;
        setDownloadProgress(progress * 100); // Update progress state
      }
    );
    try {
      console.log("Trying to download");
      setIsDownloadModalVisible(true); // Show modal when download starts
      const result = await downloadResumable.downloadAsync();
      console.log("Download complete:", result.uri);

      // Update downloadStatuses and UI
      setDownloadStatuses((prev) => ({
        ...prev,
        [videoFilename]: true,
      }));
    } catch (error) {
      console.log("Failed to download");
      console.error("Download failed:", error);
    } finally {
      setIsDownloadModalVisible(false); // Hide modal when download finishes
      setDownloadProgress(0); // Reset progress
    }
  };

  const pressBtnVideo = async (pageName) => {
    console.log("pressed pressBtnVideo");

    if (!downloadStatuses[videoFilename]) {
      setIsDownloadModalVisible(true); // Show modal
      try {
        await downloadVideo(videoFilename);
      } catch (error) {
        setDownloadProgress(0);
        console.error("Download failed:", error);
        Alert.alert("Error", "Failed to download the video. Please try again.");
      } finally {
        setIsDownloadModalVisible(false);
      }
    }

    console.log("go to Scripting screen ....");

    navigation.navigate(pageName, {
      matchName: "elem.matchName",
      videoUri: `${FileSystem.documentDirectory}${videoFilename}`,
    });
  };

  return (
    <TemplateView navigation={navigation}>
      <View style={styles.container}>
        <View style={styles.vwTitle}>
          <Text style={styles.txtTitle}>Pick Screen To View Video</Text>
        </View>
        <View style={styles.vwNavGroup}>
          <TouchableOpacity
            style={styles.touchOpNav}
            onPress={() => pressBtnVideo("PlayVideo")}
          >
            <Text style={styles.txtTouchOpNav}>PlayVideo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.vwNavGroup}>
          <TouchableOpacity
            style={styles.touchOpNav}
            onPress={() => pressBtnVideo("PlayVideoWithTimeLine")}
          >
            <Text style={styles.txtTouchOpNav}>PlayVideoWithTimeLine</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.vwNavGroup}>
          <TouchableOpacity
            style={styles.touchOpNav}
            onPress={() => pressBtnVideo("PlayVideoWithTimeLine02")}
          >
            <Text style={styles.txtTouchOpNav}>PlayVideoWithTimeLine02</Text>
          </TouchableOpacity>
          <Text>↳ corrects clicking on bubbles on timeline</Text>
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
    // width: Dimensions.get("window").width,
  },
  vwTitle: {
    paddingTop: 50,
    paddingBottom: 100,
  },
  txtTitle: { fontSize: 30 },
  vwButtons: {
    gap: 5,
  },
  vwNavGroup: {
    borderBottomWidth: 1,
    paddingBottom: 1,
    marginBottom: 2,
  },
  touchOpNav: {
    backgroundColor: "black",
    padding: 5,
    width: 250,
    borderRadius: 12,
    marginBottom: 1,
  },
  txtTouchOpNav: {
    color: "gray",
    alignSelf: "center",
    fontSize: 20,
  },
});
