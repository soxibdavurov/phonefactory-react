import { useEffect, useState } from "react";
import clsx from "clsx";
import NavMenu from "../../components/headers/menus/NavMenu";
// import IconGroup from "../../components/header/IconGroup";
// import MobileMenu from "../../components/header/MobileMenu";
import { Link } from "react-router-dom";
import IconGroup from "./menus/IconGroup";
import MobileNavMenu from "./menus/MobileNavMenu";
import MobileMenu from "./menus/MobileMenu";
import { CartItem } from "../../../lib/types/search";
import Basket from "./Basket";

interface HeaderProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Header(props: HeaderProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector(".sticky-bar") as HTMLElement | null;
    setHeaderTop(header?.offsetTop ?? 0);

    const handleScroll = () => setScroll(window.scrollY);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <header className={"header-area clearfix"}>
      <div
        className={
          "header-top-area header-padding-1 d-none d-lg-block fluid-border"
        }
      >
        <div className={"container-fluid"}>
          {/* header top */}

          <div className={"header-top-wap fluid-border"}>
            {/* Header callLine */}
            <div className="language-currency-wrap">
              <div className="same-language-currency use-style">
                <span>
                  <a href="tel:+821055058800">
                    Call Us +821055058800 <i className="fa fa-phone"></i>
                  </a>
                </span>
              </div>
            </div>

            <div className="header-offer">
              <p>
                Free delivery on order over <span> 50.000₩</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={clsx(
          "sticky-bar header-res-padding clearfix header-padding-1",
          scroll > headerTop && "stick"
        )}
      >
        <div className={"container"}>
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-6 col-4">
              {/* header logo */}
              <div className={"logo"}>
                <Link to={process.env.PUBLIC_URL + "/"}>
                  <img alt="" src="/icons/phonefactory2.png" width={"100px"} />
                </Link>
              </div>
            </div>

            <div className="col-xl-8 col-lg-8 d-none d-lg-block">
              {/* Nav menu */}
              <NavMenu />
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-8">
              {/* Icon group */}
              <IconGroup
                cartItems={cartItems}
                onAdd={onAdd}
                onRemove={onRemove}
                onDelete={onDelete}
                onDeleteAll={onDeleteAll}
              />
            </div>
          </div>
        </div>
        {/* mobile menu */}
        <MobileMenu />
      </div>
    </header>
  );
}
