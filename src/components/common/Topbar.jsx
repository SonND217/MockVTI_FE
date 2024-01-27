import { useState, React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../public/logo/Logo.png?url";

const Topbar = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };
  return (
    <div className="container-fluid">
      {/* Topbar Row 1 */}
      {/* <div className="row bg-secondary py-1 px-xl-5"> */}
      {/* Left Side Links */}
      {/* <div className="col-lg-6 d-none d-lg-block">
          <div className="d-inline-flex align-items-center h-100">
            <a className="text-body mr-3" href="/">
              Chính sách
            </a>
            <a className="text-body mr-3" href="/">
              Liên hệ
            </a>
            <a className="text-body mr-3" href="/">
              Trợ Giúp
            </a>
            <a className="text-body mr-3" href="/">
              FAQs
            </a>
          </div>
        </div> */}
      {/* </div> */}

      {/* Topbar Row 2 */}
      <div className="row align-items-center bg-blue py-3 px-xl-5 d-none d-lg-flex">
        {/* Logo */}
        <div className="col-lg-4">
          <a href="/" className="text-decoration-none">
            <span className="hlogo text-uppercase text-primary px-2 bg-blue">
              <img
                src={logo}
                alt="Logo"
                style={{ width: "20%", height: "20%", paddingBottom: "5px" }}
              ></img>
            </span>

            <span className="h1 text-uppercase text-white px-2 ml-n1 bg-blue">
              VTI Shop
            </span>
          </a>
        </div>

        {/* Search Form */}
        <div className="col-lg-4 col-6 text-left">
          <form action="">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm sản phẩm"
              />
              <div className="input-group-append">
                <button
                  className={`input-group-text text-light blue-color2`}
                  onClick={handleClick}
                >
                  <i
                    className={`animated-button ${isClicked ? "clicked" : ""}`}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </i>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Customer Service */}
        <div className="col-lg-4 col-6 text-right text-light">
          <p className="m-0 text-light">Liên hệ chăm sóc khách hàng</p>
          <h5 className="m-0 text-light">+1800.6965</h5>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
