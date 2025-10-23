import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import Rating from "../../screens/homePage/ProductRating";
import { useDispatch } from "react-redux";
import { addToCart } from "../../stores/slices/cart-slice";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Badge } from "@mui/material";

import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
type Props = {
    ele: Product;
    imageHeight?: string;
    onAdd: (item: CartItem) => void;
};

const SingleProductColumns = ({ ele, imageHeight, onAdd }: Props) => {
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
            <div className="product-wrap mb-25" >
                <div className="product-img">
                    <Link to={`/shop/${ele._id}`} >
                        <img alt={ele.productName} loading="lazy"
                            className="default-img"
                            src={imagePath}
                            height={imageHeight}
                        />
                        {ele.productImages.length > 1 ? (
                            <img alt={ele.productName} loading="lazy"
                                className="hover-img"
                                src={imagePath2}
                                height={imageHeight}
                            />
                        ) : (
                            ""
                        )}
                    </Link>
                    {ele.productDiscount || ele.isNew ? (
                        <div className="product-img-badges">
                            {ele.productDiscount ? (
                                <span className="pink">-{ele.productDiscount}</span>
                            ) : (
                                ""
                            )}
                            {ele.isNew ? <span className="purple">New</span> : ""}
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
                                        _id: ele._id,
                                        quantity: 1,
                                        discount: ele.productDiscount,
                                        name: ele.productName,
                                        price: ele.productPrice,
                                        image: ele.productImages[0],
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
                                badgeContent={ele.productViews}
                                color="primary"
                            >
                                    <i className="pe-7s-look" />

                                </Badge>
                            </button>
                        </div>
                        {/* <button
                                  onClick={() => dispatch(addToCart(ele))}
                                  className="active"
                                  title="Add to cart"
                                >
                                  <i className="fa fa-shopping-cart" />
                                </button> */}
                    </div>
                </div>
                <div className="product-content text-center">
                    {/* <div className="title-price-wrap-2"> */}
                    <h3>
                        <Link to={`/shop/${ele._id}`} onClick={() => chooSeSMARTPHONEHandler(ele._id)}>
                            {ele.productName}
                        </Link>
                    </h3>
                    <div className="product-rating">
                        <Rating ratingValue={ele.productRate ?? 0} />
                    </div>
                    <div className="product-price">
                        {ele.productDiscount !== 0 || null ? (
                            <Fragment>
                                <span>{ele.productPrice - ele.productDiscount}₩</span>{" "}
                                <span className="old">
                                    {ele.productPrice}₩
                                </span>
                            </Fragment>
                        ) : (
                            <span>{ele.productPrice}₩</span>
                        )}
                    </div>
                    {/* </div> */}
                </div>
            </div>



        </>
    );

};

export default SingleProductColumns;