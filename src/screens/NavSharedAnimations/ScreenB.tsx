import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions
} from "react-native";
// import  { createAnimatableComponent } from "react-native-animatable";
import * as Animatable from "react-native-animatable";

import {
  SharedElement,
  SharedElementSceneComponent
} from "react-navigation-shared-element";

import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../containers/NavigationShared";

type ScreenBScreenRouteProp = RouteProp<RootStackParamList, "ScreenB">;
type ScreenBScreenNavigationProp = StackNavigationProp<{}>;

type Props = {
  route: ScreenBScreenRouteProp;
  navigation: ScreenBScreenNavigationProp;
};

const ScreenB = ({
  route,
  navigation
}: SharedElementSceneComponent & Props) => {
  const { item } = route.params;

  return (
    <View style={styles.cont}>
      <Text>Screen B</Text>
      <SharedElement id={`item.${item.id}.image_url`}>
        <Image style={styles.image} source={item.image} />
      </SharedElement>

      <View style={styles.row}>
        {["🦄", "😉", "👍", "❤️"].map((text, index) => (
          <Animatable.Text
            delay={200 * (1 + index)}
            animation="fadeIn"
            style={styles.emoji}
            key={index}
          >
            {text}
          </Animatable.Text>
        ))}
      </View>

      <Button onPress={() => navigation.goBack()} title="Go Back" />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width,
    height: 300
  },
  cont: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    backgroundColor: "lightgreen"
  },
  row: {
    flexDirection: "row",
    padding: 20,
    width: "50%",
    justifyContent: "space-between"
  },
  emoji: { fontSize: 24 }
});

ScreenB.sharedElements = (route: ScreenBScreenRouteProp) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.id}.image_url`,
      animation: "move",
      resize: "clip"
    }
  ];
};

export default ScreenB;
