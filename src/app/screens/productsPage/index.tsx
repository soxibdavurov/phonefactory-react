import { BreadcrumbWrap } from "../../components/helpers/breadcrumbWrap";
import { useParams, useLocation } from "react-router-dom";

const Products = () => {
    let { pathname } = useLocation();
    return (
        <>
            <BreadcrumbWrap
                pages={[
                    { label: "Home", path: process.env.PUBLIC_URL + "/" },
                    { label: "Shop Product", path: process.env.PUBLIC_URL + pathname },
                ]}
            />
        </>
    );
};
export default Products;