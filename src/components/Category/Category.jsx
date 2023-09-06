import React, { useState, useEffect } from "react";
import Loader from "../loader/Loader.jsx";
import { useParams, Link } from "react-router-dom";
import { fetchCategoryData } from "../../utils/apiCategory.js";
import { fetchProductData } from "../../utils/apiProduct.js";
import "./Category.scss";

const Category = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchCategories();
    fetchProductsByCategory();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const categoryResponse = await fetchCategoryData();
      const filteredCategories = categoryResponse.data.items.filter(
        (category) => category.fields.type === id
      );
      setCategories(filteredCategories);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProductsByCategory = async () => {
    try {
      const productResponse = await fetchProductData();
      const data = productResponse.data;
      const filteredProducts = data.items.filter(
        (product) => product.fields.productsByCategory === id
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  return (
    <div className="category-container">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <ul className="category-list">
            {categories.map((category) => (
              <li key={category.id} className="category-title">
                <h3 className="category-name">{category.fields.type}</h3>
              </li>
            ))}
          </ul>
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-loop-item">
                <img
                  src={product.fields.imageSrc.link}
                  alt={product.fields.ProductName}
                  className="product-image"
                  width="200"
                  height="200"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    width: "100%",
                    height: "auto",
                  }}
                />
                <h3 className="product-name">
                  <Link
                    to={`/product/${id}/${product.id}`}
                    title={product.fields.ProductName}
                  >
                    {product.fields.ProductName}
                  </Link>
                </h3>
                <p className="product-price">{formatPrice(product.fields.price)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
