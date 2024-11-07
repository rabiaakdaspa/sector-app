import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { TouchableOpacity } from 'react-native';
import { logout } from '../api/api';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

const ProfileTab = () => {
  const { colors } = useTheme(); 
  const navigation = useNavigation()
  const { user, updateUser, token, clearToken, loading, setLoading, fetchUserData, themeData, toggleTheme } = useContext(UserContext);
  const [count, setCount] = useState(0)
  const handleUpdateName = () => {
    setCount(count + 1)
    const updatedUser = { ...user, name: 'New Name', sayi: count };
    updateUser(updatedUser);
  };


  

  const handleLogout = async () => {
    await logout();

    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });

    clearToken()
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>

      {loading && <ActivityIndicator animating={true} color="orange" />}
      {(user) && <>
        <Image source={require('../../assets/items/user.jpeg')} style={styles.profilePic} />
        <Text style={[styles.username, {color: colors.primary}]}>{user.name} {user.surname}</Text>
        <Text style={[styles.role, {color: colors.primary}]}>Kullanıcı Rolü: {user.role == 1 ? 'Bayi' : 'Müşteri'}</Text>
        <Text style={[styles.balance, {color: colors.primary}]}>Bakiye: {user.total_commission}</Text>
        <Text style={[styles.transactionCount, {color: colors.primary}]}>Yapılan İşlem Sayısı: 5</Text>
        <View style={[styles.buttonContainer, {color: colors.primary}]}>
          <Button 
            title={`Tema: ${themeData ? 'Açık' : 'Koyu'}`} 
            onPress={() => toggleTheme(!themeData)} 
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Ayarlar" onPress={() => { /* Ayarlar butonuna tıklama işlevi */ }} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Çıkış Yap" onPress={() => {
            handleLogout()
          }} />
        </View>
      </>}



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   // backgroundColor: theme.colors.background  // Updated to use theme colors
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  role: {
    fontSize: 16,
    marginVertical: 5,
  },
  balance: {
    fontSize: 16,
    marginVertical: 5,
  },
  transactionCount: {
    fontSize: 16,
    marginVertical: 5,
  },
  buttonContainer: {
    marginVertical: 10,  // Butonlar arasına boşluk ekler
    width: '80%',        // Buton genişliği için opsiyonel
  },
});

export default ProfileTab;