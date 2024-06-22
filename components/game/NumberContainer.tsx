import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "constants/color";

interface InumberContainerProps {
  children: React.ReactNode;
}
export default function NumberContainer({ children }: InumberContainerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: 24,
    margin: 24,
    borderRadius: 8,
    alignContent: "center",
    justifyContent: "center",
  },
  numberText: {
    color: Colors.accent500,
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "open-sans-bold",
  },
});
