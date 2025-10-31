import React, { useEffect, useState, Fragment } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import AnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

import { Dispatch } from "@reduxjs/toolkit";
import { setMobileshop, setChosenProduct } from "./slice";
import { Product } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveChosenProduct, retrieveMobileshop } from "./selector";
import { Link, useHistory, useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../../../lib/types/search";
import { BreadcrumbWrap } from "../../components/helpers/breadcrumbWrap";
import { serverApi } from "../../../lib/config";
import Rating from "../homePage/productRating1";

/* REDUX SLIC & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
    setMobileshop: (data: Member) => dispatch(setMobileshop(data)),
    setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),

});

const chosenProductRetriever = createSelector(retrieveChosenProduct, (chosenProduct) => ({
    chosenProduct,
}));



interface ChosenProductsProps {
    onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductsProps) {
    const { onAdd } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const { productId } = useParams<{ productId: string }>();
    const { setMobileshop, setChosenProduct } = actionDispatch(useDispatch());
    const { chosenProduct } = useSelector(chosenProductRetriever);
    useEffect(() => {
        if (!productId) return;

        const product = new ProductService();
        product.getProduct(productId)
            .then((data) => dispatch(setChosenProduct(data)))
            .catch(console.log);

        const member = new MemberService();
        member.getMobileshop()
            .then((data) => dispatch(setMobileshop(data)))
            .catch(console.log);
    }, [productId, dispatch]); // ✅ faqat productId va dispatch

    // ======= ProductImageDescription (gallery+thumbs) tanasi =======
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

    // Lightbox slaydlari
    const slides =
        chosenProduct?.productImages?.map((img, i) => ({
            src: `${serverApi}/${img}`,
            key: i,
        })) ?? [];

    // Asosiy galereya uchun Swiper sozlamalari
    const gallerySwiperParams = {
        spaceBetween: 10,
        loop: false,
        effect: "fade" as const,
        fadeEffect: { crossFade: true },
        modules: [EffectFade, Thumbs],
        // thumbs null bo‘lsa uzatmaymiz (runtime xatoni oldini oladi)
        ...(thumbsSwiper ? { thumbs: { swiper: thumbsSwiper } } : {}),
    };

    // Yon tomondagi kichik rasmlar uchun Swiper sozlamalari
    const thumbnailSwiperParams = {
        onSwiper: setThumbsSwiper,
        spaceBetween: 10,
        slidesPerView: 4,
        touchRatio: 0.2,
        loop: false,
        slideToClickedSlide: true,
        direction: "vertical" as const,
        breakpoints: {
            320: { slidesPerView: 4, direction: "horizontal" as const },
            640: { slidesPerView: 4, direction: "horizontal" as const },
            768: { slidesPerView: 4, direction: "horizontal" as const },
            992: { slidesPerView: 4, direction: "horizontal" as const },
            1200: { slidesPerView: 4, direction: "vertical" as const },
        },
        modules: [Thumbs], // optional: vertikal thumblar uchun kifoya
    };
    // ===============================================================

    const imagePath = `${serverApi}/${chosenProduct?.productImages}`;
    if (!chosenProduct) return null;

    return (
        <>
            {/* Agar xohlasang BreadcrumbWrap qo'yish mumkin */}
            {/* <BreadcrumbWrap pages={[{ path: '/', label: 'Home' }, { path: '#', label: 'Product' }]} /> */}

            <div className="shop-area pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        {/* LEFT: gallery with side thumbs */}
                        <div className="col-lg-6 col-md-6">
                            <Fragment>
                                <div className="row row-5">
                                    {/* Asosiy katta rasm */}
                                    <div className="col-xl-10">
                                        <div className="product-large-image-wrapper product-large-image-wrapper--side-thumb">
                                            {chosenProduct?.productImages?.length ? (
                                                <Swiper {...gallerySwiperParams}>
                                                    {chosenProduct.productImages.map((single, key) => (
                                                        <SwiperSlide key={key}>
                                                            <div className="single-image border">
                                                                <img
                                                                    src={`${serverApi}/${single}`}
                                                                    className="img-fluid"
                                                                    alt=""
                                                                    onClick={() => setLightboxIndex(key)}
                                                                    style={{ cursor: "zoom-in" }}
                                                                />
                                                            </div>
                                                        </SwiperSlide>
                                                    ))}

                                                    {/* Lightbox */}
                                                    <AnotherLightbox
                                                        open={lightboxIndex >= 0}
                                                        index={lightboxIndex}
                                                        close={() => setLightboxIndex(-1)}
                                                        slides={slides}
                                                        plugins={[Thumbnails, Zoom, Fullscreen]}
                                                    />
                                                </Swiper>
                                            ) : null}
                                        </div>
                                    </div>

                                    {/* Kichik tarafiy rasmlar */}
                                    <div className="col-xl-2">
                                        <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
                                            {chosenProduct.productImages?.length ? (
                                                <Swiper {...thumbnailSwiperParams}>
                                                    {chosenProduct.productImages.map((single, key) => (
                                                        <SwiperSlide key={key}>
                                                            <div className="single-image">
                                                                <img
                                                                    src={`${serverApi}/${single}`}
                                                                    className="img-fluid"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        </div>

                        {/* RIGHT tomonni hozircha bo'sh qoldirdim; istasang ProductDescriptionInfo qo'shamiz */}
                        <div className="col-lg-6 col-md-6">
                            <div className="shop-list-content">
                                <h3>
                                    {chosenProduct.productName}

                                </h3>
                                <div className="product-list-price">
                                    {chosenProduct.productDiscount !== 0 || null ? (
                                        <Fragment>
                                            <span>{chosenProduct.productPrice - chosenProduct.productDiscount}₩</span>{" "}
                                            <span className="old">
                                                {chosenProduct.productPrice}₩
                                            </span>
                                        </Fragment>
                                    ) : (
                                        <span>{chosenProduct.productPrice}₩</span>
                                    )}
                                </div>
                                <div className="rating-review">
                                    <div className="product-list-rating">
                                        <Rating ratingValue={chosenProduct.productRate ?? 0} />
                                    </div>
                                </div>
                                {chosenProduct.productDesc ? (
                                    <p>{chosenProduct.productDesc}</p>
                                ) : (
                                    ""
                                )}

                                <div className="shop-list-actions d-flex align-items-center">
                                    <div className="shop-list-btn btn-hover">
                                        <a href="#">ADD TO CART</a>
                                    </div>

                                    {/* <div className="shop-list-wishlist ml-10">
                                                        <button
                                                            className={wishlistItem !== undefined ? "active" : ""}
                                                            disabled={wishlistItem !== undefined}
                                                            title={
                                                                wishlistItem !== undefined
                                                                    ? "Added to wishlist"
                                                                    : "Add to wishlist"
                                                            }
                                                            onClick={() => dispatch(addToWishlist(product))}
                                                        >
                                                            <i className="pe-7s-like" />
                                                        </button>
                                                    </div> */}
                                    {/* <div className="shop-list-compare ml-10">
                                                        <button
                                                            className={compareItem !== undefined ? "active" : ""}
                                                            disabled={compareItem !== undefined}
                                                            title={
                                                                compareItem !== undefined
                                                                    ? "Added to compare"
                                                                    : "Add to compare"
                                                            }
                                                            onClick={() => dispatch(addToCompare(product))}
                                                        >
                                                            <i className="pe-7s-shuffle" />
                                                        </button>
                                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
