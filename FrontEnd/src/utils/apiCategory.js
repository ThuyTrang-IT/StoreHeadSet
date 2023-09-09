import axios from 'axios';

const api = axios.create({
  baseURL: 'https://trangpham.gcalls.vn/api/categories', 
});

export const fetchCategoryData = async () => {
    try {
      const response = await api.get();
      //console.log(response.data); // Log response data
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error); // Log error
      throw error;
    }
  };
  


