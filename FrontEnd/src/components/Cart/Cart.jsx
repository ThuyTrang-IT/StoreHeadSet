// Cart.jsx
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { CreatedContext } from "../../utils/Context";
import { loadStripe } from "@stripe/stripe-js";
//import { makePaymentRequest } from "../../utils/api";
import CartItem from "../Cart/CartItem/CartItem";

// Import Tailwind CSS
import "tailwindcss/tailwind.css";
import "../Cart/Cart.scss";

const Cart = ({ setShowCart }) => {
  const { cartItems, cartSubTotal,cartQuantities  } = useContext(CreatedContext);
  
  const stripePromise = loadStripe(
    `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
  );

  const navigate = useNavigate();

  const handleCheckout = () => {
    // Chuyển dữ liệu sản phẩm tới trang thanh toán qua route
    navigate("/checkout", { state: { cartItems, cartSubTotal } });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="cart-panel">
     
      <div className="cart-content">
        <div className="cart-header bg-gray-200 p-3 flex justify-between items-center">
          <span className="heading text-lg">Shopping Cart</span>
          <span
            className="close-btn flex items-center text-gray-500"
            onClick={() => setShowCart(false)}
          >
            <span className="text">Close</span>
            <MdClose />
          </span>
        </div>

        {cartSubTotal === 0 ? (
          <div className="empty-card">
            <BsCartX />
            <span>No Product In The Cart.</span>
            <button
              className="return-cta btn btn-primary"
              onClick={() => setShowCart(false)}
            >
              RETURN TO SHOP
            </button>
          </div>
        ) : (
          <>
            
              <CartItem />
            

            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">SubTotal:</span>
                <span
                  className="total"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  {formatPrice(cartSubTotal)}
                </span>
              </div>
              <div className="button">
                <button onClick={handleCheckout} className="checkout-cta">
                  Checkout
                </button>
                <button
                  className="continue-shopping-btn btn btn-primary"
                  onClick={() => setShowCart(false)}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
