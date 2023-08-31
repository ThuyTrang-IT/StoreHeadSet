import React, { useEffect, useState } from "react";
import "./Payment.scss";
import { sha256 } from "js-sha256";
import moment from "moment";
import axios from "axios";
import { MER_ID, ENCODE_KEY } from "../../utils/testSystemInfo";
import { useLocation } from "react-router-dom";

export default function Payment(props) {
  const [merchantToken, setMerchantToken] = useState("");
  const [merTrxId, setMerTrxId] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [amount, setAmount] = useState("");
  const location = useLocation();
  
  const { cartItems, cartSubTotal } = location.state;
  const { customerInfo } = props;
  useEffect(() => {
    const timeStamp = moment().format("YYYYMMDDHHmmss");
    const merTrxId = MER_ID + generateString(10);
    
    // Sử dụng giá tiền từ cartSubTotal
    const amountNumber = cartSubTotal.toString(); // Chuyển số thành chuỗi
    setMerTrxId(merTrxId);
    setInvoiceNo(merTrxId + "testing");
    setAmount(amountNumber);
    const result = sha256(
      timeStamp + merTrxId + MER_ID + amountNumber + ENCODE_KEY
    );
    setMerchantToken(result);
  }, [cartSubTotal]);

  function generateString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  // Tách tên thành phần firstName và lastName
  const fullNameParts = customerInfo.fullName.split(" ");
  const firstName = fullNameParts[0];
  const lastName = fullNameParts.slice(1).join(" ");
  const goodsNames = cartItems.map(item => item.attributes.title).join('%20&goodsNm=%20');

  console.log("san pham",goodsNames);
  
  return (
    <div>
      <h2 className="form-group__label">Thông tin thanh toán</h2>
      <form
        id="megapayForm"
        name="megapayForm"
        method="POST"
        action="https://sandbox.megapay.vn/pg_was/order/init.do"
        target="paymentF"
      >
        <input type="hidden" name="invoiceNo" value={invoiceNo} />
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="currency" value="VND" />
        <input type="hidden" name="goodsNm" value={goodsNames} />

        <input type="hidden" name="fee" value="0" />
        <input type="hidden" name="buyerFirstNm" value={firstName} />
        <input type="hidden" name="buyerLastNm" value={lastName} />

        <input
          type="hidden"
          name="buyerPhone"
          value={customerInfo.phoneNumber}
        />
        <input type="hidden" name="buyerEmail" value={customerInfo.email} />
        <input type="hidden" name="buyerAddr" value={customerInfo.address} />
        <input type="hidden" name="buyerCity" value="hanoi" />
        <input type="hidden" name="buyerState" value="hanoi" />
        <input type="hidden" name="buyerPostCd" value="12950" />
        <input type="hidden" name="buyerCountry" value="" />
       <input type="hidden" name="receiverLastNm" value="" />
        <input type="hidden" name="receiverFirstNm" value="" />
        <input type="hidden" name="receiverPhone" value="" />
        <input type="hidden" name="receiverState" value="" />
        <input type="hidden" name="receiverPostCd" value="12950" />
        <input type="hidden" name="receiverCountry" value="" /> 
        <input
          type="hidden"
          name="callBackUrl"
          value="http://localhost:3000/success"
        />
        <input type="hidden" name="notiUrl" value="http://localhost:3000" />
        <input type="hidden" name="merId" value={MER_ID} />
        <input type="hidden" name="reqDomain" value="http://localhost:3000" />
        <input type="hidden" name="userId" value="0" />
        <input type="hidden" name="userLanguage" value="VN" />
        <input type="hidden" name="merchantToken" value={merchantToken} />
        <input type="hidden" name="payToken" value="" />
        <input
          type="hidden"
          name="timeStamp"
          value={moment().format("YYYYMMDDHHmmss")}
        />
        <input type="hidden" name="merTrxId" value={merTrxId} />
        <input type="hidden" name="windowType" value="0" />
        <input type="hidden" name="windowColor" value="#ef5459" />
        <input type="hidden" name="userFee" value="" />
        <input type="hidden" name="vaCondition" value="03" />
        <input type="hidden" name="payType" value="NO" />
        <input type="hidden" name="payOption" value="" />
        <input
          type="hidden"
          name="vaStartDt"
          value={moment().format("YYYYMMDDHHmmss")}
        />
        <input type="hidden" name="vaEndDt" value="20240221235959" />
        <input type="hidden" name="bankCode" value="" />
        <input type="hidden" name="description" value="JDHZOUHXMG" />
        <input
          type="hidden"
          name="ipinfo"
          value="ip=2402:800:6343:a5d:a7a5:3478:f253:fd75"
        />
        <button>Payment</button>
      </form>
    </div>
  );
}
