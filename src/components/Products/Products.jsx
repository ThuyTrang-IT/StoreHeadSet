import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import "./Products.scss";
import { fetchProductData } from "../../utils/apiProduct";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProductData();
        const data = response.data;
        setProducts(data.items);

        // Extract unique categories from products
        const uniqueCategories = [...new Set(data.items.map((product) => product.fields.productsByCategory))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div>
      {categories.map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          <div className="product-list">
            {products
              .filter((product) => product.fields.productsByCategory === category)
              .map((product) => (
                <div key={product.id} className="product-item">
                  <img
                    className="img"
                    src={product.fields.imageSrc.link}
                    width="200"
                    height="200"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      width: "100%",
                      height: "auto",
                    }}
                    alt={product.fields.ProductName}
                  />
                  <div className="product-details">
                    <h3>
                      <span className="product-name">
                        <Link
                          to={`/product/${product.fields.productsByCategory}/${product.id}`}
                          title={product.fields.ProductName}
                        >
                          {product.fields.ProductName}
                        </Link>
                      </span>
                    </h3>
                    <div className="product-icons">
                      <div className="product-favorite">
                        {product.fields.isFavorite ? (
                          <AiFillHeart className="heart active" />
                        ) : (
                          <AiOutlineHeart className="heart" />
                        )}
                      </div>
                      <div className="product-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={
                              product.fields.rating >= star
                                ? "star active"
                                : "star"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="product-price">
                      {formatPrice(product.fields.price)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
