import React, { useEffect } from "react";
import Advertisement from "./Advertisement";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewProducts, setPopularProducts, setSaleItems, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/products.enum";
import "../../../css/home.css";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import CategoryOneSlider from "./CategoryOneSlider";
import ProductCollectionSection from "./ProductCollectionSection";
import { CartItem } from "../../../lib/types/search";
import FeatureIcon from "./FeatureIcon";
import Banner from "./Banner";
import BlogFeatured from "./BlogFeatured";
import BrandLogoSlider from "./BrandLogoSlider";
import HomePageSlider from "./homePageSlider1";

/* REDUX SLIC & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularProducts: (data: Product[]) => dispatch(setPopularProducts(data)),
  setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
  setSaleItems: (data: Product[]) => dispatch(setSaleItems(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});
interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}
export default function HomePage(props: ProductsPageProps) {
  const { onAdd } = props;
  const { setPopularProducts, setSaleItems, setNewProducts, setTopUsers } = actionDispatch(
    useDispatch()
  );
  // Selector: Store => Data

  useEffect(() => {
    // Backend server data request => Data
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 8,
        order: "productViews",
      })
      .then((data) => {
        setPopularProducts(data);
      })
      .catch((err) => console.log(err));
    // Slice: Date => Store

    // getNewProducts and set
    product
      .getProducts({
        page: 1,
        limit: 8,
        order: "isNew",
      })
      .then((data) => {
        setNewProducts(data);
      })
      .catch((err) => console.log(err));
    // Slice: Date => Store

    // getSaleItems and set
    product
      .getProducts({
        page: 1,
        limit: 8,
        order: "productDiscount",
      })
      .then((data) => {
        setSaleItems(data);
      })
      .catch((err) => console.log(err));

    const member = new MemberService();
    member.getTopUsers().then((data) => setTopUsers(data));
  }, []);

  return (
    <div className={"homepage"}>
      <HomePageSlider />
      <CategoryOneSlider />
      <ProductCollectionSection onAdd={onAdd} />
      <Advertisement />
      {/* featured icon */}
      <FeatureIcon />
      <Banner />
      <BlogFeatured />
      <BrandLogoSlider />
    </div>
  );
}
