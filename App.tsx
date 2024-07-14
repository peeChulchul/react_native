import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
      <StatusBar barStyle="default" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
