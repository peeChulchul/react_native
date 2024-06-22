import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "constants/color";

interface ItitleProps {
  children: React.ReactNode;
}

export default function Title({ children }: ItitleProps) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    minWidth: "90%",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "white",
    padding: 12,
  },
});
