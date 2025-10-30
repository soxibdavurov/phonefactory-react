import React, { Fragment } from "react";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { T } from "../../../lib/types/common";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrdersService";
import { Link } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import useBasket from "../../hooks/useBasket";


/* REDUX SLIC & SELECTOR */

const pausedOrdersRetriever = createSelector(
   retrievePausedOrders,
   (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
   setValue: (input: string) => void;
}


export default function PausedOrders(props: PausedOrdersProps) {
   const { setValue } = props;
   const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
   const { authMember, setOrderBuilder } = useGlobals();
   const { pausedOrders } = useSelector(pausedOrdersRetriever);

   /** HANDLERS */

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


   const deleteOrderHandler = async (e: T) => {
      try {
         if (!authMember) throw new Error(Messages.error2);
         const orderId = e.target.value;
         const input: OrderUpdateInput = {
            orderId: orderId,
            orderStatus: OrderStatus.DELETE,
         };

         const confirmation = window.confirm("Do you want to delete order?");
         if (confirmation) {
            const order = new OrderService();
            await order.updateOrder(input);

            setOrderBuilder(new Date());
            //ORDER REBUILD
         }
      }
      catch (err) {
         console.log(err);
         sweetErrorHandling(err).then();
      }
   };

   const processOrderHandler = async (e: T) => {
      try {
         if (!authMember) throw new Error(Messages.error2);

         /* PAYMENT PROCESS*/

         const orderId = e.target.value;
         const input: OrderUpdateInput = {
            orderId: orderId,
            orderStatus: OrderStatus.PROCESS,
         };

         const confirmation = window.confirm("Do you want to proceed with payment?");
         if (confirmation) {
            const order = new OrderService();
            await order.updateOrder(input);

            setValue("2");

            setOrderBuilder(new Date());
            //ORDER REBUILD
         }
      }
      catch (err) {
         console.log(err);
         sweetErrorHandling(err).then();
      }
   };

   return (
      <TabPanel value={"1"}>
         <Stack>
            {pausedOrders?.map((order: Order) => {
               return (
                  <Box key={order._id} className={"order-main-box"}>
                     <Box className="order-box-scroll">
                        {order?.orderItems?.map((item: OrderItem) => {
                           const product: Product = order.productData.filter((ele: Product) =>
                              item.productId === ele._id
                           )[0];
                           const imagePath = `${serverApi}/${product.productImages[0]}`;
                           return (
                              <Box key={item._id} className={"order-name-price"}>
                                 <img src={imagePath} className={"order-dish-img"} />
                                 <Stack sx={{
                                    width: 650,
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                 }}>

                                    <p className={"title-dish"}>{product.productName}</p>
                                    <Box className={"price-box"}>
                                       <p>${item.itemPrice}</p>
                                       < img src={"/icons/close.svg"} />
                                       <p>{item.itemQuantity}</p>
                                       < img src={"/icons/pause.svg"} />
                                       <p style={{ marginLeft: "15px" }}>${item.itemQuantity * item.itemPrice}</p>
                                    </Box>
                                 </Stack>
                              </Box>
                           );
                        })}
                     </Box>

                     <Box className={"total-price-box"}>
                        <Box className={"box-total"}>
                           <p>Product price</p>
                           <p>${order.orderTotal - order.orderDelivery}</p>
                           <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                           <p>${order.orderDelivery}</p>
                           <img
                              src={"/icons/pause.svg"}
                              style={{ marginLeft: "20px" }}
                           />
                           <p>Total</p>
                           <p>${order.orderTotal}</p>
                        </Box>
                        <Button
                           variant="contained"
                           color="secondary"
                           className={"cancel-button"}
                           onClick={deleteOrderHandler}
                           value={order._id}
                        >
                           Cancel
                        </Button>
                        <Button
                           value={order._id}
                           variant="contained"
                           className={"pay-button"}
                           onClick={processOrderHandler}
                        >
                           Payment
                        </Button>
                     </Box>
                  </Box>
               );
            })}

            {!pausedOrders || (pausedOrders.length === 0 && (
               <Box display={"flex"} flexDirection={"row"} justify-content={"center"}>


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
               </Box>

            ))}

         </Stack>


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

      </TabPanel>
   )
}