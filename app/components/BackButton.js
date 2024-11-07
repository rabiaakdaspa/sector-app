import React, { useContext } from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useTheme } from "react-native-paper";
import { UserContext } from "../contexts/UserContext";

export default function BackButton({ goBack }) {
  const { colors } = useTheme(); // Temadan renkleri alıyoruz

  return (
    <TouchableOpacity onPress={goBack} style={[styles.container, { backgroundColor: colors.surface }]}>
      <Image
        style={[styles.image, { tintColor: colors.primary }]} // Renk temasını uyguluyoruz
        source={require("../../assets/items/back.png")}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10 + getStatusBarHeight(),
    left: 4,
    padding: 8,
    borderRadius: 20,
    shadowColor: "#000",          // Hafif bir gölge ile belirgin hale getirilir
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,                 // Android için gölge
  },
  image: {
    width: 24,
    height: 24,
  },
});
