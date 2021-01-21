import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Image,
  Pressable
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";

export type CARD = {
  id: number;
  image: any;
  title: string;
  subTitle: string;
};
const CARDS: CARD[] = [
  {
    id: 1,
    image: require("../../assets/images/living_room.jpg"),
    title: "Superb appartement",
    subTitle: "500$ per month"
  },
  {
    id: 2,
    image: require("../../assets/images/office.jpg"),
    title: "Spacious office",
    subTitle: "1500$ per month"
  }
];
export default () => {
  const navigation = useNavigation();
  return (
    <View style={styles.cont}>
      {CARDS.map((item, index) => {
        return (
          <Pressable
            onPress={() => navigation.navigate("ScreenB", { item })}
            key={index}
          >
            <SharedElement id={`item.${item.id}.image_url`}>
              <Image source={item.image} style={styles.image} />
            </SharedElement>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subTitle}>{item.subTitle}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 0.8 * Dimensions.get("window").width,
    height: 200,
    marginVertical: 20
  },
  title: {
    fontSize: 20
  },
  subTitle: {
    fontSize: 12
  },
  cont: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "lightblue",
    alignItems: "center"
  }
});
