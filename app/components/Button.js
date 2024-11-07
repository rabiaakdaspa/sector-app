import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton, useTheme } from "react-native-paper"; // useTheme import edildi

export default function Button({ mode, style, ...props }) {
  const { colors } = useTheme(); // Tema renkleri alındı

  return (
    <PaperButton
      textColor={colors.text}
      style={[
        styles.button,
        mode === "outlined" && { backgroundColor: colors.surface, color: colors.secondary }, // Tema yüzey rengi ile güncellendi
        style,
      ]}
      labelStyle={[styles.text, { color: colors.text }]} // Yazı rengi tema rengine göre ayarlandı
      mode={mode}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
});
