import TabContext from "@mui/lab/TabContext";
import { Box, Button, Container, Input, Stack } from "@mui/material";
import { Fragment, SyntheticEvent, useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrdersService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import "../../../css/order.css";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

import { BreadcrumbWrap } from "../../components/helpers/breadcrumbWrap";
import { useLocation, Link } from "react-router-dom";
import useBasket from "../../hooks/useBasket";
import { CartItem } from "../../../lib/types/search";

export default function CartPage() {
    const { pathname } = useLocation();
    const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
    const { authMember, orderBuilder } = useGlobals();
    const history = useHistory();
    const [value, setValue] = useState("1");
    const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
        page: 1,
        limit: 5,
        orderStatus: OrderStatus.PAUSE,
    });


    // if (!authMember) history.push("/");



    /* Handlers */
    const handleChange = (e: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    // 🔁 faqat shu komponentda ishlatiladigan reload helper
    const reloadAfterToast = (delay = 700) => {
        if (typeof window !== "undefined") {
            setTimeout(() => window.location.reload(), delay);
        }
    };

    // 🧰 Wrapper handlerlar: hook funksiyasini chaqiramiz → keyin reload
    const onAddFromPaused = (item: CartItem) => {
        onAdd(item);
        reloadAfterToast();
    };
    const onRemoveFromPaused = (item: CartItem) => {
        onRemove(item);
        reloadAfterToast();
    };
    const onDeleteFromPaused = (item: CartItem) => {
        onDelete(item);
        reloadAfterToast();
    };
    const onDeleteAllFromPaused = () => {
        onDeleteAll();
        reloadAfterToast();
    };


    // 🧮 1️⃣ Umumiy narx (chegirmasiz)
    const originalTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    // 🧮 2️⃣ Chegirmali narx
    const discountedTotal = cartItems.reduce((total, item) => {
        const discountedPrice =
            item.discount && item.discount > 0
                ? item.price - item.discount
                : item.price;
        return total + item.quantity * discountedPrice;
    }, 0);

    // 🧮 3️⃣ Faqat chegirma miqdori (necha so‘m tejalgan)
    const totalDiscount = originalTotal - discountedTotal;

    // 🧮 4️⃣ Yetkazib berish (oddiy shart)
    const shippingCost = discountedTotal < 50000 ? 5000 : 0;

    // 🧮 5️⃣ Yakuniy umumiy summa
    const grandTotal = discountedTotal + shippingCost;


    return (
        <>
            <div>
                <BreadcrumbWrap
                    pages={[
                        { label: "Home", path: process.env.PUBLIC_URL + "/" },
                        { label: "Cart", path: process.env.PUBLIC_URL + pathname },
                    ]}
                />
            </div>

            <div className="cart-main-area pt-90 pb-100">
                <div className="container">
                    {cartItems && cartItems.length >= 1 ? (
                        <Fragment>
                            <h3 className="cart-page-title">Your cart items</h3>
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-content table-responsive cart-table-content">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Product Name</th>
                                                    <th>Unit Price</th>
                                                    <th>Qty</th>
                                                    <th>Subtotal</th>
                                                    <th>action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartItems.map((cartItem, key) => {
                                                    const imagePath = `${serverApi}/${cartItem.image}`;
                                                    const discountedPrice =
                                                        cartItem.discount && cartItem.discount > 0
                                                            ? cartItem.price - cartItem.discount
                                                            : cartItem.price;
                                                    return (
                                                        <tr key={key}>
                                                            <td className="product-thumbnail">
                                                                <Link
                                                                    to={
                                                                        process.env.PUBLIC_URL +
                                                                        "/shop/" +
                                                                        cartItem._id
                                                                    }
                                                                >
                                                                    <img
                                                                        className="img-fluid"
                                                                        src={
                                                                            process.env.PUBLIC_URL +
                                                                            imagePath
                                                                        }
                                                                        alt={cartItem.name}
                                                                    />
                                                                </Link>
                                                            </td>

                                                            <td className="product-name">
                                                                <Link
                                                                    to={
                                                                        process.env.PUBLIC_URL +
                                                                        "/shop/" +
                                                                        cartItem._id
                                                                    }
                                                                >
                                                                    {cartItem.name}
                                                                </Link>
                                                                {/* keyinchalik rang va o'lcham kiritilsa ishlataman */}
                                                                {/* {cartItem. &&
                                                   cartItem.selectedProductSize ? (
                                                   <div className="cart-item-variation">
                                                      <span>
                                                         Color: {cartItem.selectedProductColor}
                                                      </span>
                                                      <span>
                                                         Size: {cartItem.selectedProductSize}
                                                      </span>
                                                   </div>
                                                ) : (
                                                   ""
                                                )} */}
                                                            </td>

                                                            <td className="product-price-cart">
                                                                {discountedPrice !== null ? (
                                                                    <Fragment>
                                                                        <span className="amount old">
                                                                            {discountedPrice.toLocaleString()} ₩{" "}
                                                                        </span>
                                                                        <span className="amount">
                                                                            {cartItem.price.toLocaleString()} ₩
                                                                        </span>
                                                                    </Fragment>
                                                                ) : (
                                                                    <span className="amount">
                                                                        {cartItem.price.toLocaleString()} ₩
                                                                    </span>
                                                                )}
                                                            </td>

                                                            <td className="product-quantity">
                                                                <div className="cart-plus-minus">
                                                                    <button className="dec qtybutton" onClick={() => onRemoveFromPaused(cartItem)}>
                                                                        -
                                                                    </button>
                                                                    <input
                                                                        className="cart-plus-minus-box"
                                                                        type="text"
                                                                        value={cartItem.quantity}
                                                                        readOnly
                                                                    />
                                                                    <button
                                                                        className="inc qtybutton"
                                                                        onClick={() => onAddFromPaused(cartItem)}
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td className="product-subtotal">
                                                                {discountedPrice !== null
                                                                    ?
                                                                    (
                                                                        discountedPrice * cartItem.quantity
                                                                    ).toFixed() + `₩`
                                                                    :
                                                                    (
                                                                        cartItem.price * cartItem.quantity
                                                                    ).toFixed() + `₩`}
                                                            </td>

                                                            <td className="product-remove">
                                                                <button
                                                                    onClick={() => onDeleteFromPaused(cartItem)}
                                                                >
                                                                    <i className="fa fa-times"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="cart-shiping-update-wrapper">
                                        <div className="cart-shiping-update">
                                            <Link
                                                to={process.env.PUBLIC_URL + "/shop"}
                                            >
                                                Continue Shopping
                                            </Link>
                                        </div>
                                        <div className="cart-clear">
                                            <button onClick={() => onDeleteAllFromPaused()}>
                                                Clear Shopping Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-4 col-md-6">
                                    <div className="cart-tax">
                                        <div className="title-wrap">
                                            <h4 className="cart-bottom-title section-bg-gray">
                                                Estimate Shipping And Tax
                                            </h4>
                                        </div>
                                        <div className="tax-wrapper">
                                            <p>
                                                Enter your destination to get a shipping estimate.
                                            </p>
                                            <div className="tax-select-wrapper">
                                                <div className="tax-select">
                                                    <label>* Country</label>
                                                    <select className="email s-email s-wid">
                                                        <option>Bangladesh</option>
                                                        <option>Albania</option>
                                                        <option>Åland Islands</option>
                                                        <option>Afghanistan</option>
                                                        <option>Belgium</option>
                                                    </select>
                                                </div>
                                                <div className="tax-select">
                                                    <label>* Region / State</label>
                                                    <select className="email s-email s-wid">
                                                        <option>Bangladesh</option>
                                                        <option>Albania</option>
                                                        <option>Åland Islands</option>
                                                        <option>Afghanistan</option>
                                                        <option>Belgium</option>
                                                    </select>
                                                </div>
                                                <div className="tax-select">
                                                    <label>* Zip/Postal Code</label>
                                                    <input type="text" />
                                                </div>
                                                <button className="cart-btn-2" type="submit">
                                                    Get A Quote
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-6">
                                    <div className="discount-code-wrapper">
                                        <div className="title-wrap">
                                            <h4 className="cart-bottom-title section-bg-gray">
                                                Use Coupon Code
                                            </h4>
                                        </div>
                                        <div className="discount-code">
                                            <p>Enter your coupon code if you have one.</p>
                                            <form>
                                                <input type="text" required name="name" />
                                                <button className="cart-btn-2" type="submit">
                                                    Apply Coupon
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-12">
                                    <div className="grand-totall">
                                        <div className="title-wrap">
                                            <h4 className="cart-bottom-title section-bg-gary-cart">
                                                Cart Total
                                            </h4>
                                        </div>
                                        <h5>
                                            Subtotal:{" "}
                                            <span className="shop-total">
                                                {originalTotal.toLocaleString()} ₩
                                            </span>
                                        </h5>

                                        <h4 className="grand-totall-title">
                                            Grand Total{" "}
                                            <span>
                                                {originalTotal.toFixed(2)}
                                            </span>
                                        </h4>
                                        <Link to={process.env.PUBLIC_URL + "/checkout"}>
                                            Proceed to Checkout
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    ) : (
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="item-empty-area text-center">
                                    <div className="item-empty-area__icon mb-30">
                                        <i className="pe-7s-cart"></i>
                                    </div>
                                    <div className="item-empty-area__text">
                                        No items found in cart <br />{" "}
                                        <Link to={process.env.PUBLIC_URL + "/shop"}>
                                            Shop Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>


        </>
    )
}