import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useCameraPermissions, Camera, CameraView } from "expo-camera";
import Toast from "react-native-toast-message";
import { UserContext } from "../contexts/UserContext";
import { scanDealer } from "../api/api";
import { useNavigation } from "@react-navigation/native";
import { Card, useTheme } from "react-native-paper";
import Background from "../components/Background";
import Paragraph from "../components/Paragraph";

export default function HomeTab({ logout }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraVisible, setCameraVisible] = useState(false);
  const [camdata, setCamdata] = useState("");
  const [newCampaignCount, setNewCampaignCount] = useState(3); // Yeni eklenen kampanya sayısı

  const [messageCount, setMessageCount] = useState(2)


  const isPermissionGranted = Boolean(permission?.granted);
  const { fetchUserData, user } = useContext(UserContext);


  useEffect(() => {

  }, [user])


  const handleOpenCamera = async () => {
    if (isPermissionGranted) {
      setCameraVisible(true);
    } else {
      const { status } = await requestPermission();
      if (status === 'granted') {
        setCameraVisible(true);
      } else {
        Toast.show({
          text1: 'Kamera izni gerekli',
          type: 'error',
        });
      }
    }
  };

  const handleQRCodeScanned = ({ type, data }) => {
    console.log(`QR Kod Türü: ${type}, Veri: ${data}`);
    setCamdata(data);
    setCameraVisible(false);
  };

  const readScan = async (data) => {
    const res = await scanDealer(data);
    if (res.status === false) {
      Toast.show({
        text2: 'Okuma işlemi basarisiz',
        text1: `${res.message}`,
        type: 'error',
      });
    }

    if (res.status === true) {
      Toast.show({
        text2: 'Okuma işlemi başarılı',
        text1: `${res.message}`,
        type: 'success',
      });
    }  

    fetchUserData();
  };

  return (
    <Background style={[styles.container, { backgroundColor: colors.background }]}>
         {cameraVisible ? (
        <CameraView
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
          style={styles.camera}
          onBarcodeScanned= { ({ data }) => {
            readScan(data)
          //  showToast()
            setCameraVisible(false); // Kamera QR kod okunduktan sonra kapanacak
          }}
          ratio="16:9"
        >
          <View style={styles.cameraContainer}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setCameraVisible(false)}
            >
              <Text style={styles.closeButtonText}>Kapat </Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View style={[styles.homeContainer, { backgroundColor: colors.background }]}>
          <View style={styles.buttonContainer}>
            <Card style={styles.card}>
              <TouchableOpacity onPress={handleOpenCamera} style={styles.touchable}>
                <Ionicons name="qr-code-outline" size={28} color={colors.primary} />
                <Paragraph style={styles.paragraph}>QR Tarayıcı</Paragraph>
              </TouchableOpacity>
            </Card>

            <Card style={styles.card}>
              <TouchableOpacity onPress={() => navigation.navigate('ProductsScreen')} style={styles.touchable}>
                <Ionicons name="pricetag-outline" size={28} color={colors.primary} />
                <Paragraph style={styles.paragraph}>Ürünler</Paragraph>
              </TouchableOpacity>
            </Card>

            <Card style={styles.card}>
              <TouchableOpacity onPress={() => navigation.navigate('CommissionHistory')} style={styles.touchable}>
                <Ionicons name="receipt-outline" size={28} color={colors.primary} />
                <Paragraph style={styles.paragraph}>QR Geçmişi</Paragraph>
              </TouchableOpacity>
            </Card>

            <Card style={styles.card}>
              <TouchableOpacity onPress={() => navigation.navigate('PaymentScreen')} style={styles.touchable}>
                <Ionicons name="card-outline" size={28} color={colors.primary} />
                <Paragraph style={styles.paragraph}>Ödeme Al</Paragraph>
              </TouchableOpacity>
            </Card>

            <Card style={styles.card}>
              <TouchableOpacity onPress={() => navigation.navigate('CommissionHistory')} style={styles.touchable}>
                <Ionicons name="newspaper-outline" size={28} color={colors.primary} />
                <Paragraph style={styles.paragraph}>Ödeme Geçmişi</Paragraph>
              </TouchableOpacity>
            </Card>

            <Card style={styles.card}>
              <TouchableOpacity onPress={() => navigation.navigate('CampaignsScreen')} style={styles.touchable}>
                <Ionicons name="megaphone-outline" size={28} color={newCampaignCount > 0 ? colors.error : colors.primary} />
                <Paragraph style={styles.paragraph}>Kampanyalar</Paragraph>
                {newCampaignCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{newCampaignCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </Card>


            <Card style={styles.card}>
              <TouchableOpacity onPress={() => navigation.navigate('CampaignsScreen')} style={styles.touchable}>
              {messageCount > 0 
              ? ( <Ionicons name="mail-unread-outline" size={28} color={colors.error} />) 
              : ( <Ionicons name="mail-outline" size={28} color={colors.primary} />)   }
                <Paragraph style={styles.paragraph}>Destek Talepleri</Paragraph>
                {messageCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{messageCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </Card>

          </View>
        </View>
      )}
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  homeContainer: {
    width: "95%",
    height: "80%",
    display: "flex",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '100%',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    margin: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'black',
  },
  frame: {
    position: 'absolute',
    top: '30%',
    left: '15%',
    width: '70%',
    height: '40%',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    zIndex: 1,
  },
  card: {
    width: 100,
    height: 100,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  paragraph: {
    marginTop: 8,
    fontSize: 12,
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
});
