import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from '../tabs/HomeTab';
import ProfileTab from '../tabs/ProfileTab';
import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogoTitle from '../components/LogoTitle';
import { Text, useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();


export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const { token, loading, user, fetchUserData, setLoading } = useContext(UserContext);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    if (!token) {
      navigation.navigate("LoginScreen");
    }
    return token
  }

  useEffect(() => {
    const tkn = getToken();
  }, []);

  useEffect(() => {
    console.log(user?.role);
    if (!user) {
      fetchUserData();
    }
    setLoading(false);
    if (user) {
      navigation.navigate("HomeScreen");
    }
  }, [loading, token, user]);

  useEffect(() => {
    const tkn = getToken();
    if (!tkn) {
      navigation.reset({
        index: 0,
        routes: [{ name: "StartScreen" }],
      });
    }
  }, []);

  return (
<Tab.Navigator
  style={{ backgroundColor: colors.surfaceVariant }} // Tab arka plan rengi
  screenOptions={({ route }) => ({
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.secondary,
    tabBarStyle: {
      backgroundColor: colors.surfaceVariant, // Tab bar arka plan rengi
      borderTopWidth: 1,
      paddingBottom: 10, 
      paddingTop: 10, 
      elevation: 5, // Android'de gölge efekti için
      shadowColor: '#000', // iOS'de gölge efekti için
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    tabBarIcon: ({ focused, size }) => {
      let iconName;

      if (route.name === 'Anasayfa') {
        iconName = 'home';
      } else if (route.name === 'Profil') {
        iconName = 'person';
      }

      return <Ionicons name={iconName} size={size} color={focused ? colors.primary : colors.accent} />;
    },
    headerStyle: {
      backgroundColor: colors.surfaceVariant, // Header arka plan rengi
    },
    headerTintColor: colors.primary, // Header'daki yazı rengi
  })}
>
      <Tab.Screen name="Anasayfa" component={HomeTab} options={{
        tabBarLabel: () => null,
        headerTitle: (props) => <LogoTitle name="Anasayfa" />,
        headerRight: () => (
          <View style={styles.headerRight}>
            <Text style={[styles.totalCommission, { color: colors.primary }]}>
              {user ? user.total_commission : 0}
            </Text>
            <Image
              source={require('../../assets/new_gold.png')}
              style={styles.icon}
              onPress={() => alert('Image Pressed!')}
            />
          </View>
        ),
      }} />
      <Tab.Screen name="Profil" component={ProfileTab} options={{
        tabBarLabel: () => null,
        headerTitle: (props) => <LogoTitle name="Profil" />,
        headerRight: () => (
          <View style={styles.headerRight}>
            <Text style={[styles.totalCommission, { color: colors.primary }]}>
              {user ? user.total_commission : 0}
            </Text>
            <Image
              source={require('../../assets/new_gold.png')}
              style={styles.icon}
              onPress={() => alert('Image Pressed!')}
            />
          </View>
        ),
      }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  totalCommission: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
});