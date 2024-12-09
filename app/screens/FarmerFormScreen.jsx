import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, TextInput } from "react-native";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { ProgressBar } from "react-native-paper";
const FarmerFormScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    tcNumber: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    district: "",
    neighborhood: "",
    membershipNumber: "",
    landOwnershipStatus: "",
    landName: "",
    landSize: "",
    landType: "",
    landProvince: "",
    landDistrict: "",
    landNeighborhood: "",
    animalType: "",
    animalCount: "",
    farmingAreaSize: "",
    registrationDate: "",
    certificateNumber: "",
    insuranceStatus: "",
    confirmation: false,
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    const totalSteps = 6;
    const progress = step / totalSteps;

    switch (step) {
      case 1:
        return (
          <View>
            <ProgressBar
              progress={progress}
              color="#6200ee"
              style={{ marginBottom: 20 }}
            />
            <TextInput
              placeholder="Adı"
              value={formData.name}
              onChangeText={(value) => handleInputChange("name", value)}
              style={styles.input}
            />
            <TextInput
              placeholder="Soyadı"
              value={formData.surname}
              onChangeText={(value) => handleInputChange("surname", value)}
              style={styles.input}
            />
            <TextInput
              placeholder="TC Kimlik Numarası"
              value={formData.tcNumber}
              onChangeText={(value) => handleInputChange("tcNumber", value)}
              keyboardType="numeric"
              maxLength={11}
              style={styles.input}
            />
            <TextInput
              placeholder="Telefon Numarası"
              value={formData.phoneNumber}
              onChangeText={(value) => handleInputChange("phoneNumber", value)}
              keyboardType="phone-pad"
              style={styles.input}
            />
            <TextInput
              placeholder="E-posta Adresi (isteğe bağlı)"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              keyboardType="email-address"
              style={styles.input}
            />
            <TextInput
              placeholder="Adres Bilgileri"
              value={formData.address}
              onChangeText={(value) => handleInputChange("address", value)}
              multiline
              style={styles.input}
            />
            <TextInput
              placeholder="İl"
              value={formData.city}
              onChangeText={(value) => handleInputChange("city", value)}
              style={styles.input}
            />
            <TextInput
              placeholder="İlçe"
              value={formData.district}
              onChangeText={(value) => handleInputChange("district", value)}
              style={styles.input}
            />
            <TextInput
              placeholder="Mahalle/Köy"
              value={formData.neighborhood}
              onChangeText={(value) => handleInputChange("neighborhood", value)}
              style={styles.input}
            />
            <TextInput
              placeholder="Ziraat Odası Üyelik Numarası"
              value={formData.membershipNumber}
              onChangeText={(value) =>
                handleInputChange("membershipNumber", value)
              }
              style={styles.input}
            />
          </View>
        );
      case 2:
        return (
          <View>
            <ProgressBar
              progress={progress}
              color="#6200ee"
              style={{ marginBottom: 20 }}
            />
            <Text style={[styles.headerText, { color: colors.text }]}>
              {" "}
              Arazi Sahiplik Durumu{" "}
            </Text>
            <RNPickerSelect
              onValueChange={(itemValue) =>
                handleInputChange("landOwnershipStatus", itemValue)
              }
              placeholder={{ label: "Seçin", value: null }}
              items={[
                { label: "Kendi mülkü", value: "own" },
                { label: "Kiralık", value: "rented" },
                { label: "Hisseli", value: "shared" },
              ]}
              style={{
                inputIOS: styles.input, // iOS için stil
                inputAndroid: styles.input, // Android için stil
              }}
            />
            <TextInput
              placeholder="Arazi Adı veya Tapu Bilgisi"
              value={formData.landName}
              onChangeText={(value) => handleInputChange("landName", value)}
              style={styles.input}
            />
            <TextInput
              placeholder="Arazi Büyüklüğü (dekar)"
              value={formData.landSize}
              onChangeText={(value) => handleInputChange("landSize", value)}
              keyboardType="numeric"
              style={styles.input}
            />
            <Text> Arazi Türü </Text>
            <RNPickerSelect
              onValueChange={(itemValue) =>
                handleInputChange("landType", itemValue)
              }
              placeholder={{ label: "Seçin", value: null }}
              items={[
                { label: "Tarla", value: "field" },
                { label: "Bağ", value: "vineyard" },
                { label: "Bahçe", value: "garden" },
                { label: "Sera", value: "greenhouse" },
              ]}
              style={{
                inputIOS: styles.input, // iOS için stil
                inputAndroid: styles.input, // Android için stil
              }}
            />
            <Text> Arazi Konumu </Text>
            <TextInput
              placeholder="İl"
              value={formData.landProvince}
              onChangeText={(value) => handleInputChange("landProvince", value)}
              style={styles.input}
            />
            <TextInput
              placeholder="İlçe"
              value={formData.landDistrict}
              onChangeText={(value) => handleInputChange("landDistrict", value)}
              style={styles.input}
            />
            <TextInput
              placeholder="Mahalle/Köy"
              value={formData.landNeighborhood}
              onChangeText={(value) =>
                handleInputChange("landNeighborhood", value)
              }
              style={styles.input}
            />
          </View>
        );
      case 3:
        return (
          <View>
            <ProgressBar
              progress={progress}
              color="#6200ee"
              style={{ marginBottom: 20 }}
            />

            <Text style={[styles.headerText, { color: colors.text }]}>
              {" "}
              Hayvancılık Bilgileri (Opsiyonel){" "}
            </Text>
            <Text> Hayvan Türü </Text>
            <RNPickerSelect
              onValueChange={(itemValue) =>
                handleInputChange("animalType", itemValue)
              }
              placeholder={{ label: "Seçin", value: null }}
              items={[
                { label: "Büyükbaş", value: "large" },
                { label: "Küçükbaş", value: "small" },
                { label: "Kümes Hayvanı", value: "poultry" },
                { label: "Arı", value: "bee" },
              ]}
              style={styles.input}
            />
            <TextInput
              placeholder="Hayvan Sayısı"
              value={formData.animalCount}
              onChangeText={(value) => handleInputChange("animalCount", value)}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              placeholder="Yetiştiricilik Yapılan Alanın Büyüklüğü (m²)"
              value={formData.farmingAreaSize}
              onChangeText={(value) =>
                handleInputChange("farmingAreaSize", value)
              }
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
        );
      case 4:
        return (
          <View>
            <ProgressBar
              progress={progress}
              color="#6200ee"
              style={{ marginBottom: 20 }}
            />

            <Text style={[styles.headerText, { color: colors.text }]}>
              {" "}
              Ziraat Odası ve ÇKS Bilgileri{" "}
            </Text>
            <TextInput
              placeholder="Ziraat Odası Kayıt Tarihi"
              value={formData.registrationDate}
              onChangeText={(value) =>
                handleInputChange("registrationDate", value)
              }
              style={styles.input}
            />
            <TextInput
              placeholder="ÇKS Kayıt Numarası"
              value={formData.certificateNumber}
              onChangeText={(value) =>
                handleInputChange("certificateNumber", value)
              }
              style={styles.input}
            />
            <Text> TARSİM Sigorta Durumu </Text>
            <RNPickerSelect
              onValueChange={(itemValue) =>
                handleInputChange("insuranceStatus", itemValue)
              }
              items={[
                { label: "Sigortalı", value: "insured" },
                { label: "Sigortasız", value: "uninsured" },
              ]}
              placeholder={{ label: "Seçin", value: null }}
              style={{
                inputIOS: styles.input, // iOS için stil
                inputAndroid: styles.input, // Android için stil
              }}
            />
          </View>
        );
      case 5:
        return (
          <View>
            <ProgressBar
              progress={progress}
              color="#6200ee"
              style={{ marginBottom: 20 }}
            />
            <Text style={[styles.headerText, { color: colors.text }]}>
              {" "}
              Destekleme Türü{" "}
            </Text>
            <RNPickerSelect
              onValueChange={(itemValue) =>
                handleInputChange("supportType", itemValue)
              }
              placeholder={{ label: "Seçin", value: null }}
              items={[
                { label: "Mazot Desteği", value: "fuel" },
                { label: "Gübre Desteği", value: "fertilizer" },
                { label: "Organik Tarım Desteği", value: "organic" },
                { label: "Sertifikalı Tohum Desteği", value: "certifiedSeed" },
              ]}
              style={{
                inputIOS: styles.input, // iOS için stil
                inputAndroid: styles.input, // Android için stil
                borderWidth: 1,
                borderColor: "gray",
              }}
            />
            <TextInput
              placeholder="Destekleme Başvuru Tarihi"
              value={formData.supportApplicationDate}
              onChangeText={(value) =>
                handleInputChange("supportApplicationDate", value)
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Destekleme Miktarı (₺)"
              value={formData.supportAmount}
              onChangeText={(value) =>
                handleInputChange("supportAmount", value)
              }
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
        );
      case 6:
        return (
          <View style={{ paddingBottom: 40 }}>
            <ProgressBar
              progress={progress}
              color="#6200ee"
              style={{ marginBottom: 20 }}
            />

            <Text style={[styles.headerText, { color: colors.text }]}>
              {" "}
              Kaydet{" "}
            </Text>
            <TouchableOpacity
              onPress={() =>
                handleInputChange("confirmation", !formData.confirmation)
              }
            >
              <Text style={{ color: formData.confirmation ? "green" : "red" }}>
                {formData.confirmation
                  ? "✔️ Girdiğim bilgilerin doğru olduğunu beyan ediyorum."
                  : "❌ Girdiğim bilgilerin doğru olduğunu beyan ediyorum."}
              </Text>
            </TouchableOpacity>

          </View>
        );
      // Diğer adımlar buraya eklenebilir
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ color: colors.primary }}
        >
          <Ionicons name="arrow-back" size={30} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>ÇKS Verileri</Text>
      </View>
      {renderStep()}
      <View style={{ flexDirection: "row", justifyContent: step === 1 ? "flex-end" : "space-between" }}>
        {   step !== 1 && (
          <TouchableOpacity onPress={prevStep} style={styles.button}>
            <Ionicons name="arrow-back" size={20} color="white" />
            <Text style={styles.buttonText}>Önceki Adım</Text>
        </TouchableOpacity> 
        )}
        {step !== 6 ? (
          <TouchableOpacity onPress={nextStep} style={styles.button}>
            <Text style={styles.buttonText}>Sonraki Adım</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Kaydet</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FarmerFormScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  cardContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  scrollView: {
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  emptyText: {
    fontSize: 16,
  },

  card: {
    width: "98%",
    marginVertical: 10,
    borderRadius: 12,
    elevation: 3,
    //  backgroundColor: colors.card,
    padding: 15,
    marginHorizontal: "auto",
  },
  cardContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 5,
  },
  goldIcon: {
    width: 24,
    height: 24,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    marginLeft: 5,
  },
});
