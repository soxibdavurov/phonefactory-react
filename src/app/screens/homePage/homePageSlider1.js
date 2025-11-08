import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../../components/swiper";
import { Link } from "react-router-dom";
import { homePageSliderData } from "../../../lib/data/homePageSliderData";

export default function HomePageSlider() {
  const params = {
    effect: "fade",
    autoplay: {
      delay: 8000,
      disableOnInteraction: true,
    },
    fadeEffect: {
      crossFade: true,
    },
    modules: [EffectFade],
    loop: true,
    speed: 2000,
    navigation: false,
    autoHeight: true,
  };

  return (
    <div className="slider-area">
      <div className="slider-active nav-style-1">
        {homePageSliderData && (
          <Swiper options={params}>
            {homePageSliderData.map((data, key) => (
              <SwiperSlide key={key}>
                <div
                  className="single-slider-2 slider-height-2 d-flex align-items-center bg-img"
                  style={{ backgroundImage: `url(${process.env.PUBLIC_URL + data.image})` }}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-10 ms-auto me-auto">
                        <div
                          className="slider-content-2 slider-content-2--style2 slider-animated-1"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            padding: "50px",
                            paddingTop: "25px",
                            textAlign: "center",
                          }}
                        >
                          <h3 className="animated no-style">{data.title}</h3>
                          <h1
                            className="animated"
                            dangerouslySetInnerHTML={{ __html: data.subtitle }}
                          />
                          <p className="animated">{data.text}</p>
                          <div className="slider-btn btn-hover">
                            <Link
                              className="animated rounden-btn"
                              to={process.env.PUBLIC_URL + data.url}
                            >
                              SHOP NOW
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
