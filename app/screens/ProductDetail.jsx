import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from 'react-native-paper';
const ProductDetail = ({navigation}) => {
    const {colors} = useTheme()
    const route = useRoute();
    const { productId } = route.params;

    // Burada productId'ye göre ürün detaylarını almak için bir API çağrısı yapabilirsiniz.
    // Örnek olarak, sabit bir veri kullanıyoruz.
    const product = { id: productId, name: 'Örnek Ürün', description: 'Bu bir örnek ürün' };

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ color: colors.primary }} 
                >
                    <Ionicons name="arrow-back" style={{ padding: 0, margin: 0, display: 'flex', alignItems: 'flex-start', marginTop: 5 }} size={30} color={colors.primary} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: colors.primary }]}>{product.name}</Text>
            </View>
            <Text style={[styles.title, { color: colors.primary, marginBottom: '20' }]}>{product.name}</Text>
            <Text style={[styles.description, { color: colors.primary, marginTop: '20' }]}>{product.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 0,
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

    button: {
        flex: 1,
        marginHorizontal: 5,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-between',
    },

});

export default ProductDetail;
