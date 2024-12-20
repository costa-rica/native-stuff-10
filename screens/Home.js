import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.vwTitle}>
        <Text style={styles.txtTitle}>Home Screen</Text>
      </View>
      <View style={styles.vwButtons}>
        <TouchableOpacity
          style={styles.touchOpNav}
          onPress={() => navigation.navigate("SetButtonDown")}
        >
          <Text style={styles.txtTouchOpNav}>SetButtonDown</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchOpNav}
          onPress={() => navigation.navigate("DownloadVideo")}
        >
          <Text style={styles.txtTouchOpNav}>Download Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchOpNav}
          onPress={() => navigation.navigate("PlayVideoWithAV")}
        >
          <Text style={styles.txtTouchOpNav}>PlayVideoWithAV</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchOpNav}
          onPress={() => navigation.navigate("Play")}
        >
          <Text style={styles.txtTouchOpNav}>Play - stackoverflow</Text>
        </TouchableOpacity>
      </View>
    </View>
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
