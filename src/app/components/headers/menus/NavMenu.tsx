import React from "react";
import { Link } from "react-router-dom";
import { useGlobals } from "../../../stores/slices/useGlobals";
import { useTranslation } from "react-i18next";

const NavMenu: React.FC = () => {

  const { authMember } = useGlobals();
  const { t } = useTranslation();

  return (
    <div className="main-menu">
      <nav>
        <ul>
          <li>
            <Link to="/">{t("nav.home")}</Link>
          </li>
          <li>
            <Link to="/shop">{t("nav.shop")}</Link>
          </li>
          {authMember ? (<li>
            <Link to="/orders">{t("nav.orders")}</Link>
          </li>) : null}
          <li>
            <Link to="/blog">{t("nav.blog")}</Link>
          </li>
          <li>
            <Link to="/contact">{t("nav.contact")}</Link>
          </li>
          <li>
            <Link to="/about">{t("nav.about")}</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavMenu;