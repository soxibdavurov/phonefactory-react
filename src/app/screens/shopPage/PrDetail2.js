import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, Link } from "react-router-dom";
import { EffectFade, Thumbs } from 'swiper';
import AnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import clsx from "clsx";

import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import { getDiscountPrice, getProductCartQuantity } from "../../helpers/product";

import Swiper, { SwiperSlide } from "../../components/swiper";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import ProductRating from "../../components/product/sub-components/ProductRating";

const ProductTabRight = () => {
    let { id } = useParams();
    const { products } = useSelector((state) => state.product);
    const product = products.find((product) => product.id === id);

    const currency = useSelector((state) => state.currency);
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);
    const { compareItems } = useSelector((state) => state.compare);
    const wishlistItem = wishlistItems.find(item => item.id === product.id);
    const compareItem = compareItems.find(item => item.id === product.id);

    const discountedPrice = getDiscountPrice(product.price, product.discount);
    const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
    const finalDiscountedPrice = +(
        discountedPrice * currency.currencyRate
    ).toFixed(2);
    const thumbPosition = "right";
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [index, setIndex] = useState(-1);
    const slides = product?.image.map((img, i) => ({
        src: process.env.PUBLIC_URL + img,
        key: i,
    }));

    const dispatch = useDispatch();
    const [selectedProductColor, setSelectedProductColor] = useState(
        product.variation ? product.variation[0].color : ""
    );
    const [selectedProductSize, setSelectedProductSize] = useState(
        product.variation ? product.variation[0].size[0].name : ""
    );
    const [productStock, setProductStock] = useState(
        product.variation ? product.variation[0].size[0].stock : product.stock
    );
    const [quantityCount, setQuantityCount] = useState(1);

    const productCartQty = getProductCartQuantity(
        cartItems,
        product,
        selectedProductColor,
        selectedProductSize
    );

    // swiper slider settings
    const gallerySwiperParams = {
        spaceBetween: 10,
        loop: true,
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        thumbs: { swiper: thumbsSwiper },
        modules: [EffectFade, Thumbs],
    };

    const thumbnailSwiperParams = {
        onSwiper: setThumbsSwiper,
        spaceBetween: 10,
        slidesPerView: 4,
        touchRatio: 0.2,
        loop: true,
        slideToClickedSlide: true,
        direction: "vertical",
        breakpoints: {
            320: {
                slidesPerView: 4,
                direction: "horizontal"
            },
            640: {
                slidesPerView: 4,
                direction: "horizontal"
            },
            768: {
                slidesPerView: 4,
                direction: "horizontal"
            },
            992: {
                slidesPerView: 4,
                direction: "horizontal"
            },
            1200: {
                slidesPerView: 4,
                direction: "vertical"
            }
        }
    };

    return (
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
                                            {product.discount || product.new ? (
                                                <div className="product-img-badges">
                                                    {product.discount ? (
                                                        <span className="pink">-{product.discount}%</span>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {product.new ? <span className="purple">New</span> : ""}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            {product?.image?.length ? (
                                                <Swiper options={gallerySwiperParams}>
                                                    {product?.image.map((single, key) => (
                                                        <SwiperSlide key={key}>
                                                            <button className="lightgallery-button" onClick={() => setIndex(key)}>
                                                                <i className="pe-7s-expand1"></i>
                                                            </button>
                                                            <div className="single-image">
                                                                <img
                                                                    src={process.env.PUBLIC_URL + single}
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
                                    <div
                                        className={clsx(thumbPosition && thumbPosition === "left"
                                            ? "col-xl-2 order-2 order-xl-1"
                                            : "col-xl-2")}
                                    >
                                        <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
                                            {product?.image?.length ? (
                                                <Swiper options={thumbnailSwiperParams}>
                                                    {product.image.map((single, key) => (
                                                        <SwiperSlide key={key}>
                                                            <div className="single-image">
                                                                <img
                                                                    src={process.env.PUBLIC_URL + single}
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
                                <h2>{product.name}</h2>
                                <div className="product-details-price">
                                    {discountedPrice !== null ? (
                                        <Fragment>
                                            <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
                                            <span className="old">
                                                {currency.currencySymbol + finalProductPrice}
                                            </span>
                                        </Fragment>
                                    ) : (
                                        <span>{currency.currencySymbol + finalProductPrice} </span>
                                    )}
                                </div>
                                {product.rating && product.rating > 0 ? (
                                    <div className="pro-details-rating-wrap">
                                        <div className="pro-details-rating">
                                            <ProductRating ratingValue={product.rating} />
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                                <div className="pro-details-list">
                                    <p>{product.shortDescription}</p>
                                </div>

                                {product.variation ? (
                                    <div className="pro-details-size-color">
                                        <div className="pro-details-color-wrap">
                                            <span>Color</span>
                                            <div className="pro-details-color-content">
                                                {product.variation.map((single, key) => {
                                                    return (
                                                        <label
                                                            className={`pro-details-color-content--single ${single.color}`}
                                                            key={key}
                                                        >
                                                            <input
                                                                type="radio"
                                                                value={single.color}
                                                                name="product-color"
                                                                checked={
                                                                    single.color === selectedProductColor ? "checked" : ""
                                                                }
                                                                onChange={() => {
                                                                    setSelectedProductColor(single.color);
                                                                    setSelectedProductSize(single.size[0].name);
                                                                    setProductStock(single.size[0].stock);
                                                                    setQuantityCount(1);
                                                                }}
                                                            />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="pro-details-size">
                                            <span>Size</span>
                                            <div className="pro-details-size-content">
                                                {product.variation &&
                                                    product.variation.map(single => {
                                                        return single.color === selectedProductColor
                                                            ? single.size.map((singleSize, key) => {
                                                                return (
                                                                    <label
                                                                        className={`pro-details-size-content--single`}
                                                                        key={key}
                                                                    >
                                                                        <input
                                                                            type="radio"
                                                                            value={singleSize.name}
                                                                            checked={
                                                                                singleSize.name === selectedProductSize
                                                                                    ? "checked"
                                                                                    : ""
                                                                            }
                                                                            onChange={() => {
                                                                                setSelectedProductSize(singleSize.name);
                                                                                setProductStock(singleSize.stock);
                                                                                setQuantityCount(1);
                                                                            }}
                                                                        />
                                                                        <span className="size-name">{singleSize.name}</span>
                                                                    </label>
                                                                );
                                                            })
                                                            : "";
                                                    })}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                                {product.affiliateLink ? (
                                    <div className="pro-details-quality">
                                        <div className="pro-details-cart btn-hover ml-0">
                                            <a
                                                href={product.affiliateLink}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                Buy Now
                                            </a>
                                        </div>
                                    </div>
                                ) : (
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
                                                        quantityCount < productStock - productCartQty
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
                                            {productStock && productStock > 0 ? (
                                                <button
                                                    onClick={() =>
                                                        dispatch(addToCart({
                                                            ...product,
                                                            quantity: quantityCount,
                                                            selectedProductColor: selectedProductColor ? selectedProductColor : product.selectedProductColor ? product.selectedProductColor : null,
                                                            selectedProductSize: selectedProductSize ? selectedProductSize : product.selectedProductSize ? product.selectedProductSize : null
                                                        }))
                                                    }
                                                    disabled={productCartQty >= productStock}
                                                >
                                                    {" "}
                                                    Add To Cart{" "}
                                                </button>
                                            ) : (
                                                <button disabled>Out of Stock</button>
                                            )}
                                        </div>
                                        <div className="pro-details-wishlist">
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
                                        </div>
                                        <div className="pro-details-compare">
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
                                        </div>
                                    </div>
                                )}
                                {product.category ? (
                                    <div className="pro-details-meta">
                                        <span>Categories :</span>
                                        <ul>
                                            {product.category.map((single, key) => {
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
                        <Tab.Container defaultActiveKey="productDescription">
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
                                    {product.fullDescription}
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
            {/* <RelatedProductSlider
                spaceBottomClass="pb-95"
                category={product.category[0]}
            /> */}
        </Fragment>
    );
};

export default ProductTabRight;
