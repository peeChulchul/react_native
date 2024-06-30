import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { CATEGORIES, MEALS, Meal } from "data/dummy-data";
import MealItem from "components/MealsList/MealItem";
import MealsList from "components/MealsList/MealsList";

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

  return <MealsList data={displayMeals} />;
}

const styles = StyleSheet.create({});
