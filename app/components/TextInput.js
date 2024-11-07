import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input, useTheme } from "react-native-paper";


export default function TextInput({ errorText, description, ...props }) {
  
  const { colors } = useTheme(); // Tema renkleri alındı
  return (
    <View style={styles.container}>
      <Input
        style={[styles.input, {backgroundColor: colors.primaryContainer}]}
        selectionColor={colors.primary}
        underlineColor="transparent"
        mode="flat"
        {...props}
      />
      {description && !errorText ? (
        <Text style={[styles.description, {color: colors.primary}]}>{description}</Text>
      ) : null}
      {errorText ? <Text style={[styles.error, {color: colors.error}]}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    //backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: 13,
//    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
   // color: theme.colors.error,
    paddingTop: 8,
  },
});
