// CustomHeader.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper'; // useTheme import edildi

function CustomHeader({ name, commission }) {
  const { colors } = useTheme(); // Tema renkleri alındı

  return (
    <View style={[styles.headerContainer, { backgroundColor: colors.background }]}>
      <Text style={[styles.userName, { color: colors.primary }]}>{name}</Text>
      <Text style={[styles.userPoints, { color: colors.secondary }]}>{`Toplam Puan: ${commission}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userPoints: {
    fontSize: 16,
  },
});

export default CustomHeader;
