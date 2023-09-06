import axios from "axios";

const baseURL = "http://localhost:3001"; // Replace with your backend URL
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
