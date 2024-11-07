import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper"; // useTheme import edildi

export default function Header(props) {
  const { colors } = useTheme(); // Tema renkleri alındı


  return <Text style={[styles.header, { color: colors.text }]} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    fontWeight: "bold",
    paddingVertical: 12,
  },
});
