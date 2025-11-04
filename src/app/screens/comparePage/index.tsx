import { useDispatch, useSelector } from "react-redux";
import { BreadcrumbWrap } from "../../components/helpers/breadcrumbWrap";
import { useLocation, Link } from "react-router-dom";
import { deleteFromCompare } from "../../stores/slices/compare-slice";
import { RootState } from "../../stores/store";
import ProductRating from "../homePage/productRating1";
import { Fragment } from "react";
import { CartItem } from "../../../lib/types/search";
import { CompareItem } from "../../../lib/types/compare";
import { serverApi } from "../../../lib/config";

interface ComparePageProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
}

export default function ComparePage(props: ComparePageProps) {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const { cartItems, onAdd } = props;
    const compareItems = useSelector((s: RootState) => s.comparison.compareItems);

    return (
        <div>
            <BreadcrumbWrap
                pages={[
                    { label: "Home", path: process.env.PUBLIC_URL + "/" },
                    { label: "Compare", path: process.env.PUBLIC_URL + pathname },
                ]}
            />

            <div className="compare-main-area pt-90 pb-100">
                <div className="container">
                    {compareItems && compareItems.length >= 1 ? (
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="compare-page-content">
                                    <div className="compare-table table-responsive">
                                        <table className="table table-bordered mb-0">
                                            <tbody>
                                                <tr>
                                                    <th className="title-column">Product Info</th>
                                                    {compareItems.map((compareItem) => {
                                                        const cartItem = cartItems.find(
                                                            (ci) => ci._id === compareItem._id
                                                        );
                                                        return (
                                                            <td className="product-image-title" key={compareItem._id}>
                                                                <div className="compare-remove">
                                                                    <button
                                                                        onClick={() => dispatch(deleteFromCompare(compareItem._id))}
                                                                    >
                                                                        <i className="pe-7s-trash" />
                                                                    </button>
                                                                </div>

                                                                <Link
                                                                    to={`${process.env.PUBLIC_URL}/shop/${compareItem._id}`}

                                                                >
                                                                    <img
                                                                        src={`${serverApi}/${compareItem.image}`}
                                                                        alt={compareItem.name}
                                                                        width={"200px"}
                                                                        height={"150px"}
                                                                        style={{ objectFit: "cover" }}
                                                                    />
                                                                </Link>

                                                                <div className="product-title">
                                                                    <Link to={`${process.env.PUBLIC_URL}/shop/${compareItem._id}`}>
                                                                        {compareItem.name}
                                                                    </Link>
                                                                </div>

                                                                <div className="compare-btn">
                                                                    <button
                                                                        onClick={() =>
                                                                            onAdd({
                                                                                _id: compareItem._id,
                                                                                quantity: 1,
                                                                                discount: compareItem.discount,
                                                                                name: compareItem.name,
                                                                                price: compareItem.price,
                                                                                image: compareItem.image,
                                                                            })
                                                                        }
                                                                        className={cartItem && cartItem.quantity > 0 ? "active" : ""}
                                                                        disabled={!!(cartItem && cartItem.quantity > 0)}
                                                                        title={cartItem && cartItem.quantity > 0 ? "Added to cart" : "Add to cart"}
                                                                    >
                                                                        {cartItem && cartItem.quantity > 0 ? "Added" : "Add to cart"}
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        );
                                                    })}
                                                </tr>

                                                <tr>
                                                    <th className="title-column">Price</th>
                                                    {compareItems.map((compareItem) => {
                                                        const hasDiscount = !!compareItem.discount;
                                                        const finalPrice = compareItem.price - (compareItem.discount || 0);
                                                        return (
                                                            <td className="product-price" key={compareItem._id}>
                                                                {hasDiscount ? (
                                                                    <Fragment>
                                                                        <span className="amount old">
                                                                            {compareItem.price.toLocaleString()}₩
                                                                        </span>
                                                                        <span className="amount">
                                                                            {finalPrice.toLocaleString()}₩
                                                                        </span>
                                                                    </Fragment>
                                                                ) : (
                                                                    <span className="amount">
                                                                        {compareItem.price.toLocaleString()}₩
                                                                    </span>
                                                                )}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>

                                                <tr>
                                                    <th className="title-column">Description</th>
                                                    {compareItems.map((compareItem) => (
                                                        <td className="product-desc" key={compareItem._id}>
                                                            <p>{compareItem.description ?? "N/A"}</p>
                                                        </td>
                                                    ))}
                                                </tr>

                                                <tr>
                                                    <th className="title-column">Rating</th>
                                                    {compareItems.map((compareItem) => (
                                                        <td className="product-rating" key={compareItem._id}>
                                                            <ProductRating ratingValue={compareItem.rating ?? 0} />
                                                        </td>
                                                    ))}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="item-empty-area text-center">
                                    <div className="item-empty-area__icon mb-30">
                                        <i className="pe-7s-shuffle"></i>
                                    </div>
                                    <div className="item-empty-area__text">
                                        No items found in compare <br />
                                        <Link to={process.env.PUBLIC_URL + "/shop"}>Add Items</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
