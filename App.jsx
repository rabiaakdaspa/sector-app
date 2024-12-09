import React, { useContext, useEffect, useState } from "react";
import { Provider, configureFonts, MD2LightTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme, darkTheme } from "./app/core/theme";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  HomeScreen,
  ProductsScreen,
} from "./app/screens";
import { UserProvider, UserContext } from "./app/contexts/UserContext"; // UserContext güncellendi
import HomeTab from "./app/tabs/HomeTab";
import ProfileTab from "./app/tabs/ProfileTab";
import LoadingScreen from "./app/screens/LoadingScreen";
import Toast from "react-native-toast-message";
import ProductDetail from "./app/screens/ProductDetail";
import CommissionHistoryScreen from "./app/screens/CommissionHistoryScreen";
import PaymentScreen from "./app/screens/PaymentScreen";
import TransactionHistoryScreen from "./app/screens/TransactionHistoryScreen";
import CampaignsScreen from "./app/screens/CampaignsScreen";
import FarmerFormScreen from "./app/screens/FarmerFormScreen";



const Stack = createStackNavigator();

const MainApp = () => {
  const { themeData } = useContext(UserContext); // UserProvider altında kullanıldığından artık hata vermeyecektir.
  const [deviceTheme, setDeviceTheme] = useState(theme);



  useEffect(() => {

  }, [deviceTheme])

  useEffect(() => {
    // themeData güncellenince hemen deviceTheme'i ayarlar
    setDeviceTheme(themeData ? theme : darkTheme);
    console.log("Theme updated to: ", themeData ? "Light" : "Dark");
  }, [themeData]);

  return (
    <Provider theme={deviceTheme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
          <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
          <Stack.Screen name="CampaignsScreen" component={CampaignsScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />

          <Stack.Screen name="CommissionHistory" component={CommissionHistoryScreen} />
          <Stack.Screen name="TransactionHistoryScreen" component={TransactionHistoryScreen} />
          <Stack.Screen name="FarmerFormScreen" component={FarmerFormScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />

          <Stack.Screen name="HomeTab" component={HomeTab} />
          <Stack.Screen name="ProfileTab">
            {props => <ProfileTab {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast
        position="bottom"
        bottomOffset={100}
        textStyle={{ fontSize: 24 }}
      />
    </Provider>
  );
};

export default function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}
