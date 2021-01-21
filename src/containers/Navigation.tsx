// https://reactnavigation.org/docs/stack-navigator/#animations
import * as React from "react";
import { Animated, Easing } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackCardInterpolationProps
} from "@react-navigation/stack";
import ScreenA from "../screens/NavAnimations/ScreenA";
import ScreenB from "../screens/NavAnimations/ScreenB";

const Stack = createStackNavigator();

const config = {
  animation: "timing",
  config: {
    // duration: 5000,
    easing: Easing.linear
    // easing: Easing.bounce
  }
} as const;
export default () => {
  const forSlide = ({
    current,
    next,
    inverted,
    layouts: { screen }
  }: StackCardInterpolationProps) => {
    const progress = Animated.add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: "clamp"
      }),
      next
        ? next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: "clamp"
          })
        : 0
    );

    // 0 -> 1 go in focus
    // 1 -> 2 leave focus
    return {
      cardStyle: {
        borderWidth: 10,
        borderColor: "red",
        transform: [
          {
            translateY: Animated.multiply(
              progress.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [
                  -screen.height, // Focused, but offscreen in the beginning
                  0, // Fully focused
                  screen.height // Fully unfocused
                ],
                extrapolate: "clamp"
              }),
              inverted
            )
          }
        ]
      }
    };
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          transitionSpec: {
            open: config,
            close: config
          }
          // cardStyleInterpolator: forSlide
        }}
      >
        <Stack.Screen
          name="ScreenA"
          component={ScreenA}
          options={{ cardStyleInterpolator: forSlide }}
        />
        <Stack.Screen
          name="ScreenB"
          component={ScreenB}
          options={{ cardStyleInterpolator: forSlide }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
