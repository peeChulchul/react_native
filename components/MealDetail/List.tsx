import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface IlistProps {
  data: string[];
}

export default function List({ data }: IlistProps) {
  return data.map((data) => (
    <View style={styles.listItem} key={data}>
      <Text style={styles.innerText}>{data}</Text>
    </View>
  ));
}

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 8,
    marginHorizontal: 12,
    backgroundColor: "#e2b497",
  },
  innerText: {
    color: "#351401",
    textAlign: "center",
  },
});
