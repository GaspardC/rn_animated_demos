import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay
} from "react-native-reanimated";

const TEXT_DRAG_ME = "Drag Me";

const SIZE_DRAGABLE = 100;
const WIDTH = Dimensions.get("window").width - SIZE_DRAGABLE;
const HEIGHT = Dimensions.get("window").height - SIZE_DRAGABLE;

export default () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const [textDragMe, setTextDragMe] = useState(TEXT_DRAG_ME);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offsetX: number;
      offsetY: number;
    }
  >({
    onStart: (event, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
      runOnJS(setTextDragMe)("Dragging");
    },
    onActive: (event, ctx) => {
      translateX.value = (ctx.offsetX ?? 0) + event.translationX;
      translateY.value = (ctx.offsetY ?? 0) + event.translationY;
    },
    onEnd: ({ velocityX, velocityY }, ctx) => {
      translateX.value = withDecay({
        velocity: velocityX,
        deceleration: 0.99,
        clamp: [0, WIDTH]
      });
      translateY.value = withDecay({
        velocity: velocityY,
        deceleration: 0.99,
        clamp: [0, HEIGHT]
      });
      runOnJS(setTextDragMe)(TEXT_DRAG_ME);
    }
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value }
      ]
    };
  });
  return (
    <View>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={style}>
          <View style={styles.textCont}>
            <Text>{textDragMe}</Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  textCont: {
    width: SIZE_DRAGABLE,
    height: SIZE_DRAGABLE,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center"
  }
});
