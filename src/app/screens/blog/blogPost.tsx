import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const BlogPost = () => {
    return (
        <Fragment>
            <div className="blog-details-top">
                <div className="blog-details-img">
                    <img
                        alt=""
                        src={process.env.PUBLIC_URL + "../img/blog/sim.png"}
                    />
                </div>
                <div className="blog-details-content">
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
                    <h3>Buying a SIM Card or eSIM for your comfort</h3>
                    <p>
                        There are three cell networks in South Korea: LG U+, SK Telecom, and KT. You’ll get excellent LTE coverage in any major town or city with all providers, and shouldn’t have much of a problem with service anywhere unless you’re heading well off the beaten track.

                        Several resellers also sell SIMs that use one of these networks, typically with slower speeds, cheaper prices, and a delay of a few hours between purchase and activation.

                        Unlike many parts of the world, if you’re planning to buy a physical SIM, I’d recommend getting it at the airport when you land. This is simply due to the language barrier and registration/activation challenges that you’ll find when buying elsewhere, which can be significant.

                        While you may find someone who speaks enough English at a phone store to help you out in touristy parts of Seoul like Hongdae or Myeongdong, there are no guarantees, and it’s much less likely elsewhere in the city and country.

                        At the airport, however, staff are very used to registering SIMs for foreign visitors. I had no problems at the LG+ booth, and because I’d ordered in advance, the process of collecting, swapping, and testing my SIM card only took a few minutes.{" "}
                    </p>
                    <blockquote>
                        Lorem ipsum dolor sit amet, consecte adipisicing elit, sed do
                        eiusmod tempor incididunt labo dolor magna aliqua. Ut enim ad minim
                        veniam quis nostrud.
                    </blockquote>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehendrit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur.
                    </p>
                </div>
            </div>
            <div className="dec-img-wrapper">
                <div className="row">
                    <div className="col-md-6">
                        <div className="dec-img mb-50">
                            <img
                                alt=""
                                src={
                                    process.env.PUBLIC_URL + "/assets/img/blog/blog-details.jpg"
                                }
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="dec-img mb-50">
                            <img
                                alt=""
                                src={
                                    process.env.PUBLIC_URL + "/assets/img/blog/blog-details-2.jpg"
                                }
                            />
                        </div>
                    </div>
                </div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehendrit
                    in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
            </div>
            <div className="tag-share">
                <div className="dec-tag">
                    <ul>
                        <li>
                            <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                                lifestyle ,
                            </Link>
                        </li>
                        <li>
                            <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                                SIM ,
                            </Link>
                        </li>
                        <li>
                            <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                                connection
                            </Link>
                        </li>
                    </ul>
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
            <div className="next-previous-post">
                <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                    {" "}
                    <i className="fa fa-angle-left" /> prev post
                </Link>
                <Link to={process.env.PUBLIC_URL + "/blog-details"}>
                    next post <i className="fa fa-angle-right" />
                </Link>
            </div>
        </Fragment>
    );
};

export default BlogPost;
