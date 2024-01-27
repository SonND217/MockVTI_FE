import React from "react";
import CustomOwlCarousel from "./CustomOwlCarousel";

const VendorCarousel = () => (
  <CustomOwlCarousel
    responsive={{
      0: { items: 2 },
      576: { items: 3 },
      768: { items: 4 },
      992: { items: 5 },
      1200: { items: 6 },
    }}
  >
    {/* Carousel items here */}
  </CustomOwlCarousel>
);

const RelatedCarousel = () => (
  <CustomOwlCarousel
    responsive={{
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      992: { items: 4 },
    }}
  >
    {/* Carousel items here */}
  </CustomOwlCarousel>
);

export { VendorCarousel, RelatedCarousel };
