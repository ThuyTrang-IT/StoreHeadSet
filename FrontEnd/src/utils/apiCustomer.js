import axios from "axios";

const baseURL = "http://trangpham.gcalls.vn"; // Replace with your backend URL
const api = axios.create({
  baseURL,
});

export const savePaymentInfo = async (customerInfo, paymentInfo) => {
  try {
    const response = await api.post("/api/customer", {
      Name: customerInfo.fullName,
      Email: customerInfo.email,
      Phone: customerInfo.phoneNumber,
      Address: customerInfo.address,
      ...paymentInfo,
    });

    return response.data;
  } catch (error) {
    console.error("Error saving payment info:", error);
    throw error;
  }
};

export const fetchCustomerData = async () => {
  try {
    const response = await api.get("/api/customer");
    return response.data;
  } catch (error) {
    console.error("Error fetching data from Lark Suite:", error);
    throw error;
  }
};

export const saveCustomerInfo = async (customerInfo) => {
  try {
    const response = await api.post("/api/customer", {
      Name: customerInfo.fullName,
      Email: customerInfo.email,
      Phone: customerInfo.phoneNumber,
      Address: customerInfo.address,
    });

    return response.data;
  } catch (error) {
    console.error("Error saving customer info:", error);
    throw error;
  }
};
