import React, { useContext } from "react";
import { FaGithub, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";
//import "tailwindcss/tailwind.css";
import "../Newsletter/Newsletter.scss";

export const handleClickScrollToAboutSection = () => {
  const element = document.getElementById("about");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Newsletter = () => {
  return (
    <div className="newsletter-section" id="about">
      <div className="newsletter-content">
        <span className="small-text">Newsletters</span>
        <span className="big-text">Sign up for latest updates and offers</span>
        <div className="form">
          <input
            type="email"
            name="email"
            id=""
            placeholder="Email Address"
            className="border border-gray-300 rounded px-2 py-1 text-base"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white rounded px-4 py-1 font-bold"
          >
            Subscribe
          </button>
        </div>
        <span className="text">
          Will be used in accordance with our privacy policy
        </span>
        <div className="social-icons">
          <div className="icon">
            <FaGithub size={17} />
          </div>
          <div className="icon">
            <FaInstagram size={17} />
          </div>
          <div className="icon">
            <FaLinkedinIn size={17} />
          </div>
          <div className="icon">
            <FaTwitter size={17} />
          </div>
        </div>

        <div className="block block-inner">
          <div className="product-single-about-wrap">
            <div className="row">
              <div className="col-xl-4 flex items-center justify-center">
                <div className="product-single-about">
                  <div className="product-single-about-image">
                    <img
                      src="https://www.headset-store.co.uk/templates/rm-headsetstore-2021/img/headset-store-logo@2x.png"
                      width="264"
                      height="35"
                      alt="Headset Store Logo"
                    />
                  </div>
                  <h3 className="first text-center">Why buy from us?</h3>
                  <p>
                    Established in 2001 and with over 33,000 business customers
                    in the UK alone, <strong>The Headset Store</strong> are an
                    experienced supplier of <strong>Business Headsets</strong>{" "}
                    and are authorised resellers for Poly, Jabra, Yealink, and
                    EPOS.
                  </p>
                  <p>
                    We are also experts in the world of{" "}
                    <strong>Cloud Hosted Business Phone Systems</strong> and
                    install VoIP solutions across the UK.
                  </p>
                </div>
              </div>
              <div className="col-xl-4 flex items-center justify-center">
                <div className="product-single-about">
                  <div className="product-single-about-image">
                    <img
                      src="https://www.headset-store.co.uk/templates/rm-headsetstore-2021/img/icon-shield-large@2x.png"
                      width="69"
                      height="61"
                      alt="Shield Icon"
                    />
                     
                  </div>
                  <h3 className="text-center">WE GUARANTEE THE FOLLOWING</h3>
                  <ul>
                    <li>Complete Satisfaction when you order from us</li>
                    <li>The Best Knowledge of Business Headsets</li>
                    <li>We offer Next business day delivery on all orders</li>
                    <li>We offer as standard a Full 12 Month Warranty</li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 flex items-center justify-center">
                <div className="product-single-about">
                  <div className="product-single-about-image">
                    <img
                      src="https://www.headset-store.co.uk/templates/rm-headsetstore-2021/img/trustpilot-1@2x.png"
                      width="144"
                      height="36"
                      alt="Trustpilot Logo"
                    />
                  </div>
                  <h3 className="text-center">TRUSTED BY 33,000 BUSINESSES</h3>
                  <p className="last">
                    <strong>The Headset Store</strong> aim to provide the best
                    possible service when you place an order with us.
                    <br />
                    We use <strong>Trustpilot</strong> encouraging customers to
                    leave open and honest reviews about their experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
