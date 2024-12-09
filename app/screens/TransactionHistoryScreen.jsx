import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, Card } from "react-native-paper";
import { UserContext } from "../contexts/UserContext";

const TransactionHistoryScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { fetchUserTransactionHistory, transactionHistoryList } =
    useContext(UserContext);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log(transactionHistoryList.transactions);
    fetchUserTransactionHistory();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserTransactionHistory();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const filteredTransactions = transactionHistoryList?.filter(item => {
    const productName = item?.product?.name?.toLowerCase() || "";
    const representativeName = item.representative
      ? (item?.representative?.name + " " + item?.representative?.surname).toLowerCase()
      : "";
    return productName.includes(searchQuery.toLowerCase()) || representativeName.includes(searchQuery.toLowerCase());
  });

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
          İşlem Geçmişi
        </Text>
      </View>
      <TextInput
        style={[styles.searchInput, {  color: colors.text }]}
        placeholder="Ürün adı veya müşteri adı soyadı ile ara..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text
            style={[
              styles.tableCell,
              { fontWeight: "bold", color: colors.text },
            ]}
          >
            Ürün Adı
          </Text>
          <Text
            style={[
              styles.tableCell,
              { fontWeight: "bold", color: colors.text },
            ]}
          >
            Müşteri
          </Text>
          <Text
            style={[
              styles.tableCell,
              { fontWeight: "bold", color: colors.text },
            ]}
          >
            Komisyon
          </Text>
          <Text
            style={[
              styles.tableCell,
              { fontWeight: "bold", color: colors.text },
            ]}
          >
            Müşteri
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {filteredTransactions && filteredTransactions.map((item, index) => (
            item.representative ? (
              <View
                key={index}
                style={[
                  styles.tableRow,
                  { backgroundColor: colors.primaryContainer, color: "#fff" },
                ]}
              >
                <Text style={[styles.tableCell, { color: colors.text }]}>
                  {item?.product?.name || "N/A"}
                </Text>
                <Text style={[styles.tableCell, { color: colors.text }]}>
                  {item.representative
                    ? item?.representative?.name +
                      " " +
                      item?.representative?.surname
                    : "Okunmadı"}
                </Text>
                <Text style={[styles.tableCell, { color: colors.text }]}>
                  {" "}
                  {item?.dealer_commission}
                </Text>
                <Text style={[styles.tableCell, { color: colors.text }]}>
                  {" "}
                  {item?.representative_commission}
                </Text>
              </View>
            ) : (
              <View key={index} style={[styles.tableRow, { color: colors.text }]}>
                <Text style={[styles.tableCell, { color: colors.text }]}>
                  {item?.product?.name || "N/A"}
                </Text>
                <Text style={[styles.tableCell, { color: colors.text }]}>
                  {item.representative
                    ? item?.representative?.name +
                      " " +
                      item?.representative?.surname
                    : "Okunmadı"}
                </Text>
                <Text style={[styles.tableCell, { color: colors.text }]}>
                  {" "}
                  {item?.dealer_commission}
                </Text>
                <Text style={[styles.tableCell, { color: colors.text }]}>
                  {" "}
                  {item?.representative_commission}
                </Text>
              </View>
            )
          ))}
        </ScrollView>
      </View>
      {transactionHistoryList?.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.text }]}>
            Henüz işlem geçmişi bulunmamaktadır.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
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
  description: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "left",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  product: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  table: {
    width: "100%",
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc", 
  },
  tableCell: {
    flex: 1,
    textAlign: "left",
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default TransactionHistoryScreen;
