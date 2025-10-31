import React, { lazy, Suspense, useState } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import OrdersPage from "./screens/ordersPage";
import UsersPage from "./screens/userPage";
import Footer from "./components/footer";
import HelpPage from "./screens/helpPage";
import useBasket from "./hooks/useBasket";
import AuthenticationModal from "./components/auth";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import { Messages } from "../lib/config";
import MemberService from "./services/MemberService";
import { useGlobals } from "./hooks/useGlobals";

import AboutPage from "./screens/aboutPage";
import ScrollToTop from "./components/scroll-to-top";
import Header from "./components/headers/Header";

import ContactUs from "./screens/contactUs";
import ShopPage from "./screens/shopPage";
import ComparePage from "./screens/comparePage";
import { CompareItem } from "../lib/types/compare";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import NotFoundPage from "./screens/notFound";
import CartPage from "./screens/cartPage";

const Headerr = lazy(() =>
  import("./components/headers/Header"));

function App() {
  const location = useLocation();
  const { setAuthMember } = useGlobals();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  /* HANDLERS */
  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);
  const handleSignupOpen = () => setSignupOpen(true);
  const handleLoginOpen = () => setLoginOpen(true);

  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseLogout = () => setAnchorEl(null);
  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();
      await member.logout();

      await sweetTopSuccessAlert("Logged out", 1000);
      setAuthMember(null);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(Messages.error1);
    }
  };

  return (
    <>
      {" "}
      <Suspense
        fallback={
          <div className="flone-preloader-wrapper">
            <div className="flone-preloader">
              <span></span>
              <span></span>
            </div>
          </div>
        }
      >
        <Headerr cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          handleLogoutRequest={handleLogoutRequest}
        />

        <Switch>
          <Route path="/shop">
            <ShopPage onAdd={onAdd} />
          </Route>

          <Route path="/orders">
            <OrdersPage />
          </Route>

          <Route path="/cart">
            <CartPage />
          </Route>

          <Route path="/compare">
            <ComparePage onAdd={onAdd} cartItems={cartItems} />
          </Route>

          <Route path="/contact">
            <ContactUs />
          </Route>

          <Route path="/member-page">
            <UsersPage />
          </Route>

          <Route path="/help">
            <HelpPage />
          </Route>

          <Route path="/about">
            <AboutPage />
          </Route>

          <Route exact path="/">
            <HomePage onAdd={onAdd} />
          </Route>

          {/* ✅ fallback 404 route */}
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
        <Footer />
        <ScrollToTop />
        <AuthenticationModal
          signupOpen={signupOpen}
          loginOpen={loginOpen}
          handleLoginClose={handleLoginClose}
          handleSignupClose={handleSignupClose}
          handleSignupOpen={handleSignupOpen}   // 🔹 qo‘shildi
          handleLoginOpen={handleLoginOpen}   // 🔹 qo‘shildi
        />
      </Suspense>
    </>
  );
}

export default App;

// screens component
// sectional component
// reusable component
