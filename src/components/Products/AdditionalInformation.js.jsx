import React, { useState, useEffect } from "react";
import { fetchProductDetail } from "../../utils/apiProductDetail";
import "./AdditionalInformation.scss";

const AdditionalInformation = ({ productName }) => {
  const [additionalInfo, setAdditionalInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProductDetail();

        if (data && data.data && data.data.items) {
          const productInfo = data.data.items.find(
            (item) => item.fields.ProductName === productName
          );
          if (productInfo) {
            setAdditionalInfo(productInfo.fields);
          }
        }
      } catch (error) {
        console.error("Error fetching additional information:", error);
      }
    };

    fetchData();
  }, [productName]);

  return (
    <div className="additional-information">
      <h2>Additional Information</h2>
      <table className="info-table">
        <tbody>
          {Object.keys(additionalInfo).map((key, index) => (
            <tr key={index}>
              <td>
                <strong>{key}</strong>
              </td>
              <td>
                {Array.isArray(additionalInfo[key]) ? (
                  additionalInfo[key].map((item, idx) => (
                    <span key={idx}>{item.text}</span>
                  ))
                ) : (
                  additionalInfo[key]
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdditionalInformation;
