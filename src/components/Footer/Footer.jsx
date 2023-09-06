import React from "react";
import "tailwindcss/tailwind.css";
import "./Footer.scss"; // Import the CSS file for the Footer component

const Footer = () => {
  return (
    <div className="site-footer-contact">
      <a href="/" className="site-footer-logo">
        <img
          src="https://www.headset-store.co.uk/user/templates/rm-headsetstore-2021/img/headset-store-logo@2x.png"
          width="264"
          height="35"
          alt="Headset Store"
        />
      </a>
      <p>
        Headset Store, Telecom House,
        <br />
        Station Road, Coleshill,
        <br />
        Birmingham, B46 1HT
      </p>
      <a href="mailto:sales@headset-store.co.uk">sales@headset-store.co.uk</a>
      <p>
        Got a question? Call us on{" "}
        <h3><a href="tel:01675432123">(01675) 432 123</a></h3>
      </p>
    </div>
  );
};

export default Footer;
