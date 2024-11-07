import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
const products = [
    { id: '1', name: 'Regent', imageUrl: 'https://www.sectortarim.com.tr/storage/products/August2024/RZxOVBMmLU5vL8rbw9dn.png', category: {id: 1, name:'Bitki Koruma'} },
    { id: '2', name: 'Humisec', imageUrl: 'https://www.sectortarim.com.tr/storage/products/August2024/sOnwgO7BoGkQt8Ll8M7k.png', category: {id: 2, name:'Bitki Besleme'} },
    { id: '3', name: 'Megasus', imageUrl: 'https://www.sectortarim.com.tr/storage/products/August2024/279lVHyFTKwDjSC3ZF0w.png', category: {id: 3, name:'İthal Ürünler'} },
];


const ProductsScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? product.category.id === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    const handleCategoryFilter = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { color: colors.primary }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ color: colors.primary }}>
                    <Ionicons name="arrow-back" style={{ padding: 0, margin: 0, display: 'flex', alignItems: 'flex-start', marginTop: 5 }} size={30} color={colors.primary} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: colors.primary }]}>Ürünler</Text>
            </View>
            <TextInput
                style={[styles.searchInput, { borderColor: colors.secondary, color: colors.primary }]}
                placeholder="Ürün ara..."
                placeholderTextColor={colors.secondary}
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            <View style={styles.buttonContainer}>
                <Button style={styles.button} mode="contained" onPress={() => handleCategoryFilter(1)}>Bitki Koruma</Button>
                <Button style={styles.button} mode="contained" onPress={() => handleCategoryFilter(2)}>Bitki Besleme</Button>
                <Button style={styles.button} mode="contained" onPress={() => handleCategoryFilter(3)}>İthal Ürünler</Button>
                <Button style={styles.button} mode="contained" onPress={() => handleCategoryFilter(null)}>Tüm Ürünler</Button>
            </View>
            <FlatList
                data={filteredProducts}
                keyExtractor={item => item.id.toString()} // id'nin bir string olması gerekiyor
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
                        <View style={[styles.item]}>
                            <Image
                                source={{ uri: item.imageUrl }} // Ürün resminin URL'si
                                style={styles.image}
                                resizeMode="cover" // Resmi kaplama modunda ayarla
                            />
                            <Text style={{ color: colors.primary }}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
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
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 0,
    },
    searchInput: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        flexWrap: 'wrap', // Butonları yan yana yerleştirmek için
    },
    button: {
        flex: 1, // Butonların esnek bir genişliğe sahip olmasını sağlar
        margin: 5,
        minWidth: 120, // Butonların minimum genişliğini belirler
    },
    item: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        elevation: 2, // Android'de gölge efekti
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 5,
        marginBottom: 5,
    },
});

export default ProductsScreen;
