import React, { useContext } from "react";
import { MdClose, MdRemove, MdAdd } from "react-icons/md";
import { CreatedContext } from "../../../utils/Context";
import "../CartItem/CartItem.scss";

const CartItem = () => {
  const { cartItems, handleCartProductQuantity, handleRemoveFromCart } =
    useContext(CreatedContext);
    console.log("cartItems:", cartItems);
  const cartCount = cartItems.reduce(
    (total, item) => total + item.attributes.quantity,
    0
  );

  if (!cartItems || cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <table className="cart-products-table">
      <thead>
        <tr>
          <th colSpan="6" className="ui-dialog-title">
            Shopping Basket Updated
          </th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => (
          <tr key={item.id} className="cart-product">
            <td className="img-container">
              <img
                className="product-image"
                src={item.imageSrc.link} // Sửa đường dẫn hình ảnh
                alt={item.attributes.title}
              />
            </td>
            <td className="prod-details">
              <div className="name-container">
                <span className="name">{item.attributes.title}</span>
                <MdClose
                  className="close-btn"
                  onClick={() => handleRemoveFromCart(item)}
                />
              </div>
              <div className="quantity-buttons">
                <span onClick={() => handleCartProductQuantity("dec", item)}>
                  <MdRemove />
                </span>
                <span>{item.attributes.quantity}</span>
                <span onClick={() => handleCartProductQuantity("inc", item)}>
                  <MdAdd />
                </span>
              </div>
              <div className="text">
                <span>{item.attributes.quantity}</span>
                <span>x</span>
                <span className="highlight">
                  &nbsp;&nbsp;&nbsp; {formatPrice(item.attributes.price)}
                </span>
              </div>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan="6" className="total-items">
            Total Items in Cart: {cartCount}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CartItem;
