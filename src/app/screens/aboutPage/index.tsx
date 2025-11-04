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


export default function AboutPage() {
  const { pathname } = useLocation();
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
          { label: "Home", path: process.env.PUBLIC_URL + "/" },
          { label: "About Us", path: process.env.PUBLIC_URL + pathname },
        ]}
      />

      {/* section title with text */}
      <div className={"welcome-area pt-100 pb-95"}>
        <div className="container">
          <div className="welcome-content text-center">
            <h5>Who Are We</h5>
            <h1>Welcome To PhoneFactory</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt labor et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commo consequat irure{" "}
            </p>
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
                  <h3>{single.title}</h3>
                  <p>{single.text}</p>
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
                    </VisibilitySensor>+
                  </h2>
                  <span>{single.title}</span>
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
            <h2>PhoneShop Members</h2>
            <p>Lorem ipsum dolor sit amet conse ctetu.</p>
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
