import React, { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import Topbar from "../../components/common/Topbar";
import Carousel from "../../components/common/Carousel";
import Featured from "../../components/common/Featured";
import Categories from "../../components/common/Categories";
import Product from "../../components/common/Product";
import Footer from "../../components/common/footer";
import BtnBackToTop from "../../components/common/BtnBackToTop";
import DetailProduct from "../../components/common/DetailProduct";
import Checkout from "../../components/common/Checkout";
import HomeShop from "../Dashboard/HomeLayout";
function HomeUser() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle Dropdown Toggle
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = () => {
    if (window.innerWidth > 992) {
      setDropdownOpen(!isDropdownOpen);
    }
  };

  // Back to Top Functionality
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Quantity Functionality (assuming you have a state for quantity)
  const [quantity, setQuantity] = useState(0);
  const updateQuantity = (increment) => {
    setQuantity((prevQuantity) =>
      increment ? prevQuantity + 1 : Math.max(prevQuantity - 1, 0)
    );
  };
  return (
    <div>
      <Carousel></Carousel>
      <Featured></Featured>
      <Categories></Categories>
      <Product></Product>
      <BtnBackToTop></BtnBackToTop>
      {/* <DetailProduct></DetailProduct>
      <Checkout></Checkout> */}
    </div>
  );
}

export default HomeUser;
