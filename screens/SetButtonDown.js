import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";

export default function SetButtonDown({ navigation }) {
  const [setViewExpanded, setSetViewExpanded] = useState(false);
  const [set, setSet] = useState(1);

  return (
    <View style={styles.container}>
      <View style={styles.containerTopLeft}>
        <View style={styles.vwBtnBack}>
          <TouchableOpacity
            style={styles.touchOpBtnBack}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={styles.btnImgBackArrow}
              source={require("../assets/images/btnBackArrow.png")}
              alt="logo"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.vwSetSelection}>
          <View style={styles.vwSetGrayBand}>
            <View style={styles.vwSubSetGrayBand}>
              <View style={styles.vwTxtSet}>
                <Text style={styles.txtSet}>Set: {set}</Text>
              </View>
              <View style={styles.vwBtnDisplaySets}>
                <TouchableOpacity
                  style={styles.touchOpSet}
                  onPress={() => {
                    setSetViewExpanded(!setViewExpanded);
                    console.log("pick a new set");
                  }}
                >
                  <Image
                    style={styles.btnImgDownArrow}
                    source={
                      setViewExpanded
                        ? require("../assets/images/btnBackArrow.png")
                        : require("../assets/images/btnDownArrow.png")
                    }
                    alt="back arrow"
                  />
                </TouchableOpacity>
              </View>
            </View>
            {setViewExpanded ? (
              <View style={styles.vwSetOptions}>
                <View style={styles.vwSetOptionWhiteBand}>
                  <Text>Set 2</Text>
                </View>
                <View style={styles.vwSetOptionWhiteBand}>
                  <Text>Set 3</Text>
                </View>
              </View>
            ) : null}
          </View>
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
    justifyContent: "center",
    // padding: 5,
  },
  containerTopLeft: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 15,
    backgroundColor: "gray",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "dotted",
  },
  vwBtnBack: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  touchOpBtnBack: {
    borderRadius: 20,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImgBackArrow: {
    width: 33,
    height: 33,
  },

  vwSetSelection: {
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },

  btnImgDownArrow: {
    width: 30,
    height: 30,
  },
  vwSetGrayBand: {
    backgroundColor: "#A3A3A3",
    borderRadius: 25,
    padding: 5,
    alignItems: "center",
    alignSelf: "flex-start", // Prevents vertical centering
  },
  vwSubSetGrayBand: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5, // Add space between this view and vwSetOptions
  },
  vwSetOptions: {
    // backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    //marginTop: 5, // Ensures vwSetOptions always appears below vwSubSetGrayBand
    padding: 5,
    gap: 5,
  },
  vwSetOptionWhiteBand: {
    padding: 5,
    marginVertical: 3,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
