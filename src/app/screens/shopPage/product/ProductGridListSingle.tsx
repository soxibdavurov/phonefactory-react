import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
// import ProductModal from "./ProductModal";
import { Product } from "../../../../lib/types/product";
import { CartItem } from "../../../../lib/types/search";
import { serverApi } from "../../../../lib/config";
import { LikeButton } from "../../../components/engagement/Engagement";
import { Badge } from "@mui/material";
import ProductRating from "../../homePage/productRating1";
import { addToCompare } from "../../../stores/slices/compare-slice";
import { RootState } from "../../../stores/store";
import { useTranslation } from "react-i18next";

type Props = {
    product: Product;
    onAdd: (item: CartItem) => void;
    imageHeight: string;
};

const ProductGridListSingle = ({ product, onAdd, imageHeight }: Props) => {
    const { t } = useTranslation();
    const compareItems = useSelector((state: RootState) => state.comparison.compareItems) ?? [];
    const compareItem = compareItems.find((item) => item._id === product._id);

    const dispatch = useDispatch();

    const [modalShow, setModalShow] = useState(false);
    const imagePath = `${serverApi}/${product.productImages[0]}`;
    const imagePath2 = `${serverApi}/${product.productImages[1]}`;
    const history = useHistory();
    const chooseMobileshopHandler = (id: string) => {
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
                    {Number(product.productDiscount) > 0 || product.isNew ? (
                        <div className="product-img-badges">
                            {Number(product.productDiscount) > 0 ? (
                                <span className="pink">-{Number(product.productDiscount).toLocaleString()}₩</span>
                            ) : null}
                            {product.isNew ? <span className="purple">{t("product.new")}</span> : null}
                        </div>
                    ) : null}

                    <div className="product-action">
                        <div className="pro-same-action pro-compare">
                            <button
                                className={compareItem !== undefined ? "active" : ""}
                                disabled={compareItem !== undefined}
                                title={
                                    compareItem !== undefined
                                        ? String(t("product.addedCompare"))
                                        : String(t("product.addCompare"))
                                }
                                onClick={() => dispatch(addToCompare(
                                    {
                                        _id: product._id,
                                        discount: product.productDiscount,
                                        name: product.productName,
                                        rating: product.productRate,
                                        description: product.productDesc,
                                        price: product.productPrice,
                                        image: product.productImages[0],
                                    }
                                ))}
                            >
                                {compareItem !== undefined ? t("product.added") : t("product.compare")}
                            </button>
                        </div>
                        <div className="pro-same-action pro-cart">
                            <button
                                disabled={product.productLeftCount <= 0}
                                title={product.productLeftCount > 0 ? String(t("product.addToCart")) : String(t("product.outOfStock"))}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (product.productLeftCount <= 0) return;
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
                                title={String(t("product.quickView"))}
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
                        <Link to={`/shop/${product._id}`} onClick={() => chooseMobileshopHandler(product._id)}>
                            {product.productName}
                        </Link>
                    </h3>
                    <div className="product-rating">
                        <ProductRating ratingValue={product.productRate ?? 0} />
                    </div>
                    <div className="product-price">
                        {Number(product.productDiscount) > 0 ? (
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
                    <div className="pf-card-actions">
                        <LikeButton
                            targetId={product._id}
                            targetType="PRODUCT"
                            initialLiked={product.liked}
                            initialCount={product.likeCount}
                        />
                        <Link to={`/shop/${product._id}`}>
                            <i className="fa fa-comments-o" /> {product.commentCount || 0}
                        </Link>
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
                                {Number(product.productDiscount) > 0 || product.isNew ? (
                                    <div className="product-img-badges">
                                        {Number(product.productDiscount) > 0 ? (
                                            <span className="pink">-{Number(product.productDiscount).toLocaleString()}₩</span>
                                        ) : null}
                                        {product.isNew ? <span className="purple">{t("product.new")}</span> : null}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 col-md-7 col-sm-6">
                        <div className="shop-list-content">
                            <h3>
                                <Link to={`/shop/${product._id}`} onClick={() => chooseMobileshopHandler(product._id)}>
                                    {product.productName}
                                </Link>
                            </h3>
                            <div className="product-list-price">
                                {Number(product.productDiscount) > 0 ? (
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
                                        disabled={product.productLeftCount <= 0}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (product.productLeftCount <= 0) return;
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
                                        {product.productLeftCount > 0 ? t("product.addToCart") : t("product.outOfStock")}
                                    </button>
                                </div>
                                <div className="shop-list-compare ml-10">
                                    <button
                                        className={compareItem !== undefined ? "active" : ""}
                                        disabled={compareItem !== undefined}
                                        title={
                                            compareItem !== undefined
                                                ? String(t("product.addedCompare"))
                                                : String(t("product.addCompare"))
                                        }
                                        onClick={() => dispatch(addToCompare(
                                            {
                                                _id: product._id,
                                                discount: product.productDiscount,
                                                name: product.productName,
                                                rating: product.productRate,
                                                description: product.productDesc,
                                                price: product.productPrice,
                                                image: product.productImages[0],
                                            }
                                        ))}
                                    >
                                        <i className="pe-7s-shuffle" />
                                        <span>{compareItem !== undefined ? t("product.added") : t("product.compare")}</span>
                                    </button>
                                </div>
                                <div className="ml-10">
                                    <LikeButton
                                        targetId={product._id}
                                        targetType="PRODUCT"
                                        initialLiked={product.liked}
                                        initialCount={product.likeCount}
                                    />
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
                                                ? String(t("product.addedCompare"))
                                                : String(t("product.addCompare"))
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
