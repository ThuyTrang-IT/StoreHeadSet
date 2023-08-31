import React from "react";
import { saveCustomerInfo } from "../../utils/apiCustomer"; // Đảm bảo bạn đúng đường dẫn đến tệp api.js

const Personal = ({
  customerInfo,
  termsAccepted,
  handleCustomerInfoChange,
  handleTermsChange,
  handleStageChange,
}) => {
  const handleContinue = async () => {
    try {
      // Gửi thông tin khách hàng lên server
      const response = await saveCustomerInfo(customerInfo);

      // Xử lý phản hồi từ server (nếu cần)
      console.log(response);

      // Chuyển đến trang thanh toán (nếu thành công)
      handleStageChange("Payment");
    } catch (error) {
      console.error("Error saving customer info:", error);
    }
  };

  return (
    <div>
      <h2>Thông tin khách hàng</h2>
      <div className="form-group">
        <label htmlFor="fullName">Họ và tên:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={customerInfo.fullName || ""}
          onChange={handleCustomerInfoChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={customerInfo.email || ""}
          onChange={handleCustomerInfoChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Số điện thoại:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={customerInfo.phoneNumber || ""}
          onChange={handleCustomerInfoChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Địa chỉ:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={customerInfo.address || ""}
          onChange={handleCustomerInfoChange}
          required
        />
      </div>
      <div className="form-group">
        <div className="form-group checkbox-label">
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            checked={termsAccepted}
            onChange={handleTermsChange}
            required
          />
          <span className="checkbox-text">
            I have read and accepted the{" "}
            <a href="https://www.headset-store.co.uk/terms-and-conditions.html">
              <strong>Terms & Conditions</strong>
            </a>
          </span>
        </div>
      </div>

      <button className="continue" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

export default Personal;
