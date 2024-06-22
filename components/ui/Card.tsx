import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "constants/color";

interface IcardProps {
  children: React.ReactNode;
}

export default function Card({ children }: IcardProps) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    padding: 16,
    marginTop: 36,
    backgroundColor: Colors.primary800,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
