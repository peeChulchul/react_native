import { FlatList, StyleSheet, Text, View, FlatListProps } from "react-native";
import React from "react";
import { Iexpenses } from "./ExpensesOutput";
import ExpenseItem from "./ExpenseItem";

interface IexpensesListProps {
  expenses: Iexpenses[];
}

function renderExpenseItem({ item }: { item: Iexpenses }) {
  return <ExpenseItem {...item} />;
}

export default function ExpensesList({ expenses }: IexpensesListProps) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({});
