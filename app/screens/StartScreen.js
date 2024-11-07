import React, { useContext, useEffect } from "react";
import { StyleSheet, Text } from "react-native";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { ActivityIndicator } from "react-native-paper";
import { UserContext } from "../contexts/UserContext";
import { theme } from "../core/theme";

export default function StartScreen({ navigation }) {
  const { token, loading, user, fetchUserData } = useContext(UserContext); // Access token and loading state

/*  useEffect(() => {
    fetchUserData()
    if (!token || !user) { // Check if loading is complete
      navigation.navigate("LoginScreen");
    }

    if (!token || !user) { // Check if loading is complete
      navigation.navigate("HomeScreen");
    }
  }, [loading, token, user]); */


 /* if(loading) {
    return (
      <Background>

      <ActivityIndicator size="large" color="#0000ff" />
      </Background>
    )
  } */

  return (
    <Background style={styles.container}>
      <Logo />
      <Header style={styles.header}>SectoPara'ya Hoş Geldiniz</Header>
      <Paragraph style={styles.paragraph}>
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
      >
        Giriş Yap
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
        style={styles.button}
      >
        Hesap Oluştur
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
});
