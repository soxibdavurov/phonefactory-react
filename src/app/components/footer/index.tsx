import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer
      className={"footer-area bg-gray pt-100 pb-70"}
    >
      <div className={"container"}>
        <div className="row">
          <div
            className={"col-xl-2 col-sm-4"}
          >
            {/* footer copyright */}
            <div className={"copyright mb-30"}>
              <div className="footer-logo">
                <Link to={process.env.PUBLIC_URL + "/"}>
                  <img alt="" src={"/icons/phonefactory2.png"} width={"150px"} />
                </Link>
              </div>
              <p>
                &copy; {new Date().getFullYear()}{" "}
                <a
                  href="https://dunyo.express"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  PhoneFactory
                </a>
                .<br /> {t("footer.rights")}
              </p>
            </div>
          </div>
          <div
            className={"col-xl-2 col-sm-4"}
          >
            <div className="footer-widget mb-30 ml-30">
              <div className="footer-title">
                <h3>{t("footer.about")}</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/about"}>{t("footer.about")}</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "#/"}>
                      {t("footer.location")}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/contact"}>
                      {t("footer.contact")}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "#/"}>
                      {t("footer.tracking")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={"col-xl-2 col-sm-4"}
          >
            <div
              className={"footer-widget mb-30 ml-95"}
            >
              <div className="footer-title">
                <h3>{t("footer.useful")}</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/help"}>{t("footer.returns")}</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "#/"}>
                      {t("footer.policy")}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "#/"}>{t("footer.size")}</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/help"}>{t("footer.faq")}</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={"col-xl-3 col-sm-4"}
          >
            <div
              className={"footer-widget mb-30 ml-145"}
            >
              <div className="footer-title">
                <h3>{t("footer.follow")}</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <a
                      href="//www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="//www.twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="//www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="//www.youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Youtube
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={"col-xl-3 col-sm-8"}
          >
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
