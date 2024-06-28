import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { CATEGORIES, MEALS, Meal } from "data/dummy-data";
import MealItem from "components/MealItem";

interface ImealsOverviewScreenProps
  extends NativeStackScreenProps<RootStackParamList, "MealsOverview"> {}

export default function MealsOverviewScreens({
  route,
  navigation,
}: ImealsOverviewScreenProps) {
  const catId = route.params.categoryId;

  const displayMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);

  const categoryTitle = CATEGORIES.find(
    (category) => category.id === catId
  )?.title;

  function renderMealItem({ item }: { item: Meal }) {
    return <MealItem meal={item} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
      <Text>Meals Overview Screens - {catId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
