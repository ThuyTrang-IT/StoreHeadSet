import React, { useEffect, useState } from "react";
import "./loader.scss";

const Loader = ({ title }) => {
  const [data, setData] = useState("Loading ");

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(title ? title : "Loading ");
    }, 7000);

    return () => clearTimeout(timer);
  }, [title]);

  return (
    <div></div>
      
  );
};

export default Loader;
