import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteFromCart } from "../../../stores/slices/cart-slice";
import { CartItem } from "../../../../lib/types/search";
import { serverApi } from "../../../../lib/config";

interface MenuCartProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function MenuCart(props: MenuCartProps) {
  const { cartItems, onAdd, onRemove, onDelete } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
    <div className="shopping-cart-content">
      {cartItems && cartItems.length > 0 ? (
        <Fragment>
          <ul>
            {cartItems.map((item) => {
              const imagePath = `${serverApi}/${item.image}`;
              const discountedPrice =
                item.discount && item.discount > 0
                  ? item.price - item.discount
                  : item.price;

              return (
                <li className="single-shopping-cart" key={item._id}>
                  <div className="shopping-cart-img">
                    <Link to={`/shop/${item._id}`}>
                      <img alt={item.name} src={imagePath} className="img-fluid" />
                    </Link>
                  </div>

                  <div className="shopping-cart-title">
                    <h4>
                      <Link to={`/shop/${item._id}`}>{item.name}</Link>
                    </h4>

                    <h6 style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      Qty:
                      <button
                        onClick={() => onRemove(item)}
                        style={{ position: "relative", top: "2px" }}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() => onAdd(item)}
                        style={{ position: "relative", top: "2px" }}
                      >
                        +
                      </button>
                    </h6>

                    <span>
                      {discountedPrice.toLocaleString()} ₩{" "}
                      {item.discount ? (
                        <del
                          style={{
                            color: "#999",
                            fontSize: "13px",
                            marginLeft: "5px",
                          }}
                        >
                          {item.price.toLocaleString()} ₩
                        </del>
                      ) : null}
                    </span>
                  </div>

                  <div className="shopping-cart-delete">
                    <button onClick={() => onDelete(item)}>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* 🔹 Chegirmalar va total summani ko‘rsatish qismi */}
          <div className="shopping-cart-total">
            <h4>
              Subtotal:{" "}
              <span className="shop-total">
                {originalTotal.toLocaleString()} ₩
              </span>
            </h4>

            {totalDiscount > 0 && (
              <h4 style={{ color: "#ff3d3d" }}>
                Discount:{" "}
                <span className="shop-total">
                  -{totalDiscount.toLocaleString()} ₩
                </span>
              </h4>
            )}

            <h4>
              Shipping:{" "}
              <span className="shop-total">
                {shippingCost > 0
                  ? `${shippingCost.toLocaleString()} ₩`
                  : "Free"}
              </span>
            </h4>

            <hr />

            <h4>
              Total
              <span className="shop-total" style={{ fontWeight: 700 }}>
                {grandTotal.toLocaleString()} ₩
              </span>
            </h4>
          </div>

          <div
            className="shopping-cart-btn btn-hover text-center"
            style={{ display: "flex", justifyContent: "center", gap: "5px" }}
          >
            <Link className="default-btn" to="/cart">
              View Cart
            </Link>
            <Link className="default-btn" to="/checkout">
              Checkout
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
}
