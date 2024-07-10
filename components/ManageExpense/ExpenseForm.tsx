import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Button from "components/UI/Button";
import { Iexpenses } from "components/ExpensesOutput/ExpensesOutput";
import { getFormattedDate } from "util/date";
import { GlobalStyles } from "constants/style";

interface IexpenseFormProps {
  onCancel: () => void;
  onSubmit: (expenseData: {
    amount: number;
    date: Date;
    description: string;
  }) => void;
  submitButtonLabel: "Update" | "Add";
  defaultValues?: Iexpenses;
}

interface IinputValues {
  ammount: {
    value: string;
    isValid: boolean;
  };
  date: {
    value: string;
    isValid: boolean;
  };
  description: {
    value: string;
    isValid: boolean;
  };
}

type TinputKeys = keyof IinputValues;

type TinputValues = IinputValues[TinputKeys];

export default function ExpenseForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}: IexpenseFormProps) {
  const [inputs, setInputs] = useState<IinputValues>({
    ammount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangedHandler(
    inputIdentifier: TinputKeys,
    enteredValue: string
  ) {
    setInputs((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.ammount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptonIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptonIsValid) {
      // Alert.alert("Invalid input", "Please check your input values");
      setInputs((curInputs) => {
        return {
          ammount: { value: curInputs.ammount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptonIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.ammount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          invalid={!inputs.ammount.isValid}
          label="Amount"
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (text) => inputChangedHandler("ammount", text),
            value: inputs.ammount.value,
          }}
        />
        <Input
          invalid={!inputs.date.isValid}
          label="Date"
          style={styles.rowInput}
          textInputConfig={{
            onChangeText: (text) => inputChangedHandler("date", text),
            maxLength: 10,
            placeholder: "YYYY-MM-DD",
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        invalid={!inputs.description.isValid}
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          autoCapitalize: "none",
          onChangeText: (text) => inputChangedHandler("description", text),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}

      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: { flex: 1 },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
