import { FlatList, StyleSheet, Text, View } from "react-native";
import { CATEGORIES, Category } from "data/dummy-data";
import React from "react";
import CategoryGridTitle from "components/CategoryGridTitle";
import { RootStackParamList } from "App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface IcategoriesScreen {
  navigation: NativeStackNavigationProp<RootStackParamList, "MealsCategories">;
}

export default function CategoriesScreen({ navigation }: IcategoriesScreen) {
  function renderCategoryItem({
    item: { title, color, id },
  }: {
    item: Category;
  }) {
    const pressHandler = () => {
      navigation.navigate("MealsOverview", { categoryId: id });
    };

    return (
      <CategoryGridTitle color={color} title={title} onPress={pressHandler} />
    );
  }

  return (
    <View>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({});
