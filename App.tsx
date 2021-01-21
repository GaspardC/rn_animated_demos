import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import Drag from "./src/screens/Drag";
import Lottie from "./src/screens/Lottie";
import Navigation from "./src/containers/Navigation";
import NavigationShared from "./src/containers/NavigationShared";
import Accordeon from "./src/screens/Accordeon";
import AccordeonTransition from "./src/screens/AccordeonTransition";
import Channel from "./src/components/Chanel/Chanel";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <Lottie /> */}

      {/* REANIMATED */}
      {/* <Drag /> */}
      {/* <Accordeon /> */}
      {/* <AccordeonTransition /> */}

      {/* <Navigation /> */}

      <NavigationShared />

      {/* <Channel /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
