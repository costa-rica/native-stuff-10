import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.vwTitle}>
        <Text style={styles.txtTitle}>Home Screen</Text>
      </View>
      <View style={styles.vwButtons}>
        <View style={styles.vwNavGroup}>
          <TouchableOpacity
            style={styles.touchOpNav}
            onPress={() => navigation.navigate("SetButtonDown")}
          >
            <Text style={styles.txtTouchOpNav}>SetButtonDown</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.vwNavGroup}>
          <TouchableOpacity
            style={styles.touchOpNav}
            onPress={() => navigation.navigate("DownloadVideo")}
          >
            <Text style={styles.txtTouchOpNav}>Download Video</Text>
          </TouchableOpacity>
          <Text>↳ Main thread of interest 👆</Text>
        </View>
        <View style={styles.vwNavGroup}>
          <TouchableOpacity
            style={styles.touchOpNav}
            onPress={() => navigation.navigate("Play")}
          >
            <Text style={styles.txtTouchOpNav}>Play - stackoverflow</Text>
          </TouchableOpacity>
          <Text>↳ Used to answer the stackoverflow question</Text>
        </View>
        <View style={styles.vwNavGroup}>
          <TouchableOpacity
            style={styles.touchOpNav}
            onPress={() => navigation.navigate("Gesture01")}
          >
            <Text style={styles.txtTouchOpNav}>Gesture in Gest</Text>
          </TouchableOpacity>
          <Text>↳ gesture in gesture w/out bottom gest triggering</Text>
        </View>
        <View style={styles.vwNavGroup}>
          <TouchableOpacity
            style={styles.touchOpNav}
            onPress={() => navigation.navigate("Gesture02")}
          >
            <Text style={styles.txtTouchOpNav}>Gesture in Gest w Video</Text>
          </TouchableOpacity>
          <Text>↳ gesture ...</Text>
        </View>
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
  vwNavGroup: {
    borderBottomWidth: 1,
    paddingBottom: 1,
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
