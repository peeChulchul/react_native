import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Category } from "data/dummy-data";
import { useNavigation } from "@react-navigation/native";

interface IcategoryGridTitleProps {
  title: Category["title"];
  color: Category["color"];
  onPress: () => void;
}

export default function CategoryGridTitle({
  title,
  color,
  onPress,
}: IcategoryGridTitleProps) {
  const navigation = useNavigation();

  return (
    <View style={[styles.gridItem]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: "white",
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
