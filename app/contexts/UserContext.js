import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCommissionHistory, getTransactionHistory, getUserData } from '../api/api';


const defaultValue = null

const UserContext = createContext(defaultValue);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultValue);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true)
  
  const [commissionHistoryList, setCommissionHistoryList] = useState([])
  const [paymentHistoryList, setPaymentHistoryList] = useState([])
  const [transactionHistoryList, setTransactionHistoryList] = useState([])

  const [themeData, setThemeData] = useState(true);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme !== null) {
          setThemeData(JSON.parse(storedTheme));
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async (value) => {
    try {
      await AsyncStorage.setItem('theme', JSON.stringify(value));
      setThemeData(value); // themeData güncellenir
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };
  
  
  const updateUser = (updatedUser) => {
    setUser((prevState) => ({ ...prevState, ...updatedUser }));
  };


  const fetchUserTransactionHistory = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        const response = await getTransactionHistory();
        console.log(response)
        setTransactionHistoryList(response.transactions);
      }
    } catch (error) {

    }
  }

  const fetchUserData = async () => {
    try {
      setLoading(true)
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        const response = await getUserData();
        setUser(response);
        setLoading(false)
      } else {
        setLoading(false)

      }
    } catch (error) {

      await AsyncStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };


  const fetchUserCommissionHistory = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        const response = await getCommissionHistory();
        setCommissionHistoryList(response)
      } else {

      }
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  const fetchUserPaymentHistory = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        const response = await getCommissionHistory();
        setCommissionHistoryList(response)
      } else {

      }
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  const saveToken = async (jwtToken) => {
    await AsyncStorage.setItem('token', jwtToken);
    setToken(jwtToken);
  };

  const clearToken = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    fetchUserData();
  }, [token]);


  return (
    <UserContext.Provider value={{ user, updateUser, fetchUserData, loading, setLoading,
       saveToken, clearToken, token, setToken, saveToken, themeData, fetchUserCommissionHistory,
       toggleTheme, setCommissionHistoryList, commissionHistoryList, fetchUserPaymentHistory, paymentHistoryList, setPaymentHistoryList,
       fetchUserTransactionHistory, transactionHistoryList
      }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };