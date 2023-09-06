import { useContext, useEffect, useState } from "react";

import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import Cart from "../Cart/Cart";
import Search from "./Search/Search.jsx";

//import { handleClickScrollToCategorySection } from "../Home/Category/Category";
//import { handleClickScrollToAboutSection } from "../Footer/Newsletter/Newsletter";
import { handleClickScrollToTopSection } from "../Home/Banner/Banner";

import "./Header.scss";
import { CreatedContext } from "../../utils/Context";
import Menu from '../Header/menu/Menu';
const dropdownMenuItems = [
  { label: "Headsets by Phone", url: "/headsets-by-phone.html" },
  { label: "Other Submenu Item", url: "#" },
  // Add more submenu items as needed
];
const Header = () => {
  // * here i will add class on scroll and make header sticky
  const [scrolled, setScrolled] = useState(false);
  // i will set this showCart on header icon show i can open the cart
  const [showCart, setShowCart] = useState(false);
  // i will add state for open and close search button using this state
  const [showSearch, setShowSearch] = useState(false);
  // to change cart count on shopping cart icon
  const { cartCount } = useContext(CreatedContext);

  //  * creating navigate instance to navigate it to the home
  /* const navigate = useNavigate();
  const testMode = () => {
    handleClickScrollToTopSection();
    return navigate("/");
  };
 */
  
  
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header>
        <ul className="left">
          <li>
            <a href="/contact.html" className="nav-link">
              Contact
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              className="nav-link"
            >
              Returns
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              className="nav-link"
            >
              Technical
            </a>
          </li>
          <li>
            <a href="#">
              Sign In
            </a>
          </li>
          <li>
            <a href="/index/action/newaccount/" className="nav-link">
              New Account
            </a>
          </li>
        </ul>
      </header>
      <nav className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <a href="/" title="" className="site-header-logo">
            <img
              src="https://www.headset-store.co.uk/user/templates/rm-headsetstore-2021/img/headset-store-logo@2x.png"
              alt="Headset Store"
              width="264"
              height="35"
            />
          </a>

          <div className="container">
            <a href="tel:01675432123" className="site-header-phone">
              <h2>01675 432 123</h2>
            </a>
          </div>

          <div className="right">
            {/* here it will trigger the search button using state to open it */}
            <TbSearch onClick={() => setShowSearch(true)} />
            <AiOutlineHeart />
            <span className="cart-icon">
              
              <CgShoppingCart onClick={() => setShowCart(true)} />
              {!!cartCount && <span>{cartCount}</span>}
            </span> *
            
          </div>
        </div>
      </nav>
      <Menu title="Products" menuItems={dropdownMenuItems} />

      {/* i am passing this setShowCart state as an prop, because i also need to close the cart and close button is on cart component */}
      {showCart && <Cart setShowCart={setShowCart} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </>
  );
};

export default Header;
