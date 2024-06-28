import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { MEALS } from "data/dummy-data";
import MealDetails from "components/MealDetails";
import Subtitle from "components/MealDetail/Subtitle";
import List from "components/MealDetail/List";
import IconButton from "components/MealDetail/IconButton";

interface ImealDetailScreen
  extends NativeStackScreenProps<RootStackParamList, "MealDetail"> {}

export default function MealDetailScreen({
  route,
  navigation,
}: ImealDetailScreen) {
  const mealId = route.params.mealId;
  const {
    title,
    imageUrl,
    duration,
    affordability,
    complexity,
    ingredients,
    steps,
  } = MEALS.find((meal) => meal.id === mealId)!;

  function headerButtonPressHandeler() {
    console.log("Pressed");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            color="white"
            icon="star"
            onPress={headerButtonPressHandeler}
          />
        );
      },
    });
  }, [navigation, headerButtonPressHandeler]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <Text style={styles.title}>
        This is the Meal Detail Screen ({mealId})
      </Text>
      <MealDetails
        duration={duration}
        affordability={affordability}
        complexity={complexity}
        textStyle={styles.detailText}
      />
      <View style={styles.listContainer}>
        <Subtitle>Ingredients</Subtitle>
        <List data={ingredients} />

        <Subtitle>Step</Subtitle>
        <List data={steps} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },

  subtitleContainer: {
    padding: 6,
    marginHorizontal: 24,
    marginVertical: 4,
    borderBottomColor: "#e2b497",
    borderBottomWidth: 2,
  },
  listContainer: {
    width: "80%",
    marginHorizontal: "auto",
  },
});
