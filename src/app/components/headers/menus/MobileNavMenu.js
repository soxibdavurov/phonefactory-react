import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MobileNavMenu = () => {
  const { t } = useTranslation();
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li>
          <Link to={"/"}>{t("nav.home")}</Link>
        </li>
        <li>
          <Link to={"/shop"}>{t("nav.shop")}</Link>
        </li>
        <li>
          <Link to={"/blog"}>{t("nav.blog")}</Link>
        </li>
        <li>
          <Link to={"/contact"}>{t("nav.contact")}</Link>
        </li>
        <li>
          <Link to={"/about"}>{t("nav.about")}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavMenu;
