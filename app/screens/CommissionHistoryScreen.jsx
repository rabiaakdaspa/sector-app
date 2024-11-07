import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, RefreshControl, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Card } from 'react-native-paper';
import { UserContext } from '../contexts/UserContext';

const CommissionHistoryScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const { fetchUserCommissionHistory, commissionHistoryList } = useContext(UserContext);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchUserCommissionHistory();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchUserCommissionHistory();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ color: colors.primary }}>
                    <Ionicons name="arrow-back" size={30} color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: colors.text }]}>Komisyon İşlem Geçmişi</Text>
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
               {commissionHistoryList.map((item, index) => (
    <Card key={index} style={styles.card}>
        <View style={styles.cardContent}>
            <Text style={[styles.date, { color: colors.text }]}>
                {new Date(item.tarih).toLocaleString('tr-TR', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </Text>
            <View style={styles.amountContainer}>
                <Text style={[styles.amount, { color: colors.error }]}>
                    {item.commission_amount}
                </Text>
                <Image
                    source={require('../../assets/new_gold.png')}
                    style={styles.goldIcon}
                />
            </View>
            <Text style={[styles.description, { color: colors.text }]}>
                {item.islemTitle}
            </Text>
        </View>
    </Card>
))}

                {commissionHistoryList.length === 0 && (
                    <View style={styles.emptyState}>
                        <Text style={[styles.emptyText, { color: colors.text }]}>
                            Henüz komisyon geçmişi bulunmamaktadır.
                        </Text>
                    </View>
                )}
            </ScrollView>
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
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    scrollView: {
        paddingBottom: 20,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    emptyText: {
        fontSize: 16,
    },

    card: {
        width: '98%',
        marginVertical: 10,
        borderRadius: 12,
        elevation: 3,
      //  backgroundColor: colors.card,
        padding: 15,
        marginHorizontal: 'auto'
    },
    cardContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 5,
    },
    goldIcon: {
        width: 24,
        height: 24,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'left',
    },
});

export default CommissionHistoryScreen;
