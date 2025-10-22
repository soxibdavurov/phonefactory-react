import React, { useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Dispatch } from "@reduxjs/toolkit";
import { setRestaurant, setChosenProduct } from "./slice";
import { Product } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveChosenProduct, retrieveRestaurant } from "./selector";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import { BreadcrumbWrap } from "../../components/helpers/breadcrumbWrap";

/* REDUX SLIC & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
    setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
    setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

const chosenProductRetriever = createSelector(
    retrieveChosenProduct, (chosenProduct) => ({
        chosenProduct,
    }));
const restaurantRetriever = createSelector(
    retrieveRestaurant, (restaurant) => ({
        restaurant,
    }));


interface ChosenProductsProps {
    onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductsProps) {
    const { onAdd } = props;
    const { productId } = useParams<{ productId: string }>();
    const { setRestaurant, setChosenProduct } = actionDispatch(useDispatch());
    const { chosenProduct } = useSelector(chosenProductRetriever);
    const { restaurant } = useSelector(restaurantRetriever);


    useEffect(() => {
        const product = new ProductService();
        product
            .getProduct(productId)
            .then((data) => setChosenProduct(data))
            .catch((err) => console.log(err));

        const member = new MemberService();
        member
            .getRestaurant()
            .then((data) => setRestaurant(data))
            .catch((err) => console.log(err));

    }, []);
    if (!chosenProduct) return null;
    return (
        <>

            {/* {chosenProduct?.productImages.map(
                (ele: string, index: number) => {
                    const imagePath = `${serverApi}/${ele}`

                    return (
                        <SwiperSlide key={index}>
                            <img className="slider-image" src={imagePath} />
                        </SwiperSlide>
                    );
                }
            )} */}
        </>
    );
}
