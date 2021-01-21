import React, { useState } from "react";
import { View, StyleSheet, Button, Image } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { mix, useTiming } from "react-native-redash";

export default () => {
  const [isToggled, toggle] = useState(false);
  const progress = useTiming(isToggled);

  const style = useAnimatedStyle(() => {
    return {
      height: interpolate(progress.value, [0, 1], [200, 600])
    };
  });

  const imageStyle = useAnimatedStyle(() => ({
    width: 200,
    height: 200,
    transform: [
      //   { rotateZ: `${interpolate(progress.value, [0, 1], [0, 180])}deg` }
      { rotateZ: `${mix(progress.value, 0, 180)}deg` }
    ]
  }));
  return (
    <View style={styles.container}>
      <Animated.View style={[style, styles.box]} />

      <Animated.Image
        style={imageStyle}
        source={require("../assets/images/Icon.png")}
      />
      <Button title={"toggle"} onPress={() => toggle(!isToggled)}></Button>
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
