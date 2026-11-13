import { useState } from "react";
import { CartItem } from "../../../lib/types/search";
import cogoToast from "cogo-toast";
import i18n from "../../../i18n";

const useBasket = () => {
  const cartJson: string | null = localStorage.getItem("cartData");
  const currentCart = cartJson ? JSON.parse(cartJson) : [];
  const [cartItems, setCartItems] = useState<CartItem[]>(currentCart);

  const onAdd = (input: CartItem) => {
    const addQty = input.quantity > 0 ? input.quantity : 1;
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id
    );
    if (exist) {
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity + addQty }
          : item
      );
      setCartItems(cartUpdate);
      cogoToast.success(String(i18n.t("toast.qtyUp")), { position: "bottom-left" });
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = [...cartItems, { ...input }];
      setCartItems(cartUpdate);
      cogoToast.success(String(i18n.t("toast.added")), { position: "bottom-left" });
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };
  const onRemove = (input: CartItem) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id
    );
    if (exist.quantity === 1) {
      const cartUpdate = cartItems.filter(
        (item: CartItem) => item._id !== input._id
      );
      setCartItems(cartUpdate);
      cogoToast.error(String(i18n.t("toast.removed")), { position: "bottom-left" });
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity - 1 }
          : item
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
      cogoToast.warn(String(i18n.t("toast.qtyDown")), { position: "bottom-left" });
    }
  };
  const onDelete = (input: CartItem) => {
    const cartUpdate = cartItems.filter(
      (item: CartItem) => item._id !== input._id
    );
    setCartItems(cartUpdate);
    cogoToast.error(String(i18n.t("toast.removed")), { position: "bottom-left" });
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };
  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cartData");
    cogoToast.info(String(i18n.t("toast.cleared")), { position: "bottom-left" });
  };
  return {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
  };
};
export default useBasket;
