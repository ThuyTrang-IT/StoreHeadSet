// apiProductDetail.js
import axios from 'axios';

const backendAPI = 'https://trangpham.gcalls.vn';

async function fetchProductDetail() {
  try {
    const response = await axios.get(`${backendAPI}/api/productDetail`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product detail:', error);
    return null;
  }
}

export { fetchProductDetail }; 
