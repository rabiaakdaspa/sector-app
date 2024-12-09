import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
const CampaignsScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  const campaigns = [
    {
      id: 1,
      title: "Büyük Gübre Kampanyası!",
      image:
        "https://www.sectortarim.com.tr/storage/sliders/August2024/plk7H859Ogjps4xhPw0H.jpg",
      description:
        "Sektör Tarım'dan çiftçilere özel fırsat! Tüm gübre çeşitlerinde %20'ye varan indirim fırsatını kaçırmayın. Tarımınızda verimliliği artırın, ürünlerinizi daha güçlü hale getirin. Kampanya 31 Ağustos 2024'e kadar geçerlidir.",
    },
    {
      id: 2,
      title: "Bitki Koruma Ürünlerinde Büyük İndirim!",
      image:
        "https://www.sectortarim.com.tr/storage/sliders/September2024/koXPx3CG1wmFDvtSaZ8i.webp",
      description:
        "Hastalık ve zararlılara karşı etkili çözümler Sektör Tarım’da! Bitki koruma ürünlerinde %25’e varan indirim fırsatı sizi bekliyor. Sağlıklı ürünler için hemen harekete geçin. Kampanya stoklarla sınırlıdır!",
    },
    {
      id: 3,
      title: "Bitki Besleme Ürünlerinde Avantaj Paketi!",
      image:
        "https://www.sectortarim.com.tr/storage/sliders/August2024/plk7H859Ogjps4xhPw0H.jpg",
      description:
        "Bitkilerinize hak ettiği besin desteğini sağlayın! Bitki besleme ürünlerinde 3 al 2 öde kampanyamız başladı. Daha verimli bir hasat için şimdi sipariş verin. Kampanya 15 Eylül 2024’e kadar geçerlidir.",
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ color: colors.primary }}
        >
          <Ionicons name="arrow-back" size={30} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>
          Kampanyalar
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {campaigns.map((campaign) => (
          <View
            key={campaign.id}
            style={[
              styles.cardContainer,
              { backgroundColor: colors.background },
            ]}
          >
            <Image source={{ uri: campaign.image }} style={styles.image} />
            <Text style={[styles.title, { color: colors.text }]}>{campaign.title}</Text>
            <Text style={[styles.description, { color: colors.text }]}>{campaign.description}</Text>
          </View>
        ))}

        {campaigns?.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.text }]}>
              Kampanya bulunmamaktadır.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

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
    textAlign: "center",  
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
    textAlign: "center",
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
});

export default CampaignsScreen;
