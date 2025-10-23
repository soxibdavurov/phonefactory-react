import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
// import ProductModal from "./ProductModal";
import { Product } from "../../../../lib/types/product";
import { CartItem } from "../../../../lib/types/search";
import { serverApi } from "../../../../lib/config";
import { Badge } from "@mui/material";
import ProductRating from "../../homePage/ProductRating";

type Props = {
    product: Product;
    onAdd: (item: CartItem) => void;
    imageHeight: string;
};

const ProductGridListSingle = ({ product, onAdd, imageHeight }: Props) => {
    const [modalShow, setModalShow] = useState(false);
    const imagePath = `${serverApi}/${product.productImages[0]}`;
    const imagePath2 = `${serverApi}/${product.productImages[1]}`;
    const dispatch = useDispatch();
    const history = useHistory();
    const chooSeSMARTPHONEHandler = (id: string) => {
        history.push(`/shop/${id}`);
    };

    return (
        <Fragment>
            <div className={"product-wrap mb-25"}>
                <div className="product-img">
                    <img alt={product.productName} loading="lazy"
                        className="default-img"
                        src={imagePath}

                        height={imageHeight}
                    />
                    {product.productImages.length > 1 ? (
                        <img alt={product.productName} loading="lazy"
                            className="hover-img"
                            src={imagePath2}
                            height={imageHeight}
                        />
                    ) : (
                        ""
                    )}
                    {product.productDiscount || product.isNew ? (
                        <div className="product-img-badges">
                            {product.productDiscount ? (
                                <span className="pink">-{product.productDiscount.toLocaleString()}₩</span>
                            ) : (
                                ""
                            )}
                            {product.isNew ? <span className="purple">New</span> : ""}
                        </div>
                    ) : (
                        ""
                    )}

                    <div className="product-action">
                        <div className="pro-same-action pro-wishlist">
                            <button title="Add to wishlist">
                                <i className="pe-7s-like" />
                            </button>
                        </div>
                        <div className="pro-same-action pro-cart">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAdd({
                                        _id: product._id,
                                        quantity: 1,
                                        discount: product.productDiscount,
                                        name: product.productName,
                                        price: product.productPrice,
                                        image: product.productImages[0],
                                    });
                                }}
                            >
                                <i className="pe-7s-cart"></i>{" "}
                            </button>
                        </div>
                        <div className="pro-same-action pro-quickview">

                            <button className="view-btn"
                                title="Quick View"
                                onClick={() => setModalShow(true)}
                            >   <Badge
                                badgeContent={product.productViews}
                                color="primary"
                            >
                                    <i className="pe-7s-look" />

                                </Badge>
                            </button>
                        </div>
                        {/* <button
                            onClick={() => dispatch(addToCart(product.)}
                            className="active"
                            title="Add to cart"
                        >
                            <i className="fa fa-shopping-cart" />
                        </button> */}
                    </div>
                </div>
                <div className="product-content text-center">
                    <h3>
                        <Link to={`/shop/${product._id}`} onClick={() => chooSeSMARTPHONEHandler(product._id)}>
                            {product.productName}
                        </Link>
                    </h3>
                    <div className="product-rating">
                        <ProductRating ratingValue={product.productRate ?? 0} />
                    </div>
                    <div className="product-price">
                        {product.productDiscount !== 0 || null ? (
                            <Fragment>
                                <span>{(product.productPrice - product.productDiscount).toLocaleString()}₩</span>{" "}
                                <span className="old">
                                    {product.productPrice.toLocaleString()}₩
                                </span>
                            </Fragment>
                        ) : (
                            <span>{product.productPrice.toLocaleString()}₩</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="shop-list-wrap mb-30">
                <div className="row">
                    <div className="col-xl-4 col-md-5 col-sm-6">
                        <div className="product-list-image-wrap">
                            <div className="product-img">
                                <img alt={product.productName} loading="lazy"
                                    className="default-img"
                                    src={imagePath}
                                    height={"300px"}

                                />
                                {product.productImages.length > 1 ? (
                                    <img alt={product.productName} loading="lazy"
                                        className="hover-img"
                                        src={imagePath2}

                                        height={"300px"}
                                    />
                                ) : (
                                    ""
                                )}
                                {product.productDiscount || product.isNew ? (
                                    <div className="product-img-badges">
                                        {product.productDiscount ? (
                                            <span className="pink">-{product.productDiscount.toLocaleString()}₩</span>
                                        ) : (
                                            ""
                                        )}
                                        {product.isNew ? <span className="purple">New</span> : ""}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 col-md-7 col-sm-6">
                        <div className="shop-list-content">
                            <h3>
                                <Link to={`/shop/${product._id}`} onClick={() => chooSeSMARTPHONEHandler(product._id)}>
                                    {product.productName}
                                </Link>
                            </h3>
                            <div className="product-list-price">
                                {product.productDiscount !== 0 || null ? (
                                    <Fragment>
                                        <span>{(product.productPrice - product.productDiscount).toLocaleString()}₩</span>{" "}
                                        <span className="old">
                                            {product.productPrice.toLocaleString()}₩
                                        </span>
                                    </Fragment>
                                ) : (
                                    <span>{product.productPrice.toLocaleString()}₩</span>
                                )}
                            </div>

                            <div className="rating-review">
                                <div className="product-list-rating">
                                    <ProductRating ratingValue={product.productRate ?? 0} />
                                </div>
                            </div>

                            {product.productDesc ? (
                                <p>{product.productDesc}</p>
                            ) : (
                                ""
                            )}

                            <div className="shop-list-actions d-flex align-items-center">
                                <div className="shop-list-btn btn-hover">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onAdd({
                                                _id: product._id,
                                                quantity: 1,
                                                discount: product.productDiscount,
                                                name: product.productName,
                                                price: product.productPrice,
                                                image: product.productImages[0],
                                            });
                                        }}
                                    >
                                        Add to cart
                                    </button>
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
                                </div>
                                <div className="shop-list-compare ml-10">
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
            {/* product modal */}
            {/* <ProductModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                product={product}
                currency={currency}
                discountedPrice={discountedPrice}
                finalProductPrice={finalProductPrice}
                finalDiscountedPrice={finalDiscountedPrice}
                wishlistItem={wishlistItem}
                compareItem={compareItem}
            /> */}
        </Fragment>
    );
};


export default ProductGridListSingle;
