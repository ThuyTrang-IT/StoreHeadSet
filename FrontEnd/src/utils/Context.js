import React, { createContext, useEffect, useState } from "react";
import { fetchCategoryData } from "../utils/apiCategory"; // Điều chỉnh đường dẫn tới API danh mục
import { fetchProductData } from "../utils/apiProduct"; // Điều chỉnh đường dẫn tới API sản phẩm

export const CreatedContext = createContext(null);

const AppContext = (props) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetchCategoryData();
        const categoriesData = categoriesResponse.data;

        const productsResponse = await fetchProductData();
        const productsData = productsResponse.data.items;

        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let count = 0;
    cartItems.forEach((item) => (count += item.attributes.quantity));
    setCartCount(count);

    let subTotal = 0;
    cartItems.forEach(
      (item) => (subTotal += item.attributes.price * item.attributes.quantity)
    );
    setCartSubTotal(subTotal);
  }, [cartItems]);

  const handleAddToCart = (product) => {
    console.log("handleAddToCart is called with:", product);
    const existingItem = cartItems.find((item) => item.id === product.id);
  
    if (existingItem) {
      const updatedItems = cartItems.map((item) =>
        item.id === product.id
          ? {
              ...item,
              attributes: {
                ...item.attributes,
                quantity: item.attributes.quantity + 1, // Tăng số lượng lên 1 khi thêm vào giỏ hàng
              },
            }
          : item
      );
      setCartItems(updatedItems);
    } else {
      const newCartItem = {
        ...product,
        attributes: {
          ...product.attributes,
          quantity: product.attributes.quantity, // Sử dụng quantity từ newCartItem
        },
      };
      setCartItems([...cartItems, newCartItem]);
    }
  };
  

  const handleRemoveFromCart = (product) => {
    let items = [...cartItems];
    items = items.filter((p) => p.id !== product.id);
    setCartItems(items);
  };

  const handleCartProductQuantity = (type, product) => {
    const items = [...cartItems];
    const index = items.findIndex((p) => p.id === product.id);

    if (type === "inc") {
      items[index].attributes.quantity += 1;
    } else if (type === "dec") {
      if (items[index].attributes.quantity === 1) {
        items.splice(index, 1);
      } else {
        items[index].attributes.quantity -= 1;
      }
    }

    setCartItems(items);
  };

  return (
    <CreatedContext.Provider
      value={{
        categories,
        products,
        cartItems,
        setCartItems,
        cartCount,
        setCartCount,
        cartSubTotal,
        setCartSubTotal,
        handleAddToCart,
        handleRemoveFromCart,
        handleCartProductQuantity,
      }}
    >
      {props.children}
    </CreatedContext.Provider>
  );
};

export default AppContext;
