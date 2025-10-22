import { Link } from "react-router-dom";

const MobileNavMenu = () => {
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/products"}>Shop</Link>
        </li>
        <li>
          <Link to={"/product/1"}>ProductDetails</Link>
        </li>
        <li>
          <Link to={"/not-found"}>404</Link>
        </li>
        <li className="menu-item-has-children">
          <Link to={"/blog-standard"}>Blog</Link>
          <ul className="sub-menu">
            <li>
              <Link to={"/blog-standard"}> Blog Standard</Link>
            </li>
            <li>
              <Link to={"/blog-details-standard"}>Blog Details Standard</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to={"/contact"}>Contact Us</Link>
        </li>
        <li>
          <Link to={"/about"}>About Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavMenu;
