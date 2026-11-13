import { Fragment } from "react";
import { BreadcrumbWrap } from "../components/helpers/breadcrumbWrap";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
    const { pathname } = useLocation();
    const { t } = useTranslation();
    return (
        <>
            <Fragment>
                {/* breadcrumb */}
                <BreadcrumbWrap
                    pages={[
                        { label: String(t("nav.home")), path: process.env.PUBLIC_URL + "/" },
                        { label: String(t("notFound.title")), path: process.env.PUBLIC_URL + pathname }
                    ]}
                />
                <div className="error-area pt-40 pb-100">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-7 col-lg-8 text-center">
                                <div className="error">
                                    <img src="../../img/404page.jpg" height={"300px"} /> <br />
                                    <h2>{t("notFound.oops")}</h2>
                                    <p>{t("notFound.text")}</p>
                                    <form className="searchform mb-50">
                                        <input
                                            type="text"
                                            name="search"
                                            id="error_search"
                                            placeholder={String(t("notFound.search"))}
                                            className="searchform__input"
                                        />
                                        <button type="submit" className="searchform__submit">
                                            <i className="fa fa-search" />
                                        </button>
                                    </form>
                                    <Link to={process.env.PUBLIC_URL + "/"} className="error-btn">
                                        {t("notFound.back")}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment >
        </>
    );

}