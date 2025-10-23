import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import Rating from "../../screens/homePage/ProductRating";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
type Props = {
    ele: Product;
    onAdd: (item: CartItem) => void;
};

const SingleProductList = ({ ele, onAdd }: Props) => {
    const [modalShow, setModalShow] = useState(false);
    const imagePath = `${serverApi}/${ele.productImages[0]}`;
    const imagePath2 = `${serverApi}/${ele.productImages[1]}`;
    const finalProductPrice = (ele.productPrice - ele.productDiscount).toFixed(2);
    const dispatch = useDispatch();
    const history = useHistory();
    const chooSeSMARTPHONEHandler = (id: string) => {
        history.push(`/shop/${id}`);
    };
    return (
        <>
            <div className="col-xl-4 col-lg-5 col-md-5 col-sm-6">
                <div className="product-wrap" onClick={() => chooSeSMARTPHONEHandler(ele._id)}>
                    <div className="product-img">
                        <Link to={`/product/${ele._id}`}>
                            <img alt={ele.productName} loading="lazy"
                                className="default-img"
                                src={imagePath}
                                height={"300px"}
                            />
                            {ele.productImages.length > 1 ? (
                                <img alt={ele.productName} loading="lazy"
                                    className="hover-img"
                                    src={imagePath2}
                                    height={"300px"}
                                />
                            ) : (
                                ""
                            )}
                        </Link>
                        {ele.productDiscount || ele.isNew ? (
                            <div className="product-img-badges">
                                {ele.productDiscount ? (
                                    <span className="pink">-{ele.productDiscount.toLocaleString()}₩</span>
                                ) : (
                                    ""
                                )}
                                {ele.isNew ? <span className="purple">New</span> : ""}
                            </div>
                        ) : (
                            ""
                        )}

                    </div>
                </div>
            </div>
            <div className="col-xl-8 col-lg-7 col-md-7 col-sm-6">
                <div className="shop-list-content">
                    <h3>
                        <Link to={"/product/" + ele._id}>
                            {ele.productName}
                        </Link>
                    </h3>
                    <div className="product-list-price">
                        {ele.productDiscount !== 0 || null ? (
                            <Fragment>
                                <span>{(ele.productPrice - ele.productDiscount).toLocaleString()}₩</span>{" "}
                                <span className="old">
                                    {ele.productPrice.toLocaleString()}₩
                                </span>
                            </Fragment>
                        ) : (
                            <span>{ele.productPrice.toLocaleString()}₩</span>
                        )}
                    </div>
                    <div className="rating-review">
                        <div className="product-list-rating">
                            <Rating ratingValue={ele.productRate ?? 0} />
                        </div>
                    </div>
                    {ele.productDesc ? (
                        <p>{ele.productDesc}</p>
                    ) : (
                        ""
                    )}

                    <div className="shop-list-actions d-flex align-items-center">
                        <div className="shop-list-btn btn-hover">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAdd({
                                        _id: ele._id,
                                        quantity: 1,
                                        discount: ele.productDiscount,
                                        name: ele.productName,
                                        price: ele.productPrice,
                                        image: ele.productImages[0],
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
        </>
    );

};

export default SingleProductList;