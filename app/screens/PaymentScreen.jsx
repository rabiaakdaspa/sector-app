import React, { useContext, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import Background from "../components/Background";
import { useTheme } from 'react-native-paper';
import { UserContext } from "../contexts/UserContext";
import { getUserData, login, postPayment } from "../api/api";
export default function PaymentScreen() {
  const navigation = useNavigation();
  const [amount, setAmount] = useState("");
  const { colors } = useTheme();

  const { token, loading, user, fetchUserData } = useContext(UserContext); // Access token and loading state


  const handlePayment = async () => {
    console.log(user.total_commission)
    console.log(amount)
    console.log(user.total_commission < amount)
    console.log("deneme")
    console.log(680 < 80)
    const paymentAmount = parseFloat(amount);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      Toast.show({
        text1: "Geçersiz Tutar",
        text2: "Lütfen geçerli bir ödeme tutarı giriniz.",
        type: "error",
      });
    } else if(user.total_commission < amount) {
      console.log("first")
        Toast.show({
            text1: "Yetersiz bakiye",
            text2: "Komisyon bakiyeniz ödeme tutarını karşılamıyor.",
            type: "error",
          });
    }
    
    
    else {

    const res = await postPayment(amount);
    await fetchUserData()

      Toast.show({
        text1: "Ödeme Başarılı",
        text2: `${res.message} Ödeme tutarı: ${paymentAmount}`,
        type: "success",
      });
      setAmount(""); // İşlem sonrası input'u temizleyin
      navigation.navigate("HomeScreen"); // Ana sayfaya yönlendirme
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { color: colors.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ color: colors.primary }}>
          <Ionicons name="arrow-back" size={30} color={ colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.primary}]}>Komisyon İşlem Geçmişi</Text>
      </View>
      <View style={styles.paymentContainer}>
        <Text style={styles.title2}>Ödeme Ekranı</Text>
        <TextInput
          style={styles.input}
          placeholder="Ödeme Tutarı"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>Ödeme Al</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    marginBottom: 20, // Header ve içerik arasında boşluk bırakmak için
  },
  paymentContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginLeft: 10, // Başlık ve geri ok simgesi arasında boşluk bırakmak için
    color: "black",
  },
  title2: {
    fontSize: 18,
    color: "black",
    marginBottom: 10
  },

  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
