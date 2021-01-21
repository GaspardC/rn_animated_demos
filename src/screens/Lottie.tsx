import React, { useState, useRef } from "react";
import { Button, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

// https://github.com/lottie-react-native/lottie-react-native/blob/v2.6.1/docs/api.md
export default () => {
  const animationRef = useRef<LottieView>(null);
  const [animationState, setAnimationState] = useState(false);

  const startStopAnimation = () => {
    if (animationState) {
      animationRef.current?.reset();
      return setAnimationState(false);
    }
    animationRef.current?.play();
    setAnimationState(true);
  };
  return (
    <View style={styles.animationContainer}>
      <LottieView
        ref={animationRef}
        style={{
          width: 400,
          height: 400,
          backgroundColor: "#eee"
        }}
        source={require("../assets/animations/motorcycle.json")}
        // autoPlay
        // loop
        // speed
        // progress : A number between 0 and 1, or an Animated number between 0 and 1.
      />
      <View style={styles.buttonContainer}>
        <Button
          title={`${animationState ? "Stop" : "Start"} Animation`}
          onPress={startStopAnimation}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  buttonContainer: {
    paddingTop: 20
  }
});
