import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "constants/color";

interface IguessLogitemProps {
  roundNumber: number;
  guess: number;
}

export default function GuessLogitem({
  guess,
  roundNumber,
}: IguessLogitemProps) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{roundNumber}</Text>
      <Text>Opponent's Guess : {guess}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    borderColor: Colors.primary800,
    backgroundColor: Colors.accent500,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  itemText: {
    fontFamily: "open-sans",
  },
});
