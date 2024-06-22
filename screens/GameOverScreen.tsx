import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Title from "components/ui/Title";
import Colors from "constants/color";
import PrimaryButton from "components/ui/PrimaryButton";

interface IgameOverScreenProps {
  roundsNumber: number;
  userNumber: number;
  onStartNewGame: () => void;
}

export default function GameOverScreen({
  onStartNewGame,
  roundsNumber,
  userNumber,
}: IgameOverScreenProps) {
  return (
    <View style={styles.rootContainer}>
      <Title>Game Over</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("assets/images/success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        Your Phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
        rounds to Guess the number{" "}
        <Text style={styles.highlight}>{userNumber}</Text>.
      </Text>
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    overflow: "hidden",
    borderRadius: 150,
    width: 300,
    height: 300,
    borderWidth: 3,
    borderColor: Colors.primary800,
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },

  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
