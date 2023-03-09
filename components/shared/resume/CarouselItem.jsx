import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
export default function CarouselItem({ children, responsive, loop, center }) {
  return (
    <OwlCarousel
      loop={loop}
      className="owl-theme owl-nav-custome"
      dots={false}
      navClass={["owl-prev", "owl-next"]}
      navText={[]}
      responsive={responsive}
      center={center}
    >
      {children}
    </OwlCarousel>
  );
}
