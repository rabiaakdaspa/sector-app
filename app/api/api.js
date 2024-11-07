import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Axios yapılandırması
const api = axios.create({
  baseURL: 'http://192.168.1.113:8000/api',  // API adresinizi buraya ekleyin
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getUserData = async () => {
  try {
    const token = await AsyncStorage.getItem('token');  // Token'ı al
    if (token) {
      var response = await api.get('/user', { headers: { Authorization: `Bearer ${token}` } });
    }

    return response.data

  } catch (error) {
    throw error.message;
  }
};


export const getCommissionHistory = async () => {
  try {
    const token = await AsyncStorage.getItem('token');  // Token'ı al
    if (token) {
      var response = await api.get('/commission-history', { headers: { Authorization: `Bearer ${token}` } });
      console.log(response.data)
    }

    return response.data

  } catch (error) {
    throw error.message;
  }
};

export const scanDealer = async (data) => {
  const token = await AsyncStorage.getItem('token');
  console.log("token  " + token)
  try {
    if (token) {
      var response = await api.post('/transactions/scan', { "qr_code_value": data }, { headers: { Authorization: `Bearer ${token}` } });
      console.log(response)
     if (response.data.message == "QR code scanned successfully") {
        return {
          status: true,
          message: "QR Code basariyla okundu"
        }
      } 
    }

    //  return response.data

  } catch (error) {
    console.log("eerror")
    console.log(error)


    

    if (error?.response?.data?.message == "QR code has already been scanned by dealer" || error?.response?.data?.message == "QR code has already been scanned by representative") {
      return {
        status: false,
        message: "QR Code zaten daha önceden okunmus"
      }
    }

    if (error?.response?.data?.message == "Unauthorized") {
      return {
        status: false,
        message: "Yetkisiz işlem"
      }
    }

    if (error?.response?.data?.message == "Invalid QR Code") {
      return {
        status: false,
        message: "Geçersiz QR Kod"
      }
    } 
  }
};

// Token'ı her isteğe otomatik ekleme
/* api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
}); */

// Giriş yapma
export const login = async (email, password) => {
  const res = {message: "", messageTitle: "", status: true, data: null};
  try {
    const response = await api.post('/login', { email: email, password: password });

    const token = response?.data.access_token;

    if (!token) {
      throw new Error('Token alınamadı'); // Token yoksa hata fırlat
    }
    if(token) {
      await AsyncStorage.setItem('token', token);

    }
    res.status = true;
    res.messageTitle = "Başarılı";
    res.message = "Başarılı bir şekilde giriş yaptınız."
    res.data = token;

    return res;
  } catch (error) {
    if(error.status == 500) {
      res.status = false;
      res.messageTitle = "Server hatası"
      res.message = "Serverda bir hata meydana geldi. Lütfen daha sonra tekrar deneyiniz."

      return res;
    }
    
  }
};

// Kayıt olma
export const register = async (email, password) => {
  try {
    const response = await api.post('/register', { email, password });
    const { token } = response.data;
    await AsyncStorage.setItem('token', token);  // Token'ı kaydetme
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Çıkış yapma
export const logout = async () => {
  try {
    const token = await AsyncStorage.getItem('token');  // Token'ı al
    if (token) {
      await api.post('/logout', {}, { headers: { Authorization: `Bearer ${token}` } });  // API'ye istek at
    }

  } catch (error) {
    
  }
};


export const postPayment = async (amount) => {
  try {
    const token = await AsyncStorage.getItem('token');  // Token'ı al
    if (token) {
      var response = await api.post('/payment', {amount: amount}, { headers: { Authorization: `Bearer ${token}` } });
      return {
        status: true,
        message: response.data.message
      }
    }

  } catch (error) {
    return {
      status: false,
      message: response.data.message
    }
  }
};

export const getPaymentHistory = async () => {
  const res = {data: null, }
  try {
    const token = await AsyncStorage.getItem('token');  // Token'ı al
    if (token) {
      var response = await api.get('/payment-history', { headers: { Authorization: `Bearer ${token}` } });
      console.log(response.data)
    }

    return response.data

  } catch (error) {

  }
};
