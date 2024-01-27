import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaBars, FaAngleDown, FaHeart, FaShoppingCart } from "react-icons/fa";
import LoginAndRegisterForm from "../../pages/shared/form/LoginAndRegisterForm";
function Navbar() {
  // State và refs như bạn đã định nghĩa
  const [isDressesOpen, setIsDressesOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const dressesRef = useRef(null);
  const categoryRef = useRef(null);
  const pagesRef = useRef(null);

  const handleClickOutside = (event) => {
    // Kiểm tra xem click có nằm trong phạm vi của một ref không
    const isInside = (ref, event) =>
      ref.current && ref.current.contains(event.target);

    // Đóng dropdown "Dresses" nếu click bên ngoài
    if (!isInside(dressesRef, event)) {
      setIsDressesOpen(false);
    }

    // Đóng dropdown "Categories" nếu click bên ngoài, trừ khi click vào "Dresses"
    if (!isInside(categoryRef, event) && !isInside(dressesRef, event)) {
      setIsCategoryOpen(false);
    }

    // Đóng dropdown "Pages" nếu click bên ngoài
    if (!isInside(pagesRef, event)) {
      setIsPagesOpen(false);
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="container-fluid bg-dark mb-30">
      <div className="row px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
          <button
            className="btn d-flex align-items-center justify-content-between bg-primary w-100"
            style={{ height: "65px", padding: "0 30px" }}
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            ref={categoryRef}
          >
            <h6 className="m-0 text-white">
              <i className="fa fa-bars mr-2"></i>Danh Mục
            </h6>
            <FaAngleDown className="text-white" />
          </button>
          <nav
            className={`collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light ${
              isCategoryOpen ? "show" : ""
            }`}
            style={{ width: "calc(100% - 30px)", zIndex: "999" }}
          >
            <div className="navbar-nav w-100">
              <div className="nav-item dropdown dropright" ref={dressesRef}>
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  onClick={() => setIsDressesOpen(!isDressesOpen)}
                >
                  Laptop <i className="fa fa-angle-right float-right mt-1"></i>
                </a>
                <div
                  className={`dropdown-menu position-absolute rounded-0 border-0 m-0 ${
                    isDressesOpen ? "show" : ""
                  }`}
                >
                  <a href="#" className="dropdown-item">
                    Theo Hãng
                  </a>
                  <a href="#" className="dropdown-item">
                    Theo Giá
                  </a>
                  <a href="#" className="dropdown-item">
                    Theo nhu cầu sử dụng
                  </a>
                </div>
              </div>
              <a href="#" className="nav-item nav-link">
                Điện Thoại
              </a>
              <a href="#" className="nav-item nav-link">
                Phụ Kiện
              </a>
            </div>
          </nav>
        </div>
        <div className="col-lg-9">
          <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
            <a href="#" className="text-decoration-none d-block d-lg-none">
              <span className="h1 text-uppercase bg-light px-2">VTI</span>
              <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">
                Shop
              </span>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarCollapse"
            >
              <div className="navbar-nav mr-auto py-0">
                <a href="index.html" className="nav-item nav-link active">
                  Trang chủ
                </a>
                <a href="shop.html" className="nav-item nav-link">
                  Tra cứu đơn hàng
                </a>
                <a href="detail.html" className="nav-item nav-link">
                  Chính sách bảo hành
                </a>
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    onClick={() => setIsPagesOpen(!isPagesOpen)}
                    ref={pagesRef}
                  >
                    Hướng dẫn <i className="fa fa-angle-down mt-1"></i>
                  </a>
                  <div
                    className={`dropdown-menu bg-primary rounded-0 border-0 m-0 ${
                      isPagesOpen ? "show" : ""
                    }`}
                  >
                    <a href="cart.html" className="dropdown-item">
                      Hướng dẫn thanh toán
                    </a>
                    <a href="checkout.html" className="dropdown-item">
                      Hướng dẫn Trả Gop
                    </a>
                  </div>
                </div>
                <a href="contact.html" className="nav-item nav-link">
                  Liên hệ
                </a>
              </div>

              <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                <a href="#" className="btn px-0">
                  <FaHeart className="text-primary" />
                  <span
                    className="badge text-secondary border border-secondary rounded-circle"
                    style={{ paddingBottom: "2px" }}
                  >
                    0
                  </span>
                </a>
                <a href="#" className="btn px-0 ml-3">
                  <FaShoppingCart className="text-primary" />
                  <span
                    className="badge text-secondary border border-secondary rounded-circle"
                    style={{ paddingBottom: "2px" }}
                  >
                    0
                  </span>
                </a>
                <a className="btn px-0 ml-3">
                  <LoginAndRegisterForm
                    isModalVisible={isModalVisible}
                    onToggleModal={toggleModal}
                  />
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
