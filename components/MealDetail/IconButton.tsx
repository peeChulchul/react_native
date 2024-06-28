import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface Iiconbutton {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export default function IconButton({ onPress, icon, color }: Iiconbutton) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed ? styles.pressed : null]}
    >
      <Ionicons name={icon} size={24} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
