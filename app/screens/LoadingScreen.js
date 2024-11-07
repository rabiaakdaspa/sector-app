import React, { useContext, useEffect } from "react";
import Background from "../components/Background";
import { ActivityIndicator } from "react-native-paper";
import { UserContext } from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoadingScreen({ navigation }) {

    const { token, loading, user } = useContext(UserContext); // Access token and loading state


    const getToken = async () => {
      const token = await AsyncStorage.getItem('token'); 
      return token
  
    }
    useEffect(() => {
      const tkn = getToken()
      if(!tkn) {
        navigation.navigate("LoginScreen");
      }
    }, [])

    useEffect(() => {
      
      if (!token || !user) { // Check if loading is complete
        navigation.navigate("LoginScreen");
      }
  
      if (token || user) { // Check if loading is complete
        navigation.navigate("HomeScreen");
      }
    }, [loading, token, user]); 
  



  return (
    <Background >
      <ActivityIndicator size="large" color="#0000ff" />
    </Background>
  );
}


