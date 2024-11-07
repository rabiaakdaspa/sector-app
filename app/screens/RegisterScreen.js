import React, { useContext, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import { UserContext } from "../contexts/UserContext";
import { register } from "../api/api";

export default function RegisterScreen({ navigation }) {
  const { colors } = useTheme();
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const { loading, setLoading } = useContext(UserContext);

  const handleRegister = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    
    if (nameError || emailError || passwordError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    
    try {
      setLoading(true);
      await register(name.value, email.value, password.value);
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    } catch (error) {
      console.error('Kayıt hatası:', error);
      setEmail({ ...email, error: "Kayıt başarısız. Lütfen bilgilerinizi kontrol edin." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background style={styles.container}>
      <Logo />
      <Header style={[styles.header, { color: colors.primary }]}>Kayıt Olun</Header>
      <TextInput
        label="İsim"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="E-posta"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Şifre"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleRegister} textColor={ colors.text } style={styles.button}>
        Kayıt Ol
      </Button>
      <View style={styles.row}>
        <Text style={{ color: colors.text }}>Hesabınız var mı?</Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={[styles.link, {color: colors.text}]}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator animating={true} color={theme.colors.primary} />}
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  header: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
  },
});
