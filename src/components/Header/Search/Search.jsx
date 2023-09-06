// Search.jsx

import React, { useState } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import "./Search.scss";
//import { fetchDataFromApi } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

const Search = ({ setShowSearch }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const onChangeFunction = (e) => {
    setQuery(e.target.value);
  };

   const handleSearch = async () => {
    try {
      if (!query.length) {
        setSearchResults([]);
        return;
      }

      const endpoint = `/products/search/${query}`; // Đảm bảo rằng đường dẫn đúng với endpoint trên backend
      //const data = await fetchDataFromApi(endpoint);
      //setSearchResults(data || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  }; 

  return (
    <div className="search-modal">
      <div className="form-field">
        <input
          type="text"
          value={query}
          onChange={onChangeFunction}
          autoFocus
          placeholder="Search For Products..."
        />
        <button onClick={handleSearch}>
          <MdSearch />
        </button>
        <MdClose onClick={() => setShowSearch(false)} />
      </div>
      <div className="search-result-content">
        <div className="search-results">
          {searchResults.map((item) => (
            <div
              key={item._id}
              className="search-result-item"
              onClick={() => {
                navigate("/product/" + item._id);
                setShowSearch(false);
              }}
            >
              <div className="img-container">
                <img
                  src={item.imageSrc}
                  alt="searched-item"
                />
              </div>
              <div className="product-details">
                <span className="name">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
