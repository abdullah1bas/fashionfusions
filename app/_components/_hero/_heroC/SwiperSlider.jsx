import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import SliderCard from "./SliderCard";
import { useTranslation } from "react-i18next";

const mySlider = [
  { text: "MEN", link: "https://res.cloudinary.com/daw5hjzzu/image/upload/v1727069758/banner-15-min_glofxk.jpg" },
  { text: "WOMEN", link: "https://res.cloudinary.com/daw5hjzzu/image/upload/v1727069759/banner-25-min_qmzmsn.jpg" },
];
const SwiperSlider = () => {
  const { t } = useTranslation();
  return (
    // link: swiper demos
    <Swiper
      loop={true}
      pagination={{
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      
      modules={[Pagination, Autoplay]}
      className="mySwiper"
    >
      {mySlider.map((item) => {
        return (
          <SwiperSlide key={item.link} className="parent-slider">
            <img src={item.link} alt="" />

            <SliderCard text={t(item.text)} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SwiperSlider;
