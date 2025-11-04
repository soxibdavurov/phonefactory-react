import { Fragment } from "react"
import { Link } from "react-router-dom";

export default function BlogPosts() {
    return (
        <Fragment>
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="blog-wrap-2 mb-30">
                    <div className="blog-img-2">
                        <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                            <img
                                src={process.env.PUBLIC_URL + "../img/blog/sim.png"}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="blog-content-2">
                        <div className="blog-meta-2">
                            <ul>
                                <li>5 November, 2025</li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                                        2 <i className="fa fa-comments-o" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <h4>
                            <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                                A guide to purchase SIM card
                            </Link>
                        </h4>
                        <p>
                            Aenean sollicitudin, lorem quis on endum uctor nisi elitod the
                            cona sequat ipsum, necas sagittis sem natoque nibh id penatibus
                        </p>
                        <div className="blog-share-comment">
                            <div className="blog-btn-2">
                                <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                                    read more
                                </Link>
                            </div>
                            <div className="blog-share">
                                <span>share :</span>
                                <div className="share-social">
                                    <ul>
                                        <li>
                                            <a className="facebook" href="//facebook.com">
                                                <i className="fa fa-facebook" />
                                            </a>
                                        </li>
                                        <li>
                                            <a className="twitter" href="//twitter.com">
                                                <i className="fa fa-twitter" />
                                            </a>
                                        </li>
                                        <li>
                                            <a className="instagram" href="//instagram.com">
                                                <i className="fa fa-instagram" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="blog-wrap-2 mb-30">
                    <div className="blog-img-2">
                        <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                            <img
                                src={process.env.PUBLIC_URL + "../img/blog/smartphones.jpg"}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="blog-content-2">
                        <div className="blog-meta-2">
                            <ul>
                                <li>5 November, 2025</li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                                        4 <i className="fa fa-comments-o" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <h4>
                            <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                                A happy life starts
                            </Link>
                        </h4>
                        <p>
                            Aenean sollicitudin, lorem quis on endum uctor nisi elitod the
                            cona sequat ipsum, necas sagittis sem natoque nibh id penatibus
                        </p>
                        <div className="blog-share-comment">
                            <div className="blog-btn-2">
                                <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                                    read more
                                </Link>
                            </div>
                            <div className="blog-share">
                                <span>share :</span>
                                <div className="share-social">
                                    <ul>
                                        <li>
                                            <a className="facebook" href="//facebook.com">
                                                <i className="fa fa-facebook" />
                                            </a>
                                        </li>
                                        <li>
                                            <a className="twitter" href="//twitter.com">
                                                <i className="fa fa-twitter" />
                                            </a>
                                        </li>
                                        <li>
                                            <a className="instagram" href="//instagram.com">
                                                <i className="fa fa-instagram" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="blog-wrap-2 mb-30">
                    <div className="blog-img-2">
                        <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                            <img
                                src={process.env.PUBLIC_URL + "../img/blog/companies.jpg"}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="blog-content-2">
                        <div className="blog-meta-2">
                            <ul>
                                <li>5 November, 2025</li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                                        4 <i className="fa fa-comments-o" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <h4>
                            <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                                Tips on having a
                            </Link>
                        </h4>
                        <p>
                            Aenean sollicitudin, lorem quis on endum uctor nisi elitod the
                            cona sequat ipsum, necas sagittis sem natoque nibh id penatibus
                        </p>
                        <div className="blog-share-comment">
                            <div className="blog-btn-2">
                                <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                                    read more
                                </Link>
                            </div>
                            <div className="blog-share">
                                <span>share :</span>
                                <div className="share-social">
                                    <ul>
                                        <li>
                                            <a className="facebook" href="//facebook.com">
                                                <i className="fa fa-facebook" />
                                            </a>
                                        </li>
                                        <li>
                                            <a className="twitter" href="//twitter.com">
                                                <i className="fa fa-twitter" />
                                            </a>
                                        </li>
                                        <li>
                                            <a className="instagram" href="//instagram.com">
                                                <i className="fa fa-instagram" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}