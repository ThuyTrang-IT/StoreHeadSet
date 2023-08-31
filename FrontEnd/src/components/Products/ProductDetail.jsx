import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.scss";
import ProductSingleAction from "../Products/ProductSingleAction";
import Cart from "../Cart/Cart";
import { fetchProductData } from "../../utils/apiProduct";
import AdditionalInformation from "../Products/AdditionalInformation.js";
const ProductDetail = () => {
  const { categoryId, productId } = useParams();
  const [showCart, setShowCart] = useState(false);
  const [product, setProduct] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetchProductData();
        const data = response.data;
        const productData = data.items.find((item) => item.id === productId);
        if (productData) {
          setProduct(productData);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    
    fetchData();
  }, [productId]);

  const handleShowCart = () => {
    setShowCart(true);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <div>
        <h1>{product.fields.ProductName}</h1>
      </div>

      <div className="product-detail-image">
        <img className="image"
          src={product.fields.imageSrc.link}
          alt={product.fields.ProductName}
        />

        <ProductSingleAction
          product={product.fields}
          setShowCart={setShowCart}
        />

        {showCart && <Cart setShowCart={setShowCart} />}
      </div>

      <div className="product-detail-content">
        <div className="product-detail-description">
          <p>{product.fields.description}</p>
        </div>

        <div className="product-detail-features">
          <h2>Key Features:</h2>
          <ul>
            {product.fields.features.split("\n").map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="product-detail-package-contents">
          <h2>Package Contents:</h2>
          <ul>
            {product.fields.packageContents.split("\n").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* <div className="product-detail-additional-info">
          <h2>Additional Information</h2>
          <table className="product-attributes-table">
            <tbody>
              {additionalInfo.map(({ label, value }, index) => (
                <tr key={index}>
                  <th className="product-attribute-title">{label}</th>
                  <td className="product-attribute-value">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
         <AdditionalInformation productName={product.fields.ProductName} />

      </div>
    </div>
  );
};

export default ProductDetail;
