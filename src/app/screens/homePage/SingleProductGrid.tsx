import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { LikeButton } from "../../components/engagement/Engagement";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@mui/material";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import ProductRating from "./productRating1";
import { RootState } from "../../stores/store";
import { addToCompare } from "../../stores/slices/compare-slice";
import { useTranslation } from "react-i18next";
type Props = {
    ele: Product;
    onAdd: (item: CartItem) => void;
};

const SingleProductGrid = ({ ele, onAdd }: Props) => {
    const { t } = useTranslation();
    const compareItems = useSelector((state: RootState) => state.comparison.compareItems) ?? [];
    const compareItem = compareItems.find((item) => item._id === ele._id);

    const [modalShow, setModalShow] = useState(false);
    const imagePath = `${serverApi}/${ele.productImages[0]}`;
    const imagePath2 = `${serverApi}/${ele.productImages[1]}`;
    const dispatch = useDispatch();
    const history = useHistory();
    const chooseMobileshopHandler = (id: string) => {
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
                {Number(ele.productDiscount) > 0 || ele.isNew ? (
                    <div className="product-img-badges">
                        {Number(ele.productDiscount) > 0 ? (
                            <span className="pink">-{Number(ele.productDiscount).toLocaleString()}₩</span>
                        ) : null}
                        {ele.isNew ? <span className="purple">{t("product.new")}</span> : null}
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
                            {compareItem !== undefined ? t("product.added") : t("product.compare")}
                        </button>
                    </div>
                    <div className="pro-same-action pro-cart">
                        <button
                            disabled={ele.productLeftCount <= 0}
                            title={ele.productLeftCount > 0 ? String(t("product.addToCart")) : String(t("product.outOfStock"))}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (ele.productLeftCount <= 0) return;
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
                            title={String(t("product.quickView"))}
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
                    <Link to={`/shop/${ele._id}`} onClick={() => chooseMobileshopHandler(ele._id)}>
                        {ele.productName}
                    </Link>
                </h3>
                <div className="product-rating">
                    <ProductRating ratingValue={ele.productRate ?? 0} />
                </div>
                <div className="product-price">
                    {Number(ele.productDiscount) > 0 ? (
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
                <div className="pf-card-actions">
                    <LikeButton
                        targetId={ele._id}
                        targetType="PRODUCT"
                        initialLiked={ele.liked}
                        initialCount={ele.likeCount}
                    />
                    <Link to={`/shop/${ele._id}`}>
                        <i className="fa fa-comments-o" /> {ele.commentCount || 0}
                    </Link>
                </div>
                {/* </div> */}
            </div>
        </div >
    );

};

export default SingleProductGrid;