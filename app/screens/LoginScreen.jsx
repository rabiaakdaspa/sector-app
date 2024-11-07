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
import { UserContext } from "../contexts/UserContext";
import { login } from "../api/api";
import Toast from "react-native-toast-message";


export default function LoginScreen({ navigation }) {
  const { colors } = useTheme();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const { loading, saveToken, clearToken, setLoading } = useContext(UserContext);

  const handleLogin = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    
    try {
      setLoading(true);
      const res = await login(email.value, password.value);
  
      if (!res.status) {
        // Başarısız giriş durumunda hata mesajını göster
        Toast.show({
          text2: res.messageTitle,
          text1: res.message,
          type: 'error',
        });
        return;
      }
  
      saveToken(res.data);
      Toast.show({
        text2: res.messageTitle,
        text1: res.message,
        type: 'success',
      });
  
      navigation.reset({
        index: 0,
        routes: [{ name: "LoadingScreen" }],
      }); 
    } catch (error) {
      setEmail({ ...email, error: "Giriş başarısız. Lütfen bilgilerinizi kontrol edin." });
      setPassword({ ...password, error: "" });
      Toast.show({
        text2: "Hata",
        text1: error.message || "Bilinmeyen bir hata oluştu.",
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Background style={styles.container}>
      <Logo />
      <Header style={[styles.header, { color: colors.text }]}>Giriş Yapın.</Header>
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => navigation.navigate("ResetPasswordScreen")}>
          <Text style={[styles.forgot, {color: colors.primary}]}>Şifrenizi mi unuttunuz?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={handleLogin} textColor={ colors.primary } style={[styles.button, {backgroundColor: colors.primaryContainer }] }>
        Giriş Yap
      </Button>

      <View style={[styles.row]}>
        <TouchableOpacity style={{ display:'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center', justifyContent: 'center'}} onPress={() => navigation.replace("RegisterScreen")}>
        <Text style={{ color: colors.primary }}>Hesabınız yok mu?</Text>
          <Text style={[styles.link, {color: colors.primary}]}>Kayıt Ol</Text>
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
  },
  header: {
    marginBottom: 10,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 10,
  },
});