import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import IconButton from "components/UI/IconButton";
import { GlobalStyles } from "constants/style";
import { ExpensesContext } from "store/expenses-context";
import ExpenseForm from "components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "util/http";
import LoadingOverlay from "components/UI/LoadingOverlay";
import ErrorOverlay from "components/UI/ErrorOverlay";

interface ImanageExpenseProps
  extends NativeStackScreenProps<RootStackParamList, "ManageExpense"> {}

export default function ManageExpense({
  navigation,
  route,
}: ImanageExpenseProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const {
    deleteExpense: deleteContextExpense,
    updateExpense: updateContextExpense,
    addExpense,
    expenses,
  } = useContext(ExpensesContext);

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);

    try {
      await deleteExpense(editedExpenseId!);
      deleteContextExpense(editedExpenseId!);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - please try again later");
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData: {
    amount: number;
    date: Date;
    description: string;
  }) {
    setIsSubmitting(true);

    try {
      if (isEditing) {
        updateContextExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        addExpense({ ...expenseData, id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later!");
      setIsSubmitting(false);
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
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
