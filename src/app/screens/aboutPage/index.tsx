import { BreadcrumbWrap } from "../../components/helpers/breadcrumbWrap";
import { useLocation, Link } from "react-router-dom";
import Banner from "../homePage/Banner";
import funFactData from "./funFactData";
import aboutData from "./aboutData";
import teamMemberData from "./teamMemberData";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { useState } from "react";
import BrandLogoSlider from "../homePage/BrandLogoSlider";
import { useTranslation } from "react-i18next";


export default function AboutPage() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const aboutKeys = ["vision", "mission", "goal"];
  const factKeys = ["fact1", "fact2", "fact3", "fact4"];
  const [didViewCountUp, setDidViewCountUp] = useState(false);

  const onVisibilityChange = (isVisible: any) => {
    if (isVisible) {
      setDidViewCountUp(true);
    }
  };
  return (
    <>
      <BreadcrumbWrap
        pages={[
          { label: String(t("nav.home")), path: process.env.PUBLIC_URL + "/" },
          { label: String(t("nav.about")), path: process.env.PUBLIC_URL + pathname },
        ]}
      />

      {/* section title with text */}
      <div className={"welcome-area pt-100 pb-95"}>
        <div className="container">
          <div className="welcome-content text-center">
            <h5>{t("about.who")}</h5>
            <h1>{t("about.welcome")}</h1>
            <p>{t("about.lead")}</p>
          </div>
        </div>
      </div>

      {/* banner */}
      <Banner />

      {/* text grid */}
      <div className={"about-mission-area pb-70"}>
        <div className="container">
          <div className="row">
            {aboutData?.map((single, key) => (
              <div className="col-lg-4 col-md-4" key={key}>

                <div className={"single-mission mb-30"}>
                  <h3>{t(`about.${aboutKeys[key]}`)}</h3>
                  <p>{t(`about.${aboutKeys[key]}Text`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* fun fact */}
      <div className={"funfact-area pt-100 pb-70 bg-gray-3"}>
        <div className="container">
          <div className="row">
            {funFactData?.map((single, key) => (
              <div className="col-lg-3 col-md-6 col-sm-6" key={key}>
                <div className={"single-count text-center mb-30"}>
                  <div className="count-icon">
                    <i className={single.iconClass} />
                  </div>
                  <h2 className="count">
                    <VisibilitySensor
                      onChange={onVisibilityChange}
                      offset={{ top: 10 }}
                      delayedCall
                    >
                      <CountUp end={didViewCountUp ? single.countNum : 0} />
                    </VisibilitySensor>
                  </h2>
                  <span>{t(`about.${factKeys[key]}`)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* team member */}
      {/* section title */}
      <div className={"team-area pt-95 pb-70"}>
        <div className="container">
          <div className="section-title-2 text-center mb-60">
            <h2>{t("about.members")}</h2>
            <p>{t("about.membersLead")}</p>
          </div>

          <div className="row">
            {teamMemberData?.map((single, key) => (
              <div className="col-lg-3 col-md-6 col-sm-6" key={key}>
                <div className={"team-wrapper mb-30"}>
                  <div className="team-img">
                    <img
                      src={process.env.PUBLIC_URL + single.image}
                      alt={single.name}
                      className="img-fluid"
                    />
                    <div className="team-action">
                      <a
                        className="facebook"
                        href={single.fbLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-facebook" />
                      </a>
                      <a
                        className="twitter"
                        href={single.twitterLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-twitter" />
                      </a>
                      <a
                        className="instagram"
                        href={single.instagramLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-instagram" />
                      </a>
                    </div>
                  </div>
                  <div className="team-content text-center">
                    <h4>{single.name}</h4>
                    <span>{single.position} </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div></div>
      {/* brand logo slider */}
      <BrandLogoSlider />
    </>
  );
}
