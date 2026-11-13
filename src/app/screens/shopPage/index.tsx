import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import Products from "./Products";
// import "../../../css/products.css";
import { CartItem } from "../../../lib/types/search";
import { BreadcrumbWrap } from "../../components/helpers/breadcrumbWrap";
import { useTranslation } from "react-i18next";


interface ProductsPageProps {
    onAdd: (item: CartItem) => void;
}

export default function ShopPage(props: ProductsPageProps) {
    let { pathname } = useLocation();
    const { t } = useTranslation();
    const { onAdd } = props;
    const shop = useRouteMatch();
    console.log("prod:", shop);

    return (
        <>
            <BreadcrumbWrap
                pages={[
                    { label: String(t("nav.home")), path: process.env.PUBLIC_URL + "/" },
                    { label: String(t("shop.page")), path: process.env.PUBLIC_URL + pathname },
                ]} />
            {/* <div className={"products-page"}> */}
            <Switch>
                <Route path={`${shop.path}/:productId`}>
                    <ProductDetail onAdd={onAdd} />
                </Route>
                <Route path={`${shop.path}`}>
                    <Products onAdd={onAdd} />
                </Route>
                {/* <Route path={`${shop.path}/:productId`}>
                    <ProductTabRight />
                </Route> */}
            </Switch>

            {/* </div> */}
        </>
    );
}