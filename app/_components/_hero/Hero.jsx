// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./slider.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Container, Link, Typography, useTheme ,Button} from "@mui/material";
import { useTranslation } from "react-i18next";
import IconSection from "./IconSection";
import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";

const mySlider = [
  { text: "MEN", link: "https://res.cloudinary.com/daw5hjzzu/image/upload/v1727069758/banner-15-min_glofxk.jpg" },
  { text: "WOMEN", link: "https://res.cloudinary.com/daw5hjzzu/image/upload/v1730034585/banner-25-min_rz8ovb.png" },
];

const Hero = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const cardData = useMemo(() => {
    return [
      {title: "GAMING 4K", Class: "SUMMER", price: "SALE 20% OFF", img: "https://res.cloudinary.com/daw5hjzzu/image/upload/v1727069758/banner-17-min_g5olbb.jpg"},
      {title: "NEW ARRIVALS", Class: "DESKTOPS &", price: "LAPTOPS", img: "https://res.cloudinary.com/daw5hjzzu/image/upload/v1727069758/banner-16-min_hsxzk4.jpg"},
    ]
  },[])
  return (
    <Container>
      <Box sx={{ pt: 2, mt: 2.5, pr: {xs: 0, md: 2.5}, display: "flex", alignItems: "center", gap: 2 }} >
        <Box sx={{width: {xs: '100%', md: '73.4%'}}}>
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

                  <Box sx={{[theme.breakpoints.up("sm")]: { position: "absolute", left: "10%", textAlign: "left",},
                      [theme.breakpoints.down("sm")]: {pt: 4,pb: 6,},}}>
                    <Typography sx={{color: "#222", }} variant="h5">{t('LIFESTYLE COLLECTION')}</Typography>

                    <Typography sx={{ color: "#222", fontWeight: 500, my: 1, }}  variant="h3" > {t(item.text)} </Typography>

                    <div className="flex items-center justify-center sm:justify-start">
                      <Typography color={"#333"} mr={1} variant="h4">{t('SALE UP TO')}</Typography>
                      <Typography color={"#D23F57"} variant="h4"> 30% {t('OFF')} </Typography>
                    </div>

                    <Typography sx={{ color: "#000", fontWeight: 300, my: 1,}} variant="body1">{t('Get Free Shipping on orders over')} $99.00</Typography>

                    <Button variant="contained" sx={{ px: 5, py: 1, mt: 2, backgroundColor: "#222", boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1) !important", 
                        color: "#fff", borderRadius: "1px", "&:hover": { bgcolor: "#151515", boxShadow: "10px 4px 16px rgba(43, 52, 69, 0.1) !important", }, }}>
                      {t('shop now')}
                    </Button>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" , flexDirection: 'column', gap: 8, minWidth: "26.6%" } }}>
          {cardData.map((item) =>(
            <div className="relative" key={item.title}>
            <img width={'100%'} src={item.img} alt="image product" />

            <div className="flex flex-col absolute top-1/2 -translate-y-1/2 left-8">
              <Typography className="text-secondary text-lg" variant="caption">{t(item.title)}</Typography>
              <Typography className="text-secondary text-lg mt-2"variant="h6">{t(item.Class)}</Typography>
              <Typography className="text-secondary" variant="h6">{t(item.price)}</Typography>

              <Link className='link-shop text-secondary flex items-center gap-1 transition duration-200 relative cursor-pointer hover:text-[#D23F57] '
                sx={{
                  "&:hover:before": { width: t("shop now") == "Achetez maintenant" ? "165px" : t("shop now") == "تسوق الآن" ? "70px" : "90px",},
                  "&:hover .icon-arrow": { animationPlayState: "running", }, color: '#2B3445', }} underline="none"
              >
                {t("shop now")}
                <ArrowForwardIcon className="icon-arrow text-sm relative -left-1 top-0 transition duration-300"
                  sx={{ animation: "ani-arrow 1s ease-in-out infinite", animationPlayState: "paused",}}/>
              </Link>
            </div>
          </div>))}
        </Box>
      </Box>

      <IconSection />
    </Container>
  );
};

export default Hero;
