import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import PrimaryButton from "components/ui/PrimaryButton";
import Colors from "constants/color";
import Title from "components/ui/Title";
import Card from "components/ui/Card";
import InstructionText from "components/ui/InstructionText";

interface IstartGamseScreenProps {
  onPickNumber: (pickedNumber: number) => void;
}

export default function StartGameScreen({
  onPickNumber,
}: IstartGamseScreenProps) {
  const [enteredNumber, setEnteredNumber] = useState<string>("");

  function numberInputHandler(enterdText: string) {
    setEnteredNumber(enterdText);
  }

  function resetInputHandler() {
    setEnteredNumber("");
  }

  function confirmInputHandler() {
    const choseNumber = parseInt(enteredNumber);

    if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
      Alert.alert("잘못된 숫자입니다!", "1~99 사이의 숫자를 입력해주세요", [
        {
          text: "확인",
          style: "destructive",
          onPress: resetInputHandler,
        },
      ]);
      return;
    }
    onPickNumber(choseNumber);
  }

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>

      <Card>
        <Text style={styles.instructionText}></Text>
        <InstructionText>Enter a number</InstructionText>
        <TextInput
          value={enteredNumber}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={2}
          onChangeText={numberInputHandler}
          style={styles.numberInput}
        ></TextInput>
        <View style={[styles.buttonsContainer]}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  },
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
