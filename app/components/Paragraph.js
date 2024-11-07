import React from "react";
import { StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function Paragraph({ children, style }) {
  const { colors } = useTheme();

  return (
    <Text style={[styles.text, { color: colors.primary }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: 12,
  },
});
