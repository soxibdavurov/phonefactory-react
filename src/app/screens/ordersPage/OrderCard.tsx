import { ReactNode } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { serverApi } from "../../../lib/config";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { useTranslation } from "react-i18next";

type Props = {
    orders: Order[] | null | undefined;
    emptyText: string;
    actions?: (order: Order) => ReactNode;
};

const lineTotal = (item: OrderItem) => item.itemQuantity * item.itemPrice;

export default function OrderCardList({ orders, emptyText, actions }: Props) {
    const { t } = useTranslation();
    if (!orders || orders.length === 0) {
        return (
            <div className="order-empty">
                <p>{emptyText}</p>
                <Link to="/shop">{t("orders.browse")}</Link>
            </div>
        );
    }

    return (
        <div className="order-list">
            {orders.map((order) => {
                const products = (order.orderTotal - order.orderDelivery).toLocaleString();
                return (
                    <article className="order-card" key={order._id}>
                        <header className="order-card-head">
                            <div>
                                <p className="order-card-id">{t("nav.orders")} {String(order._id).slice(-6).toUpperCase()}</p>
                                {order.createdAt ? (
                                    <p className="order-card-date">{moment(order.createdAt).format("DD MMM YYYY, HH:mm")}</p>
                                ) : null}
                            </div>
                            <p className="order-card-total">{order.orderTotal.toLocaleString()}₩</p>
                        </header>

                        <div className="order-items">
                            {order.orderItems?.map((item) => {
                                const product: Product | undefined = order.productData?.find(
                                    (ele) => item.productId === ele._id
                                );
                                if (!product) {
                                    return (
                                        <div className="order-item" key={item._id}>
                                            <div className="order-item-photo order-item-missing" />
                                            <div>
                                                <p className="order-item-name">{t("orders.unavailable")}</p>
                                                <p className="order-item-meta">{item.itemQuantity} × {item.itemPrice.toLocaleString()}₩</p>
                                            </div>
                                            <p className="order-item-sum">{lineTotal(item).toLocaleString()}₩</p>
                                        </div>
                                    );
                                }
                                return (
                                    <div className="order-item" key={item._id}>
                                        <Link to={`/shop/${product._id}`}>
                                            <img
                                                src={`${serverApi}/${product.productImages?.[0]}`}
                                                alt={product.productName}
                                                className="order-item-photo"
                                            />
                                        </Link>
                                        <div>
                                            <Link className="order-item-name" to={`/shop/${product._id}`}>
                                                {product.productName}
                                            </Link>
                                            <p className="order-item-meta">
                                                {item.itemQuantity} × {item.itemPrice.toLocaleString()}₩
                                            </p>
                                        </div>
                                        <p className="order-item-sum">{lineTotal(item).toLocaleString()}₩</p>
                                    </div>
                                );
                            })}
                        </div>

                        <footer className="order-card-foot">
                            <div className="order-sums">
                                <span>{t("orders.products")} <strong>{products}₩</strong></span>
                                <span>{t("orders.delivery")} <strong>{order.orderDelivery.toLocaleString()}₩</strong></span>
                                <span>{t("orders.total")} <strong>{order.orderTotal.toLocaleString()}₩</strong></span>
                            </div>
                            {actions ? <div className="order-actions">{actions(order)}</div> : null}
                        </footer>
                    </article>
                );
            })}
        </div>
    );
}
