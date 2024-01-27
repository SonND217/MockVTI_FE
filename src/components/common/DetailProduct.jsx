import React, { useState } from "react";
import product1 from "../../assets/img/product-1.jpg";
import product2 from "../../assets/img/product-2.jpg";
import product3 from "../../assets/img/product-3.jpg";
import product4 from "../../assets/img/product-4.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FaStar, FaStarHalfAlt, FaShoppingCart } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterest,
} from "react-icons/fa";

function DetailProduct() {
  const [activeSize, setActiveSize] = useState("");
  const [activeColor, setActiveColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSizeChange = (e) => {
    setActiveSize(e.target.value);
  };

  const handleColorChange = (e) => {
    setActiveColor(e.target.value);
  };

  const handleQuantityChange = (increment) => {
    setQuantity((prevQuantity) =>
      increment ? prevQuantity + 1 : Math.max(prevQuantity - 1, 1)
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <AiOutlineLeft />,
    nextArrow: <AiOutlineRight />,
  };

  return (
    <div>
      <div className="container-fluid pb-5">
        <div className="row px-xl-5">
          <div className="col-lg-5 mb-30">
            <Slider {...settings}>
              {[product1, product2, product3, product4].map(
                (product, index) => (
                  <div key={index}>
                    <img
                      className="w-100 h-100"
                      src={product}
                      alt={`Product ${index + 1}`}
                    />
                  </div>
                )
              )}
            </Slider>
          </div>

          <div className="col-lg-7 h-auto mb-30">
            <div className="h-100 bg-light p-30">
              <h3>Product Name Goes Here</h3>
              <div className="d-flex mb-3">
                <div className="text-primary mr-2">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                  <FaStar />
                </div>
                <small className="pt-1">(99 Reviews)</small>
              </div>
              <h3 className="font-weight-semi-bold mb-4">$150.00</h3>
              <p className="mb-4">Description of the product...</p>
              <div className="d-flex mb-3">
                <strong className="text-dark mr-3">Sizes:</strong>
                <form>
                  {["XS", "S", "M", "L", "XL"].map((size, index) => (
                    <div
                      key={index}
                      className="custom-control custom-radio custom-control-inline"
                    >
                      <input
                        type="radio"
                        className="custom-control-input"
                        id={`size-${index}`}
                        name="size"
                        value={size}
                        onChange={handleSizeChange}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={`size-${index}`}
                      >
                        {size}
                      </label>
                    </div>
                  ))}
                </form>
              </div>
              <div className="d-flex mb-4">
                <strong className="text-dark mr-3">Colors:</strong>
                <form>
                  {["Black", "White", "Red", "Blue", "Green"].map(
                    (color, index) => (
                      <div
                        key={index}
                        className="custom-control custom-radio custom-control-inline"
                      >
                        <input
                          type="radio"
                          className="custom-control-input"
                          id={`color-${index}`}
                          name="color"
                          value={color}
                          onChange={handleColorChange}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={`color-${index}`}
                        >
                          {color}
                        </label>
                      </div>
                    )
                  )}
                </form>
              </div>
              <div className="d-flex align-items-center mb-4 pt-2">
                <div
                  className="input-group quantity mr-3"
                  style={{ width: "130px" }}
                >
                  <div className="input-group-btn">
                    <button
                      className="btn btn-primary btn-minus"
                      onClick={() => handleQuantityChange(false)}
                    >
                      <FiMinus />
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control bg-secondary border-0 text-center"
                    value={quantity}
                    readOnly
                  />
                  <div className="input-group-btn">
                    <button
                      className="btn btn-primary btn-plus"
                      onClick={() => handleQuantityChange(true)}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
                <button className="btn btn-primary px-3">
                  <FaShoppingCart style={{ marginRight: "0.5rem" }} />
                  Add To Cart
                </button>
              </div>
              <div className="d-flex pt-2">
                <strong className="text-dark mr-2">Share on:</strong>
                <div className="d-inline-flex">
                  <a className="text-dark px-2" href="#">
                    <FaFacebookF />
                  </a>
                  <a className="text-dark px-2" href="#">
                    <FaTwitter />
                  </a>
                  <a className="text-dark px-2" href="#">
                    <FaLinkedinIn />
                  </a>
                  <a className="text-dark px-2" href="#">
                    <FaPinterest />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row px-xl-5">
          <div className="col">
            <div className="bg-light p-30">
              <div className="nav nav-tabs mb-4">
                <a
                  className="nav-item nav-link text-dark active"
                  data-toggle="tab"
                  href="#tab-pane-1"
                >
                  Description
                </a>
                <a
                  className="nav-item nav-link text-dark"
                  data-toggle="tab"
                  href="#tab-pane-2"
                >
                  Information
                </a>
                <a
                  className="nav-item nav-link text-dark"
                  data-toggle="tab"
                  href="#tab-pane-3"
                >
                  Reviews (0)
                </a>
              </div>
              <div className="tab-content">
                <div className="tab-pane fade show active" id="tab-pane-1">
                  <h4 className="mb-3">Product Description</h4>
                  <p>Detailed product description goes here...</p>
                </div>
                <div className="tab-pane fade" id="tab-pane-2">
                  <h4 className="mb-3">Additional Information</h4>
                  <p>Additional product information...</p>
                </div>
                <div className="tab-pane fade" id="tab-pane-3">
                  <h4 className="mb-4">1 review for "Product Name"</h4>
                  <div className="media mb-4">
                    <img
                      src="img/user.jpg"
                      alt="User"
                      className="img-fluid mr-3 mt-1"
                      style={{ width: "45px" }}
                    />
                    <div className="media-body">
                      <h6>
                        John Doe{" "}
                        <small>
                          {" "}
                          - <i>01 Jan 2045</i>
                        </small>
                      </h6>
                      <div className="text-primary mb-2">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStarHalfAlt />
                        <FaStar />
                      </div>
                      <p>Review content here...</p>
                    </div>
                  </div>
                  <h4 className="mb-4">Leave a review</h4>
                  <small>
                    Your email address will not be published. Required fields
                    are marked *
                  </small>
                  <form>
                    <div className="d-flex my-3">
                      <p className="mb-0 mr-2">Your Rating * :</p>
                      <div className="text-primary">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Your Review *</label>
                      <textarea
                        id="message"
                        cols="30"
                        rows="5"
                        className="form-control"
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Your Name *</label>
                      <input type="text" className="form-control" id="name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Your Email *</label>
                      <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="form-group mb-0">
                      <input
                        type="submit"
                        value="Leave Your Review"
                        className="btn btn-primary px-3"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
