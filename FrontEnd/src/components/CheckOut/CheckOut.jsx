import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../CheckOut/CheckOut.scss"; // Đảm bảo rằng đường dẫn đúng tới tệp SCSS của bạn
import CartItem from "../Cart/CartItem/CartItem";
import { Checkbox } from "@chakra-ui/react";
import Personal from "./Personal";
import Payment from "./Payment";
import Success from "../SuccessPage/SuccessPage";

const Checkout = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [currentStage, setCurrentStage] = useState("Personal");
  const [customerInfo, setCustomerInfo] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const stages = ["Personal", "Payment", "Success"];

  const handleStageChange = (newStage) => {
    if (currentStage === "Personal" && !termsAccepted) {
      alert("Please accept our Terms & Conditions before proceeding.");
      return;
    }
    setCurrentStage(newStage);
  };

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Đã submit thông tin thanh toán:", {
      customerInfo,
      paymentInfo,
    });
    // Thực hiện các xử lý liên quan đến việc thanh toán và hoàn thành đơn hàng ở đây
  };
  

 
  

  return (
    <div className="checkout">
      <div className="checkout-container">
        <div className="checkout-section checkout-info">
          <div className="checkout-logo">{/* ... (logo) */}</div>

          {/* Thanh tiến trình */}
          <div className="progress-bar">
            {stages.map((stage, index) => (
              <div
                key={index}
                className={`stage ${currentStage === stage ? "active" : ""}`}
                onClick={() => handleStageChange(stage)}
              >
                {stage}
                {currentStage === stage && (
                  <div className="icon-check bp-icon-tick">✓</div>
                )}
              </div>
            ))}
          </div>

          {currentStage === "Personal" && (
            <Personal
              customerInfo={customerInfo}
              termsAccepted={termsAccepted}
              handleCustomerInfoChange={handleCustomerInfoChange}
              handleTermsChange={handleTermsChange}
              handleStageChange={handleStageChange}
            />
          )}

          {currentStage === "Payment" && (
            <Payment
              customerInfo={customerInfo}
              paymentInfo={paymentInfo}
              handlePaymentInfoChange={handlePaymentInfoChange}
              handleSubmit={handleSubmit}
            />
          )}
          {currentStage === "Success" && (
            <Success customerInfo={customerInfo} 
            paymentInfo={paymentInfo} />
          )}
        </div>

        <div className="checkout-section checkout-cart">
          {/* Phần mã của giỏ hàng */}
          {/* Hiển thị thông tin giỏ hàng, sản phẩm đã chọn, tổng tiền, ... */}
          <CartItem />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
