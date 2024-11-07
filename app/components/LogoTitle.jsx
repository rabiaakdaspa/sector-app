import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper'; // useTheme import edildi

function LogoTitle({ name }) {
  const { colors } = useTheme(); // Tema renkleri alındı

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.primary }}>{name}</Text>
    </View>
  );
}

export default LogoTitle;
