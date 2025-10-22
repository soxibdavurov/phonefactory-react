import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../../components/swiper";
import sliderData from "./hero-slider-sixteen.json";
import HeroSliderSixteenSingle from "./HeroSliderSixteenSingle.js";

export default function HomePageSlider() {
  const params = {
    effect: "fade",
    autoplay: {
      delay: 10000,
      disableOnInteraction: false,
    },
    fadeEffect: {
      crossFade: true,
    },
    modules: [EffectFade],
    loop: true,
    speed: 2000,
    navigation: true,
    autoHeight: false,
  };

  return (
    <div className="slider-area">
      <div className="slider-active nav-style-1">
        {sliderData && (
          <Swiper options={params}>
            {sliderData.map((single, key) => (
              <SwiperSlide key={key}>
                <HeroSliderSixteenSingle data={single} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
