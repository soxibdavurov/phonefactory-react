import React, { useEffect, useState, Fragment } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import AnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

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
import { serverApi } from "../../../lib/config";
import clsx from "clsx";
import ProductRating from "../homePage/productRating1";
import { RootState } from "../../stores/store";
import { addToCompare } from "../../stores/slices/compare-slice";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import ProductGridListSingle from "./product/ProductGridListSingle";
import SingleProductGrid from "../homePage/SingleProductGrid";
import { retrieveRelatedProducts } from "./selector";
/* REDUX SLIC & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
    setMobileshop: (data: Member) => dispatch(setMobileshop(data)),
    setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
    // setRelatedProducts: (data: Product) => dispatch(setRelatedProducts(data)),
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
    const [quantityCount, setQuantityCount] = useState(1);
    const compareItems = useSelector((state: RootState) => state.comparison.compareItems) ?? [];
    const compareItem = compareItems.find((item) => item._id === chosenProduct?._id);
    const relatedProducts = useSelector(retrieveRelatedProducts);



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
    const [index, setIndex] = useState(-1);

    // Lightbox slaydlari
    const slides =
        chosenProduct?.productImages?.map((img, i) => ({
            src: `${serverApi}/${img}`,
            key: i,
        })) ?? [];

    // Asosiy galereya uchun Swiper sozlamalari
    const gallerySwiperParams = {
        spaceBetween: 10,
        loop: true,
        effect: "fade" as const,
        fadeEffect: { crossFade: true },
        modules: [EffectFade, Thumbs],
        // thumbs null bo‘lsa uzatmaymiz (runtime xatoni oldini oladi)
        ...(thumbsSwiper ? { thumbs: { swiper: thumbsSwiper } } : {}),
    };

    const settings = {
        loop: true,
        slidesPerView: 4,
        grabCursor: true,
        spaceBetween: 30,
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            576: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 3
            },
            1024: {
                slidesPerView: 4
            }
        }
    };

    // Yon tomondagi kichik rasmlar uchun Swiper sozlamalari
    const thumbnailSwiperParams = {
        onSwiper: setThumbsSwiper,
        spaceBetween: 10,
        slidesPerView: 4,
        touchRatio: 0.2,
        loop: true,
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

    const discountedPrice =
        chosenProduct.productDiscount && chosenProduct.productDiscount > 0
            ? chosenProduct.productPrice - chosenProduct.productDiscount
            : chosenProduct.productPrice;

    return (
        <>
            {/* Agar xohlasang BreadcrumbWrap qo'yish mumkin */}
            {/* <BreadcrumbWrap pages={[{ path: '/', label: 'Home' }, { path: '#', label: 'Product' }]} /> */}

            <Fragment>
                {/* product description with image */}
                <div className={clsx("shop-area", "pt-100", "pb-100")}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                {/* product image gallery */}
                                <Fragment>
                                    <div className="row row-5 test">
                                        <div
                                            className={"col-xl-10"}
                                        >
                                            <div className="product-large-image-wrapper">
                                                {chosenProduct.productDiscount || chosenProduct.isNew ? (
                                                    <div className="product-img-badges">
                                                        {chosenProduct.productDiscount ? (
                                                            <span className="pink">-{chosenProduct.productDiscount}won</span>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {chosenProduct.isNew ? <span className="purple">New</span> : ""}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                {chosenProduct?.productImages?.length ? (
                                                    <Swiper {...gallerySwiperParams}>
                                                        {chosenProduct?.productImages.map((single, key) => (
                                                            <SwiperSlide key={key}>
                                                                <button className="lightgallery-button" onClick={() => setIndex(key)}>
                                                                    <i className="pe-7s-expand1"></i>
                                                                </button>
                                                                <div className="single-image">
                                                                    <img
                                                                        src={`${serverApi}/${single}`}
                                                                        className="img-fluid"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </SwiperSlide>
                                                        ))}
                                                        <AnotherLightbox
                                                            open={index >= 0}
                                                            index={index}
                                                            close={() => setIndex(-1)}
                                                            slides={slides}
                                                            plugins={[Thumbnails, Zoom, Fullscreen]}
                                                        />
                                                    </Swiper>
                                                ) : null}
                                            </div>
                                        </div>
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
                            <div className="col-lg-6 col-md-6">
                                {/* product description info */}
                                {/* <ProductDescriptionInfo
                  product={product}
                  discountedPrice={discountedPrice}
                  currency={currency}
                  finalDiscountedPrice={finalDiscountedPrice}
                  finalProductPrice={finalProductPrice}
                  cartItems={cartItems}
                  wishlistItem={wishlistItem}
                  compareItem={compareItem}
                /> */}
                                <div className="product-details-content ml-70">
                                    <h2>{chosenProduct.productName}</h2>
                                    <div className="product-details-price">
                                        {chosenProduct.productDiscount !== 0 || null ? (
                                            <Fragment>
                                                <span>{(chosenProduct.productPrice - chosenProduct.productDiscount).toLocaleString()}₩</span>{" "}
                                                <span className="old">
                                                    {chosenProduct.productPrice.toLocaleString()}₩
                                                </span>
                                            </Fragment>
                                        ) : (
                                            <span>{chosenProduct.productPrice.toLocaleString()}₩</span>
                                        )}
                                    </div>
                                    {chosenProduct.productRate && chosenProduct.productRate > 0 ? (
                                        <div className="pro-details-rating-wrap">
                                            <div className="pro-details-rating">
                                                <ProductRating ratingValue={chosenProduct.productRate} />
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    <div className="pro-details-list">
                                        <p>{chosenProduct.productDesc}</p>
                                    </div>

                                    {chosenProduct.productSize ? (
                                        <div className="pro-details-size-color">

                                            <div className="pro-details-size">
                                                <span>  {chosenProduct.productCollection === "TARIFF" ?
                                                    "TariffType" : "Size/Storage"}</span>
                                                <div className="pro-details-size-content">

                                                    <label
                                                        className={`pro-details-size-content--single`}

                                                    >
                                                        <input
                                                            type="radio"
                                                            value={chosenProduct.productSize}
                                                            checked

                                                        />
                                                        <span className="size-name">{chosenProduct.productSize}</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                    <div className="pro-details-quality">
                                        <div className="cart-plus-minus">
                                            <button

                                                onClick={() =>
                                                    setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
                                                }
                                                className="dec qtybutton"
                                            >
                                                -
                                            </button>
                                            <input
                                                className="cart-plus-minus-box"
                                                type="text"
                                                value={quantityCount}
                                                readOnly
                                            />
                                            <button
                                                onClick={() =>
                                                    setQuantityCount(
                                                        quantityCount < chosenProduct.productLeftCount
                                                            ? quantityCount + 1
                                                            : quantityCount
                                                    )
                                                }
                                                className="inc qtybutton"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="pro-details-cart btn-hover">
                                            {chosenProduct.productLeftCount > 0 ? (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onAdd({
                                                            _id: chosenProduct._id,
                                                            quantity: quantityCount,
                                                            discount: chosenProduct.productDiscount,
                                                            name: chosenProduct.productName,
                                                            price: chosenProduct.productPrice,
                                                            image: chosenProduct.productImages[0],
                                                        });
                                                    }}
                                                    disabled={quantityCount >= chosenProduct.productLeftCount}
                                                >
                                                    {" "}
                                                    Add To Cart{" "}
                                                </button>
                                            ) : (
                                                <button disabled>Out of Stock</button>
                                            )}
                                        </div>
                                        {/* <div className="pro-details-wishlist">
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
                                        <div className="pro-details-compare">
                                            <button
                                                className={compareItem !== undefined ? "active" : ""}
                                                disabled={compareItem !== undefined}
                                                title={
                                                    compareItem !== undefined
                                                        ? "Added to compare"
                                                        : "Add to compare"
                                                }
                                                onClick={() => dispatch(addToCompare(
                                                    {
                                                        _id: chosenProduct._id,
                                                        discount: chosenProduct.productDiscount,
                                                        name: chosenProduct.productName,
                                                        rating: chosenProduct.productRate,
                                                        description: chosenProduct.productDesc,
                                                        price: chosenProduct.productPrice,
                                                        image: chosenProduct.productImages[0],
                                                    }
                                                ))}
                                            >
                                                <i className="pe-7s-shuffle" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="pro-details-meta">
                                        <span>Categories :</span>
                                        <ul>
                                            <li >
                                                <Link to={process.env.PUBLIC_URL + "/shop"}>
                                                    {chosenProduct.productCollection}
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    {/*
                                    {product.tag ? (
                                        <div className="pro-details-meta">
                                            <span>Tags :</span>
                                            <ul>
                                                {product.tag.map((single, key) => {
                                                    return (
                                                        <li key={key}>
                                                            <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                                                                {single}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                   */}

                                    <div className="pro-details-social">
                                        <ul>
                                            <li>
                                                <a href="//facebook.com">
                                                    <i className="fa fa-facebook" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="//dribbble.com">
                                                    <i className="fa fa-dribbble" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="//pinterest.com">
                                                    <i className="fa fa-pinterest-p" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="//twitter.com">
                                                    <i className="fa fa-twitter" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="//linkedin.com">
                                                    <i className="fa fa-linkedin" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* product description tab */}
                <div className={clsx("description-review-area", "pb-90")}>
                    <div className="container">
                        <div className="description-review-wrapper">
                            <Tab.Container
                                defaultActiveKey="productDescription">
                                <Nav variant="pills" className="description-review-topbar">
                                    <Nav.Item>
                                        <Nav.Link eventKey="additionalInfo">
                                            Additional Information
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="productDescription">Description</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="productReviews">Reviews(2)</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content className="description-review-bottom">
                                    <Tab.Pane eventKey="additionalInfo">
                                        <div className="product-anotherinfo-wrapper">
                                            <ul>
                                                <li>
                                                    <span>Weight</span> 400 g
                                                </li>
                                                <li>
                                                    <span>Dimensions</span>10 x 10 x 15 cm{" "}
                                                </li>
                                                <li>
                                                    <span>Materials</span> 60% cotton, 40% polyester
                                                </li>
                                                <li>
                                                    <span>Other Info</span> American heirloom jean shorts pug
                                                    seitan letterpress
                                                </li>
                                            </ul>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="productDescription">
                                        {chosenProduct.productDesc}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="productReviews">
                                        <div className="row">
                                            <div className="col-lg-7">
                                                <div className="review-wrapper">
                                                    <div className="single-review">
                                                        <div className="review-img">
                                                            <img
                                                                src={
                                                                    process.env.PUBLIC_URL +
                                                                    "/assets/img/testimonial/1.jpg"
                                                                }
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="review-content">
                                                            <div className="review-top-wrap">
                                                                <div className="review-left">
                                                                    <div className="review-name">
                                                                        <h4>White Lewis</h4>
                                                                    </div>
                                                                    <div className="review-rating">
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star" />
                                                                    </div>
                                                                </div>
                                                                <div className="review-left">
                                                                    <button>Reply</button>
                                                                </div>
                                                            </div>
                                                            <div className="review-bottom">
                                                                <p>
                                                                    Vestibulum ante ipsum primis aucibus orci
                                                                    luctustrices posuere cubilia Curae Suspendisse
                                                                    viverra ed viverra. Mauris ullarper euismod
                                                                    vehicula. Phasellus quam nisi, congue id nulla.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="single-review child-review">
                                                        <div className="review-img">
                                                            <img
                                                                src={
                                                                    process.env.PUBLIC_URL +
                                                                    "/assets/img/testimonial/2.jpg"
                                                                }
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="review-content">
                                                            <div className="review-top-wrap">
                                                                <div className="review-left">
                                                                    <div className="review-name">
                                                                        <h4>White Lewis</h4>
                                                                    </div>
                                                                    <div className="review-rating">
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star" />
                                                                    </div>
                                                                </div>
                                                                <div className="review-left">
                                                                    <button>Reply</button>
                                                                </div>
                                                            </div>
                                                            <div className="review-bottom">
                                                                <p>
                                                                    Vestibulum ante ipsum primis aucibus orci
                                                                    luctustrices posuere cubilia Curae Suspendisse
                                                                    viverra ed viverra. Mauris ullarper euismod
                                                                    vehicula. Phasellus quam nisi, congue id nulla.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-5">
                                                <div className="ratting-form-wrapper pl-50">
                                                    <h3>Add a Review</h3>
                                                    <div className="ratting-form">
                                                        <form action="#">
                                                            <div className="star-box">
                                                                <span>Your rating:</span>
                                                                <div className="ratting-star">
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star" />
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="rating-form-style mb-10">
                                                                        <input placeholder="Name" type="text" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="rating-form-style mb-10">
                                                                        <input placeholder="Email" type="email" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <div className="rating-form-style form-submit">
                                                                        <textarea
                                                                            name="Your Review"
                                                                            placeholder="Message"
                                                                            defaultValue={""}
                                                                        />
                                                                        <input type="submit" defaultValue="Submit" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                    </div>
                </div>

                {/* related product slider */}
                <div className={clsx("related-product-area", "pb-95")}>
                    <div className="container">
                        <div className={clsx("section-title", "text-center", "mb-50")}>
                            <h2>Related Products</h2>
                        </div>
                        {relatedProducts?.length ? (
                            <Swiper {...settings}>
                                {relatedProducts.map(ele => (
                                    <SwiperSlide key={ele._id}>
                                        <SingleProductGrid ele={ele} onAdd={onAdd} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : null}
                    </div>
                </div>
            </Fragment>

        </>
    );

}
