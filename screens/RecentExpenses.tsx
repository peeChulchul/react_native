import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput, {
  Iexpenses,
} from "components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "store/expenses-context";
import { getDateMinusDays } from "util/date";
import { fetchExpenses } from "util/http";
import LoadingOverlay from "components/UI/LoadingOverlay";
import ErrorOverlay from "components/UI/ErrorOverlay";

export default function RecentExpenses() {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { expenses, setExpense } = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        setExpense(expenses);
      } catch (error) {
        setError("could not fetch expenses!");
      }
      setIsFetching(false);
    }

    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    const expenseDate = new Date(expense.date);

    return expenseDate >= date7DaysAgo && expenseDate <= today;
  });

  return (
    <ExpensesOutput
      fallbackText="No expenses registered for the last 7 days."
      expenses={recentExpenses}
      expensesPeriod={"Last 7 Days"}
    />
  );
}

const styles = StyleSheet.create({});
