import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import MealsList from "components/MealsList/MealsList";
import { FavoritesContext } from "store/context/favorites-context";
import { MEALS } from "data/dummy-data";
import { useSelector } from "react-redux";
import { RootState } from "store/redux/store";

export default function FavoriteScreen() {
  // const { ids, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const { ids } = useSelector((state: RootState) => state.favorites);

  const favoriteMeals = MEALS.filter((meal) => ids.includes(meal.id));

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meals yet.</Text>
      </View>
    );
  }

  return <MealsList data={favoriteMeals} />;
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
