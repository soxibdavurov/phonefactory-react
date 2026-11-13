import React, { lazy, Suspense, useState } from "react";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import { Messages } from "../lib/config";
import MemberService from "./services/MemberService";
import AuthenticationModal from "./components/auth";
import { useGlobals } from "./stores/slices/useGlobals";
import useBasket from "./stores/slices/useBasket";
import Footer from "./components/footer";
import ScrollToTop from "./components/scroll-to-top";
import ScrollToTop2 from "./components/helpers/scroll-top";
import { useTranslation } from "react-i18next";

const HomePage = lazy(() => import("./screens/homePage"));
const OrdersPage = lazy(() => import("./screens/ordersPage"));
// const BlogPage = lazy(() => import("./screens/blog"));
const UsersPage = lazy(() => import("./screens/userPage"));
const HelpPage = lazy(() => import("./screens/helpPage"));
const AboutPage = lazy(() => import("./screens/aboutPage"));
const ContactUs = lazy(() => import("./screens/contactUs"));
const BlogStandard = lazy(() => import("./screens/blog"));
const BlogDetails = lazy(() =>
  import("./screens/blog/blogDetails")
);
const ShopPage = lazy(() => import("./screens/shopPage"));
const ComparePage = lazy(() => import("./screens/comparePage"));
const NotFoundPage = lazy(() => import("./screens/notFound"));
const CartPage = lazy(() => import("./screens/cartPage"));
const Header = lazy(() => import("./components/headers/Header"));
// import Header from "./components/headers/Header";
// import { CompareItem } from "../lib/types/compare";
// import { useSelector } from "react-redux";
// import { RootState } from "./store";

function App() {
  const location = useLocation();
  const { t } = useTranslation();
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

      await sweetTopSuccessAlert(String(t("account.loggedOut")), 1000);
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
        <ScrollToTop2 />
        <Header cartItems={cartItems}
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
            <CartPage cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll} />
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

          <Route path="/blog-details/:blogId">
            <BlogDetails />
          </Route>

          <Route exact path="/blog-details">
            <Redirect to="/blog" />
          </Route>

          <Route path="/blog">
            <BlogStandard />
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
