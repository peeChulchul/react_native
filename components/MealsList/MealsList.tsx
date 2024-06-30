import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Meal } from "data/dummy-data";
import MealItem from "./MealItem";

interface ImealsList {
  data: Meal[];
}

export default function MealsList({ data }: ImealsList) {
  function renderMealItem({ item }: { item: Meal }) {
    return <MealItem meal={item} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
