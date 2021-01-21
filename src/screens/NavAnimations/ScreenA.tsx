import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default () => {
  const navigation = useNavigation();
  return (
    <View style={styles.cont}>
      <Text>Screen A</Text>
      <Button
        onPress={() => navigation.navigate("ScreenB")}
        title="Go To Screen B"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center"
  }
});
