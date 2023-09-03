import axios from 'axios';

const api = axios.create({
  baseURL: 'http://trangpham.gcalls.vn/api/products', // Đổi baseURL tùy theo backend của bạn
});

export const fetchProductData = async () => {
  try {
    const response = await api.get(); // Đổi đường dẫn endpoint tùy theo backend của bạn
    return response.data;
   
     // Trả về dữ liệu lấy từ backend
  } catch (error) {
    throw error;
  }
};


