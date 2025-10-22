import { BreadcrumbWrap } from "../../components/helpers/breadcrumbWrap";
import { useLocation, Link } from "react-router-dom";

export default function ContactUs() {
    const { pathname } = useLocation();

    return (
        <>
            <div>
                <BreadcrumbWrap
                    pages={[
                        { label: "Home", path: process.env.PUBLIC_URL + "/" },
                        { label: "Contact us", path: process.env.PUBLIC_URL + pathname },
                    ]}
                />
            </div>
            <div className="contact-area pt-100 pb-100">
                <div className="container">
                    <div className="contact-map mb-10">
                        <iframe
                            style={{ marginTop: "60px" }}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.4485465061183!2d126.9052625156472!3d37.13168587988726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b1453ae8a99bb%3A0x87a732dace8fd71f!2s115-19%20Pyeong-ri%2C%20Hyangnam-eup%2C%20Hwaseong-si%2C%20Gyeonggi-do!5e0!3m2!1sen!2skr!4v1690000000000"
                            width="1172"
                            height={"500"}
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="custom-row-2">
                        <div className="col-12 col-lg-4 col-md-5">
                            <div className="contact-info-wrap">
                                <div className="single-contact-info">
                                    <div className="contact-icon">
                                        <i className="fa fa-phone" />
                                    </div>
                                    <div className="contact-info-dec">
                                        <p>+82-10-5505-8800</p>
                                        <p>+82-10-9750-9890</p>
                                    </div>
                                </div>
                                <div className="single-contact-info">
                                    <div className="contact-icon">
                                        <i className="fa fa-globe" />
                                    </div>
                                    <div className="contact-info-dec">
                                        <p>
                                            <a href="phonefactory9031@gmail.com">
                                                phonefactory9031@gmail.com
                                            </a>
                                        </p>
                                        <p>
                                            <a href="https://dunyo.express">
                                                DunyoExpress
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="single-contact-info">
                                    <div className="contact-icon">
                                        <i className="fa fa-map-marker" />
                                    </div>
                                    <div className="contact-info-dec">
                                        <p>경기도 화성시,</p>
                                        <p>향남읍 평리 115-9.</p>
                                    </div>
                                </div>
                                <div className="contact-social text-center">
                                    <h3>Follow Us</h3>
                                    <ul>
                                        <li>
                                            <a href="//facebook.com">
                                                <i className="fa fa-facebook" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="//pinterest.com">
                                                <i className="fa fa-pinterest-p" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="//thumblr.com">
                                                <i className="fa fa-tumblr" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="//vimeo.com">
                                                <i className="fa fa-vimeo" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="//twitter.com">
                                                <i className="fa fa-twitter" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-8 col-md-7">
                            <div className="contact-form">
                                <div className="contact-title mb-30">
                                    <h2>Get In Touch</h2>
                                </div>
                                <form className="contact-form-style">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <input name="name" placeholder="Name*" type="text" />
                                        </div>
                                        <div className="col-lg-6">
                                            <input name="email" placeholder="Email*" type="email" />
                                        </div>
                                        <div className="col-lg-12">
                                            <input name="subject" placeholder="Subject*" type="text" />
                                        </div>
                                        <div className="col-lg-12">
                                            <textarea
                                                name="message"
                                                placeholder="Your Message*"
                                                defaultValue=""
                                            />
                                            <button className="submit" type="submit">
                                                SEND
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <p className="form-message" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
