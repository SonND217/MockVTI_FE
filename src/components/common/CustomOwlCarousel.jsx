import React from "react";
import OwlCarousel from "react-owl-carousel";

const CustomOwlCarousel = ({ children, ...props }) => {
  const defaultOptions = {
    loop: true,
    margin: 29,
    nav: false,
    autoplay: true,
    smartSpeed: 1000,
    // Add any other global settings here
  };

  return (
    <OwlCarousel {...defaultOptions} {...props}>
      {children}
    </OwlCarousel>
  );
};

export default CustomOwlCarousel;
