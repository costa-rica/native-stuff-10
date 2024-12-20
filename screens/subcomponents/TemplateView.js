import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  Animated,
  Easing,
  Switch,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";

export default function TemplateView(props) {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View
          style={
            props.noBackButton
              ? styles.vwTopGreyBand
              : styles.vwTopGreyBandWithBackButton
          }
        >
          <TouchableOpacity
            style={styles.touchOpCircle}
            onPress={() => props.navigation.goBack()}
          >
            <Image
              style={styles.imgGearGray}
              source={require("../../assets/images/btnBackArrow.png")}
              alt="logo"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* -------- BOTTOM ----- */}
      <View style={styles.containerBottom}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // ----- TOP Container -----
  containerTop: {
    alignItems: "center",
    height: "15%",
  },
  vwTopGreyBand: {
    backgroundColor: "#A3A3A3",
    marginTop: 10,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "flex-end",
    width: "95%",
    padding: 5,
  },
  vwTopGreyBandWithBackButton: {
    backgroundColor: "#A3A3A3",
    marginTop: 10,
    borderRadius: 35,
    justifyContent: "space-between",
    flexDirection: "row",
    width: "95%",
    padding: 5,
  },
  touchOpCircle: {
    width: 70,
    height: 70,
    backgroundColor: "white",
    borderRadius: 35, // Makes it a circle
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgray",
  },

  // ------ Bottom -------
  containerBottom: {
    flex: 1,
  },
});
