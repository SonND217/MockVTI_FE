import React, { useState, useEffect } from "react";
import carousel1 from "../../assets/img/carousel-1.jpg"; // Update the path accordingly
import carousel2 from "../../assets/img/carousel-2.jpg"; // Update the path accordingly
import carousel3 from "../../assets/img/carousel-3.jpg"; // Update the path accordingly
import offer1 from "../../assets/img/offer-1.jpg"; // Update the path accordingly
import offer2 from "../../assets/img/offer-2.jpg"; // Update the path accordingly

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselData = [
    {
      image: carousel1,
      title: "Premium Vector New Laptop",
      description: "Premium Vector New Laptop Sale off 30%",
    },
    {
      image: carousel2,
      title: "New Gaming laptop",
      description: "Best Gaming Laptop in Viet Nam",
    },
    {
      image: carousel3,
      title: "Premium PSD",
      description: "Gaming laptop sale promotion social media post",
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselData.length);
    }, 6000); // Rotate every 6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="container-fluid mb-3">
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <div
              id="header-carousel"
              className="carousel slide carousel-fade mb-30 mb-lg-0"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                {carouselData.map((_, index) => (
                  <li
                    key={index}
                    data-target="#header-carousel"
                    data-slide-to={index}
                    className={index === activeIndex ? "active" : ""}
                    onClick={() => setActiveIndex(index)}
                  ></li>
                ))}
              </ol>
              <div className="carousel-inner">
                {carouselData.map((item, index) => (
                  <div
                    key={index}
                    className={`carousel-item position-relative ${
                      index === activeIndex ? "active" : ""
                    }`}
                    style={{ height: "430px" }}
                  >
                    <img
                      className="position-absolute w-100 h-100"
                      src={item.image}
                      style={{ objectFit: "cover" }}
                      alt={`Carousel ${index + 1}`}
                    />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                      <div className="p-3" style={{ maxWidth: "700px" }}>
                        <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                          {item.title}
                        </h1>
                        <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                          {item.description}
                        </p>
                        <a
                          className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                          href="#"
                        >
                          Tìm hiểu thêm
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="product-offer mb-30" style={{ height: "200px" }}>
              <img className="img-fluid" src={offer1} alt="Offer 1" />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">Save 20%</h6>
                <h3 className="text-white mb-3">Mi Notebook Pro X 15</h3>
                <a href="" className="btn btn-primary">
                  Tìm hiểu thêm
                </a>
              </div>
            </div>
            <div className="product-offer mb-30" style={{ height: "200px" }}>
              <img className="img-fluid" src={offer2} alt="" />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">Save 20%</h6>
                <h3 className="text-white mb-3">Mi Notebook 14 E</h3>
                <a href="" className="btn btn-primary">
                  Tìm hiểu thêm
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
