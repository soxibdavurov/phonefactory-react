import { combineReducers } from "@reduxjs/toolkit";
import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";
import ProductPageReducer from "./screens/shopPage/slice";
import reduxLogger from "redux-logger";
import OrdersPageReducer from "./screens/ordersPage/slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "./stores/slices/product-slice";
import currencyReducer from "./stores/slices/currency-slice";
import cartReducer from "./stores/slices/cart-slice";
import comparisonReducer from "./hooks/compare-slice";
import wishlistReducer from "./stores/slices/wishlist-slice";

const persistConfig = {
  key: "flone",
  version: 1.1,
  storage,
  blacklist: ["product"],
};

export const rootReducer = combineReducers({
  product: productReducer,
  currency: currencyReducer,
  cart: cartReducer,
  comparison: comparisonReducer,
  wishlist: wishlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persistedReducer,
    homePage: HomePageReducer,
    productsPage: ProductPageReducer,
    ordersPage: OrdersPageReducer,
    comparison: comparisonReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
