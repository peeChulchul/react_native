import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { Meal } from "data/dummy-data";

interface ImealDetails {
  duration: Meal["duration"];
  complexity: Meal["complexity"];
  affordability: Meal["affordability"];
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function MealDetails({
  duration,
  complexity,
  affordability,
  viewStyle,
  textStyle,
}: ImealDetails) {
  return (
    <View style={[styles.details, viewStyle]}>
      <Text style={[styles.datailItem, textStyle]}>{duration}m</Text>
      <Text style={[styles.datailItem, textStyle]}>
        {complexity.toUpperCase()}
      </Text>
      <Text style={[styles.datailItem, textStyle]}>
        {affordability.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    gap: 4,
  },
  datailItem: {
    fontSize: 12,
  },
});
