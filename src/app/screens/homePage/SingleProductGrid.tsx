import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@mui/material";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import ProductRating from "./productRating1";
import { RootState } from "../../stores/store";
import { addToCompare } from "../../stores/slices/compare-slice";
type Props = {
    ele: Product;
    onAdd: (item: CartItem) => void;
};

const SingleProductGrid = ({ ele, onAdd }: Props) => {
    const compareItems = useSelector((state: RootState) => state.comparison.compareItems) ?? [];
    const compareItem = compareItems.find((item) => item._id === ele._id);

    const [modalShow, setModalShow] = useState(false);
    const imagePath = `${serverApi}/${ele.productImages[0]}`;
    const imagePath2 = `${serverApi}/${ele.productImages[1]}`;
    const dispatch = useDispatch();
    const history = useHistory();
    const chooSeSMARTPHONEHandler = (id: string) => {
        history.push(`/shop/${id}`);
    };
    return (
        <div className="product-wrap">
            <div className="product-img" >

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

                <div className="product-action">
                    <div className="pro-same-action pro-wishlist">
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
                                    _id: ele._id,
                                    discount: ele.productDiscount,
                                    name: ele.productName,
                                    rating: ele.productRate,
                                    description: ele.productDesc,
                                    price: ele.productPrice,
                                    image: ele.productImages[0],
                                }
                            ))}
                        >
                            <i className="pe-7s-shuffle" />
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
                    <ProductRating ratingValue={ele.productRate ?? 0} />
                </div>
                <div className="product-price">
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
                {/* </div> */}
            </div>
        </div >
    );

};

export default SingleProductGrid;