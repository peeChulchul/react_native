import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";
import Colors from "constants/color";

interface IinstructionTextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export default function InstructionText({
  children,
  style,
}: IinstructionTextProps) {
  return (
    <View>
      <Text style={[styles.instructionText, style]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 24,
  },
});
