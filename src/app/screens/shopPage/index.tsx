import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import Products from "./Products";
// import "../../../css/products.css";
import { CartItem } from "../../../lib/types/search";
import { BreadcrumbWrap } from "../../components/helpers/breadcrumbWrap";

interface ProductsPageProps {
    onAdd: (item: CartItem) => void;
}

export default function ShopPage(props: ProductsPageProps) {
    let { pathname } = useLocation();
    const { onAdd } = props;
    const shop = useRouteMatch();
    console.log("prod:", shop);

    return (
        <>
            <BreadcrumbWrap
                pages={[
                    { label: "Home", path: process.env.PUBLIC_URL + "/" },
                    { label: "Shop page", path: process.env.PUBLIC_URL + pathname },
                ]} />
            {/* <div className={"products-page"}> */}
            <Switch>
                <Route path={`${shop.path}/:productId`}>
                    <ProductDetail onAdd={onAdd} />
                </Route>
                <Route path={`${shop.path}`}>
                    <Products onAdd={onAdd} />
                </Route>
            </Switch>

            {/* </div> */}
        </>
    );
}