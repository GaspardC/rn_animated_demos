import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default () => {
  const navigation = useNavigation();
  return (
    <View style={styles.cont}>
      <Text>Screen B</Text>
      <Button onPress={() => navigation.goBack()} title="Go Back" />
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center"
  }
});
