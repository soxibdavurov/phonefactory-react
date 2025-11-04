import React from "react";
import { Link } from "react-router-dom";
import { useGlobals } from "../../../stores/slices/useGlobals";

const NavMenu: React.FC = () => {

  const { authMember } = useGlobals();

  return (
    <div className="main-menu">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          {authMember ? (<li>
            <Link to="/orders">Orders</Link>
          </li>) : null}
          <li>
            <Link to="/blog-standard">
              Blog
              <i className="fa fa-angle-down" />
            </Link>
            <ul className="submenu">
              <li>
                <Link to="/blog-standard">Blog Standard</Link>
              </li>
              <li>
                <Link to="/blog-details-standard">Blog Details Standard</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavMenu;