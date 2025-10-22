import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "clsx";
import MenuCart from "../sub-components/MenuCart";
import { RootState } from "../../../store";
import Basket from "../Basket";
import { CartItem } from "../../../../lib/types/search";
import { useGlobals } from "../../../hooks/useGlobals";
import { serverApi } from "../../../../lib/config";

interface IconGroupProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function IconGroup({
  cartItems,
  onAdd,
  onRemove,
  onDelete,
  onDeleteAll,
}: IconGroupProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const { authMember } = useGlobals();

  /** 🔹 Tugmani bosilganda — agar yopiq bo‘lsa ochiladi, agar ochiq bo‘lsa yopiladi */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // boshqa eventlarga ketmasin
    const currentBtn = e.currentTarget;
    const next = currentBtn.nextElementSibling as HTMLElement | null;

    if (!next) return;

    const isAlreadyActive = next.classList.contains("active");

    // Avval hamma active’larni yopamiz
    rootRef.current
      ?.querySelectorAll<HTMLElement>(".active")
      .forEach((el) => el.classList.remove("active"));

    // Agar shu element ilgari ochiq bo‘lsa, endi yopamiz (toggle)
    if (!isAlreadyActive) {
      next.classList.add("active");
    }
  };

  /** 🔹 Sahifaning boshqa joyini bosganda barcha active’larni yopish */
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const root = rootRef.current;
      if (!root) return;

      // IconGroup ichida bosilgan bo‘lsa — yopmaymiz
      if (root.contains(e.target as Node)) return;

      // tashqarida bosilgan bo‘lsa — barcha ochiqlarni yopamiz
      root
        .querySelectorAll<HTMLElement>(".active")
        .forEach((el) => el.classList.remove("active"));
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu =
      document.querySelector<HTMLElement>("#offcanvas-mobile-menu");
    offcanvasMobileMenu?.classList.add("active");
  };

  const compareItems =
    useSelector((state: RootState) => state.compare?.compareItems) ?? [];
  const wishlistItems =
    useSelector((state: RootState) => state.wishlist?.wishlistItems) ?? [];

  return (
    <div ref={rootRef} className={"header-right-wrap"}>
      {/* Search */}
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={handleClick}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form>
            <input type="text" placeholder="Search" />
            <button className="button-search" type="button">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>

      {/* Account */}
      <div className="same-style account-setting d-none d-lg-block">
        {!authMember ? (<> <button className="account-setting-active" onClick={handleClick}>
          <i className="pe-7s-user-female" />
        </button>
          <div className="account-dropdown">
            <ul>
              <li><Link to="/login-register">Login</Link></li>
              <li><Link to="/login-register">Register</Link></li>

            </ul>
          </div> </>) : (<li><Link to="/my-account">My Account</Link></li>)}
      </div>

      {/* Compare */}
      <div className="same-style header-compare">
        <Link to="/compare">
          <i className="pe-7s-shuffle" />
          <span className="count-style">{compareItems.length}</span>
        </Link>
      </div>

      {/* Wishlist */}
      <div className="same-style header-wishlist">
        <Link to="/wishlist">
          <i className="pe-7s-like" />
          <span className="count-style">{wishlistItems.length}</span>
        </Link>
      </div>

      {/* Cart */}
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={handleClick}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">{cartItems.length}</span>
        </button>
        <MenuCart
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
        />
      </div>

      {/* Basket */}
      {/* <Basket
        cartItems={cartItems}
        onAdd={onAdd}
        onRemove={onRemove}
        onDelete={onDelete}
        onDeleteAll={onDeleteAll}
      /> */}

      {/* Mobile Cart */}
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to="/cart">
          <i className="pe-7s-shopbag" />
          <span className="count-style">{cartItems.length}</span>
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button className="mobile-aside-button" onClick={triggerMobileMenu}>
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
}
