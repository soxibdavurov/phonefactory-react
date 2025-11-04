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
import { useGlobals } from "../../stores/slices/useGlobals";
import { useHistory } from "react-router-dom";
import "../../../css/order.css";
import { Messages, serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

import { BreadcrumbWrap } from "../../components/helpers/breadcrumbWrap";
import { useLocation, Link } from "react-router-dom";
import useBasket from "../../stores/slices/useBasket";
import { CartItem } from "../../../lib/types/search";
import cogoToast from "cogo-toast";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

interface CartPageProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
}

export default function CartPage(props: CartPageProps) {
    const { pathname } = useLocation();
    const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
    const { authMember, setOrderBuilder } = useGlobals();
    const history = useHistory();
    const [value, setValue] = useState("1");
    const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
        page: 1,
        limit: 5,
        orderStatus: OrderStatus.PAUSE,
    });

    // 
    const proceedOrderHandler = async () => {
        try {
            if (!authMember) cogoToast.warn("Please, login first!", {
                position: "bottom-left",
            });

            const order = new OrderService();
            await order.createOrder(cartItems);

            onDeleteAll();
            setOrderBuilder(new Date());
            //Refresh via context
            history.push("/orders");


        } catch (err) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    }


    /* Handlers */
    const handleChange = (e: SyntheticEvent, newValue: string) => {
        setValue(newValue);
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

                                                            <td className="product-name" style={{ textAlign: "center" }}>
                                                                <Link style={{ display: "block" }}
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
                                                                {cartItem.discount > 0 ? (
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
                                                                    <button className="dec qtybutton" onClick={() => onRemove(cartItem)}>
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
                                                                        onClick={() => onAdd(cartItem)}
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td className="product-subtotal">
                                                                {discountedPrice > 0
                                                                    ?
                                                                    (
                                                                        discountedPrice * cartItem.quantity
                                                                    ).toLocaleString() + `₩`
                                                                    :
                                                                    (
                                                                        cartItem.price * cartItem.quantity
                                                                    ).toLocaleString() + `₩`}
                                                            </td>

                                                            <td className="product-remove">
                                                                <button
                                                                    onClick={() => onDelete(cartItem)}
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
                                            <button onClick={() => onDeleteAll()}>
                                                Clear Shopping Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
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
                                        {totalDiscount > 0 && (
                                            <h5 style={{ color: "#ff3d3d" }}>
                                                Discount:{" "}
                                                <span className="shop-total">
                                                    -{totalDiscount.toLocaleString()} ₩
                                                </span>
                                            </h5>
                                        )}



                                        <h4 className="grand-totall-title">
                                            Grand Total{" "}
                                            <span>
                                                {grandTotal.toLocaleString()} ₩
                                            </span>
                                        </h4>
                                        <Link
                                            onClick={(e) => {
                                                e.preventDefault();
                                                proceedOrderHandler();
                                            }}
                                            to={process.env.PUBLIC_URL + "/checkout"}>
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