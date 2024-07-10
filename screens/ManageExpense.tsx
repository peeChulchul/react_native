import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import IconButton from "components/UI/IconButton";
import { GlobalStyles } from "constants/style";
import { ExpensesContext } from "store/expenses-context";
import ExpenseForm from "components/ManageExpense/ExpenseForm";

interface ImanageExpenseProps
  extends NativeStackScreenProps<RootStackParamList, "ManageExpense"> {}

export default function ManageExpense({
  navigation,
  route,
}: ImanageExpenseProps) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const { deleteExpense, updateExpense, addExpense, expenses } =
    useContext(ExpensesContext);

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  function deleteExpenseHandler() {
    deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData: {
    amount: number;
    date: Date;
    description: string;
  }) {
    if (isEditing) {
      updateExpense(editedExpenseId, expenseData);
    } else {
      addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        defaultValues={selectedExpense}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
