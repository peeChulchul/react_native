import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "constants/style";
import Button from "./Button";

interface IerrorOverlayProps {
  message: string;
  onConfirm: () => void;
}

export default function ErrorOverlay({
  message,
  onConfirm,
}: IerrorOverlayProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
