import React, { useState, useContext } from "react";
import { CreatedContext } from "../../utils/Context";
import "../Products/ProductSingleAction.scss";
import { useParams } from "react-router-dom";
const ProductSingleAction = ({ product, setShowCart }) => {
  const { handleAddToCart } = useContext(CreatedContext);
  const { productId } = useParams(); // Lấy tham số productId từ URL

  const [labelText, setLabelText] = useState("Add Headset Carry Bag");
  const [quantity, setQuantity] = useState(1);

  const handleChangeField = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "327") {
      setLabelText("Add Headset Carry Bag");
    } else if (selectedValue === "326") {
      setLabelText(
        "Include Headset Carry Bag - (Quick Code: 15154): + £3.95"
      );
    }
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
  };
  
  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  

  const addToBasket = () => {
    const newCartItem = {
      id: productId,
      imageSrc: product.imageSrc,
      attributes: {
        title: product.ProductName,
        price: product.price,
        quantity: quantity,
      },
    };
    
    handleAddToCart(newCartItem);
    setShowCart(true);
  };
  

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="product-single-action">
      {/* Nội dung của ProductSingleAction */}
      <div className="product-single-options">
      <div className="product-single-price">
        {formatPrice(product.price)}
      </div>
        <table className="options m_form">
          <tbody>
            <tr>
              <td>
                <div className="form_label">
                  <b
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    <label htmlFor="additionv_97">{labelText}</label>
                  </b>
                </div>
                <select
                  name="additionv[97]"
                  id="additionv_97"
                  className="custom-select"
                  onChange={handleChangeField}
                  data-gtm-form-interact-field-id="0"
                  style={{
                    width: "200px",
                    padding: "10px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    borderColor: "#ccc",
                    backgroundColor: "#fff",
                    color: "#333",
                  }}
                >
                  <option selected="" value="">
                    Select:
                  </option>
                  <option value="327">I Do Not Require A Headset Bag</option>
                  <option value="326">
                    Include Headset Carry Bag - (Quick Code: 15154): + £3.95
                  </option>
                </select>
                <input type="hidden" name="additions[97]" value="1" />
                <input type="hidden" name="additiono[97]" value="1" />
                <input type="hidden" name="addition[97]" value="1" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="product-single-add d-flex">
        <table cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <td className="button b_basket">
                <span
                  className="quantity-btn decrease-btn"
                  onClick={handleDecreaseQuantity}
                >
                  -
                </span>
                <input
                  type="text"
                  name="quantity"
                  id="pquantity"
                  className="pquantity"
                  value={quantity}
                  aria-label="Qty"
                />
                <span
                  className="quantity-btn increase-btn"
                  onClick={handleIncreaseQuantity}
                >
                  +
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        className="button b_basket_button-animation"
        onClick={addToBasket}
      >
        Add to Basket
      </button>
    </div>
  );
};

export default ProductSingleAction;
