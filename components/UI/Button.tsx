import {
  Pressable,
  StyleProp,
  StyleSheet,
  StyleSheetProperties,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { GlobalStyles } from "constants/style";

interface IbuttonProps {
  children: React.ReactNode;
  onPress: () => void;
  mode?: "flat";
  style?: StyleProp<ViewStyle>;
}

export default function Button({
  children,
  onPress,
  mode,
  style,
}: IbuttonProps) {
  return (
    <View style={style}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={onPress}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: GlobalStyles.colors.primary50,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});
