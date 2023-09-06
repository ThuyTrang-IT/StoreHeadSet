import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { fetchCustomerData } from "../../utils/apiCustomer"; // Import the API function
import "./PaymentSuccess.scss";
import { Container, Box, Typography, Paper, Avatar } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function Success() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [customerData, setCustomerData] = useState(null);

  const [paymentResult, setPaymentResult] = useState({
    trxId: "",
    merId: "",
    resultCd: "",
    resultMsg: "",
    invoiceNo: "",
    amount: "",
    userFee: "",
    currency: "",
    goodsNames: [],
    payType: "",
    timeStamp: "",
    buyerFirstNm: "",
    buyerLastNm: "",
  });

  useEffect(() => {
    // Fetch payment result data from URL query params
    const newPaymentResult = {
      trxId: queryParams.get("trxId"),
      merId: queryParams.get("merId"),
      resultCd: queryParams.get("resultCd"),
      resultMsg: queryParams.get("resultMsg"),
      invoiceNo: queryParams.get("invoiceNo"),
      amount: queryParams.get("amount"),
      userFee: queryParams.get("userFee"),
      currency: queryParams.get("currency"),
      goodsNames: queryParams.get("goodsNm"),
      payType: queryParams.get("payType"),
      timeStamp: moment(queryParams.get("timeStamp"), "YYYYMMDDHHmmss").format(
        "DD.MM.YYYY, hh:mm:ss"
      ),
      buyerFirstNm: queryParams.get("buyerFirstNm"),
      buyerLastNm: queryParams.get("buyerLastNm"),
    };
    setPaymentResult(newPaymentResult);

    // Fetch customer data from Lark Suite via API
    fetchCustomerData()
      .then((data) => {
        console.log("Data from Lark Suite API:", data);
        setCustomerData(data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, []);
  console.log("Customer data set:", customerData);

  const fullName = `${paymentResult.buyerFirstNm} ${paymentResult.buyerLastNm}`;
  
  const goodsNames = queryParams.get("goodsNm");

  console.log("Danh sách tên sản phẩm:", goodsNames);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f79090",
      }}
    >
      <Container>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Avatar
            sx={{
              width: "80px",
              height: "80px",
              backgroundColor: "#00C853",
              marginBottom: "20px",
            }}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: "48px" }} />
          </Avatar>
          <Typography variant="h5" gutterBottom>
            Thanh toán thành công!
          </Typography>
          <Typography variant="body1" paragraph>
            Chúc mừng! Thanh toán của bạn đã thành công.
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Họ và Tên: {fullName}
          </Typography>
          {goodsNames.map((productName, index) => (
            <Typography key={index} variant="body1" align="center" paragraph>
              Tên Sản phẩm {index + 1}: {productName.trim()}
            </Typography>
          ))}

          <Typography variant="body1" align="center" paragraph>
            Số tiền thanh toán: {paymentResult.amount} {paymentResult.currency}
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Email: {customerData && customerData.data.items[0].fields.Email}
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Phone: {customerData && customerData.data.items[0].fields.Phone}
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Address: {customerData && customerData.data.items[0].fields.Address}
          </Typography>

          <Typography variant="body1" align="center" paragraph>
            Mã Giao dịch: {paymentResult.trxId}
          </Typography>

          {/* Display other payment-related information */}
        </Paper>
      </Container>
    </Box>
  );
}

export default Success;
