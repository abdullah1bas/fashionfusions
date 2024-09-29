import { Box, Container } from "@mui/material";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./slider.css";
import SwiperSlider from "./_heroC/SwiperSlider";
import SmSliderCard from "./_heroC/SmSliderCard";
import IconSection from "./_heroC/IconSection";

const Hero = () => {
  return (
    <Container>
      <Box
        sx={{ pt: 2, mt: 2.5, pr: {xs: 0, md: 2.5}, display: "flex", alignItems: "center", gap: 2 }}
      >
        <Box sx={{width: {xs: '100%', md: '73.4%'}}}>
          <SwiperSlider />
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" , flexDirection: 'column', gap: 8, minWidth: "26.6%" } }}>
          <SmSliderCard
            title={"NEW ARRIVALS"}
            Class={"SUMMER"}
            price={"SALE 20% OFF"}
            img={"https://res.cloudinary.com/daw5hjzzu/image/upload/v1727069758/banner-17-min_g5olbb.jpg"}
          />
          <SmSliderCard
            title={"GAMING 4K"}
            Class={"DESKTOPS &"}
            price={"LAPTOPS"}
            img={"https://res.cloudinary.com/daw5hjzzu/image/upload/v1727069758/banner-16-min_hsxzk4.jpg"}
          />
        </Box>
      </Box>

      <IconSection />
    </Container>
  );
};

export default Hero;
