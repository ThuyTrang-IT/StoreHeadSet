import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (endPoint) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const makeApiCall = async () => {
      try {
        const res = await fetchDataFromApi(endPoint);
        setData(res);
        setError(null); // Clear any previous error
      } catch (error) {
        setError(error); // Set the error state
      }
    };

    makeApiCall();
  }, [endPoint]);

  return { data, error };
};

export default useFetch;
