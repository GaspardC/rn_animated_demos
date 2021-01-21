// https://github.com/IjzerenHein/react-navigation-shared-element/blob/master/docs/Navigation5.md
import * as React from "react";
import { Animated, Easing } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import {
  createSharedElementStackNavigator,
  SharedElementSceneComponent
} from "react-navigation-shared-element";

import ScreenA, { CARD } from "../screens/NavSharedAnimations/ScreenA";
import ScreenB from "../screens/NavSharedAnimations/ScreenB";

export type RootStackParamList = {
  ScreenA: {};
  ScreenB: {
    item: CARD;
  };
};

const Stack = createSharedElementStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
          cardStyle: {
            backgroundColor: "transparent"
          }
        }}
      >
        <Stack.Screen name="ScreenA" component={ScreenA} />
        <Stack.Screen
          name="ScreenB"
          component={ScreenB as SharedElementSceneComponent}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
