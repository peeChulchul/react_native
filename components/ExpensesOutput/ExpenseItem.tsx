import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "constants/style";
import { Iexpenses } from "./ExpensesOutput";
import { getFormattedDate } from "util/date";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "App";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface IexpenseItemProps extends Iexpenses {}

export default function ExpenseItem({
  amount,
  date,
  description,
  id,
}: IexpenseItemProps) {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  function expensePressHandler() {
    navigate("ManageExpense", {
      expenseId: id,
    });
  }

  return (
    <Pressable
      style={({ pressed }) => pressed && [styles.pressed]}
      onPress={expensePressHandler}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
