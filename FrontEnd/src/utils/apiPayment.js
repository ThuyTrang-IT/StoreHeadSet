import axios from "axios";

const baseURL = "https://trangpham.gcalls.vn"; // Replace with your backend URL
const api = axios.create({
  baseURL,
});

export const sendPaymentData = async (paymentData) => {
  try {
    const response = await api.post("/api/payment", paymentData); // Use the 'api' instance here
    return response.data;
  } catch (error) {
    throw error;
  }
};
