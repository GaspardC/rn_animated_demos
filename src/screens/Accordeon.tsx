import React from "react";
import { View, StyleSheet, Button, Image } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { mix } from "react-native-redash";

export default () => {
  const state = useSharedValue(false);
  const toggle = () => {
    state.value = !state.value;
  };

  const progress = useDerivedValue(() => {
    return state.value ? withSpring(0) : withTiming(1, { duration: 3000 });
  });

  const style = useAnimatedStyle(() => {
    return {
      height: interpolate(progress.value, [0, 1], [200, 600])
    };
  });

  const progressImage = useDerivedValue(() => {
    return state.value ? withSpring(0) : withTiming(1, { duration: 2000 });
  });

  const imageStyle = useAnimatedStyle(() => ({
    width: 200,
    height: 200,
    transform: [
      // { rotateZ: `${interpolate(progressImage.value, [0, 1], [0, 180])}deg` }
      { rotateZ: `${mix(progressImage.value, 0, 180)}deg` }
    ]
  }));
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, style]} />

      <Animated.Image
        style={imageStyle}
        source={require("../assets/images/Icon.png")}
      />
      <Button title={"toggle"} onPress={toggle}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  box: { backgroundColor: "red", width: 200 }
});
