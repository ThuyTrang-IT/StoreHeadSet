import React, { useState, useEffect } from "react";
import Category from "../Category/Category";
import Banner from "../Home/Banner/Banner.jsx";
import Products from "../Products/Products.jsx";
import { fetchCategoryData } from "../../utils/apiCategory"; // Import API function to fetch categories
import { fetchProductData } from "../../utils/apiProduct"; // Import API function to fetch products

import "./Home.scss";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategoriesAndProducts();
  }, []);

  const fetchCategoriesAndProducts = async () => {
    try {
      const categoriesResponse = await fetchCategoryData(); // Fetch categories from backend
      const categoriesData = categoriesResponse.data;

      setCategories(categoriesData);

      const productsResponse = await fetchProductData(); // Fetch products from backend
      const productsData = productsResponse.data.items;

      setProducts(productsData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Banner />

      <div className="main-content">
        <div className="cf-title-01">
          <h2>Popular Products</h2>
        </div>

        {/* Hiển thị tất cả sản phẩm trên trang chủ */}
        {isLoading ? (
          <p>Đang tải...</p>
        ) : (
          <Products products={products} headingText="Sản phẩm phổ biến" />
        )}
      </div>
    </div>
  );
};

export default Home;