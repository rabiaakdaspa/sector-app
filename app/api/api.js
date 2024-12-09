import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Axios yapılandırması
const api = axios.create({
  baseURL: 'http://192.168.14.173:8000/api',  // API adresinizi buraya ekleyin
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
    return error.message;
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
    return error.message;
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
     // throw new Error('Token alınamadı'); // Token yoksa hata fırlat

      res.status = false;
      res.messageTitle = "Server hatası"
      res.message = "Serverda bir hata meydana geldi. Lütfen daha sonra tekrar deneyiniz."
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

    if(error.response.status == 422) {
      res.status = false;
      res.messageTitle = "Hatalı giriş"
      res.message = "E-posta veya şifreniz hatalıdır."

      return res;
    }
  }
};

// Kayıt olma
export const register = async (name, surname, email, password, passwordRepeat) => {
  const res = {message: "", messageTitle: "", status: true, data: null};
  try {
    const response = await api.post('/register', { name: name, surname: surname, email: email, password: password, password_confirmation: passwordRepeat,role:2 });
    console.log(response.data)
    const token = response?.data.access_token;
    await AsyncStorage.setItem('token', token);  // Token'ı kaydetme

    if (!token) {
     // throw new Error('Token alınamadı'); // Token yoksa hata fırlat

      res.status = false;
      res.messageTitle = "Server hatası"
      res.message = "Serverda bir hata meydana geldi. Lütfen daha sonra tekrar deneyiniz."
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

    if(error.response.status == 422) {
      console.log(error.response.data.errors)

      if(error.response.data.errors.email) {
        res.status = false;
        res.messageTitle = "Hatalı kayıt"
        res.message = error.response.data.errors.email[0]
        
      return res;
      }   

      if(error.response.data.errors.password) {
        res.status = false;
        res.messageTitle = "Hatalı kayıt"
        res.message = error.response.data.errors.password[0]
        
      return res;
      }  

      if(error.response.data.errors.password_confirmation) {
        res.status = false;
        res.messageTitle = "Hatalı kayıt"
        res.message = error.response.data.errors.password_confirmation[0]
        
        return res;
      }  

      if(error.response.data.errors.name) {
        res.status = false;
        res.messageTitle = "Hatalı kayıt"
        res.message = error.response.data.errors.name[0]
        
        return res;
      }  

      
      if(error.response.data.errors.surname) {
        res.status = false;
        res.messageTitle = "Hatalı kayıt"
        res.message = error.response.data.errors.surname[0]
        
        return res;
      }  
        

    }
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

export const getTransactionHistory = async () => {
  const res = {data: null, }
  try {
    const token = await AsyncStorage.getItem('token');  // Token'ı al
    if (token) {
      var response = await api.get('/transactions/getUser', { headers: { Authorization: `Bearer ${token}` } });
      console.log(response.data)
    }

    return response.data

  } catch (error) {

  }
};
